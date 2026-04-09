from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#Bienvenida
@app.get("/")
def ruta_principal():
    return {"mensaje": "¡Bienvenido a la API del Camino ICOM! Ve a /api/materias para ver los datos."}

# LA RUTA
@app.get("/api/materias")
def obtener_materias():
    with open("materias.json", "r", encoding="utf-8") as archivo:
        materias = json.load(archivo)
    
    return materias

#Especialidad
@app.get("/api/especialidades/{id_especialidad}")
def obtener_info_especialidad(id_especialidad: str):
    with open("especialidades.json", "r", encoding="utf-8") as archivo:
        todas = json.load(archivo)
    
    info = todas.get(id_especialidad.lower())
    
    if not info:
        return {"error": "Especialidad no encontrada"}
        
    return info