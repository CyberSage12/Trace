import React, { useState } from 'react';
import CuadriculaMaterias from './CuadriculaMaterias';

export default function ExploradorManual() {
    const [rutaSeleccionada, setRutaSeleccionada] = useState<string>('ninguna');

    return (
        <div>
        {/* El menú de selección */}
        <div style={{ margin: '20px 0', backgroundColor: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#e6e6e6', fontSize: '1.1rem' }}>
            Filtra por área de especialidad:
            </label>
            
            <select 
                value={rutaSeleccionada}
                onChange={(e) => setRutaSeleccionada(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#0d1117', color: '#58a6ff', border: '1px solid #58a6ff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                <option value="ninguna">Ver malla completa (Sin filtros)</option>
                <option value="ciberseguridad">Ciberseguridad</option>
                <option value="software">Sofware de sistemas</option>
                <option value="redes">Redes de computadoras</option>
                <option value="ia">Inteligencia Artificial</option>
            </select>
            <div style={{ display: 'flex', gap: '15px', marginLeft: 'auto', fontSize: '0.9rem', color: '#8b949e', alignItems: 'center' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#121620', border: '1px solid #2a3441', borderRadius: '3px' }}></div>
                        <span>Regular</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#121620', border: '1px solid #58a6ff', boxShadow: '0 0 5px rgba(0, 255, 255, 0.69)', borderRadius: '3px' }}></div>
                        <span>Tronco Común</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#121620', border: '1px solid #00ffcc', boxShadow: '0 0 5px rgba(0, 255, 204, 0.54)', borderRadius: '3px' }}></div>
                        <span>Ruta Sugerida</span>
                    </div>

                </div>
        </div>

        {/* Inyectamos nuestra pieza de LEGO pasándole la ruta que eligió el usuario */}
        <CuadriculaMaterias ruta={rutaSeleccionada} />
        </div>
    );
}