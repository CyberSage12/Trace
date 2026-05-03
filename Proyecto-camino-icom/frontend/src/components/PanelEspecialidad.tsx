import React, { useState, useEffect } from 'react';
import Loader  from './Loader';
import styles from './Malla.module.css';

export default function PanelEspecialidad({ ruta }: { ruta: string }) {
    const [info, setInfo] = useState<any>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!ruta || ruta === 'ninguna') return;

    setCargando(true);
    fetch(`https://trace-5lnh.onrender.com/api/especialidades/${ruta}`)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            if (datos.error) setInfo(null);
            else setInfo(datos);
            setCargando(false);
        })
        .catch((error) => {
            console.error("Error al traer info:", error);
            setCargando(false);
        });
    }, [ruta]); 

    if (cargando) return <Loader />;
    if (!info) return null; 

    return (
        <div className={styles.panelInfo}>
        <h3>Perfil Recomendado: {info.nombre}</h3>
        <p><strong>¿Qué harás?</strong> {info.descripcion}</p>
        
        <div className={styles.infoGrid}>
            <div>
            <h4>Campo Laboral</h4>
            <ul>
                {info.campo_laboral.map((puesto: string, i: number) => (
                <li key={i}>{puesto}</li>
                ))}
            </ul>
        </div>
        <div>
            <h4>Servicio Social</h4>
            <p>{info.servicio_social}</p>
        </div>
        <div>
            <h4>Prácticas Profesionales</h4>
            <p>{info.practicas_profesionales}</p>
            </div>
        </div>
    </div>
);
}