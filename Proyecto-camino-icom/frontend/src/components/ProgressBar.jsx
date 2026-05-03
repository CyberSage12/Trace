import { motion } from 'framer-motion';

export const ProgressBar = ({ actual, total }) => {
  const porcentaje = (actual / total) * 100;
    return (
        <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '6px', backgroundColor: '#161b22', zIndex: 100
        }}>
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${porcentaje}%` }}
            style={{ height: '100%', backgroundColor: '#238636', boxShadow: '0px 0px 10px #2ea043' }}
        />
        </div>
    );
};