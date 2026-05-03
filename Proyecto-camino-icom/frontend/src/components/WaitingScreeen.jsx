import React, { useEffect } from 'react';
import Loader from './Loader';

export const WaitingScreen = ({ rutaGanadora }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
        window.location.href = `/especialidad?ruta=${rutaGanadora}`;
        }, 25000); // Los 25 segundos exactos que pediste

        return () => clearTimeout(timer);
    }, [rutaGanadora]);

    return <Loader />;
};