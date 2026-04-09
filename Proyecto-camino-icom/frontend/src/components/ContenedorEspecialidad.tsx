import React, { useState, useEffect } from 'react';
import PanelEspecialidad from './PanelEspecialidad';
import CuadriculaMaterias from './CuadriculaMaterias';

export default function ContenedorEspecialidad() {
    const [ruta, setRuta] = useState<string>('ninguna');

    
    useEffect(() => {
        const parametros = new URLSearchParams(window.location.search);
        const rutaEnUrl = parametros.get('ruta');
        
        if (rutaEnUrl) {
        setRuta(rutaEnUrl);
        }
    }, []);

    return (
        <div>
        <PanelEspecialidad ruta={ruta} />
        <CuadriculaMaterias ruta={ruta} />
        </div>
    );
}