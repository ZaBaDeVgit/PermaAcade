window.AcademyContent = {
    colorStyles: {
        cyan: {
            badge: "bg-cyan-500/20 text-cyan-400",
            accentText: "text-cyan-400",
            accentBorder: "hover:border-cyan-500/50",
            button: "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
        },
        emerald: {
            badge: "bg-emerald-500/20 text-emerald-400",
            accentText: "text-emerald-400",
            accentBorder: "hover:border-emerald-500/50",
            button: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
        },
        blue: {
            badge: "bg-blue-500/20 text-blue-400",
            accentText: "text-blue-400",
            accentBorder: "hover:border-blue-500/50",
            button: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
        },
        purple: {
            badge: "bg-purple-500/20 text-purple-400",
            accentText: "text-purple-400",
            accentBorder: "hover:border-purple-500/50",
            button: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
        },
        amber: {
            badge: "bg-amber-500/20 text-amber-400",
            accentText: "text-amber-400",
            accentBorder: "hover:border-amber-500/50",
            button: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
        },
        rose: {
            badge: "bg-rose-500/20 text-rose-400",
            accentText: "text-rose-400",
            accentBorder: "hover:border-rose-500/50",
            button: "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
        },
        teal: {
            badge: "bg-teal-500/20 text-teal-400",
            accentText: "text-teal-400",
            accentBorder: "hover:border-teal-500/50",
            button: "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
        },
        indigo: {
            badge: "bg-indigo-500/20 text-indigo-400",
            accentText: "text-indigo-400",
            accentBorder: "hover:border-indigo-500/50",
            button: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
        },
        pink: {
            badge: "bg-pink-500/20 text-pink-400",
            accentText: "text-pink-400",
            accentBorder: "hover:border-pink-500/50",
            button: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
        },
        red: {
            badge: "bg-red-500/20 text-red-400",
            accentText: "text-red-400",
            accentBorder: "hover:border-red-500/50",
            button: "bg-red-500/20 text-red-400 hover:bg-red-500/30"
        },
        orange: {
            badge: "bg-orange-500/20 text-orange-400",
            accentText: "text-orange-400",
            accentBorder: "hover:border-orange-500/50",
            button: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
        },
        fuchsia: {
            badge: "bg-fuchsia-500/20 text-fuchsia-400",
            accentText: "text-fuchsia-400",
            accentBorder: "hover:border-fuchsia-500/50",
            button: "bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30"
        }
    },
    videoPosters: {
        cyan: "linear-gradient(135deg, rgba(8, 145, 178, 0.9), rgba(6, 182, 212, 0.7))",
        emerald: "linear-gradient(135deg, rgba(5, 150, 105, 0.9), rgba(34, 197, 94, 0.7))",
        blue: "linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(59, 130, 246, 0.7))",
        purple: "linear-gradient(135deg, rgba(126, 34, 206, 0.9), rgba(167, 139, 250, 0.7))",
        amber: "linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(245, 158, 11, 0.7))",
        rose: "linear-gradient(135deg, rgba(219, 39, 119, 0.9), rgba(244, 63, 94, 0.7))",
        teal: "linear-gradient(135deg, rgba(3, 105, 161, 0.9), rgba(14, 165, 233, 0.7))",
        indigo: "linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(99, 102, 241, 0.7))",
        pink: "linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(251, 113, 133, 0.7))",
        red: "linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(248, 113, 113, 0.7))",
        orange: "linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(251, 191, 36, 0.7))",
        fuchsia: "linear-gradient(135deg, rgba(192, 38, 211, 0.9), rgba(236, 72, 153, 0.7))"
    },
    topics: [
        { id: "topic_01_constitucion", number: 1, title: "Constitución Española 1978", desc: "Texto completo y estructura constitucional", color: "cyan", pdf: "pdfs/01_constitucion.pdf" },
        { id: "topic_02_defensa_nacional", number: 2, title: "Ley Orgánica 5/2005", desc: "Defensa Nacional y principios constitucionales", color: "emerald", pdf: "pdfs/02_ley_defensa_nacional.pdf" },
        { id: "topic_03_tropa_marineria", number: 3, title: "Ley 8/2006", desc: "Tropa y Marinería", color: "blue", pdf: "pdfs/03_ley_tropa_marineria.pdf" },
        { id: "topic_04_ministerio_defensa", number: 4, title: "RD 205/2024", desc: "Estructura orgánica del Ministerio de Defensa", color: "purple", pdf: "pdfs/04_real_decreto_205_2024_ministerio_defensa.pdf" },
        { id: "topic_05_carrera_militar", number: 5, title: "Ley 39/2007", desc: "Carrera Militar", color: "amber", pdf: "pdfs/06_ley_39_2007_carrera_militar.pdf" },
        { id: "topic_06_reales_ordenanzas", number: 6, title: "Reales Ordenanzas FAS", desc: "RD 96/2009 y valores militares", color: "rose", pdf: "pdfs/07_reales_ordenanzas_fas.pdf" },
        { id: "topic_07_derechos_deberes", number: 7, title: "LO 9/2011", desc: "Derechos y deberes de los miembros de las FAS", color: "teal", pdf: "pdfs/08_ley_organica_9_2011_derechos_deberes_fas.pdf" },
        { id: "topic_08_disciplinario", number: 8, title: "LO 8/2014", desc: "Régimen disciplinario de las FAS", color: "indigo", pdf: "pdfs/09_ley_organica_8_2014_regimen_disciplinario_fas.pdf" },
        { id: "topic_09_seguridad_nacional", number: 9, title: "Ley 36/2015", desc: "Seguridad Nacional", color: "pink", pdf: "pdfs/10_ley_36_2015_seguridad_nacional.pdf" },
        { id: "topic_10_rjsp", number: 10, title: "Ley 40/2015", desc: "Régimen Jurídico del Sector Público", color: "cyan", pdf: "pdfs/11_ley_40_2015_regimen_juridico.pdf" },
        { id: "topic_11_org_fas", number: 11, title: "RD 521/2020", desc: "Organización básica de las FAS", color: "emerald", pdf: "pdfs/12_real_decreto_521_2020_organizacion_basica_fas.pdf" },
        { id: "topic_12_igualdad", number: 12, title: "LO 3/2007", desc: "Igualdad efectiva entre mujeres y hombres", color: "blue", pdf: "pdfs/13_ley_organica_3_2007_igualdad.pdf" },
        { id: "topic_13_quejas", number: 13, title: "RD 176/2014", desc: "Tramitación de iniciativas y quejas", color: "purple", pdf: "pdfs/14_real_decreto_176_2014_iniciativas_quejas.pdf" },
        { id: "topic_14_pac", number: 14, title: "Ley 39/2015", desc: "Procedimiento Administrativo Común", color: "amber", pdf: "pdfs/15_ley_39_2015_procedimiento_administrativo.pdf" },
        { id: "topic_15_observatorio", number: 15, title: "Orden DEF/111/2019", desc: "Observatorio Militar para la Igualdad", color: "rose", pdf: "pdfs/16_orden_def_111_2019_observatorio_igualdad.pdf" },
        { id: "topic_16_estrategia_sn", number: 16, title: "RD 1150/2021", desc: "Estrategia de Seguridad Nacional 2021", color: "teal", pdf: "pdfs/17_real_decreto_1150_2021_estrategia_seguridad.pdf" },
        { id: "topic_17_emad", number: 17, title: "Instrucción 55/2021", desc: "Organización del EMAD", color: "indigo", pdf: "pdfs/18_instruccion_55_2021_organizacion_emad.pdf" },
        { id: "topic_18_ejercito_tierra", number: 18, title: "Instrucción 14/2021", desc: "Organización del Ejército de Tierra", color: "pink", pdf: "pdfs/19_instruccion_14_2021_organizacion_ejercito_tierra.pdf" },
        { id: "topic_19_armada", number: 19, title: "Instrucción 15/2021", desc: "Organización de la Armada", color: "cyan", pdf: "pdfs/20_instruccion_15_2021_organizacion_armada.pdf" },
        { id: "topic_20_ejercito_aire", number: 20, title: "Instrucción 6/2025", desc: "Organización del Ejército del Aire y del Espacio", color: "emerald", pdf: "pdfs/21_instruccion_6_2025_organizacion_ea.pdf" }
    ],
    videos: [
        { id: "video_b1_t1_001", group: "B1-T1", groupTitle: "B1-T1: Constitución Española", archivo: "videos/B1_T1_001_Constitucion_1978.mp4", titulo: "La Constitución de 1978", desc: "Explicación de los puntos clave de la Constitución Española", color: "rose" },
        { id: "video_b1_t1_002", group: "B1-T1", groupTitle: "B1-T1: Constitución Española", archivo: "videos/B1_T1_002_Organizacion_Estado.mp4", titulo: "Organización del Estado Español", desc: "Estructura política y territorial del Estado", color: "amber" },
        { id: "video_b1_t2_001", group: "B1-T2", groupTitle: "B1-T2: Ley Orgánica 5/2005", archivo: "videos/B1_T2_FAS_y_su_papel_en_la_vida_civil.mp4", titulo: "Las FAS y su papel en la vida civil", desc: "Contexto y alcance de las Fuerzas Armadas dentro de la Defensa Nacional", color: "emerald" },
        { id: "video_b1_t2_002", group: "B1-T2", groupTitle: "B1-T2: Ley Orgánica 5/2005", archivo: "videos/B1_T2_Ley_de_Defensa_Nacional_5_2005.mp4", titulo: "Ley de Defensa Nacional 5/2005", desc: "Ley de Defensa Nacional 5/2005", color: "amber" }
    ],
    podcasts: [
        { id: "podcast_b1_t1_003", title: "B1-T1: Las tripas de la Constitución", desc: "Resumen sonoro del bloque constitucional", duration: "15:30", color: "cyan", archivo: "audios/B1_T1_003_Tripas_Constitucion.m4a" },
        { id: "podcast_b1_t1_004", title: "B1-T1: Arquitectura del Poder", desc: "Separación de poderes y estructura estatal", duration: "12:45", color: "emerald", archivo: "audios/B1_T1_004_Arquitectura_Poder.m4a" },
        { id: "podcast_b1_t1_005", title: "B1-T1: Arquitectura de Supervivencia", desc: "Análisis constitucional avanzado", duration: "18:20", color: "blue", archivo: "audios/B1_T1_005_Arquitectura_Supervivencia.m4a" },
        { id: "podcast_b1_t2_001", title: "B1-T2: Claves de la Ley de Defensa Nacional", desc: "Resumen sonoro de los principios y la estructura básica de la Defensa Nacional", duration: "16:00", color: "purple", archivo: "audios/B1_T2_Claves_de_la_Ley_de_Defensa_Nacional.m4a" },
        { id: "podcast_b1_t2_002", title: "B1-T2: ¿Ejército humanitario o fuerza letal del Estado?", desc: "Reflexión guiada sobre la misión dual de las Fuerzas Armadas", duration: "14:30", color: "rose", archivo: "audios/B1_T2_¿Ejército_humanitario_o_fuerza_letal_del_Estado_.m4a" }
    ],
    readings: [
        { id: "reading_b1_t1_mapa_png", groupTitle: "B1-T1: Constitución Española", archivo: "Resumen_Mapas/B1_T1_Mapa_Bloque1_Tema1.png", titulo: "Mapa: Temas constitucionales", desc: "Infografía del bloque 1", color: "purple", type: "PNG" },
        { id: "reading_b1_t1_mapa_pdf", groupTitle: "B1-T1: Constitución Española", archivo: "Resumen_Mapas/B1_T1_Mapa_Arquitectura_Constitucional.pdf", titulo: "Mapa: Arquitectura constitucional", desc: "Esquema visual de la Constitución", color: "pink", type: "PDF" },
        { id: "reading_b1_t2_mapa_pdf", groupTitle: "B1-T2: Ley Orgánica 5/2005", archivo: "Resumen_Mapas/B1_T2_Mapa_LeyDefensaNacional.pdf", titulo: "Mapa: Ley de Defensa Nacional", desc: "Resumen visual de la Ley Orgánica 5/2005 y sus ejes principales", color: "emerald", type: "PDF" },
        { id: "reading_b1_t2_arquitectura", groupTitle: "B1-T2: Ley Orgánica 5/2005", archivo: "Resumen_Mapas/B1_T2_Arquitectura_de_la_Defensa_Nacional.pdf", titulo: "Arquitectura de la Defensa Nacional", desc: "Esquema interactivo para ubicar los elementos de la defensa del Estado", color: "teal", type: "PDF" }
    ],
    presentations: [
        {
            id: "presentation_constitucion_1978",
            groupTitle: "Presentaciones",
            archivo: "slider/Constitución Española de 1978.pptx",
            titulo: "Constitución Española de 1978",
            desc: "Presentación base para repasar la estructura y los principios esenciales de la Constitución.",
            color: "cyan",
            type: "PPTX"
        },
        {
            id: "presentation_constitucion_1978_mission",
            groupTitle: "Presentaciones",
            archivo: "slider/B1_T1 Constitutional_Mission_1978.pptx",
            titulo: "Constitutional Mission 1978",
            desc: "Análisis de la misión constitucional y los valores superiores del ordenamiento jurídico.",
            color: "blue",
            type: "PPTX"
        },
        {
            id: "presentation_ley_defensa_nacional",
            groupTitle: "Presentaciones",
            archivo: "slider/Ley Orgánica 5_2005 de Defensa Nacional.pptx",
            titulo: "Ley Orgánica 5/2005 de Defensa Nacional",
            desc: "Presentación de apoyo para repasar la organización, principios y finalidad de la Defensa Nacional.",
            color: "emerald",
            type: "PPTX"
        }
    ],
    esquemas: [
        {
            id: "esquema_b1_t1_html",
            group: "B1-T1",
            groupTitle: "B1-T1: Constitución Española",
            archivo: "esquemas/B1_T1_Esquema.html",
            titulo: "Esquema Interactivo: Constitución 1978",
            desc: "Mapa conceptual desplegable para el estudio de la estructura constitucional.",
            color: "cyan",
            type: "HTML"
        }
    ],
    infografias: [
        {
            id: "infografia_b1_t1_g1",
            group: "B1-T1",
            groupTitle: "B1-T1: Constitución Española",
            archivo: "Infografias/Guia 1 B1_T1.pdf",
            titulo: "Guía Visual 1: Bloque 1 Tema 1",
            desc: "Infografía técnica sobre los conceptos fundamentales del Tema 1.",
            color: "purple",
            type: "PDF"
        },
        {
            id: "infografia_b1_t1_g2",
            group: "B1-T1",
            groupTitle: "B1-T1: Constitución Española",
            archivo: "Infografias/Guia 2 B1_T1.pdf",
            titulo: "Guía Visual 2: Bloque 1 Tema 1",
            desc: "Resumen gráfico avanzado para el repaso rápido del tema.",
            color: "indigo",
            type: "PDF"
        }
    ],
    organigrams: [
        {
            id: "ministerio",
            category: "ministerio",
            title: "Ministerio de Defensa y Estado Mayor de la Defensa",
            description: "El Rey ejerce el mando supremo como Capitán General y el Ministerio de Defensa articula la política militar, mientras el Estado Mayor de la Defensa (EMAD) coordina la Fuerza Conjunta, el Mando de Operaciones, el Centro de Inteligencia (CIFAS), el Mando Conjunto del Ciberespacio y el CESEDEN.",
            legend: [
                "Capitán General (Rey) → mando supremo",
                "Ministro de Defensa → dirección política y relaciones con la UE/OTAN",
                "JEMAD → mando operativo y preparación de la Fuerza Conjunta",
                "EMAD → cuartel general, Mando de Operaciones, inteligencia y ciberespacio"
            ],
            tree: [
                {
                    name: "Capitán General",
                    role: "El Rey de España encarna el mando supremo de las Fuerzas Armadas",
                    children: [
                        {
                            name: "Ministro de Defensa",
                            role: "Dirige la política de defensa, la dirección económica y las relaciones internacionales",
                            children: [
                                {
                                    name: "Estado Mayor de la Defensa (EMAD)",
                                    role: "Planifica, dirige y controla la ejecución de las operaciones conjuntas y la preparación de la Fuerza",
                                    notes: "Incluye el Cuartel General (CGEMAD), el Mando de Operaciones (MOPS), el CIFAS, el Mando Conjunto del Ciberespacio y el CESEDEN.",
                                    children: [
                                        {
                                            name: "Cuartel General del EMAD",
                                            role: "Dirección estratégica y coordinación diaria",
                                            children: [
                                                { name: "División de Planes", role: "Diseño de operaciones y campañas" },
                                                { name: "División de Inteligencia", role: "Análisis y vigilancia estratégica" }
                                            ]
                                        },
                                        {
                                            name: "Mando de Operaciones",
                                            role: "Conduce las operaciones conjuntas nacionales e internacionales",
                                            children: [
                                                { name: "Comando de Operaciones Conjuntas", role: "Órgano de ejecución directa" },
                                                { name: "Comando de la Marina", role: "Operaciones marítimas interarmas" }
                                            ]
                                        },
                                        { name: "Centro de Inteligencia de las Fuerzas Armadas (CIFAS)", role: "Soporte de inteligencia estratégica y operativa" },
                                        { name: "Mando Conjunto del Ciberespacio", role: "Defensa y operaciones en el dominio digital" },
                                        { name: "CESEDEN", role: "Centro Superior de Estudios de la Defensa Nacional" }
                                    ]
                                },
                                { name: "Secretaría de Estado de Defensa", role: "Gestión presupuestaria, armamento y compras" },
                                { name: "Dirección General de Política de Defensa", role: "Homologa planes nacionales con la política europea" },
                                { name: "Subsecretaría de Defensa", role: "Presupuestos, recursos humanos y logística del Ministerio" },
                                { name: "Secretaría General Técnica", role: "Normativa, archivos y publicación del BOE" }
                            ]
                        }
                    ]
                }
            ],
            color: "cyan",
            resources: [
                { label: "EMAD - Estructura del Estado Mayor", url: "https://emad.defensa.gob.es/emad/estructura_cg_emad/" },
                { label: "Organigrama Ministerio de Defensa", url: "https://www.defensa.gob.es/ministerio/organigrama/index.html" }
            ]
        },
        {
            id: "ejercito_tierra",
            category: "tierra",
            title: "Ejército de Tierra",
            description: "La Orden DEF/708/2020 y la Instrucción 14/2021 fijan una estructura centrada en el JEME, el Cuartel General de Alta Disponibilidad, la Fuerza Terrestre y los mandos insulares, apoyados por los mandos de apoyo y personal.",
            legend: [
                "JEME → jefe del Ejército de Tierra",
                "Cuartel General Terrestre de Alta Disponibilidad → brigadas listas para despliegues rápidos",
                "Fuerza Terrestre → brigadas de combate, caballería y apoyo",
                "Mando de Canarias → control de unidades en Canarias, Ceuta y Melilla"
            ],
            tree: [
                {
                    name: "Jefe Estado Mayor del Ejército de Tierra (JEME)",
                    role: "Dirige la generación, preparación y uso de las capacidades terrestres",
                    children: [
                        {
                            name: "Cuartel General Terrestre de Alta Disponibilidad",
                            role: "Activa las brigadas listas para operaciones relámpago",
                            notes: "Incluye divisiones y brigadas con capacidad de despliegue inmediato."
                        },
                        {
                            name: "Fuerza Terrestre",
                            role: "Agrupa brigadas de combate, caballería, artillería, ingeniería y logística",
                            children: [
                                {
                                    name: "Brigada 'Aragón' I",
                                    role: "Multipropósito desde Zaragoza con capacidad expedicionaria",
                                    children: [
                                        { name: "Grupo de Caballería Villaviciosa", role: "Escuadra acorazada y carros Leopard" },
                                        { name: "Batallón de Infantería Mecanizada 'Zaragoza'", role: "Infantería mecanizada con BMR" }
                                    ]
                                },
                                {
                                    name: "Brigada 'Guadarrama' XII",
                                    role: "Blindada y mecanizada y centro de mando táctico",
                                    children: [
                                        { name: "Regimiento de Caballería 'España' 11", role: "Carros Leopardo 2E" },
                                        { name: "Regimiento de Infantería 'Inmemorial del Rey' 1", role: "Infantería acorazada y pasos rápidos" }
                                    ]
                                },
                                {
                                    name: "Brigada 'Canarias' 45",
                                    role: "Unidad ligera de proyección atlántica",
                                    children: [
                                        { name: "Batallón de Infantería Ligera GACA", role: "Defensa territorial y patrulla costera" },
                                        { name: "Batallón de Zapadores", role: "Ingeniería y fortificación insular" },
                                        { name: "Grupo de Artillería Antiaérea Canario", role: "Cobertura antiaérea regional" }
                                    ]
                                },
                                { name: "Brigada 'Extremadura' XI", role: "Fuerza motorizada para operaciones en el oeste peninsular" },
                                { name: "Brigada 'Galicia' (BRILAT)", role: "Brigada Ligera de Infantería transportable" },
                                { name: "Agrupación de Apoyo Logístico", role: "Suministro, mantenimiento y salud" }
                            ]
                        },
                        {
                            name: "Mando de Canarias (MCANA)",
                            role: "Agrupa Comandancias de Ceuta, Melilla y Baleares y protege el Atlántico Sur",
                            children: [
                                { name: "Comandancia General de Canarias", role: "Capacidades de defensa territorial en el archipiélago" }
                            ]
                        },
                        { name: "Mando de Apoyo a la Maniobra", role: "Artillería estratégica, ingenieros y transmisiones", notes: "Incluye el Regimiento de Ingenieros, el Regimiento de Transmisiones y los centros de mando logístico" },
                        {
                            name: "Mando de Personal",
                            role: "Carrera profesional, formación y bienestar",
                            notes: "Gestiona la plantilla profesional, la carrera de oficiales y suboficiales",
                            children: [
                                { name: "Servicio de Reclutamiento", role: "Procesamiento de altas y ascensos" },
                                { name: "Unidad de Desarrollo de Carrera", role: "Planes de promoción y movilidad" }
                            ]
                        },
                        {
                            name: "Mando de Adiestramiento y Doctrina",
                            role: "Define estándares de combate y adiestramiento táctico",
                            notes: "Coordina la Academia General Militar, la Escuela de Guerra y los centros de instrucción",
                            children: [
                                { name: "Centro de Operaciones Tácticas", role: "Simuladores y ejercicios de mando" },
                                { name: "Centro de Guerra Electrónica", role: "Formación en operaciones cibernéticas y EW" }
                            ]
                        },
                        {
                            name: "Mando de Apoyo Logístico (MALE)",
                            role: "Soporte de infraestructura, comunicaciones y transporte",
                            notes: "Incluye unidades de avituallamiento, hospitales y mantenimiento estratégico",
                            children: [
                                { name: "Regimiento de Transporte", role: "Moviliza los medios logísticos de la Fuerza" },
                                { name: "Centro de Mantenimiento", role: "Revisión de material acorazado y vehículos" }
                            ]
                        }
                    ]
                }
            ],
            color: "emerald",
            resources: [
                { label: "Estructura del Ejército de Tierra", url: "https://ejercito.defensa.gob.es/estructura/" },
                { label: "Instrucción 14/2021 y Orden DEF/708/2020", url: "https://www.reclutamiento.defensa.gob.es/Galerias/gabinete/ficheros_docs/2024/12/241210-Comparecencia_Comisixn_Mixta_Seguridad_Nacional.pdf" }
            ]
        },
        {
            id: "armada",
            category: "armada",
            title: "Armada Española",
            description: "Según la Orden DEF/707/2020 e Instrucción 15/2021, la Armada se organiza en torno al AJEMA, el Cuartel General, la Flota, la Infantería de Marina y el Mando de Apoyo Logístico.",
            legend: [
                "AJEMA → Almirante Jefe del Estado Mayor de la Armada",
                "Cuartel General → EMA, JESAT, tribunales y centros de estudio",
                "Fuerza de Acción Marítima → Flota operativa y Fuerzas de Acción Especial",
                "Mando de Apoyo → logística, personal y mantenimiento"
            ],
            tree: [
                {
                    name: "Almirante Jefe del Estado Mayor de la Armada (AJEMA)",
                    role: "Mando orgánico, operativo y de coordinación marítima",
                    children: [
                        {
                            name: "Cuartel General de la Armada (CGA)",
                            role: "Oficinas de apoyo, JESAT, IHCN y tribunal",
                            children: [
                                { name: "Estado Mayor de la Armada", role: "Planificación y apoyo del AJEMA" },
                                { name: "Gabinete y Asuntos Internacionales", role: "Relaciones y comunicación institucional" }
                            ]
                        },
                        {
                            name: "Fuerza de Acción Marítima",
                            role: "Flota con buques de superficie, submarinos y aeronaves embarcadas",
                            children: [
                                { name: "Flota", role: "Buques de superficie y submarinos de combate" },
                                { name: "Comandancia de Infantería de Marina", role: "Fuerza anfibia y fuerzas especiales del Tercio Norte y Sur" },
                                {
                                    name: "Mando de Operaciones Especiales",
                                    role: "Unidades de acción inmediata en escenarios globales",
                                    children: [
                                        { name: "Unidad de Buceadores de Combate", role: "Operaciones subacuáticas especiales" },
                                        { name: "Escuadrilla de Acción Marítima", role: "Fuerzas de asalto marítimo" }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "Infantería de Marina",
                            role: "Proyección anfibia y fuerzas especiales como el Tercio Norte y Sur",
                            children: [
                                { name: "Tercio de Armada", role: "Eje central de despliegue anfibio" },
                                { name: "Fuerzas de Guerra Naval Especial", role: "Operaciones especiales marítimas y de buceo" },
                                { name: "Grupo de Infantería de Marina", role: "Fuerzas esenciales para puertos y escoltas" },
                                { name: "Regimiento de Apoyo a la Infantería de Marina", role: "Logística, salud y transporte naval" }
                            ]
                        },
                        {
                            name: "Mando de Personal",
                            role: "Carrera naval y cuerpos comunes",
                            notes: "Gestiona las trayectorias profesionales y la promoción de oficiales y suboficiales",
                            children: [
                                { name: "Escuela Naval Militar", role: "Formación de guardiamarinas" },
                                { name: "Centro de Instrucción de Especialistas", role: "Profesionales técnicos y logísticos" }
                            ]
                        },
                        {
                            name: "Mando de Apoyo Logístico (JAL)",
                            role: "Infraestructura, mantenimiento y logística",
                            notes: "Incluye arsenal marítimo, hospitales y centros de mantenimiento",
                            children: [
                                { name: "Arsenal Militar de Ferrol", role: "Mantenimiento de electrónica y propulsión" },
                                { name: "Hospital Naval", role: "Cuidados sanitarios a la flota" }
                            ]
                        },
                        { name: "Mando de Operaciones", role: "Dirige despliegues extranjeros y operaciones de seguridad marítima" }
                    ]
                }
            ],
            color: "blue",
            resources: [
                { label: "Armada - Organización", url: "https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/conocenosorganizacion/prefLang-es/01organizacionarmada" }
            ]
        },
        {
            id: "aire",
            category: "aire",
            title: "Ejército del Aire y del Espacio",
            description: "El JEMA coordina el dominio aéreo y espacial, con el Cuartel General, la Fuerza Aeroespacial y un Mando del Espacio (MESPA) que vigila satélites y operaciones orbitales.",
            legend: [
                "JEMA → Jefe de Estado Mayor del Ejército del Aire y del Espacio",
                "Cuartel General → EMA y apoyo doctrinal",
                "Fuerza Aeroespacial → alas de caza, transporte y reconocimiento",
                "MESPA → vigilancia espacio-cibernética y soporte de operaciones ACE"
            ],
            tree: [
                {
                    name: "Jefe Estado Mayor del Ejército del Aire y del Espacio (JEMA)",
                    role: "Comanda la defensa aérea, espacial y la preparación de capacidades de vuelo",
                    children: [
                        {
                            name: "Cuartel General del Ejército del Aire y del Espacio",
                            role: "EMA, Gabinete y mandos de apoyo logístico y comunicación",
                            children: [
                                { name: "Estado Mayor del Ejército del Aire", role: "Soporte operativo y doctrinal" },
                                { name: "Mando del Apoyo a la Fuerza", role: "Logística, mantenimiento, formación y salud" }
                            ]
                        },
                        {
                            name: "Fuerza Aeroespacial",
                            role: "Agrupa alas y escuadrones de combate, transporte, helicópteros y apoyo aéreo",
                            children: [
                                { name: "Grupo de Mando y Control", role: "Vigilancia y control del espacio aéreo" },
                                { name: "Grupo de Defensa Antiaérea", role: "NASAMS, SAMP/T y artillería anti-aérea" },
                                { name: "Alas de Caza y Ataque", role: "Eurofighter, F-18 y futuras plataformas" },
                                { name: "Grupo de Transporte", role: "C-295, A400M y helicópteros de apoyo táctico" },
                                { name: "Brigada de Helicópteros", role: "Apoyo cercano, rescate y transporte de tropas" },
                                { name: "Escuadrón de Ravizamiento en Vuelo", role: "Aviones cisterna y punto logístico aéreo" }
                            ]
                        },
                        {
                            name: "Mando del Espacio (MESPA)",
                            role: "Operaciones espaciales: vigilancia, comunicaciones y resiliencia de satélites",
                            notes: "Incluye centros como CESAEROB, el Centro de Operaciones de Vigilancia Espacial (COVE) y el Centro de Satélites."
                        },
                        {
                            name: "Mando Operativo Aeroespacial",
                            role: "Coordina los mandos de operaciones aéreas, espaciales y ciberespaciales",
                            children: [
                                { name: "Escuadrón de Control del Tránsito Aéreo (EVA)", role: "Mando y control de vuelos militares" },
                                { name: "Mando de Defensa Antiaérea", role: "Sistemas NASAMS y artillería antiaérea" },
                                { name: "Centro de Operaciones de la Defensa Aérea", role: "Coordinación conjunta con la OTAN" },
                                { name: "Centro de Operaciones del Espacio", role: "Coopera con el mespa y satélites nacionales" }
                            ]
                        },
                        {
                            name: "Mando del Ciberespacio",
                            role: "Operaciones ofensivas y defensivas en la red",
                            notes: "Trabaja con el Mando Conjunto del Ciberespacio del EMAD"
                        }
                    ]
                }
            ],
            color: "purple",
            resources: [
                { label: "Ejército del Aire y del Espacio - Estructura", url: "https://ejercitodelaireydelespacio.defensa.gob.es/EA/ejercitodelaire/es/Aire-y-Espacio/Organizacion/" },
                { label: "Noticia MESPA y Eurofighter", url: "https://www.defensa.gob.es/gabinete/notasPrensa/2024/01/DGC-240108-visita-mando-espacio.html" }
            ]
        }
    ]
};
