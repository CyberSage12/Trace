import React, { useState } from 'react';
import styles from './Malla.module.css'; 

const PREGUNTAS_TEST = [
{
    pregunta: "1. ¿Qué te llama más la atención cuando usas una aplicación?",
    opciones: [
        { texto: "Cómo está construida por dentro y su código", valor: "software" },
        { texto: "Intentar encontrar fallos para burlar el sistema", valor: "ciberseguridad" },
        { texto: "Cómo el algoritmo me recomienda cosas tan exactas", valor: "ia" },
        { texto: "Cómo se conectan miles de usuarios sin que se caiga", valor: "redes" }
        ]
},
{
    pregunta: "2. Si tuvieras que resolver un problema complejo, preferirías:",
    opciones: [
        { texto: "Entrenar a la computadora para que lo resuelva sola", valor: "ia" },
        { texto: "Proteger la información de la empresa de un ataque", valor: "ciberseguridad" },
        { texto: "Escribir código limpio, estructurado y mantenible", valor: "software" },
        { texto: "Configurar los routers y la infraestructura física", valor: "redes" }
        ]
},
{
    pregunta: "3. ¿Qué herramienta o tema te da más curiosidad aprender?",
    opciones: [
        { texto: "Linux, Kali y Análisis Forense", valor: "ciberseguridad" },
        { texto: "Python, Big Data y Redes Neuronales", valor: "ia" },
        { texto: "Cisco, Servidores y Fibra Óptica", valor: "redes" },
        { texto: "React, Node.js y Arquitectura de Sistemas", valor: "software" }
        ]
},
{
    id: 4,
    pregunta: "4. Si tuvieras que elegir el proyecto final perfecto para graduarte, ¿cuál sería?",
    opciones: [
        { texto: "Auditar la infraestructura de una empresa y reportar sus vulnerabilidades.", valor: "ciberseguridad" },
        { texto: "Diseñar e interconectar la red de servidores de un campus universitario.", valor: "redes" },
        { texto: "Entrenar un modelo que detecte enfermedades en radiografías.", valor: "ia" },
        { texto: "Crear un motor de físicas o mecánicas interactivas desde cero.", valor: "videojuegos" },
        { texto: "Desarrollar el firmware operativo para un nuevo dispositivo IoT.", valor: "software" }
        ]
    },
    {
    id: 5,
    pregunta: "5. ¿Qué tipo de problemas te resulta más satisfactorio resolver?",
    opciones: [
        { texto: "Encontrar cómo romper la lógica de un sistema o saltarse una restricción.", valor: "ciberseguridad" },
        { texto: "Diagnosticar por qué un paquete de datos no llega de un punto A a un punto B.", valor: "redes" },
        { texto: "Ajustar parámetros matemáticos para que un algoritmo sea más preciso.", valor: "ia" },
        { texto: "Optimizar el renderizado para que algo corra a 60 FPS estables.", valor: "videojuegos" },
        { texto: "Gestionar el uso de memoria RAM y procesador al nivel más bajo posible.", valor: "software" }
        ]
    },
    {
    id: 6,
    pregunta: "6. Cuando miras una computadora o un sistema complejo, ¿qué te da más curiosidad?",
    opciones: [
        { texto: "Saber quién más podría estar adentro escuchando el tráfico.", valor: "ciberseguridad" },
        { texto: "Los protocolos que permiten que se comunique con un servidor en Japón en milisegundos.", valor: "redes" },
        { texto: "Cómo puede procesar millones de datos para tomar una decisión automatizada.", valor: "ia" },
        { texto: "Cómo los polígonos y las texturas se transforman en mundos inmersivos.", valor: "videojuegos" },
        { texto: "Cómo el kernel se comunica directamente con la tarjeta madre y el disco duro.", valor: "software" }
        ]
    },
    {
    id: 7,
    pregunta: "7. ¿Con qué herramientas o entornos te visualizas trabajando más a gusto?",
    opciones: [
        { texto: "Kali Linux, Wireshark, Metasploit y terminales oscuras.", valor: "ciberseguridad" },
        { texto: "Cisco Packet Tracer, switches, routers y fibra óptica.", valor: "redes" },
        { texto: "Python, TensorFlow, PyTorch y grandes bases de datos.", valor: "ia" },
        { texto: "Unity, Unreal Engine, C++ o C#.", valor: "videojuegos" },
        { texto: "C, C++, ensamblador y placas de desarrollo (como Raspberry Pi o Arduino).", valor: "software" }
        ]
    },
    {
    id: 8,
    pregunta: "8. Imagina que el sistema de la universidad colapsa. ¿En qué equipo de emergencia te gustaría estar?",
    opciones: [
        { texto: "En el equipo forense averiguando si fue un ataque de ransomware.", valor: "ciberseguridad" },
        { texto: "En el equipo de infraestructura levantando los servidores y restableciendo el ruteo.", valor: "redes" },
        { texto: "En el equipo de análisis creando un script para predecir y evitar el próximo colapso.", valor: "ia" },
        { texto: "Yo aprovecharía el caos para programar un minijuego en la terminal.", valor: "videojuegos" },
        { texto: "En el equipo de sistemas restaurando los respaldos directamente en el hardware.", valor: "software" }
        ]
    },
    {
    id: 9,
    pregunta: "9. ¿Qué noticia de tecnología te llama más la atención si la ves en Twitter/X?",
    opciones: [
        { texto: "'Filtran millones de contraseñas de una red social famosa'.", valor: "ciberseguridad" },
        { texto: "'El nuevo protocolo de internet promete velocidades sin latencia'.", valor: "redes" },
        { texto: "'Una nueva red neuronal supera a los humanos en una prueba compleja'.", valor: "ia" },
        { texto: "'El motor gráfico de la nueva generación muestra fotorrealismo en tiempo real'.", valor: "videojuegos" },
        { texto: "'Lanzan un nuevo microprocesador con una arquitectura revolucionaria'.", valor: "software" }
        ]
    },
    {
    id: 10,
    pregunta: "10. En 5 años, si buscaras trabajo en una empresa grande, ¿qué puesto pedirías?",
    opciones: [
        { texto: "Analista SOC / Pentester (Hacker Ético).", valor: "ciberseguridad" },
        { texto: "Arquitecto de Infraestructura y Nube.", valor: "redes" },
        { texto: "Ingeniero de Datos / Machine Learning Engineer.", valor: "ia" },
        { texto: "Gameplay Programmer / Technical Artist.", valor: "videojuegos" },
        { texto: "Desarrollador de Sistemas Embebidos / Firmware Engineer.", valor: "software" }
        ]
    }
];

