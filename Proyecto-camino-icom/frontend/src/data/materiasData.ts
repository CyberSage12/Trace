export interface Materia {
    id: string;
    nombre: string;
    semestre: number;
    creditos: number;
    prerrequisitos: string[];
    dificultad: number; // 1 (Fácil) a 5 (Muy Pesada)
    area: 'Básica' | 'Especializante' |'Egreso'| 'Optativa' | 'Selectiva';
}

export const MALLA_ICOM: Materia[] = [
    // --- SEMESTRE I ---
    { id: 'I5288', nombre: 'Fundamentos de la programación', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Básica' },
    { id: 'I5247', nombre: 'Lógica Matemática', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 4, area: 'Básica' },
    { id: 'IG738', nombre: 'Precálculo', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Básica' },
    { id: 'IL340', nombre: 'Fundamentos de física', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 4, area: 'Básica' },
    { id: 'IL342', nombre: 'Introducción a la ingeniería', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 1, area: 'Básica' },
    { id: 'IL341', nombre: 'Ética y Legislación', semestre: 1, creditos: 8, prerrequisitos: [], dificultad: 2, area: 'Básica' },

    // --- SEMESTRE II ---
    { id: 'IL352', nombre: 'Programación estructurada', semestre: 2, creditos: 10, prerrequisitos: ['I5288'], dificultad: 4, area: 'Básica' },
    { id: 'IL345', nombre: 'Matemáticas discretas', semestre: 2, creditos: 8, prerrequisitos: ['I5247'], dificultad: 4, area: 'Básica' },
    { id: 'IL344', nombre: 'Cálculo diferencial e integral', semestre: 2, creditos: 9, prerrequisitos: ['IG738'], dificultad: 5, area: 'Básica' },
    { id: 'IL343', nombre: 'Mecánica', semestre: 2, creditos: 8, prerrequisitos: ['IL340'], dificultad: 4, area: 'Básica' },
    { id: 'IL353', nombre: 'Administración de proyectos tecnológicos', semestre: 2, creditos: 8, prerrequisitos: ['IL342'], dificultad: 2, area: 'Básica' },
    { id: 'LI251', nombre: 'Expresión oral y escrita', semestre: 2, creditos: 6, prerrequisitos: ['IL341'], dificultad: 2, area: 'Básica' },

    // --- SEMESTRE III ---
    { id: 'I5289', nombre: 'Programación Orientada a Objetos', semestre: 3, creditos: 8, prerrequisitos: ['IL352'], dificultad: 3, area: 'Básica' },
    { id: 'I8056', nombre: 'Álgebra Lineal', semestre: 3, creditos: 8, prerrequisitos: ['IL345'], dificultad: 4, area: 'Básica' },
    { id: 'IL347', nombre: 'Ecuaciones diferenciales', semestre: 3, creditos: 8, prerrequisitos: ['IL344'], dificultad: 4, area: 'Básica' },
    { id: 'IL346', nombre: 'Circuitos Electrónicos y Electromagnetismo', semestre: 3, creditos: 8, prerrequisitos: ['IL343'], dificultad: 4, area: 'Básica' },
    { id: 'IL363', nombre: 'Sistemas digitales', semestre: 3, creditos: 8, prerrequisitos: ['IL353'], dificultad: 3, area: 'Especializante' },
    { id: 'IL349', nombre: 'Administración', semestre: 3, creditos: 8, prerrequisitos: ['LI251'], dificultad: 2, area: 'Especializante' },

    // --- SEMESTRE IV ---
    { id: 'IL354', nombre: 'Estructuras de datos', semestre: 4, creditos: 10, prerrequisitos: ['I5289'], dificultad: 5, area: 'Especializante' },
    { id: 'I8057', nombre: 'Probabilidad y estadística', semestre: 4, creditos: 8, prerrequisitos: ['I8056'], dificultad: 3, area: 'Básica' },
    { id: 'IL348', nombre: 'Métodos numéricos', semestre: 4, creditos: 8, prerrequisitos: ['IL347'], dificultad: 4, area: 'Especializante' },
    { id: 'IL365', nombre: 'Arquitectura de computadoras', semestre: 4, creditos: 8, prerrequisitos: ['IL346'], dificultad: 4, area: 'Especializante' },
    { id: 'IL362', nombre: 'Programación para Internet', semestre: 4, creditos: 7, prerrequisitos: ['IL363'], dificultad: 3, area: 'Especializante' },
    { id: 'IL350', nombre: 'Liderazgo y emprendimiento', semestre: 4, creditos: 7, prerrequisitos: ['IL349'], dificultad: 2, area: 'Especializante' },

    // --- SEMESTRE V ---
    { id: 'IL355', nombre: 'Análisis de algoritmos', semestre: 5, creditos: 8, prerrequisitos: ['IL354'], dificultad: 5, area: 'Especializante' },
    { id: 'IL356', nombre: 'Bases de datos', semestre: 5, creditos: 10, prerrequisitos: [], dificultad: 4, area: 'Especializante' },
    { id: 'IL366', nombre: 'Sistemas Operativos', semestre: 5, creditos: 10, prerrequisitos: ['IL365'], dificultad: 5, area: 'Especializante' },
    { id: 'IL361', nombre: 'Fundamentos de Inteligencia artificial', semestre: 5, creditos: 8, prerrequisitos: ['IL348'], dificultad: 4, area: 'Especializante' },
    { id: 'IL364', nombre: 'Redes de computadoras', semestre: 5, creditos: 8, prerrequisitos: [], dificultad: 4, area: 'Especializante' },
    { id: 'IL369', nombre: 'Seminario de integración Protocolo', semestre: 5, creditos: 4, prerrequisitos: ['IL350'], dificultad: 2, area: 'Básica' },

    // --- SEMESTRE VI ---
    { id: 'IL351', nombre: 'Innovación tecnológica', semestre: 6, creditos: 8, prerrequisitos: ['IL355'], dificultad: 3, area: 'Especializante' },
    { id: 'IL367', nombre: 'Interacción humano computadora', semestre: 6, creditos: 8, prerrequisitos: ['IL356'], dificultad: 3, area: 'Especializante' },
    { id: 'CB224', nombre: 'Ingeniería de software', semestre: 6, creditos: 8, prerrequisitos: ['IL366'], dificultad: 4, area: 'Especializante' },
    { id: 'IL358', nombre: 'Programación de bajo nivel', semestre: 6, creditos: 8, prerrequisitos: ['IL361'], dificultad: 5, area: 'Egreso' },
    { id: 'IL390', nombre: 'UA 1 Optativa', semestre: 6, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Optativa' },

    // --- SEMESTRE VII ---
    { id: 'IL357', nombre: 'Teoría de la computación', semestre: 7, creditos: 8, prerrequisitos: ['IL351'], dificultad: 5, area: 'Especializante' },
    { id: 'IL370', nombre: 'Seminario de Integración Desarrollo', semestre: 7, creditos: 6, prerrequisitos: ['IL367'], dificultad: 4, area: 'Especializante' },
    { id: 'IL374', nombre: 'Laboratorio Abierto: Diseño', semestre: 7, creditos: 7, prerrequisitos: ['CB224'], dificultad: 4, area: 'Especializante' },
    { id: 'IL391', nombre: 'UA 2 Optativa', semestre: 7, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Optativa' },
    { id: 'IL387', nombre: 'UA 1 Selectiva', semestre: 7, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Selectiva' },

    // --- SEMESTRE VIII ---
    { id: 'IL359', nombre: 'Compiladores', semestre: 8, creditos: 8, prerrequisitos: ['IL357'], dificultad: 5, area: 'Especializante' },
    { id: 'IL368', nombre: 'Seguridad en la información', semestre: 8, creditos: 8, prerrequisitos: ['IL370'], dificultad: 4, area: 'Egreso' },
    { id: 'IL373', nombre: 'Laboratorio Abierto: Construcción', semestre: 8, creditos: 7, prerrequisitos: ['IL374'], dificultad: 4, area: 'Especializante' },
    { id: 'IL392', nombre: 'UA 3 Optativa', semestre: 8, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Optativa' },
    { id: 'IL388', nombre: 'UA 2 Selectiva', semestre: 8, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Selectiva' },

    // --- SEMESTRE IX ---
    { id: 'IL360', nombre: 'Programación paralela y concurrente', semestre: 9, creditos: 8, prerrequisitos: ['IL359'], dificultad: 5, area: 'Egreso' },
    { id: 'IL371', nombre: 'Seminario de integración Comunicación', semestre: 9, creditos: 4, prerrequisitos: ['IL368'], dificultad: 3, area: 'Egreso' },
    { id: 'IL372', nombre: 'Laboratorio Abierto: Prueba', semestre: 9, creditos: 7, prerrequisitos: ['IL373'], dificultad: 4, area: 'Especializante' },
    { id: 'IL389', nombre: 'UA 3 Selectiva', semestre: 9, creditos: 8, prerrequisitos: [], dificultad: 3, area: 'Selectiva' }
];