import React, { useState, useEffect } from 'react';
import styles from './Malla.module.css';

export default function Malla() {
  const [rutaSeleccionada, setRutaSeleccionada] = useState<string>('ninguna');
  const [materias, setMaterias] = useState<any[]>([]);
  
  // Para guardar la información de la especialidad
  const [infoEspecialidad, setInfoEspecialidad] = useState<any>(null);

  
  useEffect(() => {
    fetch("http://localhost:8000/api/materias")
      .then((respuesta) => respuesta.json())
      .then((datos) => setMaterias(datos))
      .catch((error) => console.error("Error al traer las materias:", error));
  }, []); 

  //Cargar info de la especialidad cada que cambie el menú
  useEffect(() => {
    if (rutaSeleccionada === 'ninguna') {
      setInfoEspecialidad(null); 
      return;
    }

    fetch(`https://trace-5lnh.onrender.com/api/especialidades/${rutaSeleccionada}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (datos.error) setInfoEspecialidad(null);
        else setInfoEspecialidad(datos);
      })
      .catch((error) => console.error("Error al traer info de especialidad:", error));
  }, [rutaSeleccionada]); 

  
  const materiasPorSemestre = materias.reduce((cajas, materia) => {
    const sem = materia.semestre;
    if (!cajas[sem]) cajas[sem] = [];
    cajas[sem].push(materia);
    return cajas;
  }, {});

  const numerosDeSemestre = Object.keys(materiasPorSemestre).sort((a, b) => Number(a) - Number(b));

  return (
    <div className={styles.contenedorPrincipal}>
      <h2>Explorador de Materias de CUCEI</h2>
      
      <div style={{ margin: '20px 0' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>¿Qué camino quieres tomar?</label>
        <select 
          value={rutaSeleccionada}
          onChange={(e) => setRutaSeleccionada(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px' }}
        >
          <option value="ninguna">Ver malla completa</option>
          <option value="ciberseguridad">Ciberseguridad</option>
          <option value="software">Software de sistemas</option>
          <option value="redes">Redes de computadoras</option>
          <option value="ia">Inteligencia Artificial</option>
          <option value="Videojuegos">Desarrollo de video juegos</option>
        </select>
      </div>

      {infoEspecialidad && (
        <div className={styles.panelInfo}>
          <h3>Perfil: {infoEspecialidad.nombre}</h3>
          <p><strong>¿Qué harás?</strong> {infoEspecialidad.descripcion}</p>
          
          <div className={styles.infoGrid}>
            <div>
              <h4>Campo Laboral</h4>
              <ul>
                {infoEspecialidad.campo_laboral.map((puesto: string, index: number) => (
                  <li key={index}>{puesto}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Servicio Social</h4>
              <p>{infoEspecialidad.servicio_social}</p>
            </div>
            <div>
              <h4>Prácticas Profesionales</h4>
              <p>{infoEspecialidad.practicas_profesionales}</p>
            </div>
          </div>
        </div>
      )}

      {/* El Tablero Compacto */}
      <div className={styles.contenedorTablero}>
        {numerosDeSemestre.map(semestre => (
          <div key={semestre} className={styles.columnaSemestre}>
            <h3>{semestre}</h3>
            
            {materiasPorSemestre[semestre].map((materia: any) => {
              const tagsDeMateria = materia.tags || []; 
              const tagsEnMinusculas = tagsDeMateria.map((tag: string) => tag.toLowerCase());
              const coincideConRuta = tagsEnMinusculas.includes(rutaSeleccionada.toLowerCase());
              const esTroncoComun = tagsEnMinusculas.includes("base") || tagsEnMinusculas.includes("tronco");
              const debeResaltarse = (rutaSeleccionada !== 'ninguna') && (coincideConRuta || esTroncoComun);

              let claseColor = '';
              if (rutaSeleccionada !== 'ninguna') {
                if (coincideConRuta) {
                  claseColor = styles.materiaResaltada; 
                } else if (esTroncoComun) {
                  claseColor = styles.materiaTronco; 
                }
              }

              return (
                <div 
                  key={materia.id} 
                  className={`${styles.tarjetaMateria} ${claseColor}`}
                >
                  {materia.nombre}
                </div>
              );
            })}
          </div>
        ))}
      </div> 
    </div>
  );
}