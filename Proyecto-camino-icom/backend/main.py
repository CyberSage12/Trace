from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json

from grafo_icom import MALLA

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diccionario para mapear el esfuerzo a un límite de "puntos de dificultad" por semestre
LIMITES_DIFICULTAD = {
    "ligero": 15,       # Ej: 3 materias muy pesadas o 5 fáciles
    "balanceado": 21,   # Carga normal de ICOM
    "intenso": 26       # "Llevo Algoritmia, SO y Compiladores al mismo tiempo"
}

# Límite máximo de créditos que SIIAU te deja meter (aprox)
MAX_CREDITOS = 50

#--- Modelos De Datos Nuevo ---
class SolicitudRuta(BaseModel):
    anios_meta: float
    calendario_ingreso: str  # NUEVO: Ej. "2024-A"
    cursadas: List[str]

LIMITES_DIFICULTAD = {
    "ligero": 15,
    "balanceado": 21,
    "intenso": 26
}
MAX_CREDITOS = 50 

def calcular_peso_ruta_critica(id_materia, grafo, memo=None):
    if memo is None:
        memo = {}
    if id_materia in memo:
        return memo[id_materia]
        
    # Encontrar qué materias tienen a `id_materia` como prerrequisito
    sucesores = [m for m, info in grafo.items() if id_materia in info["prerrequisitos"]]
    
    if not sucesores:
        peso = grafo[id_materia]["dificultad"]
    else:
        # El peso es la dificultad actual + el camino más largo hacia adelante
        peso = grafo[id_materia]["dificultad"] + max(calcular_peso_ruta_critica(suc, grafo, memo) for suc in sucesores)
        
    memo[id_materia] = peso
    return peso
@app.get("/api/materias")
def obtener_materias():
    lista_materias = []
    for id_materia, info in MALLA.items():
        lista_materias.append({
            "id": id_materia,
            "nombre": info["nombre"],
            "semestre": info.get("semestre_base", 1), 
            "creditos": info.get("creditos", 8),
            "area": info.get("area", "Básica")
        })
    return lista_materias

@app.post("/api/calcular-ruta")
def calcular_ruta_optima(datos: SolicitudRuta):
    materias_aprobadas = set(datos.cursadas)
    
    # --- CÁLCULO INTELIGENTE DE INTENSIDAD ---
    anio_ingreso, ciclo_ingreso = datos.calendario_ingreso.split("-")
    anio_ingreso = int(anio_ingreso)
    
    # Asumimos fecha actual: 2026-A (Mayo)
    anio_actual = 2026
    ciclo_actual = "A"
    
    # 1. ¿Cuántos semestres ha consumido?
    semestres_transcurridos = (anio_actual - anio_ingreso) * 2
    if ciclo_ingreso == "B" and ciclo_actual == "A":
        semestres_transcurridos -= 1
    elif ciclo_ingreso == "A" and ciclo_actual == "B":
        semestres_transcurridos += 1
        
    # 2. ¿Cuántos semestres le quedan para su meta?
    semestres_meta_total = int(datos.anios_meta * 2)
    semestres_restantes = semestres_meta_total - semestres_transcurridos
    
    materias_faltantes_count = len(MALLA) - len(materias_aprobadas)
    
    # 3. Decidir la intensidad necesaria
    if semestres_restantes <= 0:
        esfuerzo_calculado = "intenso"
        semestres_restantes = 1 # Para evitar división por cero en emergencias
    else:
        materias_por_semestre = materias_faltantes_count / semestres_restantes
        if materias_por_semestre > 5.5:
            esfuerzo_calculado = "intenso"
        elif materias_por_semestre >= 4.0:
            esfuerzo_calculado = "balanceado"
        else:
            esfuerzo_calculado = "ligero"
            
    limite_dif = LIMITES_DIFICULTAD.get(esfuerzo_calculado, 21)
    # ----------------------------------------

    # Semestre base para la etiqueta del usuario
    if not datos.cursadas:
        semestre_actual_estimado = 1
    else:
        semestre_actual_estimado = max(MALLA[m]["semestre_base"] for m in datos.cursadas if m in MALLA)

    # El Bucle de Dijkstra modificado (se queda igual)
    materias_faltantes = set(MALLA.keys()) - materias_aprobadas
    ruta_generada = [] 
    iteraciones = 0
    
    while materias_faltantes and iteraciones < 20:
        iteraciones += 1
        disponibles = [id_mat for id_mat in materias_faltantes if all(req in materias_aprobadas for req in MALLA[id_mat]["prerrequisitos"])]
        pesos_ruta = {}
        disponibles.sort(key=lambda x: calcular_peso_ruta_critica(x, MALLA, pesos_ruta), reverse=True)
        
        semestre_actual = []
        creditos_semestre = 0
        dificultad_semestre = 0
        
        for id_mat in disponibles:
            info = MALLA[id_mat]
            if (creditos_semestre + info["creditos"] <= MAX_CREDITOS) and (dificultad_semestre + info["dificultad"] <= limite_dif):
                semestre_actual.append(id_mat)
                creditos_semestre += info["creditos"]
                dificultad_semestre += info["dificultad"]
                
        if not semestre_actual:
            break
            
        for id_mat in semestre_actual:
            materias_aprobadas.add(id_mat)
            materias_faltantes.remove(id_mat)
            
        ruta_generada.append({
            "semestre_proyectado": len(ruta_generada) + 1,
            "materias": [{"id": m, "nombre": MALLA[m]["nombre"]} for m in semestre_actual],
            "total_creditos": creditos_semestre,
            "total_dificultad": dificultad_semestre
        })

    # La explicación ahora es super inteligente
    explicacion = (
        f"Ingresaste en {datos.calendario_ingreso}, por lo que llevas {semestres_transcurridos} semestres cursados. "
        f"Para lograr graduarte en tu meta de {datos.anios_meta} años, te quedan {semestres_restantes} semestres para pasar las {materias_faltantes_count} materias que te faltan. "
        f"Por lo tanto, el motor calculó que debes llevar un ritmo obligatoriamente '{esfuerzo_calculado.upper()}' "
        f"(máximo {limite_dif} pts. de dificultad por ciclo) para lograr tu objetivo a tiempo."
    )

    return {
        "mensaje": "Ruta óptima calculada",
        "parametros": {"esfuerzo_calculado": esfuerzo_calculado},
        "semestre_actual": semestre_actual_estimado,
        "explicacion": explicacion,
        "plan_estudios": ruta_generada
    }