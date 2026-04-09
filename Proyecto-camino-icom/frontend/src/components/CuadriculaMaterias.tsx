import React, { useState, useEffect } from 'react';
import styles from './Malla.module.css';

export default function CuadriculaMaterias({ ruta }: { ruta: string }) {
    const [materias, setMaterias] = useState<any[]>([]);

    useEffect(() => {
        const urlSinCache = `http://localhost:8000/api/materias?timestamp=${new Date().getTime()}`;
        fetch(urlSinCache)
        .then((respuesta) => respuesta.json())
        .then((datos) => setMaterias(datos))
        .catch((error) => console.error("Error al traer las materias:", error));
    }, []); 


    function obtenerTexto(valor: any) {
        if (!valor) return "";
        return Array.isArray(valor) ? String(valor[0]) : String(valor);
    }

    function esEspecializante(tipoRaw: any) {
        const tipoStr = obtenerTexto(tipoRaw);
        return tipoStr.toLowerCase().trim() === "especializante";
    }

    function tieneTag(materia: any, tagsBuscados: string[]) {
        const tagsDeMateria = materia.tags || [];
        const tagsArray = Array.isArray(tagsDeMateria) ? tagsDeMateria : [tagsDeMateria];
        const tagsMinusculas = tagsArray.map((t: any) => String(t).toLowerCase().trim());
        return tagsBuscados.some(tag => tagsMinusculas.includes(tag.toLowerCase()));
    }

    const materiasBase = materias.filter(m => !esEspecializante(m.tipo));
    const especializantes = materias.filter(m => esEspecializante(m.tipo));

    const materiasPorSemestre = materiasBase.reduce((cajas: any, materia) => {
        const sem = obtenerTexto(materia.semestre);
        if (!cajas[sem]) cajas[sem] = [];
        cajas[sem].push(materia);
        return cajas;
    }, {});
    
    const numerosDeSemestre = Object.keys(materiasPorSemestre).sort((a, b) => Number(a) - Number(b));

    const calcularClase = (materia: any) => {
        const coincideConRuta = ruta && ruta !== 'ninguna' && tieneTag(materia, [ruta]);
        const esTroncoComun = tieneTag(materia, ["base", "tronco"]);
        
        if (ruta && ruta !== 'ninguna') {
        if (coincideConRuta) return styles.materiaResaltada;
        if (esTroncoComun) return styles.materiaTronco;
        }
        return '';
    };

    return (
        <div>
        <div className={styles.contenedorTablero}>
            {numerosDeSemestre.map(semestre => (
            <div key={semestre} className={styles.columnaSemestre}>
                <h3>{semestre}</h3>
                {materiasPorSemestre[semestre].map((materia: any) => (
                <div key={materia.id} className={`${styles.tarjetaMateria} ${calcularClase(materia)}`}>
                    {obtenerTexto(materia.nombre)}
                </div>
                ))}
            </div>
            ))}
        </div>

        <h3 style={{color: '#e6e6e6', marginTop: '40px', borderLeft: '4px solid #58a6ff', paddingLeft: '15px'}}>
            Módulos Especializantes
        </h3>
        
        <div className={styles.seccionEspecializantes}>
            
            <div className={styles.cuadroEspecialidad}>
            <h4>Ciberseguridad</h4>
            <div className={styles.listaEspecializantes}>
                {especializantes.filter(m => tieneTag(m, ["ciberseguridad"]) && !tieneTag(m, ["redes"])).map(m => (
                <div key={m.id} className={`${styles.tarjetaMateria} ${calcularClase(m)}`}>
                    {obtenerTexto(m.nombre)}
                </div>
                ))}
            </div>
            </div>

            <div className={styles.cuadroEspecialidad}>
            <h4>Redes de Computadoras</h4>
            <div className={styles.listaEspecializantes}>
                {especializantes.filter(m => tieneTag(m, ["redes"])).map(m => (
                <div key={m.id} className={`${styles.tarjetaMateria} ${calcularClase(m)}`}>
                    {obtenerTexto(m.nombre)}
                </div>
                ))}
            </div>
            </div>

            <div className={styles.cuadroEspecialidad}>
            <h4>Inteligencia Artificial</h4>
            <div className={styles.listaEspecializantes}>
                {especializantes.filter(m => tieneTag(m, ["ia"])).map(m => (
                <div key={m.id} className={`${styles.tarjetaMateria} ${calcularClase(m)}`}>
                    {obtenerTexto(m.nombre)}
                </div>
                ))}
            </div>
            </div>

            <div className={styles.cuadroEspecialidad}>
            <h4>Software de Sistemas</h4>
            <div className={styles.listaEspecializantes}>
                {especializantes.filter(m => tieneTag(m, ["software"])).map(m => (
                <div key={m.id} className={`${styles.tarjetaMateria} ${calcularClase(m)}`}>
                    {obtenerTexto(m.nombre)}
                </div>
                ))}
            </div>
            </div>

            <div className={styles.cuadroEspecialidad}>
            <h4>Desarrollo de Videojuegos</h4>
            <div className={styles.listaEspecializantes}>
                {especializantes.filter(m => tieneTag(m, ["desarrollo_videojuegos", "videojuegos"])).map(m => (
                <div key={m.id} className={`${styles.tarjetaMateria} ${calcularClase(m)}`}>
                    {obtenerTexto(m.nombre)}
                </div>
                ))}
            </div>
            </div>

        </div>
        </div>
    );
}