export default function TestVocacional() {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntos, setPuntos] = useState<Record<string, number>>({
        software: 0, ciberseguridad: 0, ia: 0, redes: 0
});

const manejarRespuesta = (valorEspecialidad: string) => {
    const nuevosPuntos = { ...puntos, [valorEspecialidad]: puntos[valorEspecialidad] + 1 };
    setPuntos(nuevosPuntos);

    if (preguntaActual + 1 < PREGUNTAS_TEST.length) {
        setPreguntaActual(preguntaActual + 1);
        } else {
      // Calcular ganador
        let ganador = "software";
        let maxPuntos = -1;
        
        for (const [especialidad, puntaje] of Object.entries(nuevosPuntos)) {
        if (puntaje > maxPuntos) {
            maxPuntos = puntaje;
            ganador = especialidad;
            }
        }

        window.location.href = `/especialidad?ruta=${ganador}`;
        }
    };

    return (
    <div className={styles.contenedorTest}>
    <h3>{PREGUNTAS_TEST[preguntaActual].pregunta}</h3>

    {PREGUNTAS_TEST[preguntaActual].opciones.map((opcion, index) => (
    <button 
        key={index} 
        className={styles.opcionBtn}
        onClick={() => manejarRespuesta(opcion.valor)}
        >
        {opcion.texto}
        </button>
    ))}
    </div>
);
}