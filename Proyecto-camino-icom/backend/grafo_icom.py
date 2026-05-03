# grafo_icom.py

MALLA = {
    # --- SEMESTRE I ---
    "I5288": {"nombre": "Fundamentos de la programación", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 1},
    "I5247": {"nombre": "Lógica Matemática", "creditos": 8, "prerrequisitos": [], "dificultad": 4, "semestre_base": 1},
    "IG738": {"nombre": "Precálculo", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 1},
    "IL340": {"nombre": "Fundamentos de física", "creditos": 8, "prerrequisitos": [], "dificultad": 4, "semestre_base": 1},
    "IL342": {"nombre": "Introducción a la ingeniería", "creditos": 8, "prerrequisitos": [], "dificultad": 1, "semestre_base": 1},
    "IL341": {"nombre": "Ética y Legislación", "creditos": 8, "prerrequisitos": [], "dificultad": 2, "semestre_base": 1},

    # --- SEMESTRE II ---
    "IL352": {"nombre": "Programación estructurada", "creditos": 10, "prerrequisitos": ["I5288"], "dificultad": 4, "semestre_base": 2},
    "IL345": {"nombre": "Matemáticas discretas", "creditos": 8, "prerrequisitos": ["I5247"], "dificultad": 4, "semestre_base": 2},
    "IL344": {"nombre": "Cálculo diferencial e integral", "creditos": 9, "prerrequisitos": ["IG738"], "dificultad": 5, "semestre_base": 2},
    "IL343": {"nombre": "Mecánica", "creditos": 8, "prerrequisitos": ["IL340"], "dificultad": 4, "semestre_base": 2},
    "IL353": {"nombre": "Administración de proyectos tecnológicos", "creditos": 8, "prerrequisitos": ["IL342"], "dificultad": 2, "semestre_base": 2},
    "LI251": {"nombre": "Expresión oral y escrita", "creditos": 6, "prerrequisitos": ["IL341"], "dificultad": 2, "semestre_base": 2},

    # --- SEMESTRE III ---
    "I5289": {"nombre": "Programación Orientada a Objetos", "creditos": 8, "prerrequisitos": ["IL352"], "dificultad": 3, "semestre_base": 3},
    "I8056": {"nombre": "Álgebra Lineal", "creditos": 8, "prerrequisitos": ["IL345"], "dificultad": 4, "semestre_base": 3},
    "IL347": {"nombre": "Ecuaciones diferenciales", "creditos": 8, "prerrequisitos": ["IL344"], "dificultad": 4, "semestre_base": 3},
    "IL346": {"nombre": "Circuitos Electrónicos y Electromagnetismo", "creditos": 8, "prerrequisitos": ["IL343"], "dificultad": 4, "semestre_base": 3},
    "IL363": {"nombre": "Sistemas digitales", "creditos": 8, "prerrequisitos": ["IL353"], "dificultad": 3, "semestre_base": 3},
    "IL349": {"nombre": "Administración", "creditos": 8, "prerrequisitos": ["LI251"], "dificultad": 2, "semestre_base": 3},

    # --- SEMESTRE IV ---
    "IL354": {"nombre": "Estructuras de datos", "creditos": 10, "prerrequisitos": ["I5289"], "dificultad": 5, "semestre_base": 4},
    "I8057": {"nombre": "Probabilidad y estadística", "creditos": 8, "prerrequisitos": ["I8056"], "dificultad": 3, "semestre_base": 4},
    "IL348": {"nombre": "Métodos numéricos", "creditos": 8, "prerrequisitos": ["IL347"], "dificultad": 4, "semestre_base": 4},
    "IL365": {"nombre": "Arquitectura de computadoras", "creditos": 8, "prerrequisitos": ["IL346"], "dificultad": 4, "semestre_base": 4},
    "IL362": {"nombre": "Programación para Internet", "creditos": 7, "prerrequisitos": ["IL363"], "dificultad": 3, "semestre_base": 4},
    "IL350": {"nombre": "Liderazgo y emprendimiento", "creditos": 7, "prerrequisitos": ["IL349"], "dificultad": 2, "semestre_base": 4},

    # --- SEMESTRE V ---
    "IL355": {"nombre": "Análisis de algoritmos", "creditos": 8, "prerrequisitos": ["IL354"], "dificultad": 5, "semestre_base": 5},
    "IL356": {"nombre": "Bases de datos", "creditos": 10, "prerrequisitos": [], "dificultad": 4, "semestre_base": 5},
    "IL366": {"nombre": "Sistemas Operativos", "creditos": 10, "prerrequisitos": ["IL365"], "dificultad": 5, "semestre_base": 5},
    "IL361": {"nombre": "Fundamentos de Inteligencia artificial", "creditos": 8, "prerrequisitos": ["IL348"], "dificultad": 4, "semestre_base": 5},
    "IL364": {"nombre": "Redes de computadoras", "creditos": 8, "prerrequisitos": [], "dificultad": 4, "semestre_base": 5},
    "IL369": {"nombre": "Seminario de integración Protocolo", "creditos": 4, "prerrequisitos": ["IL350"], "dificultad": 2, "semestre_base": 5},

    # --- SEMESTRE VI ---
    "IL351": {"nombre": "Innovación tecnológica", "creditos": 8, "prerrequisitos": ["IL355"], "dificultad": 3, "semestre_base": 6},
    "IL367": {"nombre": "Interacción humano computadora", "creditos": 8, "prerrequisitos": ["IL356"], "dificultad": 3, "semestre_base": 6},
    "CB224": {"nombre": "Ingeniería de software", "creditos": 8, "prerrequisitos": ["IL366"], "dificultad": 4, "semestre_base": 6},
    "IL358": {"nombre": "Programación de bajo nivel", "creditos": 8, "prerrequisitos": ["IL361"], "dificultad": 5, "semestre_base": 6},
    "IL390": {"nombre": "UA 1 Optativa", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 6},

    # --- SEMESTRE VII ---
    "IL357": {"nombre": "Teoría de la computación", "creditos": 8, "prerrequisitos": ["IL351"], "dificultad": 5, "semestre_base": 7},
    "IL370": {"nombre": "Seminario de Integración Desarrollo", "creditos": 6, "prerrequisitos": ["IL367"], "dificultad": 4, "semestre_base": 7},
    "IL374": {"nombre": "Laboratorio Abierto: Diseño", "creditos": 7, "prerrequisitos": ["CB224"], "dificultad": 4, "semestre_base": 7},
    "IL391": {"nombre": "UA 2 Optativa", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 7},
    "IL387": {"nombre": "UA 1 Selectiva", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 7},

    # --- SEMESTRE VIII ---
    "IL359": {"nombre": "Compiladores", "creditos": 8, "prerrequisitos": ["IL357"], "dificultad": 5, "semestre_base": 8},
    "IL368": {"nombre": "Seguridad en la información", "creditos": 8, "prerrequisitos": ["IL370"], "dificultad": 4, "semestre_base": 8},
    "IL373": {"nombre": "Laboratorio Abierto: Construcción", "creditos": 7, "prerrequisitos": ["IL374"], "dificultad": 4, "semestre_base": 8},
    "IL392": {"nombre": "UA 3 Optativa", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 8},
    "IL388": {"nombre": "UA 2 Selectiva", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 8},

    # --- SEMESTRE IX ---
    "IL360": {"nombre": "Programación paralela y concurrente", "creditos": 8, "prerrequisitos": ["IL359"], "dificultad": 5, "semestre_base": 9},
    "IL371": {"nombre": "Seminario de integración Comunicación", "creditos": 4, "prerrequisitos": ["IL368"], "dificultad": 3, "semestre_base": 9},
    "IL372": {"nombre": "Laboratorio Abierto: Prueba", "creditos": 7, "prerrequisitos": ["IL373"], "dificultad": 4, "semestre_base": 9},
    "IL389": {"nombre": "UA 3 Selectiva", "creditos": 8, "prerrequisitos": [], "dificultad": 3, "semestre_base": 9}
}