import { motion } from 'framer-motion';

const Loader = () => {
    return (
        // Aseguramos que el contenedor ocupe toda la pantalla y esté centrado
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0d1117',
        color: 'white',
        textAlign: 'center'
        }}>
        
        {/* 1. EL CHIP ANIMADO (Ahora con estilos inline para asegurar visibilidad) */}
        <motion.div
            animate={{ 
            boxShadow: ["0px 0px 0px #238636", "0px 0px 20px #2ea043", "0px 0px 0px #238636"],
            scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#238636',
            borderRadius: '12px',
            border: '2px solid #2ea043',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px'
            }}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}></div>
            </div>
        </motion.div>

        {/* 2. EL TEXTO */}
        <p style={{ 
            color: '#8b949e', 
            fontSize: '1.1rem', 
            marginBottom: '16px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
        }}>
            Despertando el backend en Render...
        </p>

        {/* 3. LA BARRA DE CARGA */}
        <div style={{ 
            width: '200px', 
            height: '6px', 
            backgroundColor: '#30363d', 
            borderRadius: '10px', 
            overflow: 'hidden',
            position: 'relative'
        }}>
            <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#238636',
                position: 'absolute'
            }}
            />
        </div>

        </div>
    );
};

export default Loader;