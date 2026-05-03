import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MALLA_ICOM } from '../data/materiasData';
import styles from './Malla.module.css';

type Vista = 'config' | 'loading' | 'results';

export default function UserConfig() {
    const [vista, setVista] = useState<Vista>('config');
    const [añosMeta, setAñosMeta] = useState(4.5);
    const [calendario, setCalendario] = useState('2024-A');
    const [cursadas, setCursadas] = useState<Set<string>>(new Set());
    const [datosRuta, setDatosRuta] = useState<any>(null);

    const toggleMateria = (id: string) => {
        const nuevas = new Set(cursadas);
        if (nuevas.has(id)) nuevas.delete(id);
        else nuevas.add(id);
        setCursadas(nuevas);
    };

    const ajustarAños = (incremento: number) => {
        setAñosMeta((prev) => {
        const nuevo = prev + incremento;
        if (nuevo >= 3.5 && nuevo <= 7.0) return nuevo;
        return prev;
        });
    };

    const calcularRuta = async () => {
        setVista('loading'); // Cambiamos a la pantalla de carga
        
        try {
        const payload = {
            anios_meta: añosMeta,
            calendario_ingreso: calendario,
            cursadas: Array.from(cursadas)
        };
        console.log("Enviando payload:", payload);
        const response = await fetch('https://trace-5lnh.onrender.com/api/calcular-ruta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        
        // Simulamos tiempo de procesamiento para el efecto visual del test
        setTimeout(() => {
            setDatosRuta(data);
            setVista('results');
        }, 2500);

        } catch (error) {
        console.error("Error al conectar:", error);
        alert("Error de conexión. Verifica que FastAPI esté corriendo.");
        setVista('config');
        }
    };

    // --- VISTA 1: PANTALLA DE CARGA ---
    if (vista === 'loading') {
        return (
        <div className={styles.loadingContainer}>
            <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className={styles.spinner}
            />
            <h2 className={styles.loadingText}>Calculando ruta óptima con Dijkstra...</h2>
            <p className={styles.loadingSubtext}>Evaluando pesos, créditos y prerrequisitos.</p>
        </div>
        );
    }

    // --- VISTA 2: PANTALLA EXCLUSIVA DE RESULTADOS ---
    if (vista === 'results' && datosRuta) {
        return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            className={styles.resultsContainer}
        >
            <div className={styles.resultsHeader}>
            <h2>Tu Plan de Estudios Proyectado</h2>
            <button className={styles.btnBack} onClick={() => setVista('config')}>
                ← Modificar parámetros
            </button>
            </div>

            {/* Tarjeta de Análisis / Explicación */}
            <div className={styles.analisisCard}>
            <div className={styles.analisisHeader}>
                <span className={styles.badgeSemestre}>
                Estás en Semestre {datosRuta.semestre_actual}
                </span>
                <span className={styles.badgeEsfuerzo}>
                Ritmo Necesario: {datosRuta.parametros.esfuerzo_calculado.toUpperCase()}
                </span>
            </div>
            <p className={styles.analisisTexto}>{datosRuta.explicacion}</p>
            </div>

            {/* Línea de tiempo de la ruta */}
            <div className={styles.timeline}>
            {datosRuta.plan_estudios.map((semestre: any, index: number) => (
                <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                    <h4>Ciclo Proyectado {semestre.semestre_proyectado}</h4>
                    <div className={styles.statsBadge}>
                    <span>{semestre.total_creditos} Créditos</span>
                    <span className={styles.dot}>•</span>
                    <span>Dificultad: {semestre.total_dificultad}</span>
                    </div>
                </div>
                <div className={styles.materiasProyectadas}>
                    {semestre.materias.map((mat: any) => (
                    <div key={mat.id} className={styles.materiaBadge}>
                        <strong>{mat.id}</strong> - {mat.nombre}
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </motion.div>
        );
    }

    // --- VISTA 3: PANTALLA DE CONFIGURACIÓN (DEFAULT) ---
    return (
        <div className={styles.configContainer}>
        <section className={styles.controlPanel}>
            {/* Controles de Años y Esfuerzo */}
            <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Tiempo de egreso proyectado</span>
            <div className={styles.counterWidget}>
                <button className={styles.counterBtn} onClick={() => ajustarAños(-0.5)}>-</button>
                <div className={styles.counterDisplay}>
                <span className={styles.counterValue}>{añosMeta}</span>
                <span className={styles.counterUnit}>años</span>
                </div>
                <button className={styles.counterBtn} onClick={() => ajustarAños(0.5)}>+</button>
            </div>
            </div>

            <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Calendario de Ingreso</span>
            <select 
                className={styles.selectWidget}
                value={calendario}
                onChange={(e) => setCalendario(e.target.value)}
            >
                <option value="2026-A">2026-A (Primer Ingreso)</option>
                <option value="2025-B">2025-B</option>
                <option value="2025-A">2025-A</option>
                <option value="2024-B">2024-B</option>
                <option value="2024-A">2024-A</option>
                <option value="2023-B">2023-B</option>
                <option value="2023-A">2023-A</option>
                <option value="2022-B">2022-B</option>
                <option value="2022-A">2022-A o anterior</option>
            </select>
            </div>
        </section>

        <section className={styles.mallaGrid}>
            <h3 className={styles.sectionTitle}>Marca las materias que ya aprobaste</h3>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sem) => (
            <div key={sem} className={styles.semestreRow}>
                <h4 className={styles.semestreLabel}>Semestre {sem}</h4>
                <div className={styles.materiasWrapper}>
                {MALLA_ICOM.filter(m => m.semestre === sem).map((materia) => (
                    <motion.div
                    key={materia.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleMateria(materia.id)}
                    className={`${styles.materiaNode} ${cursadas.has(materia.id) ? styles.checked : ''}`}
                    >
                    <span className={styles.materiaId}>{materia.id}</span>
                    <p>{materia.nombre}</p>
                    </motion.div>
                ))}
                </div>
            </div>
            ))}
        </section>

        <div className={styles.actionContainer}>
            <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(46, 160, 67, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className={styles.btnLaunch}
            onClick={calcularRuta}
            >
            Generar Ruta Óptima
            </motion.button>
        </div>
        </div>
    );
}