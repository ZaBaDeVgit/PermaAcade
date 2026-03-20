// Tests para Academia Tropa Permanente - Temario Completo 2025
// Estructura: Bloque > Tema > Subtema

const testsData = {
    // ============================================
    // BLOQUE 1: ORGANIZACIÓN
    // ============================================
    
    // B1-T1: Constitución Española - Cortes
    b1_t1_cortes: {
        title: "B1-T1: Cortes Generales",
        questions: [
            { q: "¿Cuántos diputados tiene el Congreso de los Diputados?", options: ["350", "300", "400", "250"], correct: 0 },
            { q: "¿Cuántos senadores tiene el Senado?", options: ["266", "250", "300", "200"], correct: 0 },
            { q: "¿Cómo se elige el Congreso de los Diputados?", options: ["Sufragio universal", "Sufragio censitario", "Nombramiento real", "Elección autonómica"], correct: 0 },
            { q: "¿Qué Título de la Constitución regula las Cortes Generales?", options: ["Título III", "Título IV", "Título V", "Título VI"], correct: 0 },
            { q: "Las Cortes Generales están formadas por:", options: ["Congreso y Senado", "Congreso y Parlamento", "Senado y Dip. Provinciales", "Corte Suprema"], correct: 0 },
            { q: "¿Qué mayoría se necesita para aprobar una ley orgánica?", options: ["Mayoría absoluta del Congreso", "Mayoría simple", "Mayoría de 2/3", "Unánime"], correct: 0 },
            { q: "La iniciativa legislativa corresponde a:", options: ["Gobierno y Cortes Generales", "Solo al Gobierno", "Solo al Congreso", "Al Rey"], correct: 0 },
            { q: "Los diputados tienen inviolabilidad por:", options: ["Votos y opiniones en ejercicio", "Su vida privada", "Sus bienes", "Su familia"], correct: 0 },
            { q: "El sistema electoral español es:", options: ["Proporcional con circuns. provinciales", "Mayoritario", "Mixto", "Directo"], correct: 0 },
            { q: "¿Cuál es la barrera electoral en España?", options: ["3% en provincia", "5% nacional", "1%", "Ninguna"], correct: 0 },
            { q: "El voto en España es:", options: ["Universal, libre, igual, secreto y obligatorio", "Solo para algunos", "Opcional", "Por correo solo"], correct: 0 },
            { q: "¿Qué es el mandato representativo?", options: ["Los diputados representan a la Nación", "Solo a sus electores", "A su partido", "A nadie"], correct: 0 },
            { q: "¿Cada cuánto se celebran elecciones generales?", options: ["4 años", "5 años", "3 años", "2 años"], correct: 0 },
            { q: "¿Quién elige al Presidente del Gobierno?", options: ["El Congreso", "El Rey", "El Senado", "El pueblo"], correct: 0 },
            { q: "¿Qué es una comisión parlamentaria?", options: ["Órgano que prepara y vota leyes", "Solo informativo", "No existe", "Judicial"], correct: 0 },
            { q: "¿Qué es la cuestión de confianza?", options: ["Solicitud de respaldo al programa de gobierno", "Juicio político", "Recurso", "Censo"], correct: 0 },
            { q: "¿Quién puede presentar una moción de censura?", options: ["Al menos 1/10 de los diputados", "El Gobierno", "El Rey", "El Senado"], correct: 0 },
            { q: "Las sesiones parlamentarias pueden ser:", options: ["Ordinarias y extraordinarias", "Solo en Madrid", "Solo cuando quiere el Rey", "Mensuales"], correct: 0 },
            { q: "¿Qué función tiene el Congreso respecto al Gobierno?", options: ["Control político", "Nombrar ministros", "Dar licencias", "Ninguna"], correct: 0 },
            { q: "El Reglamento del Congreso lo aprueba:", options: ["El propio Congreso", "El Senado", "El Gobierno", "El Rey"], correct: 0 },
            { q: "¿Qué son los grupos Parlamentarios?", options: ["Agrupaciones de diputados por partido", "Comisiones", "Mesa del Congreso", "Ninguno"], correct: 0 },
            { q: "El Defensor del Pueblo es designado por:", options: ["Congreso y Senado", "El Gobierno", "El Rey", "El Tribunal Constitucional"], correct: 0 },
            { q: "El Tribunal de Cuentas depende de:", options: ["Las Cortes Generales", "El Gobierno", "El Rey", "Ministerio de Justicia"], correct: 0 },
            { q: "¿Qué son las Cortes Generales?", options: ["Órgano legislativo del Estado", "Órgano judicial", "Órgano ejecutivo", "Ninguno"], correct: 0 },
            { q: "El Congreso de los Diputados tiene:", options: ["Función legislativa y de control", "Solo función legislativa", "Solo control", "Ninguna"], correct: 0 },
            { q: "Según la Constitución, las Cortes Generales representan al:", options: ["Pueblo español", "Gobierno", "Poder judicial", "Senado exclusivamente"], correct: 0 },
            { q: "Las Cortes Generales ejercen la potestad:", options: ["Legislativa del Estado", "Judicial del Estado", "Reglamentaria autonómica", "Sancionadora militar"], correct: 0 },
            { q: "La Constitución configura a las Cortes Generales como unas Cámaras:", options: ["Bicamerales", "Unicamerales", "Consultivas", "Judiciales"], correct: 0 }
        ]
    },
    
    b1_t1_gobierno: {
        title: "B1-T1: El Gobierno",
        questions: [
            { q: "¿Qué Título de la Constitución regula el Gobierno?", options: ["Título IV", "Título III", "Título V", "Título VI"], correct: 0 },
            { q: "El Gobierno está compuesto por:", options: ["Presidente, Vicepresidentes y Ministros", "Rey, Presidente y Cortes", "Corte Suprema y Ministerios", "Jefatura y Consejo"], correct: 0 },
            { q: "El Rey nombra al Presidente del Gobierno:", options: ["A propuesta del Congreso", "Por elección popular", "A propuesta del Senado", "En Consejo de Estado"], correct: 0 },
            { q: "El Presidente del Gobierno puede ser destituido mediante:", options: ["Moción de censura", "Juicio político", "Enmienda", "Recurso"], correct: 0 },
            { q: "¿Qué es el Consejo de Ministros?", options: ["Órgano colegiado de gobierno", "Órgano consultivo", "Tribunal", "Ninguno"], correct: 0 },
            { q: "¿Quién preside el Consejo de Ministros?", options: ["El Presidente del Gobierno", "El Rey", "El Vicepresidente", "El más antiguo"], correct: 0 },
            { q: "Las atribuciones del Presidente incluyen:", options: ["Dirigir la política y la Administración", "Hacer leyes", "Juzgar", "Diplomacia"], correct: 0 },
            { q: "Los Ministros son nombrados por:", options: ["El Presidente", "El Congreso", "El Rey", "El Senado"], correct: 0 },
            { q: "¿Qué es la estructura ministerial?", options: ["Organización de los ministerios", "Solo ministerios", "Consejo de Estado", "Ninguna"], correct: 0 },
            { q: "Los Vicepresidentes dependen de:", options: ["El Presidente", "El Congreso", "El Rey", "El Senado"], correct: 0 },
            { q: "¿Qué es un Real Decreto?", options: ["Norma jurídica del Gobierno", "Ley del Congreso", "Reglamento del Senado", "Instrucción"], correct: 0 },
            { q: "El Presidente puede delegar funciones en:", options: ["Vicepresidentes y Ministros", "Empresarios", "Amigos", "Nadie"], correct: 0 },
            { q: "¿Qué es la política general del Gobierno?", options: ["Líneas de actuación del Ejecutivo", "Solo legislación", "Nombramientos", "Presupuestos"], correct: 0 },
            { q: "La disolución de las Cortes la decreta:", options: ["El Rey, a propuesta del Presidente", "El Congreso", "El pueblo", "El Tribunal"], correct: 0 },
            { q: "El nuevo Gobierno toma posesión ante:", options: ["El Rey", "El Congreso", "El Senado", "El Tribunal Supremo"], correct: 0 },
            { q: "¿Qué son las sesiones del Consejo de Ministros?", options: ["Reuniones semanales del gobierno", "Solo mensuales", "Anuales", "No hay"], correct: 0 },
            { q: "Los órganos superiores de la Administración General del Estado son:", options: ["Secretarios de Estado y subsecretarios", "Directores generales", "Jefes de servicio", "Ninguno"], correct: 0 },
            { q: "Los organismos autónomos dependen de:", options: ["Un Ministerio", "La UE", "Las CCAA", "El Banco de España"], correct: 0 },
            { q: "¿Qué son las empresas públicas?", options: ["Derecho privado con control público", "Solo derecho privado", "Solo público", "No existen"], correct: 0 },
            { q: "La organización ministerial puede establecerse por:", options: ["Real Decreto", "Constitución", "Ley orgánica", "Orden ministerial"], correct: 0 },
            { q: "¿Qué es la potestad reglamentaria?", options: ["Capacidad de crear normas secundarias", "Solo legislar", "Ninguna", "Ejecutar"], correct: 0 },
            { q: "El régimen de sesiones del Congreso incluye:", options: ["Sesiones ordinarias y extraordinarias", "Solo Madrid", "Solo cuando quiere", "Nunca"], correct: 0 },
            { q: "Las leyes de presupuestos las presenta:", options: ["El Gobierno", "El Congreso", "El Senado", "El Rey"], correct: 0 },
            { q: "¿Qué es la función ejecutiva?", options: ["Dirigir la Administración Pública", "Legislar", "Juzgar", "Controlar"], correct: 0 },
            { q: "El Gobierno responde ante:", options: ["El Congreso de los Diputados", "El Senado", "El Rey", "El Tribunal Constitucional"], correct: 0 },
            { q: "Según el artículo 97 de la Constitución, el Gobierno dirige la política:", options: ["Interior y exterior", "Solo interior", "Solo exterior", "Municipal"], correct: 0 },
            { q: "El Gobierno cesa tras la celebración de:", options: ["Elecciones generales", "Elecciones municipales", "Elecciones europeas", "Referéndums"], correct: 0 },
            { q: "Además del Presidente y los Ministros, la ley puede reconocer como miembros del Gobierno a:", options: ["Otros miembros", "Diputados autonómicos", "Magistrados", "Delegados provinciales"], correct: 0 }
        ]
    },
    
    b1_t1_territorial: {
        title: "B1-T1: Organización Territorial del Estado",
        questions: [
            { q: "¿Qué Título de la Constitución establece la organización territorial?", options: ["Título VIII", "Título III", "Título VI", "Título V"], correct: 0 },
            { q: "España se organiza territorialmente en:", options: ["Municipios, Provincias y CCAA", "Regiones y Provincias", "Estados y Regiones", "Departamentos"], correct: 0 },
            { q: "¿Cuántas Comunidades Autónomas tiene España?", options: ["17", "18", "16", "15"], correct: 0 },
            { q: "¿Cuántas provincias tiene España?", options: ["50", "48", "52", "47"], correct: 0 },
            { q: "Las Comunidades Autónomas tienen competencia en:", options: ["Educación, sanidad, servicios sociales", "Defensa, relaciones exteriores", "Justicia, aduanas", "Moneda, fronteras"], correct: 0 },
            { q: "El Estatuto de Autonomía es:", options: ["Norma institucional básica de cada CCAA", "General del Estado", "Suprema militar", "Orgánica"], correct: 0 },
            { q: "La potestad organizativa de las CCAA es:", options: ["Plena dentro de su territorio", "Limitada por el Estado", "Depende del Rey", "Requiere autorización"], correct: 0 },
            { q: "El principio de autonomía local garantiza:", options: ["Autonomía para gestionar intereses municipales", "Independencia total", "Solo grandes ciudades", "Ninguna"], correct: 0 },
            { q: "Las Ciudades Autónomas son:", options: ["Ceuta y Melilla", "Baleares y Canarias", "Madrid y Barcelona", "Ninguna"], correct: 0 },
            { q: "El territorio nacional incluye:", options: ["Península, islas y Ceuta y Melilla", "Solo la península", "Solo territorio peninsular", "Colonias"], correct: 0 },
            { q: "El mar territorial español tiene:", options: ["12 millas náuticas", "6 millas", "200 millas", "50 millas"], correct: 0 },
            { q: "La zona económica exclusiva de España abarca:", options: ["200 millas náuticas", "100 millas", "50 millas", "350 millas"], correct: 0 },
            { q: "El principio de solidaridad entre territorios significa:", options: ["Igualdad de derechos y obligaciones", "Solo obligaciones", "Que ricos ayudan a pobres", "Oprimir autonomías"], correct: 0 },
            { q: "¿Qué es la lealtad institucional?", options: ["Cooperación entre administraciones", "Competencia entre territorios", "Conflicto constante", "Dominio central"], correct: 0 },
            { q: "Los Cabildos Insulares existen en:", options: ["Canarias", "Baleares", "Ceuta y Melilla", "Península"], correct: 0 },
            { q: "Las Diputaciones Provinciales existen en:", options: ["Provincias peninsulares", "Islas", "CCAA uniprovinciales", "Ceuta y Melilla"], correct: 0 },
            { q: "El Fondo de Compensación Interterritorial apoya:", options: ["Territorios con menor desarrollo", "Grandes ciudades", "Zonas costeras", "Capitales"], correct: 0 },
            { q: "¿Qué son los Cabildos?", options: ["Órganos de gobierno de las islas", "Provincias", "Municipios", "Comunidades"], correct: 0 },
            { q: "El régimen especial de Navarra se llama:", options: ["Amejoramiento del Fuero", "Concierto Económico", "Estatuto especial", "Ninguno"], correct: 0 },
            { q: "El Concierto Económico lo tienen:", options: ["País Vasco y Navarra", "Cataluña y Galicia", "Andalucía y Valencia", "Todas las CCAA"], correct: 0 },
            { q: "Los representantes del Estado en las CCAA son:", options: ["Delegados del Gobierno", "Presidentes autonómicos", "Ministros", "Embajadores"], correct: 0 },
            { q: "¿Qué es una comunidad uniprovincial?", options: ["Asturias, Cantabria, Madrid, etc.", "Andalucía", "Cataluña", "País Vasco"], correct: 0 },
            { q: "Las competencias exclusivas del Estado incluyen:", options: ["Defensa, relaciones internacionales", "Educación", "Sanidad", "Servicios sociales"], correct: 0 },
            { q: "Las competencias compartidas son:", options: ["Estado y CCAA pueden legislar", "Solo el Estado", "Solo las CCAA", "Ninguna"], correct: 0 },
            { q: "El principio de autonomía local garantiza:", options: ["Autosuficiencia municipal", "Dependencia del Estado", "Solo grandes ciudades", "Ninguna"], correct: 0 },
            { q: "Según la Constitución, el Estado se organiza territorialmente en municipios, provincias y:", options: ["Comunidades autónomas", "Comarcas", "Partidos judiciales", "Delegaciones"], correct: 0 },
            { q: "La Constitución garantiza la realización efectiva del principio de:", options: ["Solidaridad", "Centralización", "Uniformidad económica absoluta", "Dependencia militar"], correct: 0 },
            { q: "La autonomía de municipios, provincias y comunidades autónomas es para la gestión de sus:", options: ["Respectivos intereses", "Tribunales", "Fuerzas armadas", "Elecciones"], correct: 0 }
        ]
    },
    
    b1_t1_poderjudicial: {
        title: "B1-T1: Poder Judicial",
        questions: [
            { q: "¿Qué Título de la Constitución trata del Poder Judicial?", options: ["Título VI", "Título III", "Título IV", "Título V"], correct: 0 },
            { q: "El Consejo General del Poder Judicial se compone de:", options: ["20 miembros", "15 miembros", "25 miembros", "12 miembros"], correct: 0 },
            { q: "El Tribunal Supremo es el órgano:", options: ["Superior de todos", "Constitucional", "Supremo militar", "Superior de Comunidad"], correct: 0 },
            { q: "¿Quién nombra a los jueces?", options: ["CGPJ", "El Rey", "El Congreso", "El Gobierno"], correct: 0 },
            { q: "La justicia se administra por:", options: ["Jueces y Magistrados", "El Gobierno", "El Rey", "El Congreso"], correct: 0 },
            { q: "El Ministerio Fiscal depende de:", options: ["Gobierno", "CGPJ", "Congreso", "Rey"], correct: 0 },
            { q: "¿Qué es la jurisdicción contencioso-administrativa?", options: ["Control de la Administración", "Civil", "Penal", "Laboral"], correct: 0 },
            { q: "Los Juzgados de lo Contencioso conocen de:", options: ["Actos administrativos", "Delitos", "Civil", "Laboral"], correct: 0 },
            { q: "El Tribunal Constitucional se compone de:", options: ["12 miembros", "10 miembros", "15 miembros", "8 miembros"], correct: 0 },
            { q: "¿Qué es la independencia judicial?", options: ["Independencia de los jueces", "Solo del Tribunal Supremo", "Dependencia del Gobierno", "Ninguna"], correct: 0 },
            { q: "El Tribunal Supremo tiene su sede en:", options: ["Madrid", "Barcelona", "Sevilla", "Valencia"], correct: 0 },
            { q: "Los magistrados deben ser:", options: ["Juristas de reconocido prestigio", "Políticos", "Militares", "Funcionarios"], correct: 0 },
            { q: "La carrera judicial incluye:", options: ["Jueces y Magistrados", "Abogados", "Procuradores", "Notarios"], correct: 0 },
            { q: "¿Qué es la cosa juzgada?", options: ["Sentencia firme que no puede recurrirse", "Recurso", "Prueba", "Ninguno"], correct: 0 },
            { q: "El recurso de casación es:", options: ["Recurso ante el Tribunal Supremo", "Primera instancia", "Apelación", "Ninguno"], correct: 0 },
            { q: "La jurisdicción penal conoce de:", options: ["Delitos y faltas", "Contratos", "Laboral", "Administrativo"], correct: 0 },
            { q: "La jurisdicción civil conoce de:", options: ["Conflictos entre particulares", "Delitos", "Administración", "Laboral"], correct: 0 },
            { q: "La jurisdicción social conoce de:", options: ["Conflictos laborales", "Delitos", "Contratos", "Administración"], correct: 0 },
            { q: "¿Qué es un juicio rápido?", options: ["Procedimiento para delitos leves", "Civil", "Laboral", "Administrativo"], correct: 0 },
            { q: "El juicio por jurados existe en:", options: ["Algunos casos penales", "Todos los casos", "Civil", "Laboral"], correct: 0 },
            { q: "La Audiencia Provincial conoce de:", options: ["Apelaciones", "Primera instancia", "Casación", "Ninguna"], correct: 0 },
            { q: "Los Juzgados de Primera Instancia conocen de:", options: ["Asuntos civiles generales", "Solo penales", "Solo laborales", "Administrativos"], correct: 0 },
            { q: "El principio de juridicidad significa:", options: ["Actuación según derecho", "Arbitrio", "Politiqueo", "Ninguno"], correct: 0 },
            { q: "La tutela judicial efectiva es un derecho:", options: ["Fundamental", "Ordinario", "Secundario", "Ninguno"], correct: 0 },
            { q: "El derecho a la defensa es:", options: ["Fundamental", "Ordinario", "Limitado", "Ninguno"], correct: 0 },
            { q: "La justicia emana del:", options: ["Pueblo", "Gobierno", "Rey", "Congreso"], correct: 0 },
            { q: "Jueces y magistrados están sometidos únicamente al imperio de la:", options: ["Ley", "Costumbre", "Orden ministerial", "Disciplina partidista"], correct: 0 },
            { q: "El órgano de gobierno del Poder Judicial es el:", options: ["Consejo General del Poder Judicial", "Tribunal Supremo", "Consejo de Estado", "Defensor del Pueblo"], correct: 0 }
        ]
    },
    
    // B1-T2: Ley Orgánica 5/2005 de Defensa Nacional
    b1_t2_defensa: {
        title: "B1-T2: Ley Orgánica 5/2005 de Defensa Nacional",
        questions: [
            { q: "¿Qué es la Ley Orgánica 5/2005?", options: ["De Defensa Nacional", "Del Gobierno", "De las FAS", "De Organización"], correct: 0 },
            { q: "¿De qué año es la Ley Orgánica 5/2005?", options: ["2005", "1999", "2010", "2000"], correct: 0 },
            { q: "La Defensa Nacional es competencia de:", options: ["El Estado", "Las CCAA", "Los municipios", "La UE"], correct: 0 },
            { q: "Las FAS están compuestas por:", options: ["Ejército de Tierra, Armada, Ejército del Aire", "Solo Ejército", "Guardia Civil y Policía", "Militar y civil"], correct: 0 },
            { q: "El mando supremo de las FAS lo tiene:", options: ["El Rey", "El Presidente", "El JEMAD", "El Ministro"], correct: 0 },
            { q: "La estructura básica de las FAS se establece por:", options: ["Real Decreto 521/2020", "Ley orgánica", "Orden ministerial", "Instrucción"], correct: 0 },
            { q: "El JEMAD es:", options: ["La máxima autoridad militar", "Ministro de Defensa", "El Rey", "Un civil"], correct: 0 },
            { q: "El EMAD depende de:", options: ["JEMAD", "Ministro de Defensa", "Presidente del Gobierno", "Rey"], correct: 0 },
            { q: "La Defensa Nacional incluye:", options: ["La militar y otras dimensiones", "Solo la militar", "Solo inteligencia", "Ninguna"], correct: 0 },
            { q: "Las operaciones militares pueden ser:", options: ["Nacionales e internacionales", "Solo internas", "Solo coloniales", "Prohibidas"], correct: 0 },
            { q: "La Reserva de las FAS la forma:", options: ["Personal que ha causado baja", "Solo activos", "Solo civiles", "No existe"], correct: 0 },
            { q: "El régimen de las FAS se basa en:", options: ["Principio de unidad", "Regional", "Provincial", "Local"], correct: 0 },
            { q: "La misión principal de las FAS es:", options: ["Garantizar la defensa", "Policía", "Emergencias", "Economía"], correct: 0 },
            { q: "Las FAS actúan bajo:", options: ["Autoridad del Gobierno", "Del Rey", "Del Congreso", "Independiente"], correct: 0 },
            { q: "El poder mando de las FAS lo tiene:", options: ["El Rey", "El Presidente", "El Congreso", "El Senado"], correct: 0 },
            { q: "La organización operativa de las FAS depende de:", options: ["JEMAD", "Ministro de Defensa", "Presidente", "CCAA"], correct: 0 },
            { q: "Los Mandos Operativos dependen de:", options: ["EMAD", "Ministerio", "CCAA", "Ayuntamientos"], correct: 0 },
            { q: "La UME depende de:", options: ["Ministerio de Defensa", "Ministerio del Interior", "Protección Civil", "CCAA"], correct: 0 },
            { q: "La UME interviene en:", options: ["Emergencias civiles", "Guerras", "Elecciones", "Deportes"], correct: 0 },
            { q: "El régimen de las FAS incluye:", options: ["Fuerzas armadas y cuerpos integrados", "Solo fuerzas armadas", "Solo policías", "Ninguno"], correct: 0 },
            { q: "Las zonas de responsabilidad militar son:", options: ["Terrestre, marítima y aérea", "Solo terrestre", "Solo marítima", "Solo aérea"], correct: 0 },
            { q: "El dispositivo de las FAS se organiza en:", options: ["Fuerzas", "Regiones", "Provincias", "Municipios"], correct: 0 },
            { q: "La Defensa Coordinada incluye:", options: ["FAS y fuerzas de seguridad", "Solo FAS", "Solo policía", "Ninguna"], correct: 0 },
            { q: "El Estado de Sitio lo declara:", options: ["Cortes Generales", "El Gobierno", "El Rey", "El TC"], correct: 0 },
            { q: "La movilización de las FAS la ordena:", options: ["El Gobierno", "El Rey", "El Congreso", "El JEMAD"], correct: 0 },
            { q: "La Ley Orgánica 5/2005 regula la:", options: ["Defensa Nacional", "Seguridad Social", "Organización territorial", "Administración local"], correct: 0 },
            { q: "La misión de las Fuerzas Armadas incluye garantizar la soberanía e independencia de:", options: ["España", "La UE", "Las comunidades autónomas", "La OTAN"], correct: 0 },
            { q: "La Corona ejerce, en materia militar, el mando supremo de:", options: ["Las Fuerzas Armadas", "Las Cortes Generales", "Las fuerzas policiales", "La Administración Civil"], correct: 0 }
        ]
    },
    
    // B1-T3: Ley 40/2015 de Régimen Jurídico del Sector Público
    b1_t3_ley40: {
        title: "B1-T3: Ley 40/2015 RJSP",
        questions: [
            { q: "¿Qué es la Ley 40/2015?", options: ["Régimen Jurídico del Sector Público", "De la defensa", "De procedimiento", "Orgánica"], correct: 0 },
            { q: "¿De qué año es la Ley 40/2015?", options: ["2015", "2010", "2020", "2005"], correct: 0 },
            { q: "Los principios de la Administración Pública son:", options: ["Legalidad, eficacia, jerarquía", "Solo eficacia", "Solo legalidad", "Ninguno"], correct: 0 },
            { q: "Los Órganos de las AAPP se clasifican en:", options: ["Superiores y subordinados", "Solo superiores", "Solo subordinados", "Ninguno"], correct: 0 },
            { q: "La Administración General del Estado se estructura en:", options: ["Ministerios y organismos", "Solo ministerios", "Solo organismos", "Ninguno"], correct: 0 },
            { q: "Los Ministerios se dividen en:", options: ["Secretarías de Estado y subsecretarías", "Direcciones Generales", "Subdirecciones", "Ninguno"], correct: 0 },
            { q: "Las relaciones interadministrativas se rigen por:", options: ["Cooperación, coordinación y control", "Competencia", "Independencia", "Ninguno"], correct: 0 },
            { q: "El principio de cooperación administrativa implica:", options: ["Actuar conjuntamente", "Competir", "Independizarse", "Ninguno"], correct: 0 },
            { q: "La coordinación administrativa significa:", options: ["Concertar actuación", "Competir", "Independizarse", "Ninguno"], correct: 0 },
            { q: "El control de la Administración puede ser:", options: ["Interno y externo", "Solo interno", "Solo externo", "Ninguno"], correct: 0 },
            { q: "La potestad sancionadora de la Administración requiere:", options: ["Legalidad, tipicidad, culpabilidad", "Solo dinero", "Juicio previo", "Aprobación real"], correct: 0 },
            { q: "Las sanciones administrativas prescriben en:", options: ["1 año si grave, 6 meses leve", "5 años", "Nunca", "2 años"], correct: 0 },
            { q: "La responsabilidad patrimonial de la Administración requiere:", options: ["Daño efectivo y evaluable", "Solo daño moral", "Queja previa", "Juicio"], correct: 0 },
            { q: "Los actos administrativos son:", options: ["Presunción de legalidad", "Ilegales por defecto", "Solo gubernativos", "Irrecurribles"], correct: 0 },
            { q: "El silencio administrativo en procedimientos positivos:", options: ["Efectos desestimatorios", "Efectos estimatorios", "No tiene efectos", "Depende"], correct: 0 },
            { q: "Las notificaciones administrativas se hacen en:", options: ["Registro electrónico", "Solo correo postal", "Prensa", "Radio"], correct: 0 },
            { q: "El interesado puede actuar con:", options: ["Representante legal", "Solo personalmente", "Solo abogado", "Solo procurador"], correct: 0 },
            { q: "Los registros electrónicos interoperan:", options: ["Con todas las Administraciones", "Solo Estado", "Solo CCAA", "Solo locales"], correct: 0 },
            { q: "¿Qué es un organismo público?", options: ["Entidad con personalidad jurídica", "Ministerio", "Delegación", "Ninguno"], correct: 0 },
            { q: "Los organismos autónomos dependen de:", options: ["Un Ministerio", "La UE", "Las CCAA", "El Banco de España"], correct: 0 },
            { q: "Las empresas públicas se rigen por:", options: ["Derecho privado con control público", "Solo derecho privado", "Solo público", "No existen"], correct: 0 },
            { q: "La Administración Institucional se crea por:", options: ["Ley o Real Decreto", "Orden ministerial", "Instrucción", "Ninguno"], correct: 0 },
            { q: "Los principios del procedimiento administrativo son:", options: ["Economía, celeridad, eficacia", "Solo legalidad", "Solo burocracia", "Ninguno"], correct: 0 },
            { q: "El derecho administrativo se basa en:", options: ["Ley 39/2015 y 40/2015", "Código Civil", "Código Penal", "Leyes militares"], correct: 0 },
            { q: "Los procedimientos administrativos deben ser:", options: ["Eficaces, ágiles y garantistas", "Secretos", "Ilimitados", "Costosos"], correct: 0 },
            { q: "La Ley 40/2015 regula el régimen jurídico del:", options: ["Sector público", "Sector privado", "Poder judicial", "Mercado laboral"], correct: 0 },
            { q: "Entre las materias del Título Preliminar de la Ley 40/2015 figura la relativa a los órganos:", options: ["colegiados de las administraciones públicas", "Constitucionales del Estado", "Militares aliados", "Parlamentarios europeos"], correct: 0 },
            { q: "La Administración Institucional forma parte del:", options: ["Sector público institucional", "Poder judicial", "Poder legislativo", "Sector exterior"], correct: 0 }
        ]
    },
    
    // B1-T4: Real Decreto 205/2024 Ministerio de Defensa
    b1_t4_rd205: {
        title: "B1-T4: RD 205/2024 Ministerio de Defensa",
        questions: [
            { q: "¿Qué es el Real Decreto 205/2024?", options: ["Estructura orgánica del Ministerio de Defensa", "Ley de defensa", "Reglamento de personal", "Ninguno"], correct: 0 },
            { q: "¿De qué año es el RD 205/2024?", options: ["2024", "2020", "2022", "2023"], correct: 0 },
            { q: "El Ministerio de Defensa depende de:", options: ["La persona titular del Ministerio", "El Rey", "El Congreso", "La UE"], correct: 0 },
            { q: "¿Qué deroga el RD 205/2024?", options: ["RD 372/2020", "RD 521/2020", "Ley 8/2006", "Ninguno"], correct: 0 },
            { q: "El objetivo del RD 205/2024 es establecer:", options: ["Estructura orgánica básica del Ministerio", "Nómina de militares", "Ubicación de bases", "Uniformes"], correct: 0 },
            { q: "La estructura del Ministerio incluye:", options: ["Secretaría de Estado y Subsecretaría", "Solo ministerios", "Solo direcciones", "Ninguna"], correct: 0 },
            { q: "La Secretaría de Estado de Defensa depende de:", options: ["Ministro de Defensa", "Presidente", "Rey", "Congreso"], correct: 0 },
            { q: "Las Direcciones Generales del Ministerio incluyen:", options: ["Política de Defensa, Industria, etc.", "Solo una", "Tres", "Ninguna"], correct: 0 },
            { q: "El objetivo de la estructura ministerial es:", options: ["Optimizar recursos", "Aumentar personal", "Reducir gastos", "Ninguno"], correct: 0 },
            { q: "Los organismos autónomos de Defensa son:", options: ["ISFAS, SMG, DAO", "Solo uno", "Cinco", "Ninguno"], correct: 0 },
            { q: "El Instituto Social de las FAS (ISFAS) depende de:", options: ["Ministerio de Defensa", "Ministerio de Trabajo", "Seguridad Social", "Ninguno"], correct: 0 },
            { q: "La Mutualidad General de la Defensa depende de:", options: ["Ministerio de Defensa", "Ministerio de Hacienda", "Seguridad Social", "Ninguno"], correct: 0 },
            { q: "El objetivo del RD 205/2024 incluye:", options: ["Adaptarse a nuevos retos", "Reducir efectivos", "Aumentar presupuestos", "Ninguno"], correct: 0 },
            { q: "La estructura del Ministerio se modifica por:", options: ["Real Decreto", "Orden ministerial", "Instrucción", "Ninguno"], correct: 0 },
            { q: "La propuesta de la estructura ministerial la hace:", options: ["El Ministro", "El JEMAD", "El Congreso", "El Rey"], correct: 0 },
            { q: "Los órganos consultivos del Ministerio incluyen:", options: ["Consejo de Estado, CIEM", "Solo uno", "Tres", "Ninguno"], correct: 0 },
            { q: "Las relaciones con otros departamentos se hacen mediante:", options: ["Cooperación interministerial", "Competencia", "Conflicto", "Ninguno"], correct: 0 },
            { q: "El objetivo de la industria de defensa incluye:", options: ["Apoyo a las FAS", "Solo fabricación", "Solo ventas", "Ninguno"], correct: 0 },
            { q: "La DG de Estrategia e Innovación de la Industria de Defensa:", options: ["Se crea en 2024", "Existe desde 2000", "No existe", "Solo militar"], correct: 0 },
            { q: "La estructura de la organización ministerial es:", options: ["Básica", "Detallada", "Completa", "Ninguna"], correct: 0 },
            { q: "Los órganos subordinados del Ministerio son:", options: ["Organismos y entidades", "Solo organismos", "Solo entidades", "Ninguno"], correct: 0 },
            { q: "La estructura se articula mediante:", options: ["Órganos jerárquicos", "Órganos independientes", "Sin jerarquía", "Ninguno"], correct: 0 },
            { q: "El ámbito de la Defensa incluye:", options: ["Dimensión militar y civil", "Solo militar", "Solo civil", "Ninguno"], correct: 0 },
            { q: "Los centros directivos del Ministerio son:", options: ["Secretarios, subsecretarios y DG", "Solo DG", "Solo ministros", "Ninguno"], correct: 0 },
            { q: "La estructura orgánica es competencia del:", options: ["Gobierno", "Congreso", "Rey", "CCAA"], correct: 0 },
            { q: "El RD 205/2024 fue aprobado el:", options: ["27 de febrero de 2024", "28 de febrero de 2024", "19 de mayo de 2020", "11 de marzo de 2025"], correct: 0 },
            { q: "El artículo 4 del RD 205/2024 regula la Dirección General de:", options: ["Estrategia e Innovación de la Industria de Defensa", "Personal", "Reclutamiento", "Infraestructuras militares"], correct: 0 },
            { q: "El RD 205/2024 desarrolla la estructura orgánica básica del:", options: ["Ministerio de Defensa", "Estado Mayor de la Defensa", "Ejército de Tierra", "Consejo de Seguridad Nacional"], correct: 0 }
        ]
    },
    
    // B1-T5: Real Decreto 521/2020 Organización básica de las FAS
    b1_t5_rd521: {
        title: "B1-T5: RD 521/2020 Organización básica FAS",
        questions: [
            { q: "¿Qué es el RD 521/2020?", options: ["Organización básica de las FAS", "Ley de defensa", "Reglamento del Ministerio", "Ninguno"], correct: 0 },
            { q: "¿De qué año es el RD 521/2020?", options: ["2020", "2015", "2024", "2010"], correct: 0 },
            { q: "El régimen operativo de las FAS depende de:", options: ["JEMAD", "Ministro de Defensa", "Presidente", "Congreso"], correct: 0 },
            { q: "Los Mandos Operativos dependen de:", options: ["JEMAD", "Ministro", "Presidente", "CCAA"], correct: 0 },
            { q: "El régimen operativo de las FAS se articula mediante:", options: ["Mandos operativos", "Solo ministerios", "Embajadas", "Cuarteles"], correct: 0 },
            { q: "Las unidades de las FAS se organizan en:", options: ["Grandes unidades y apoyo a la fuerza", "Solo combate", "Solo logística", "Solo admin"], correct: 0 },
            { q: "La preparación operativa de la Fuerza se realiza a través de:", options: ["Mando de Adiestramiento y Doctrina", "Universidad", "Ministerio", "Congreso"], correct: 0 },
            { q: "El apoyo logístico a la Fuerza lo realiza:", options: ["Mando de Apoyo Logístico", "La empresa", "CCAA", "Ayuntamiento"], correct: 0 },
            { q: "Las unidades QBRN dependen de:", options: ["La estructura de defensa NBQ/QBRN", "Ministerio", "UE", "OTAN"], correct: 0 },
            { q: "El régimen conjunto de las FAS implica:", options: ["Coordinación de todos los ejércitos", "Solo tierra", "Solo mar", "Solo aire"], correct: 0 },
            { q: "El régimen de las FAS se basa en:", options: ["Principio de unidad", "Regional", "Provincial", "Local"], correct: 0 },
            { q: "Los Cuarteles Generales de la NATO en España están en:", options: ["Rota (JFC) y Torrejón (CAOCTJ)", "Madrid", "Barcelona", "Sevilla"], correct: 0 },
            { q: "La Célula de Coordinación de la NATO en España está en:", options: ["Bruselas (representación)", "Madrid", "Rota", "Torrejón"], correct: 0 },
            { q: "La Acción Conjunta implica:", options: ["Coordinación de todos los ejércitos", "Solo tierra", "Solo mar", "Solo aire"], correct: 0 },
            { q: "La Acción Combinada incluye:", options: ["Varios países aliados", "Solo España", "Solo la UE", "Solo la ONU"], correct: 0 },
            { q: "El JEMAD es el Jefe de:", options: ["Estado Mayor de la Defensa", "Ministerio", "Ejército", "Armada"], correct: 0 },
            { q: "La Defensa depende del:", options: ["Estado", "CCAA", "Municipios", "UE"], correct: 0 },
            { q: "La preparación operativa de las FAS incluye:", options: ["Preparación y empleo de la fuerza", "Solo administración", "Solo logística", "Ninguna"], correct: 0 },
            { q: "Los Mandos Componentes dependen de:", options: ["JEMAD", "Ministro", "Presidentes de los ejércitos", "Congreso"], correct: 0 },
            { q: "La generación de las fuerzas se realiza desde:", options: ["La estructura orgánica", "El gobierno", "Las autonomías", "Los municipios"], correct: 0 },
            { q: "El empleo de la fuerza incluye:", options: ["Todos los recursos necesarios", "Solo personal", "Solo material", "Ninguno"], correct: 0 },
            { q: "Las operaciones pueden ser:", options: ["Nacionales e internacionales", "Solo internas", "Solo bilaterales", "Prohibidas"], correct: 0 },
            { q: "Las OAP (Operaciones de Apoyo a la Paz) son:", options: ["Misiones de paz ONU/OSCE", "Guerra", "Ejercicios", "Sociedad"], correct: 0 },
            { q: "El ámbito de la defensa incluye:", options: ["Prevención, respuesta, recuperación", "Solo respuesta", "Solo guerra", "Ninguno"], correct: 0 },
            { q: "El régimen de las FAS se articula mediante:", options: ["Mando y control", "Sin mando", "Mando único", "Comités"], correct: 0 },
            { q: "El RD 521/2020 establece la organización básica de:", options: ["Las Fuerzas Armadas", "Solo el Ejército de Tierra", "Solo la Armada", "Solo el EMAD"], correct: 0 },
            { q: "En el Título preliminar del RD 521/2020 se regula el modelo de organización y la:", options: ["Transformación digital", "Jurisdicción militar", "Reserva voluntaria", "Política retributiva"], correct: 0 },
            { q: "El artículo 4 del RD 521/2020 se refiere al:", options: ["Jefe de Estado Mayor de la Defensa", "Subsecretario de Defensa", "Rey", "Defensor del Pueblo"], correct: 0 }
        ]
    },
    
    // B1-T6: Instrucciones de organización de los ejércitos
    b1_t6_instrucciones: {
        title: "B1-T6: Instrucciones de organización",
        questions: [
            { q: "La Instrucción 55/2021 es del:", options: ["JEMAD", "JEME", "AJEMA", "JEMA"], correct: 0 },
            { q: "El régimen del EMAD se desarrolla mediante:", options: ["Instrucción del JEMAD", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "La Fuerza terrestre se organiza en:", options: ["Divisiones y Brigadas", "Solo regimientos", "Solo batallones", "Solo compañías"], correct: 0 },
            { q: "El Jefe del ET depende de:", options: ["JEME", "Ministro", "Presidente", "JEMAD"], correct: 0 },
            { q: "La Armada incluye:", options: ["Fuerza Naval e Infantería de Marina", "Solo barcos", "Solo pilotos", "Solo infantes"], correct: 0 },
            { q: "El AJEMA es el Jefe de:", options: ["Estado Mayor de la Armada", "Ejército de Tierra", "Ejército del Aire", "Defensa"], correct: 0 },
            { q: "El Jefe del Aire depende de:", options: ["JEMA", "JEME", "AJEMA", "Ministro"], correct: 0 },
            { q: "El JEME es:", options: ["Máxima autoridad del ET", "Ministro", "Comandante de zona", "General de brigada"], correct: 0 },
            { q: "El AJEMA es:", options: ["Almirante", "General", "Coronel", "Capitán"], correct: 0 },
            { q: "El JEFAE representa a:", options: ["Ejército del Aire y del Espacio", "Solo aire", "Marina civil", "Aviación"], correct: 0 },
            { q: "El Mando de Canarias depende de:", options: ["Ejército de Tierra", "Armada", "Ministerio", "Gobierno canario"], correct: 0 },
            { q: "El régimen del Aire y del Espacio incluye:", options: ["Fuerza aérea y espacio", "Solo fuerza aérea", "Solo espacio", "Ninguno"], correct: 0 },
            { q: "El Mando Conjunto del Ciberespacio (MCCE) depende de:", options: ["EMAD", "Ministerio del Interior", "CNP", "UE"], correct: 0 },
            { q: "La Escuela Militar de Ciberoperaciones depende de:", options: ["EMAD", "Ministerio", "Universidad", "CCAA"], correct: 0 },
            { q: "El régimen del ET se modifica por:", options: ["Instrucción del JEME", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "El régimen de la Armada se modifica por:", options: ["Instrucción del AJEMA", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "El régimen del Ejército del Aire se modifica por:", options: ["Instrucción del JEMA", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "El Centro de Inteligencia y Targeting Aeroespacial (CESTIC) tiene rango de:", options: ["Dirección General", "Subdirección", "Servicio", "Ninguno"], correct: 0 },
            { q: "El Mando del Espacio depende de:", options: ["JEMA", "JEME", "AJEMA", "Ministro"], correct: 0 },
            { q: "El régimen del EMAD se establece por:", options: ["Instrucción del JEMAD", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "El régimen operativo del ET se articula mediante:", options: ["Fuerzas de desplegar", "Solo regiones", "Solo provincias", "Ninguno"], correct: 0 },
            { q: "Las unidades de la Armada se organizan en:", options: ["Fuerzas y apoyo", "Solo barcos", "Solo infantes", "Ninguno"], correct: 0 },
            { q: "El régimen operativo depende de:", options: ["JEMAD", "Ministro", "Presidente", "Congreso"], correct: 0 },
            { q: "El régimen de la Defensa se articula mediante:", options: ["Mando y control", "Sin mando", "Mando único", "Comités"], correct: 0 },
            { q: "El Jefe de Estado Mayor del ET (JEME) es:", options: ["General de cuatro estrellas", "General de tres", "Almirante", "Coronel"], correct: 0 },
            { q: "La Instrucción 55/2021 desarrolla la organización del:", options: ["Estado Mayor de la Defensa", "Ministerio del Interior", "Congreso", "Consejo de Estado"], correct: 0 },
            { q: "La Instrucción 14/2021 corresponde al desarrollo organizativo del:", options: ["Ejército de Tierra", "Ejército del Aire y del Espacio", "Ministerio de Defensa", "Consejo de Ministros"], correct: 0 },
            { q: "La Instrucción 6/2025 desarrolla la organización básica del:", options: ["Ejército del Aire y del Espacio", "Ejército de Tierra", "Estado Mayor Conjunto", "Mando Operativo Terrestre"], correct: 0 }
        ]
    },
    
    // ============================================
    // BLOQUE 2: JURÍDICO-SOCIAL
    // ============================================
    
    // B2-T1: Ley 39/2007 y Ley 8/2006
    b2_t1_ley39: {
        title: "B2-T1: Ley 39/2007 y Ley 8/2006",
        questions: [
            { q: "¿Qué es la Ley 39/2007?", options: ["De la carrera militar", "De tropa", "De defensa", "Orgánica"], correct: 0 },
            { q: "¿Qué es la Ley 8/2006?", options: ["De Tropa y Marinería", "De carrera militar", "De defensa", "Orgánica"], correct: 0 },
            { q: "La Ley 39/2007 regula:", options: ["Carrera de oficiales y suboficiales", "Solo tropa", "Solo marinería", "Civil"], correct: 0 },
            { q: "La relación de servicios de carácter permanente es:", options: ["Tropa Permanente", "Contrato temporal", "Voluntariado", "Reserva"], correct: 0 },
            { q: "El ingreso en tropa temporal requiere:", options: ["Ser mayor de edad", "Ser Soldado", "Ser oficial", "Ser reserva"], correct: 0 },
            { q: "Los militares de tropa pueden acceder a:", options: ["Permanencia tras 6 años", "Solo un contrato", "Solo 3 años", "Nunca"], correct: 0 },
            { q: "El tiempo mínimo de servicio para permanencia es:", options: ["6 años", "3 años", "10 años", "1 año"], correct: 0 },
            { q: "Las plazas de tropa se convocan por:", options: ["Orden DEF", "Ley de presupuestos", "Real Decreto", "Constitución"], correct: 0 },
            { q: "La promoción interna permite:", options: ["Ascender de escala", "Solo ascender rango", "Cambiar de ejército", "Ninguno"], correct: 0 },
            { q: "La carrera militar comprende:", options: ["Escalas de oficiales, suboficiales y tropa", "Solo oficiales", "Solo tropa", "Civil"], correct: 0 },
            { q: "El desarrollo profesional militar se realiza mediante:", options: ["Formación y entrenamiento", "Solo estudios", "Solo instrucción", "Ninguno"], correct: 0 },
            { q: "El régimen del militar profesional incluye:", options: ["Ingreso, formación, ascenso, destino", "Solo ingreso", "Solo ascenso", "Ninguno"], correct: 0 },
            { q: "La evaluación del militar permite:", options: ["Conocer aptitud", "Solo ascender", "Solo destinar", "Ninguno"], correct: 0 },
            { q: "Las escalas militares se establecen por:", options: ["Ley", "Real Decreto", "Orden ministerial", "Instrucción"], correct: 0 },
            { q: "Los cuerpos militares son:", options: ["Tierra, Armada, Aire", "Solo uno", "Dos", "Ninguno"], correct: 0 },
            { q: "Las escalas de oficiales incluyen:", options: ["Academias militares", "Academias y tropa", "Solo tropa", "Civil"], correct: 0 },
            { q: "El régimen de los militares se regula por:", options: ["Normativa militar", "Constitución", "CCAA", "Convenio"], correct: 0 },
            { q: "La movida geográfica del militar depende de:", options: ["Necesidades del servicio", "Su preferencia", "Su familia", "Su dinero"], correct: 0 },
            { q: "El complemento de productividad militar motiva:", options: ["Misión, responsabilidad, dedicación", "Antigüedad", "Rango solo", "Nada"], correct: 0 },
            { q: "Las ayudas sociales al militar incluyen:", options: ["Vivienda, transporte, hijos", "Solo dinero", "Solo vivienda", "No hay"], correct: 0 },
            { q: "La asistencia sanitaria militar la presta:", options: ["Sanidad de Defensa", "SS General", "Clínicas privadas", "No hay"], correct: 0 },
            { q: "El régimen profesional incluye:", options: ["Carrera y régimen profesional", "Solo rango", "Solo destino", "Ninguno"], correct: 0 },
            { q: "La tropa temporal puede convertirse en:", options: ["Permanente", "Solo temporal", "Voluntario", "Reserva"], correct: 0 },
            { q: "Los requisitos de ingreso en tropa incluyen:", options: ["Edad, titulación, condiciones físicas", "Solo edad", "Solo titulación", "Ninguno"], correct: 0 },
            { q: "El proceso selectivo de tropa incluye:", options: ["Oposición y concurso", "Solo oposición", "Solo concurso", "Ninguno"], correct: 0 },
            { q: "La Ley 39/2007 regula la:", options: ["Carrera militar", "Seguridad Nacional", "Organización territorial", "Unión Europea"], correct: 0 },
            { q: "La Ley 8/2006 regula específicamente a la:", options: ["Tropa y Marinería", "Guardia Civil", "Policía Nacional", "Administración civil"], correct: 0 },
            { q: "La modificación del artículo 20.3 de la Ley 8/2006 se produjo mediante la Ley:", options: ["11/2020", "39/2015", "40/2015", "3/2007"], correct: 0 }
        ]
    },
    
    // B2-T2: Reales Ordenanzas FAS
    b2_t2_ordenanzas: {
        title: "B2-T2: Reales Ordenanzas FAS",
        questions: [
            { q: "¿Qué son las Reales Ordenanzas?", options: ["Normas de comportamiento FAS", "Ley de defensa", "Reglamento", "Instrucción"], correct: 0 },
            { q: "¿Qué Real Decreto aprueba las Reales Ordenanzas?", options: ["RD 96/2009", "RD 521/2020", "RD 205/2024", "Ley 8/2006"], correct: 0 },
            { q: "Las Reales Ordenanzas se aplican a:", options: ["Todos los miembros de las FAS", "Solo oficiales", "Solo tropa", "Civil"], correct: 0 },
            { q: "Los valores de las FAS incluyen:", options: ["Lealtad, honor, valentía", "Solo eficacia", "Solo disciplina", "Ninguno"], correct: 0 },
            { q: "El deber del militar incluye:", options: ["Defender a España", "Solo servir", "Solo cumplir", "Ninguno"], correct: 0 },
            { q: "La disciplina militar se basa en:", options: ["Obediencia y jerarquía", "Solo eficacia", "Solo leyes", "Ninguno"], correct: 0 },
            { q: "El compromiso militar implica:", options: ["Cumplir misiones", "Solo estar", "Solo defender", "Ninguno"], correct: 0 },
            { q: "La jerarquía militar significa:", options: ["Orden de mando", "Solo rango", "Solo antigüedad", "Ninguno"], correct: 0 },
            { q: "El deber de lealtad implica:", options: ["Con la Patria y superiores", "Solo con superiores", "Solo con compañeros", "Ninguno"], correct: 0 },
            { q: "El deber de honestidad incluye:", options: ["Perjudicar la imagen de las FAS", "Solo errores", "Solo indisciplina", "Ninguno"], correct: 0 },
            { q: "El militar debe actuar con:", options: ["Integridad y profesionalidad", "Solo eficacia", "Solo obediencia", "Ninguno"], correct: 0 },
            { q: "Los derechos de los militares incluyen:", options: ["Los reconocidos + específicos", "Solo los generales", "Solo los laborales", "Ninguno"], correct: 0 },
            { q: "Los deberes de los militares incluyen:", options: ["Los generales + específicos", "Solo los generales", "Solo los laborales", "Ninguno"], correct: 0 },
            { q: "El deber para con la Patria es:", options: ["Deber supremo", "Solo derecho", "Solo obligación", "Ninguno"], correct: 0 },
            { q: "El militar debe usar:", options: ["La fuerza necesaria y proporcionada", "Toda la fuerza", "Solo la mínima", "Ninguna"], correct: 0 },
            { q: "El desarrollo profesional incluye:", options: ["Preparación física y mental", "Solo física", "Solo mental", "Ninguno"], correct: 0 },
            { q: "La ayuda mutua entre compañeros es:", options: ["Deber", "Opcional", "Prohibida", "Ninguno"], correct: 0 },
            { q: "El deber del militar incluye:", options: ["Respetar la Constitución", "Solo al Rey", "Solo al Gobierno", "Ninguno"], correct: 0 },
            { q: "La protección del secreto es:", options: ["Deber militar", "Solo recomendación", "Opcional", "Ninguno"], correct: 0 },
            { q: "El deber del superior incluye:", options: ["Dar órdenes legales", "Dar cualquier orden", "Solo las fáciles", "Ninguno"], correct: 0 },
            { q: "El subordinado debe:", options: ["Cumplir órdenes legales", "Cumplir todas", "Solo las justas", "Ninguno"], correct: 0 },
            { q: "La desobediencia es:", options: ["Infracción muy grave", "Infracción leve", "Solo error", "Ninguna"], correct: 0 },
            { q: "El abandono de destino es:", options: ["Infracción muy grave", "Leve", "Error", "Ninguna"], correct: 0 },
            { q: "La integridad física del militar se protege mediante:", options: ["Seguridad y salud", "Solo seguro", "Solo salud", "Ninguno"], correct: 0 },
            { q: "El deber del militar incluye:", options: ["Usar distintivos adecuados", "Solo uniforme", "Solo armas", "Ninguno"], correct: 0 },
            { q: "Las Reales Ordenanzas para las Fuerzas Armadas fueron aprobadas por el Real Decreto:", options: ["96/2009", "176/2014", "521/2020", "205/2024"], correct: 0 },
            { q: "Las Reales Ordenanzas fueron aprobadas el:", options: ["6 de febrero de 2009", "19 de mayo de 2020", "21 de marzo de 2014", "22 de marzo de 2007"], correct: 0 },
            { q: "La disposición adicional única del RD 96/2009 se refiere a la aplicación a:", options: ["La Guardia Civil", "La Policía Local", "La Armada", "La OTAN"], correct: 0 }
        ]
    },
    
    // B2-T3: Ley Orgánica 9/2011 Derechos y deberes
    b2_t3_ley9: {
        title: "B2-T3: Ley Orgánica 9/2011 Derechos",
        questions: [
            { q: "¿Qué es la Ley Orgánica 9/2011?", options: ["Derechos y deberes de los miembros de las FAS", "Régimen disciplinario", "Ley de carrera", "Ninguna"], correct: 0 },
            { q: "¿De qué año es la LO 9/2011?", options: ["2011", "2007", "2014", "2005"], correct: 0 },
            { q: "Los derechos de los militares incluyen:", options: ["Los fundamentales + específicos", "Solo los fundamentales", "Solo los laborales", "Ninguno"], correct: 0 },
            { q: "El derecho a la vida familiar:", options: ["Reconocido con limitaciones", "Pleno", "No reconocido", "Limitado"], correct: 0 },
            { q: "El derecho a la intimidad:", options: ["Reconocido con limitaciones", "Pleno", "No reconocido", "Ilimitado"], correct: 0 },
            { q: "El derecho a la libertad de expresión tiene:", options: ["Límites por la función militar", "Pleno", "No reconocido", "Ilimitado"], correct: 0 },
            { q: "El derecho de reunión tiene:", options: ["Límites por la función militar", "Pleno", "No reconocido", "Ilimitado"], correct: 0 },
            { q: "El derecho de asociación tiene:", options: ["Limitado a asociaciones profesionales", "Pleno", "No reconocido", "Sindicatos"], correct: 0 },
            { q: "Los deberes de los militares incluyen:", options: ["Los generales + específicos militares", "Solo los generales", "Solo los específicos", "Ninguno"], correct: 0 },
            { q: "El deber principal del militar es:", options: ["Defender a España", "Solo servir", "Solo cumplir", "Ninguno"], correct: 0 },
            { q: "El deber de obediencia implica:", options: ["Cumplir órdenes de superiores", "Solo del Rey", "Solo del Gobierno", "Ninguno"], correct: 0 },
            { q: "El deber de confidencialidad incluye:", options: ["No revelar información clasificada", "Solo secretos", "Todo", "Nada"], correct: 0 },
            { q: "El deber de disponibilidad significa:", options: ["Estar preparado para servir", "Solo trabajar", "Solo estar", "Ninguno"], correct: 0 },
            { q: "El deber de residencia implica:", options: ["Donde se ordene", "Donde quiera", "Donde nace", "Ninguno"], correct: 0 },
            { q: "El desarrollo profesional incluye:", options: ["Formación continua", "Solo ingreso", "Solo ascenso", "Ninguno"], correct: 0 },
            { q: "Los derechos económicos incluyen:", options: ["Soldada, complementos, pensiones", "Solo soldada", "Solo complementos", "Ninguno"], correct: 0 },
            { q: "El derecho a la protección social incluye:", options: ["Sanidad, vivienda, educativo", "Solo sanidad", "Solo vivienda", "Ninguno"], correct: 0 },
            { q: "Los derechos sindicales de militares:", options: ["Limitados a asociaciones profesionales", "Plenos", "Prohibidos", "Ninguno"], correct: 0 },
            { q: "El derecho de huelga para militares:", options: ["No reconocido", "Pleno", "Limitado", "Ninguno"], correct: 0 },
            { q: "El derecho de sufragio activo:", options: ["Pleno", "Limitado", "No reconocido", "Ninguno"], correct: 0 },
            { q: "El derecho pasivo electoral:", options: ["Limitado", "Pleno", "No reconocido", "Ninguno"], correct: 0 },
            { q: "Los límites a derechos se justifican por:", options: ["Necesidades de la defensa", "Conveniencia", "Política", "Ninguno"], correct: 0 },
            { q: "El derecho de petición incluye:", options: ["Presentar solicitudes", "Solo quejas", "Solo recursos", "Ninguno"], correct: 0 },
            { q: "El derecho a la tutela judicial efectiva:", options: ["Pleno con especialidades", "Limitado", "No reconocido", "Ninguno"], correct: 0 },
            { q: "Los derechos se ejercen según:", options: ["Normativa militar", "Solo Constitución", "Solo leyes", "Ninguno"], correct: 0 },
            { q: "La Ley Orgánica 9/2011 regula los derechos y deberes de los miembros de:", options: ["Las Fuerzas Armadas", "Las Cortes Generales", "Las policías autonómicas", "La Administración de Justicia"], correct: 0 },
            { q: "La Ley Orgánica 9/2011 es de fecha:", options: ["27 de julio de 2011", "4 de diciembre de 2014", "22 de marzo de 2007", "1 de octubre de 2015"], correct: 0 },
            { q: "La titularidad y ejercicio de los derechos se regula en el artículo:", options: ["3", "1", "10", "20"], correct: 0 }
        ]
    },
    
    // B2-T4: Ley Orgánica 8/2014 Régimen Disciplinario
    b2_t4_ley8: {
        title: "B2-T4: LO 8/2014 Régimen Disciplinario",
        questions: [
            { q: "¿Qué es la LO 8/2014?", options: ["Régimen Disciplinario de las FAS", "Ley de carrera", "Ley de derechos", "Ninguna"], correct: 0 },
            { q: "¿De qué año es la LO 8/2014?", options: ["2014", "2011", "2007", "2020"], correct: 0 },
            { q: "Las infracciones disciplinarias pueden ser:", options: ["Muy graves, graves y leves", "Solo graves y leves", "Solo leves", "Ninguna"], correct: 0 },
            { q: "¿Cuántos años prescribe la infracción muy grave?", options: ["5 años", "3 años", "1 año", "No prescribe"], correct: 0 },
            { q: "¿Cuántos años prescribe la infracción grave?", options: ["3 años", "5 años", "1 año", "No prescribe"], correct: 0 },
            { q: "¿Cuántos años prescribe la infracción leve?", options: ["1 año", "3 años", "6 meses", "No prescribe"], correct: 0 },
            { q: "Son infracciones muy graves:", options: ["Desobediencia, abandono, injurias", "Faltas leves", "Errores", "Ninguna"], correct: 0 },
            { q: "Son infracciones graves:", options: ["Faltas de respeto, desidia", "Faltas leves", "Errores", "Ninguna"], correct: 0 },
            { q: "Son infracciones leves:", options: ["Pequeños descuidos", "Faltas graves", "Crímenes", "Ninguna"], correct: 0 },
            { q: "Las sanciones muy graves incluyen:", options: ["Separación del servicio, pérdida de empleo", "Solo expulsión", "Solo arresto", "Ninguna"], correct: 0 },
            { q: "Las sanciones graves incluyen:", options: ["Arresto, separación temporal", "Solo arresto", "Solo advertencia", "Ninguna"], correct: 0 },
            { q: "Las sanciones leves incluyen:", options: ["Amonestación, arresto breve", "Solo advertencia", "Solo multa", "Ninguna"], correct: 0 },
            { q: "El procedimiento disciplinario puede ser:", options: ["Ordinario y sumario", "Solo ordinario", "Solo sumario", "Ninguno"], correct: 0 },
            { q: "El procedimiento disciplinario es:", options: ["Garantizador de derechos", "Solo castigo", "Solo rápido", "Ninguno"], correct: 0 },
            { q: "El expediente disciplinario incluye:", options: ["Instrucción, audiencia, resolución", "Solo instrucción", "Solo resolución", "Ninguna"], correct: 0 },
            { q: "El interesado puede:", options: ["Presentar y defenderse", "Solo recibir", "Solo aceptar", "Ninguno"], correct: 0 },
            { q: "Las sanciones se ejecutan según:", options: ["Gravedad", "Solo criterio", "Arbitrio", "Ninguno"], correct: 0 },
            { q: "La reincidencia agrava:", options: ["La sanción", "No afecta", "La reduce", "Ninguno"], correct: 0 },
            { q: "Las circunstancias atenuantes incluyen:", options: ["Arrepentimiento, cumplimiento", "Solo edad", "Solo rango", "Ninguna"], correct: 0 },
            { q: "Las circunstancias agravantes incluyen:", options: ["Dolo, reincidencia, daño", "Solo error", "Solo edad", "Ninguna"], correct: 0 },
            { q: "El régimen disciplinario militar:", options: ["Es diferente del civil", "Es igual", "No existe", "Es peor"], correct: 0 },
            { q: "El arresto militar incluye:", options: ["Internamiento", "Solo libertad", "Solo multa", "Ninguna"], correct: 0 },
            { q: "Las sanciones se notifican:", options: ["Al interesado y superiores", "Solo al interesado", "Solo al superior", "Ninguno"], correct: 0 },
            { q: "Contra la sanción puede interponerse:", options: ["Recurso", "Solo reclamación", "Nada", "Solo demanda"], correct: 0 },
            { q: "Las infracciones se aplican a:", options: ["Todos los militares", "Solo tropa", "Solo oficiales", "Civil"], correct: 0 },
            { q: "La Ley Orgánica 8/2014 regula el régimen disciplinario de:", options: ["Las Fuerzas Armadas", "Las comunidades autónomas", "Los ministerios civiles", "La OTAN"], correct: 0 },
            { q: "La Ley Orgánica 8/2014 fue aprobada el:", options: ["4 de diciembre de 2014", "27 de julio de 2011", "21 de marzo de 2014", "28 de septiembre de 2015"], correct: 0 },
            { q: "Según su índice, la LO 8/2014 incluye un título preliminar de:", options: ["Disposiciones generales", "Procedimiento electoral", "Política exterior", "Defensa europea"], correct: 0 }
        ]
    },
    
    // B2-T5: RD 176/2014 Iniciativas y quejas
    b2_t5_quejas: {
        title: "B2-T5: RD 176/2014 Iniciativas y Quejas",
        questions: [
            { q: "¿Qué es el RD 176/2014?", options: ["Tramitación de iniciativas y quejas", "Régimen disciplinario", "Carrera militar", "Ninguno"], correct: 0 },
            { q: "Las iniciativas permiten:", options: ["Proponer mejoras", "Solo queja", "Solo recurso", "Ninguno"], correct: 0 },
            { q: "Las quejas permiten:", options: ["Reclamar por situaciones", "Solo proponer", "Solo recurso", "Ninguno"], correct: 0 },
            { q: "Las iniciativas se presentan ante:", options: ["Superior jerárquico", "Tribunal", "ONG", "Ninguno"], correct: 0 },
            { q: "Las quejas se presentan ante:", options: ["Superior jerárquico", "Tribunal", "ONG", "Ninguno"], correct: 0 },
            { q: "El plazo para responder es de:", options: ["30 días", "60 días", "15 días", "Sin plazo"], correct: 0 },
            { q: "Las iniciativas incluyen:", options: ["Régimen de personal y condiciones de vida", "Solo régimen", "Solo condiciones", "Ninguno"], correct: 0 },
            { q: "Las quejas pueden ser:", options: ["Individuales o colectivas", "Solo individuales", "Solo colectivas", "Ninguna"], correct: 0 },
            { q: "El procedimiento puede ser:", options: ["Oral o escrito", "Solo escrito", "Solo oral", "Ninguno"], correct: 0 },
            { q: "Si no hay respuesta se entiende:", options: ["Desestimada", "Estimada", "Pendiente", "Ninguna"], correct: 0 },
            { q: "Contra la respuesta puede interponerse:", options: ["Recurso ante superior", "Demanda", "Nada", "Queja"], correct: 0 },
            { q: "Las iniciativas son:", options: ["Derecho del militar", "Obligación", "Prohibido", "Ninguno"], correct: 0 },
            { q: "Las iniciativas no pueden:", options: ["Afectar a la defensa nacional", "Proponer mejoras", "Reclamar", "Nada"], correct: 0 },
            { q: "Las quejas son:", options: ["Derecho del militar", "Obligación", "Prohibido", "Ninguno"], correct: 0 },
            { q: "Las quejas deben ser:", options: ["Veraces y respetuosas", "Solo veraces", "Solo respetuosas", "Ninguna"], correct: 0 },
            { q: "El procedimiento incluye:", options: ["Recepción, tramitación, respuesta", "Solo recepción", "Solo respuesta", "Ninguno"], correct: 0 },
            { q: "Las iniciativas colectivas firman:", options: ["Todos los solicitantes", "Solo uno", "Solo representantes", "Ninguno"], correct: 0 },
            { q: "El plazo para presentar es de:", options: ["No hay plazo", "30 días", "60 días", "1 año"], correct: 0 },
            { q: "El militar puede presentar:", options: ["Iniciativas y quejas", "Solo iniciativas", "Solo quejas", "Ninguna"], correct: 0 },
            { q: "Las iniciativas se clasifican en:", options: ["De régimen de personal y condiciones de vida", "Solo personales", "Solo condiciones", "Ninguna"], correct: 0 },
            { q: "Las respuestas deben ser:", options: ["Motivadas", "Sin motivación", "Opcionales", "Ninguno"], correct: 0 },
            { q: "Si la iniciativa es estimada se:", options: ["Ejecuta si es posible", "Archiva", "No hace nada", "Solo responde"], correct: 0 },
            { q: "El procedimiento es:", options: ["Garantista", "Arbitrario", "Discrecional", "Ninguno"], correct: 0 },
            { q: "El interesado puede aportar:", options: ["Documentación", "Solo oral", "Solo escrito", "Ninguno"], correct: 0 },
            { q: "El competente para resolver es:", options: ["Superior jerárquico", "El mismo", "Tribunal", "Ninguno"], correct: 0 },
            { q: "El RD 176/2014 regula la tramitación de las iniciativas y:", options: ["Quejas", "Sanciones penales", "Recursos de amparo", "Nombramientos"], correct: 0 },
            { q: "El RD 176/2014 es de fecha:", options: ["21 de marzo de 2014", "4 de diciembre de 2014", "8 de febrero de 2019", "1 de octubre de 2015"], correct: 0 },
            { q: "Las iniciativas y quejas del RD 176/2014 se refieren al régimen de personal y a las:", options: ["Condiciones de vida", "Elecciones generales", "Operaciones exteriores", "Normas tributarias"], correct: 0 }
        ]
    },
    
    // B2-T6: Ley Orgánica 3/2007 Igualdad
    b2_t6_igualdad: {
        title: "B2-T6: LO 3/2007 Igualdad",
        questions: [
            { q: "¿Qué es la LO 3/2007?", options: ["Igualdad efectiva entre mujeres y hombres", "Igualdad ante la ley", "No discriminación", "Ninguna"], correct: 0 },
            { q: "El ámbito de la igualdad incluye:", options: ["Mujeres y hombres", "Solo mujeres", "Solo hombres", "Ninguno"], correct: 0 },
            { q: "El principio de no discriminación significa:", options: ["Mismo trato ante la ley", "Trato diferente", "Solo positivo", "Ninguno"], correct: 0 },
            { q: "Las acciones positivas implican:", options: ["Medidas para equilibrar", "Discriminar", "Same as nothing", "Ninguno"], correct: 0 },
            { q: "El principio de igualdad se aplica en:", options: ["Empleo público y privado", "Solo público", "Solo privado", "Ninguno"], correct: 0 },
            { q: "El derecho de conciliación incluye:", options: ["Vida laboral y familiar", "Solo laboral", "Solo familiar", "Ninguno"], correct: 0 },
            { q: "La representación equilibrada implica:", options: ["Al menos 40% de cada sexo", "50% exacto", "No hay mínimo", "Ninguno"], correct: 0 },
            { q: "El acoso sexual es:", options: ["Prohibido y sancionable", "Tolerado", "Legal", "Ninguno"], correct: 0 },
            { q: "El acoso por razón de sexo es:", options: ["Prohibido y sancionable", "Tolerado", "Legal", "Ninguno"], correct: 0 },
            { q: "Las empresas deben:", options: ["Plan de igualdad", "Solo contratar", "Solo pagar", "Ninguno"], correct: 0 },
            { q: "El sector público debe:", options: ["Garantizar igualdad", "Solo contratar", "Solo pagar", "Ninguno"], correct: 0 },
            { q: "Las medidas de discriminación positiva:", options: ["Son temporales", "Permanentes", "Prohibidas", "Ningunas"], correct: 0 },
            { q: "El uso del lenguaje inclusivo busca:", options: ["Evitar sexismo", "Usar solo masculino", "Usar solo femenino", "Ninguno"], correct: 0 },
            { q: "La tutela judicial incluye:", options: ["Protección y sanción", "Solo protección", "Solo sanción", "Ninguna"], correct: 0 },
            { q: "Las víctimas de violencia de género tienen:", options: ["Protección especial", "Igual que todas", "Ninguna protección", "Ninguno"], correct: 0 },
            { q: "Las fuerzas armadas deben:", options: ["Garantizar igualdad", "Solo contratar hombres", "Solo contratar mujeres", "Ninguno"], correct: 0 },
            { q: "El régimen de las FAS incluye:", options: ["Igualdad de oportunidades", "Discriminación positiva", "Ninguno", "Separado"], correct: 0 },
            { q: "Las pruebas de selección:", options: ["No pueden discriminar por sexo", "Pueden discriminar", "Solo hombres", "Solo mujeres"], correct: 0 },
            { q: "El derecho de promoción debe ser:", options: ["Basado en mérito y capacidad", "Por antigüedad", "Por sexo", "Ninguno"], correct: 0 },
            { q: "La formación incluye:", options: ["Igualdad y no discriminación", "Solo técnica", "Solo operativa", "Ninguna"], correct: 0 },
            { q: "Las ausencias por violencia son:", options: ["Justificadas", "Injustificadas", "Descuentan", "Ningunas"], correct: 0 },
            { q: "Los planes de igualdad incluyen:", options: ["Medidas, objetivos, evaluación", "Solo medidas", "Solo objetivos", "Ninguno"], correct: 0 },
            { q: "Las diferencias de retribución:", options: ["Prohibido sin justificación", "Allowed", "Solo positivo", "Ninguno"], correct: 0 },
            { q: "La representación sindical debe:", options: ["Tener equilibrio de género", "No importa", "Solo hombres", "Solo mujeres"], correct: 0 },
            { q: "Las sanciones por discriminación incluyen:", options: ["Graves para discriminación", "Leves", "Ningunas", "Solo leves"], correct: 0 },
            { q: "La LO 3/2007 fue aprobada el:", options: ["22 de marzo de 2007", "27 de julio de 2011", "8 de febrero de 2019", "1 de octubre de 2015"], correct: 0 },
            { q: "El objeto de la LO 3/2007 es hacer efectivo el derecho de igualdad de trato entre:", options: ["Mujeres y hombres", "Militares y civiles", "Nacionales y extranjeros", "Oficiales y tropa"], correct: 0 },
            { q: "El Título I de la LO 3/2007 trata sobre el principio de igualdad y la tutela contra la:", options: ["Discriminación", "Jerarquía", "Sanción", "Movilidad"], correct: 0 }
        ]
    },
    
    // B2-T7: Observatorio e igualdad + Protocolo acoso
    b2_t7_observatorio: {
        title: "B2-T7: Observatorio y Protocolo Acoso",
        questions: [
            { q: "¿Qué es el Observatorio Militar para la igualdad?", options: ["Órgano para igualdad en FAS", "Centro de investigación", "Tribunal", "Ninguno"], correct: 0 },
            { q: "¿Qué Orden regula el Observatorio?", options: ["Orden DEF/111/2019", "Orden DEF/2019", "Ley 3/2007", "Ninguna"], correct: 0 },
            { q: "El régimen del Observatorio incluye:", options: ["Estudios, propuestas, divulgación", "Solo estudios", "Solo propuestas", "Ninguno"], correct: 0 },
            { q: "El Protocolo contra acoso sexual es de:", options: ["Resolución 400/38199/2015", "2014", "2016", "Ninguno"], correct: 0 },
            { q: "El Protocolo se aprueba por:", options: ["Acuerdo del Consejo de Ministros", "Real Decreto", "Orden ministerial", "Ley"], correct: 0 },
            { q: "El acoso sexual incluye:", options: ["Conducta no deseada de naturaleza sexual", "Solo físico", "Solo verbal", "Ninguno"], correct: 0 },
            { q: "El acoso por razón de sexo incluye:", options: ["Conducta por ser mujer/hombre", "Solo físico", "Solo verbal", "Ninguno"], correct: 0 },
            { q: "La víctima de acoso puede:", options: ["Presentar denuncia", "Solo callar", "Solo irse", "Ninguno"], correct: 0 },
            { q: "La Orden de las Unidades de Protección es:", options: ["Orden DEF/482/2016", "2015", "2017", "Ninguna"], correct: 0 },
            { q: "Las Unidades de Protección:", options: ["Previenen y protegen", "Solo castigan", "Solo investigan", "Ninguno"], correct: 0 },
            { q: "El procedimiento del Protocolo incluye:", options: ["Denuncia, investigación, resolución", "Solo denuncia", "Solo resolución", "Ninguno"], correct: 0 },
            { q: "El procedimiento es:", options: ["Confidencial", "Público", "Solo para la víctima", "Ninguno"], correct: 0 },
            { q: "La víctima tiene derecho a:", options: ["Asistencia y protección", "Solo asistencia", "Solo protección", "Ninguno"], correct: 0 },
            { q: "El procedimiento es:", options: ["Rápido y eficaz", "Lento", "Solo para hombres", "Ninguno"], correct: 0 },
            { q: "Las sanciones por acoso incluyen:", options: ["Disciplinarias y laborales", "Solo disciplinarias", "Solo laborales", "Ningunas"], correct: 0 },
            { q: "Las represalias están:", options: ["Prohibidas", "Allowed", "Solo algunas", "Ninguno"], correct: 0 },
            { q: "La formación en igualdad incluye:", options: ["Prevención de acoso", "Solo técnicas", "Solo tácticas", "Ninguna"], correct: 0 },
            { q: "El Observatorio se reúne:", options: ["Periódicamente", "Solo una vez", "Nunca", "Solo si hay crisis"], correct: 0 },
            { q: "Las recomendaciones del Observatorio:", options: ["Son vinculantes", "Solo consultivas", "Obligatorias", "Ningunas"], correct: 0 },
            { q: "El seguimiento del Protocolo lo hace:", options: ["Unidad de Protección", "Solo víctima", "Solo mandos", "Ninguno"], correct: 0 },
            { q: "Las actuaciones deben ser:", options: ["Objetivo e imparcial", "Subjetivo", "Parcial", "Ninguno"], correct: 0 },
            { q: "La mediación en acoso:", options: ["Puede utilizarse si ambas partes quieren", "Obligatoria", "Prohibida", "Nunca"], correct: 0 },
            { q: "La documentación del procedimiento es:", options: ["Confidencial", "Pública", "Solo para víctima", "Ninguno"], correct: 0 },
            { q: "Las víctimas de violencia de género tienen:", options: ["Derechos específicos", "Iguales que todas", "Menos derechos", "Ninguno"], correct: 0 },
            { q: "La difusión del Protocolo llega:", options: ["A todos los militares", "Solo a mujeres", "Solo a mandos", "Ninguno"], correct: 0 },
            { q: "La Orden DEF/111/2019 regula la estructura y funcionamiento del:", options: ["Observatorio Militar para la Igualdad", "Consejo de Defensa", "Tribunal Militar Central", "ISFAS"], correct: 0 },
            { q: "Según la Orden DEF/111/2019, el Observatorio depende directamente del:", options: ["Subsecretario de Defensa", "JEMAD", "Ministro del Interior", "Congreso"], correct: 0 },
            { q: "Las Unidades de Protección frente al Acoso se regulan por la Orden:", options: ["DEF/482/2016", "DEF/111/2019", "DEF/264/2023", "DEF/710/2020"], correct: 0 }
        ]
    },
    
    // B2-T8: Ley 39/2015 Procedimiento Administrativo
    b2_t8_ley39: {
        title: "B2-T8: Ley 39/2015 PAC",
        questions: [
            { q: "¿Qué es la Ley 39/2015?", options: ["Procedimiento Administrativo Común", "Régimen jurídico", "Defensa", "Ninguna"], correct: 0 },
            { q: "¿De qué año es la Ley 39/2015?", options: ["2015", "2010", "2020", "2005"], correct: 0 },
            { q: "El procedimiento administrativo incluye:", options: ["Iniciación, instrucción, resolución", "Solo iniciación", "Solo resolución", "Ninguno"], correct: 0 },
            { q: "El procedimiento puede ser:", options: ["De oficio o a solicitud", "Solo de oficio", "Solo solicitud", "Ninguno"], correct: 0 },
            { q: "Los interesados tienen derecho a:", options: ["Participar y ser notificados", "Solo participar", "Solo ser notificados", "Ninguno"], correct: 0 },
            { q: "Las alegaciones se presentan:", options: ["Antes de la resolución", "Después", "Solo durante", "Ninguno"], correct: 0 },
            { q: "El silencio administrativo puede ser:", options: ["Positivo o negativo", "Solo positivo", "Solo negativo", "Ninguno"], correct: 0 },
            { q: "En procedimientos de autorización el silencio es:", options: ["Estimatorio", "Desestimatorio", "No hay silencio", "Indiferente"], correct: 0 },
            { q: "En procedimientos sancionadores el silencio es:", options: ["Desestimatorio", "Estimatorio", "No hay silencio", "Indiferente"], correct: 0 },
            { q: "Las notificaciones se hacen en:", options: ["Registro electrónico", "Solo correo", "Solo presencial", "Ninguno"], correct: 0 },
            { q: "El plazo para resolver es de:", options: ["3 meses si no hay otro", "6 meses", "1 mes", "Sin límite"], correct: 0 },
            { q: "El expediente incluye:", options: ["Documentación de todo el procedimiento", "Solo la solicitud", "Solo la resolución", "Ninguno"], correct: 0 },
            { q: "Los actos administrativos son:", options: ["Presunción de legalidad", "Ilegales por defecto", "Solo gubernativos", "Irrecurribles"], correct: 0 },
            { q: "Contra los actos puede interponerse:", options: ["Recurso administrativo", "Demanda civil", "Denuncia penal", "Nada"], correct: 0 },
            { q: "El recurso de alzada es ante:", options: ["Superior jerárquico", "El mismo órgano", "Tribunal", "Ninguno"], correct: 0 },
            { q: "El recurso potestativo de reposición es ante:", options: ["El mismo órgano", "Superior", "Tribunal", "Ninguno"], correct: 0 },
            { q: "La revisión de oficio es:", options: ["Para actos nulos o anulables", "Para todos", "Para ninguno", "Ninguno"], correct: 0 },
            { q: "Son actos nulos:", options: ["Los que lesionan derechos fundamentales", "Los que no me gustan", "Los leves", "Ninguno"], correct: 0 },
            { q: "Son actos anulables:", options: ["Los que vulneran la ley", "Los nulos", "Los vigentes", "Ninguno"], correct: 0 },
            { q: "Los principios del procedimiento incluyen:", options: ["Impulso, economía, celeridad", "Solo rigor", "Solo formalismo", "Ninguna"], correct: 0 },
            { q: "El derecho de los interesados incluye:", options: ["Derecho a información y asistencia", "Solo información", "Solo asistencia", "Ninguno"], correct: 0 },
            { q: "La representación ante la Admin. requiere:", options: ["Poder o representación", "Solo poder", "Solo presencia física", "Ninguno"], correct: 0 },
            { q: "Los medios de prueba pueden ser:", options: ["Documental, pericial, testifical", "Solo documental", "Solo testifical", "Ninguna"], correct: 0 },
            { q: "La resolución administrativa debe ser:", options: ["Motivada", "Sin motivación", "Opcional", "Ninguna"], correct: 0 },
            { q: "La ejecutividad de los actos es:", options: ["Inmediata", "Solo judicial", "Solo legislativa", "Ninguna"], correct: 0 },
            { q: "La Ley 39/2015 regula el Procedimiento Administrativo Común de las:", options: ["Administraciones Públicas", "Fuerzas Armadas exclusivamente", "Cortes Generales", "Misiones internacionales"], correct: 0 },
            { q: "Según el índice de la Ley 39/2015, el Título I trata de:", options: ["Los interesados en el procedimiento", "Los órganos constitucionales", "Las Fuerzas Armadas", "La Seguridad Nacional"], correct: 0 },
            { q: "La Ley 39/2015 fue aprobada el:", options: ["1 de octubre de 2015", "28 de septiembre de 2015", "22 de marzo de 2007", "4 de diciembre de 2014"], correct: 0 }
        ]
    },
    
    // ============================================
    // BLOQUE 3: SEGURIDAD NACIONAL
    // ============================================
    
    // B3-T1: Ley 36/2015 y Estrategia Seguridad Nacional
    b3_t1_seguridad: {
        title: "B3-T1: Ley 36/2015 y Estrategia 2021",
        questions: [
            { q: "¿Qué es la Ley 36/2015?", options: ["De Seguridad Nacional", "De defensa", "De inteligencia", "Ninguna"], correct: 0 },
            { q: "¿De qué año es la Ley 36/2015?", options: ["2015", "2010", "2020", "2005"], correct: 0 },
            { q: "¿Qué es el RD 1150/2021?", options: ["Estrategia de Seguridad Nacional 2021", "Ley de defensa", "Ley de inteligencia", "Ninguno"], correct: 0 },
            { q: "La Estrategia de Seguridad Nacional aprueba:", options: ["Líneas de acción estratégica", "Solo estructura", "Solo presupuesto", "Ninguno"], correct: 0 },
            { q: "Las amenazas a la seguridad nacional incluyen:", options: ["Terrorismo, cibercrimen, pandemias", "Solo terrorismo", "Solo guerras", "Ninguna"], correct: 0 },
            { q: "El Sistema de Seguridad Nacional es para:", options: ["Coordinar respuestas", "Solo inteligencia", "Solo defensa", "Ninguno"], correct: 0 },
            { q: "El régimen de la seguridad nacional es:", options: ["Preventivo y reactivo", "Solo reactivo", "Solo preventivo", "Ninguno"], correct: 0 },
            { q: "La Seguridad Nacional depende del:", options: ["Presidente del Gobierno", "Ministro de Defensa", "Rey", "JEMAD"], correct: 0 },
            { q: "El Director del Departamento de Seguridad Nacional depende de:", options: ["Presidente del Gobierno", "Ministro del Interior", "Ministro de Defensa", "Rey"], correct: 0 },
            { q: "El Comité de Seguridad Nacional es:", options: ["Órgano de coordinación", "De ejecución", "De control", "Ninguno"], correct: 0 },
            { q: "La respuesta a crisis incluye:", options: ["Fases de prevención, respuesta, recuperación", "Solo respuesta", "Solo recuperación", "Ninguna"], correct: 0 },
            { q: "Las capacidades de la seguridad nacional incluyen:", options: ["Defensa, inteligencia, cooperación", "Solo defensa", "Solo inteligencia", "Ninguna"], correct: 0 },
            { q: "La seguridad nacional es:", options: ["Integral y multidimensional", "Solo militar", "Solo civil", "Ninguno"], correct: 0 },
            { q: "Las capacidades incluyen:", options: ["Militares, policiales, diplomáticas", "Solo militares", "Solo policiales", "Ninguna"], correct: 0 },
            { q: "El principio de unidad de acción significa:", options: ["Coordinación entre organismos", "Separación", "Competencia", "Ninguno"], correct: 0 },
            { q: "La solidaridad territorial incluye:", options: ["Apoyo entre administraciones", "Solo central", "Solo autonomías", "Ninguno"], correct: 0 },
            { q: "La actuación proactiva implica:", options: ["Anticiparse a las amenazas", "Solo reaccionar", "Solo defender", "Ninguno"], correct: 0 },
            { q: "La resiliencia incluye:", options: ["Capacidad de recuperación", "Solo resistencia", "Solo defensa", "Ninguna"], correct: 0 },
            { q: "La cooperación internacional es:", options: ["Con aliados y socios", "Solo UE", "Solo OTAN", "Ninguno"], correct: 0 },
            { q: "La Estrategia de 2021 sustituye a la de:", options: ["2017", "2015", "2019", "Ninguna"], correct: 0 },
            { q: "Las amenazas híbridas incluyen:", options: ["Combinación de medios convencionales y blandos", "Solo militares", "Solo económicas", "Ninguna"], correct: 0 },
            { q: "El espacio cibernético es:", options: ["Prioridad en seguridad", "Secundario", "No incluido", "Ninguno"], correct: 0 },
            { q: "La seguridad económica incluye:", options: ["Proteger intereses económicos", "Solo defensa", "Solo inteligencia", "Ninguna"], correct: 0 },
            { q: "La seguridad energética incluye:", options: ["Garantizar suministro", "Solo producción", "Solo distribución", "Ninguno"], correct: 0 },
            { q: "La seguridad sanitaria incluye:", options: ["Preparación ante pandemias", "Solo hospitales", "Solo medicamentos", "Ninguna"], correct: 0 },
            { q: "La Ley 36/2015, de Seguridad Nacional, es de fecha:", options: ["28 de septiembre de 2015", "1 de octubre de 2015", "28 de diciembre de 2021", "19 de mayo de 2020"], correct: 0 },
            { q: "El RD 1150/2021 aprueba la Estrategia de Seguridad Nacional:", options: ["2021", "2017", "2015", "2024"], correct: 0 },
            { q: "El RD 1150/2021 deroga el Real Decreto:", options: ["1008/2017", "205/2024", "521/2020", "176/2014"], correct: 0 }
        ]
    },
    
    // B3-T2: PDC-01 Doctrina para el empleo de las FAS
    b3_t2_pdc01: {
        title: "B3-T2: PDC-01 Doctrina FAS",
        questions: [
            { q: "¿Qué es la PDC-01?", options: ["Doctrina para el empleo de las FAS", "Plan de contingencia", "Estrategia militar", "Ninguna"], correct: 0 },
            { q: "¿Qué es la PDC-01(B)?", options: ["Versión actualizada de la doctrina", "Primera versión", "Versión provisional", "Ninguna"], correct: 0 },
            { q: "El empleo de las FAS se basa en:", options: ["Doctrina conjunta", "Solo cada ejército", "Solo cada unidad", "Ninguna"], correct: 0 },
            { q: "El régimen operativo incluye:", options: ["Mando y control, integración de fuerzas", "Solo combate", "Solo logística", "Ninguno"], correct: 0 },
            { q: "La doctrina conjunta implica:", options: ["Coordinación de todos los ejércitos", "Solo tierra", "Solo mar", "Solo aire"], correct: 0 },
            { q: "La doctrina combinada incluye:", options: ["Con otros países", "Solo España", "Solo la UE", "Solo la ONU"], correct: 0 },
            { q: "El mando es:", options: ["Autoridad para dirigir fuerzas", "Solo para dar órdenes", "Solo para decidir", "Ninguno"], correct: 0 },
            { q: "El control implica:", options: ["Dirección y supervisión", "Solo dirección", "Solo supervisión", "Ninguno"], correct: 0 },
            { q: "Las operaciones pueden ser:", options: ["Ofensivas, defensivas, estabilidad", "Solo ofensivas", "Solo defensivas", "Ningunas"], correct: 0 },
            { q: "La interdependencia significa:", options: ["Cada fuerza depende de otras", "Solo independencia", "Solo dependencia", "Ninguna"], correct: 0 },
            { q: "La respuesta a crisis incluye:", options: ["Fases de empleo", "Solo una fase", "Solo última fase", "Ninguna"], correct: 0 },
            { q: "Las fases de las FAS incluyen:", options: ["Proyección, sostenimiento, repliegue", "Solo proyección", "Solo sostenimiento", "Ninguna"], correct: 0 },
            { q: "La inteligencia es:", options: ["Apoyo a la decisión", "Solo información", "Solo espías", "Ninguno"], correct: 0 },
            { q: "La logística incluye:", options: ["Aprovisionamiento, mantenimiento, transporte", "Solo aprovisionamiento", "Solo transporte", "Ninguna"], correct: 0 },
            { q: "Las comunicaciones son:", options: ["Vitales para el mando y control", "Secundarias", "No importantes", "Ninguno"], correct: 0 },
            { q: "La protección incluye:", options: ["Protección de fuerzas y población", "Solo fuerzas", "Solo población", "Ninguna"], correct: 0 },
            { q: "La información es:", options: ["Controlar la narrativa", "Solo propaganda", "Solo comunicación", "Ninguno"], correct: 0 },
            { q: "Las reglas de engajamiento:", options: ["Limitan el uso de la fuerza", "Permiten todo", "Solo para aliados", "Ningunas"], correct: 0 },
            { q: "La doctrina conjunta integra:", options: ["Todas las capacidades", "Solo las terrestres", "Solo las aéreas", "Ninguna"], correct: 0 },
            { q: "La doctrina combinada es:", options: ["Con otros países", "Solo España", "Solo la UE", "Ninguna"], correct: 0 },
            { q: "El régimen multinacional incluye:", options: ["Integración en estructuras aliadas", "Solo nacional", "Solo bilateral", "Ninguno"], correct: 0 },
            { q: "Las operaciones de estabilidad son:", options: ["Mantenimiento de la paz", "Solo guerra", "Solo defensa", "Ninguna"], correct: 0 },
            { q: "La ayuda humanitaria es:", options: ["Apoyo a poblaciones", "Solo militar", "Solo político", "Ninguno"], correct: 0 },
            { q: "Las evacuaciones son para:", options: ["Protección de nacionales", "Solo ciudadanos", "Solo militares", "Ninguna"], correct: 0 },
            { q: "La doctrina se actualiza:", options: ["Periódicamente", "Solo una vez", "Nunca", "Solo si hay guerra"], correct: 0 },
            { q: "La versión vigente citada en el temario es la PDC-01:", options: ["(B)", "(A)", "(C)", "(D)"], correct: 0 },
            { q: "La PDC-01(B) fue firmada el 17 de julio de:", options: ["2024", "2021", "2018", "2015"], correct: 0 },
            { q: "La PDC-01(B) aborda, entre otras materias, el mando y control y la integración en estructuras:", options: ["Multinacionales", "Judiciales", "Locales", "Sindicales"], correct: 0 }
        ]
    },
    
    // B3-T3: ONU
    b3_t3_onu: {
        title: "B3-T3: Organización Naciones Unidas",
        questions: [
            { q: "¿Cuándo se fundó la ONU?", options: ["1945", "1919", "1948", "1950"], correct: 0 },
            { q: "¿Cuántos Estados miembros tiene la ONU?", options: ["193", "195", "190", "200"], correct: 0 },
            { q: "¿Cuál es el órgano principal de la ONU?", options: ["Asamblea General", "Consejo de Seguridad", "Secretariado", "Ninguno"], correct: 0 },
            { q: "¿Cuántos miembros tiene el Consejo de Seguridad?", options: ["15", "20", "10", "25"], correct: 0 },
            { q: "¿Cuántos son miembros permanentes del Consejo?", options: ["5", "10", "3", "7"], correct: 0 },
            { q: "¿Cuáles son los permanentes?", options: ["EE.UU., RU, Francia, Rusia, China", "Alemania, Japón, Brasil, India", "España, Italia, Canadá", "Ninguno"], correct: 0 },
            { q: "El Consejo de Seguridad incluye:", options: ["Paz y seguridad internacional", "Solo derechos humanos", "Solo desarrollo", "Ninguno"], correct: 0 },
            { q: "Los miembros no permanentes se eligen por:", options: ["Asamblea General", "Consejo", "Secretario", "Ninguno"], correct: 0 },
            { q: "El Secretario General es:", options: ["Administrador de la organización", "Mando militar", "Legislar", "Ninguno"], correct: 0 },
            { q: "La Carta de la ONU fue firmada en:", options: ["San Francisco", "París", "Londres", "Nueva York"], correct: 0 },
            { q: "La Asamblea General tiene función de:", options: ["Debate y recomendaciones", "Veto", "Ejecución", "Ninguno"], correct: 0 },
            { q: "Los idiomas oficiales de la ONU son:", options: ["6", "4", "8", "10"], correct: 0 },
            { q: "España es miembro de la ONU desde:", options: ["1955", "1945", "1950", "1960"], correct: 0 },
            { q: "El Consejo Económico y Social es para:", options: ["Asuntos económicos y sociales", "Solo económicos", "Solo sociales", "Ninguno"], correct: 0 },
            { q: "La Corte Internacional de Justicia tiene sede en:", options: ["La Haya", "Ginebra", "Nueva York", "Viena"], correct: 0 },
            { q: "Los propósitos de la ONU incluyen:", options: ["Paz, seguridad, derechos humanos", "Solo paz", "Solo seguridad", "Ninguno"], correct: 0 },
            { q: "Las misiones de paz de la ONU se llaman:", options: ["Operaciones de mantenimiento de la paz", "Guerra", "Intervención", "Ninguna"], correct: 0 },
            { q: "El veto en el Consejo lo tienen:", options: ["Los permanentes", "Todos los miembros", "Los no permanentes", "Ninguno"], correct: 0 },
            { q: "El Capítulo VII de la Carta permite:", options: ["Acción colectiva", "Solo recomendaciones", "Solo debate", "Ninguna"], correct: 0 },
            { q: "Los objetivos de desarrollo sostenible son:", options: ["17", "8", "10", "20"], correct: 0 },
            { q: "Los derechos humanos se rigen por:", options: ["Declaración Universal", "Solo pacto", "Solo convenio", "Ninguno"], correct: 0 },
            { q: "España ha sido miembro no permanente:", options: ["Varias veces", "Nunca", "Una vez", "Dos veces"], correct: 0 },
            { q: "La cooperación de España con la ONU incluye:", options: ["Cooperación al desarrollo", "Solo militar", "Solo comercio", "Ninguno"], correct: 0 },
            { q: "La relación de la ONU con la UE incluye:", options: ["Cooperación estratégica", "Solo económica", "Solo comercial", "Ninguna"], correct: 0 },
            { q: "Las fuerzas españolas en misiones ONU son:", options: ["Contribución significativa", "Ninguna", "Mínima", "Solo observadores"], correct: 0 },
            { q: "La ONU cuenta con órganos principales en número de:", options: ["Seis", "Cuatro", "Ocho", "Diez"], correct: 0 },
            { q: "La Carta de las Naciones Unidas entró en vigor en:", options: ["1945", "1949", "1955", "1978"], correct: 0 },
            { q: "España ingresó en la ONU en:", options: ["1955", "1945", "1982", "1986"], correct: 0 }
        ]
    },
    
    // B3-T4: OTAN
    b3_t4_otan: {
        title: "B3-T4: Organización Tratado Atlántico Norte",
        questions: [
            { q: "¿Cuándo se fundó la OTAN?", options: ["1949", "1945", "1955", "1950"], correct: 0 },
            { q: "¿Cuántos países miembros tiene la OTAN?", options: ["32", "30", "28", "35"], correct: 0 },
            { q: "¿Dónde tiene su sede la OTAN?", options: ["Bruselas", "Londres", "París", "Washington"], correct: 0 },
            { q: "El objetivo de la OTAN es:", options: ["Defensa colectiva", "Solo ataque", "Solo económica", "Ninguno"], correct: 0 },
            { q: "¿Qué es el Artículo 5?", options: ["Defensa colectiva", "Derechos humanos", "Comercio", "Ninguno"], correct: 0 },
            { q: "España se incorporó a la OTAN en:", options: ["1982", "1949", "1975", "1990"], correct: 0 },
            { q: "La estructura militar incluye:", options: ["Mando Aliado Europa (SACEUR)", "Solo comando USA", "Solo comandos nacionales", "Ninguno"], correct: 0 },
            { q: "El SACEUR es siempre de:", options: ["EE.UU.", "Francia", "Reino Unido", "Alemania"], correct: 0 },
            { q: "Las operaciones de la OTAN incluyen:", options: ["De gestión de crisis", "Solo defensivas", "Solo territoriales", "Ninguna"], correct: 0 },
            { q: "El concepto estratégico de la OTAN:", options: ["Define misión y prioridades", "Solo estructura", "Solo presupuesto", "Ninguno"], correct: 0 },
            { q: "La disuasión incluye:", options: ["Nuclear y convencional", "Solo nuclear", "Solo convencional", "Ninguna"], correct: 0 },
            { q: "La relación de España con la OTAN incluye:", options: ["Bases y personal", "Solo dinero", "Solo comercio", "Ninguno"], correct: 0 },
            { q: "El Cuartel General de Allied Force Command está en:", options: ["Rota", "Madrid", "Barcelona", "Sevilla"], correct: 0 },
            { q: "La respuesta aliada es:", options: ["Colectiva e individual", "Solo colectiva", "Solo individual", "Ninguna"], correct: 0 },
            { q: "Las capacidades incluyen:", options: ["Aéreas, terrestres, marítimas, cibernéticas", "Solo terrestres", "Solo aéreas", "Ninguna"], correct: 0 },
            { q: "La cooperación euro-atlántica es con:", options: ["Países socios", "Solo miembros", "Solo Europa", "Ninguno"], correct: 0 },
            { q: "La OTAN en Afghanistan fue:", options: ["Misión ISAF", "Solo USA", "Solo UE", "Ninguna"], correct: 0 },
            { q: "La NATO Response Force es:", options: ["Fuerza de respuesta rápida", "Fuerza permanente", "Solo terrestre", "Ninguna"], correct: 0 },
            { q: "El Defense Planning es:", options: ["Planificación de defensa", "Solo presupuesto", "Solo estructura", "Ninguno"], correct: 0 },
            { q: "Los objetivos de capacidad incluyen:", options: ["2% del PIB en defensa", "1%", "5%", "Ninguno"], correct: 0 },
            { q: "La capacidad cibernética es:", options: ["Protección del espacio cibernético", "Solo ataque", "Solo defensa", "Ninguno"], correct: 0 },
            { q: "Los ejercicios incluyen:", options: ["Alliance Strike", "Solo nacionales", "Solo bilaterales", "Ninguna"], correct: 0 },
            { q: "La respuesta híbrida es contra:", options: ["Amenazas híbridas", "Solo militares", "Solo políticas", "Ninguno"], correct: 0 },
            { q: "Los socios de la OTAN incluyen:", options: ["Ucrania, Georgia, Finlandia", "Solo Europa", "Solo América", "Ninguna"], correct: 0 },
            { q: "La contribución de España a la OTAN es:", options: ["Significativa", "Mínima", "Ninguna", "Solo observador"], correct: 0 },
            { q: "La OTAN se fundó en el año:", options: ["1949", "1945", "1955", "1991"], correct: 0 },
            { q: "España ingresó en la OTAN en:", options: ["1982", "1986", "1955", "1992"], correct: 0 },
            { q: "Entre las grandes estructuras militares de la OTAN figuran ACO y:", options: ["ACT", "ONU", "OSCE", "UEO"], correct: 0 }
        ]
    },
    
    // B3-T5: OSCE
    b3_t5_osce: {
        title: "B3-T5: OSCE",
        questions: [
            { q: "¿Qué es la OSCE?", options: ["Organización para Seguridad y Cooperación en Europa", "Solo europea", "Militar", "Ninguna"], correct: 0 },
            { q: "¿Cuántos países participantes tiene?", options: ["57", "50", "60", "40"], correct: 0 },
            { q: "¿Cuándo se fundó la OSCE?", options: ["1975 (CSCE)", "1989", "1991", "1945"], correct: 0 },
            { q: "La sede de la OSCE está en:", options: ["Viena", "Ginebra", "Bruselas", "Madrid"], correct: 0 },
            { q: "El ámbito de la OSCE incluye:", options: ["Seguridad, democracia, derechos humanos", "Solo seguridad", "Solo derechos", "Ninguno"], correct: 0 },
            { q: "España es miembro desde:", options: ["1975", "1985", "1995", "2000"], correct: 0 },
            { q: "Los pilares de la OSCE son:", options: ["Seguridad, económica-ambiental, humana", "Solo militar", "Solo política", "Ninguno"], correct: 0 },
            { q: "La dimensión humana incluye:", options: ["Derechos humanos y libertades", "Solo economía", "Solo militar", "Ninguno"], correct: 0 },
            { q: "La seguridad incluye:", options: ["Control de armamentos, confianza", "Solo armas", "Solo tropas", "Ninguno"], correct: 0 },
            { q: "Las misiones de la OSCE incluyen:", options: ["Prevención de conflictos, gestión de crisis", "Solo guerra", "Solo paz", "Ninguna"], correct: 0 },
            { q: "El principio de la OSCE es:", options: ["Cooperación, no confrontación", "Solo confrontación", "Solo militar", "Ninguno"], correct: 0 },
            { q: "Los socios para cooperación incluyen:", options: ["Mediterráneo y Asia", "Solo Europa", "Solo América", "Ninguno"], correct: 0 },
            { q: "La observación electoral incluye:", options: ["Observación electoral", "Solo apoyo", "Solo críticas", "Ninguno"], correct: 0 },
            { q: "La libertad de medios incluye:", options: ["Libertad de prensa", "Solo control", "Solo regulación", "Ninguna"], correct: 0 },
            { q: "La tolerancia es para:", options: ["Contra discriminación", "Solo aceptación", "Solo tolerancia", "Ninguno"], correct: 0 },
            { q: "La seguridad energética es:", options: ["Cooperación energética", "Solo producción", "Solo consumo", "Ninguna"], correct: 0 },
            { q: "El control de armas incluye:", options: ["Convencionales, pequeño armas", "Solo nucleares", "Solo químicas", "Ninguno"], correct: 0 },
            { q: "Los órganos de la OSCE incluyen:", options: ["Cumbre, Reunión Ministerial, Consejo", "Solo cumbre", "Solo reunión", "Ninguna"], correct: 0 },
            { q: "Las medidas de confianza son:", options: ["Medidas de confianza y seguridad", "Solo armas", "Solo tropas", "Ninguno"], correct: 0 },
            { q: "La prevención de extremismo es:", options: ["Prevención de extremismo", "Solo militar", "Solo político", "Ninguna"], correct: 0 },
            { q: "La relación con la ONU es:", options: ["Cooperación y coordinación", "Subordinación", "Independencia", "Ninguno"], correct: 0 },
            { q: "La relación con la UE es:", options: ["Complementariedad", "Competencia", "Ninguna", "Solo"], correct: 0 },
            { q: "El ámbito económico incluye:", options: ["Libre comercio, desarrollo", "Solo ayuda", "Solo comercio", "Ninguno"], correct: 0 },
            { q: "El ámbito ambiental es:", options: ["Cooperación ambiental", "Solo control", "Solo protección", "Ninguna"], correct: 0 },
            { q: "La participación de España en la OSCE es:", options: ["Activa y comprometida", "Pasiva", "Solo observador", "Ninguno"], correct: 0 },
            { q: "La denominación OSCE se adopta en:", options: ["1995", "1949", "1982", "2001"], correct: 0 },
            { q: "La OSCE cuenta con Estados participantes en número de:", options: ["57", "27", "32", "46"], correct: 0 },
            { q: "La OSCE procede históricamente de la:", options: ["CSCE", "CEE", "UEO", "NATO"], correct: 0 }
        ]
    },
    
    // B3-T6: Unión Europea
    b3_t6_ue: {
        title: "B3-T6: Unión Europea",
        questions: [
            { q: "¿Cuántos países miembros tiene la UE?", options: ["27", "28", "30", "25"], correct: 0 },
            { q: "¿Cuándo se fundó la UE?", options: ["1993 (Maastricht)", "1957 (Roma)", "2001", "1945"], correct: 0 },
            { q: "¿Dónde tiene su sede el Consejo Europeo?", options: ["Bruselas", "Estrasburgo", "Luxemburgo", "Madrid"], correct: 0 },
            { q: "Las instituciones de la UE incluyen:", options: ["Consejo, Comisión, Parlamento, TC", "Solo Consejo", "Solo Comisión", "Ninguno"], correct: 0 },
            { q: "España forma parte de la UE desde:", options: ["1986", "1973", "1993", "1957"], correct: 0 },
            { q: "El Consejo Europeo define:", options: ["Prioridades políticas", "Legislar", "Ejecutar", "Ninguno"], correct: 0 },
            { q: "La Comisión Europea tiene función de:", options: ["Proponer legislación, ejecutar decisiones", "Solo legislar", "Solo ejecutar", "Ninguno"], correct: 0 },
            { q: "El Parlamento Europeo tiene función de:", options: ["Legislar y controlar", "Solo legislar", "Solo controlar", "Ninguno"], correct: 0 },
            { q: "La política común de defensa incluye:", options: ["PESD, cooperaciones estructuradas", "Solo defensa nacional", "Ninguna", "Solo OTAN"], correct: 0 },
            { q: "La política exterior es responsabilidad del:", options: ["Alto Representante", "Solo Comisión", "Solo Consejo", "Ninguno"], correct: 0 },
            { q: "El espacio Schengen implica:", options: ["Libre circulación", "Solo trabajo", "Solo residencia", "Ninguna"], correct: 0 },
            { q: "El euro es:", options: ["Moneda única", "Solo moneda", "Solo cambio", "Ninguno"], correct: 0 },
            { q: "La política agraria común es:", options: ["Comercio, pesca, agricultura", "Solo comercio", "Solo pesca", "Ninguna"], correct: 0 },
            { q: "La política de seguridad incluye:", options: ["Cooperación policial y judicial", "Solo policial", "Solo judicial", "Ninguno"], correct: 0 },
            { q: "La Carta de Derechos Fundamentales es:", options: ["Carta de Derechos Fundamentales", "Solo constitución", "Solo tratados", "Ninguna"], correct: 0 },
            { q: "La política europea de defensa incluye:", options: ["Capacidades conjuntas", "Solo armas", "Solo tropas", "Ninguno"], correct: 0 },
            { q: "La relación con la OTAN es:", options: ["Cooperación estratégica", "Competencia", "Ninguna", "Solo económica"], correct: 0 },
            { q: "La trata de seres humanos incluye:", options: ["Combatir tráfico personas", "Solo migración", "Solo asilo", "Ninguno"], correct: 0 },
            { q: "La política energética es:", options: ["Energía, medio ambiente", "Solo energía", "Solo medio", "Ninguna"], correct: 0 },
            { q: "El programa Erasmus es:", options: ["Educación, cultura, juventud", "Solo educación", "Solo cultura", "Ninguno"], correct: 0 },
            { q: "La cooperación militar europea se llama:", options: ["PESD", "Solo UE", "Solo OTAN", "Ninguna"], correct: 0 },
            { q: "Los batallones multinacionales son:", options: ["Batallones multinacionales", "Solo nacionales", "Solo bilaterales", "Ninguno"], correct: 0 },
            { q: "La industria de defensa incluye:", options: ["Industria de defensa", "Solo armas", "Solo tropas", "Ninguna"], correct: 0 },
            { q: "Los acuerdos con terceros países incluyen:", options: ["Acuerdos, socios estratégicos", "Solo aliados", "Solo vecinos", "Ninguno"], correct: 0 },
            { q: "La participación de España en la UE es:", options: ["Activa y constructiva", "Pasiva", "Solo observador", "Ninguna"], correct: 0 },
            { q: "La Unión Europea nace con el Tratado de:", options: ["Maastricht", "Washington", "Lisboa", "Roma"], correct: 0 },
            { q: "España se incorporó a las Comunidades Europeas en:", options: ["1986", "1982", "1992", "1955"], correct: 0 },
            { q: "Entre las instituciones de la UE se encuentra el Tribunal de Justicia de la:", options: ["Unión Europea", "OTAN", "OSCE", "ONU"], correct: 0 }
        ]
    },
    
    // B3-T7: Misiones Internacionales
    b3_t7_misiones: {
        title: "B3-T7: Misiones Internacionales",
        questions: [
            { q: "Las misiones de España incluyen:", options: ["Kosovo, Líbano, Afghanistan, Somalia", "Solo una", "Ninguna", "Solo África"], correct: 0 },
            { q: "La misión de Kosovo es de la:", options: ["ONU y NATO", "Solo ONU", "Solo UE", "Solo OSCE"], correct: 0 },
            { q: "La misión del Líbano es de la:", options: ["ONU (UNIFIL)", "Solo NATO", "Solo UE", "Solo ONU"], correct: 0 },
            { q: "La misión de Afghanistan fue de la:", options: ["OTAN (ISAF y Resolute Support)", "Solo ONU", "Solo UE", "Solo bilateral"], correct: 0 },
            { q: "Las misiones de paz de la ONU buscan:", options: ["Mantener o imponer la paz", "Solo guerra", "Solo ayuda", "Ninguna"], correct: 0 },
            { q: "Las misiones internacionales se aprueban por:", options: ["Cortes Generales", "Solo Gobierno", "Solo Rey", "Ninguno"], correct: 0 },
            { q: "Las misiones pueden ser:", options: ["Humanitarias, paz, combate", "Solo combate", "Solo ayuda", "Ninguna"], correct: 0 },
            { q: "Las misiones incluyen:", options: ["Protección de civiles", "Solo militares", "Solo políticos", "Ninguno"], correct: 0 },
            { q: "La formación militar incluye:", options: ["Capacitar fuerzas locales", "Solo luchar", "Solo observar", "Ninguna"], correct: 0 },
            { q: "Las operaciones de estabilidad son para:", options: ["Estabilidad y seguridad", "Solo guerra", "Solo ayuda", "Ninguno"], correct: 0 },
            { q: "Las misiones de la UE incluyen:", options: ["Operaciones Petersberg", "Solo bilaterales", "Solo ONU", "Ninguna"], correct: 0 },
            { q: "La participación de España en misiones es:", options: ["Contribuye regularmente", "Nunca", "Solo observadores", "Rara vez"], correct: 0 },
            { q: "Las misiones se enmarcan en:", options: ["PESD, ONU, NATO, UE", "Solo nacional", "Solo bilateral", "Ninguno"], correct: 0 },
            { q: "Las funciones en misiones incluyen:", options: ["Seguridad, reconstrucción, formación", "Solo seguridad", "Solo reconstrucción", "Ninguna"], correct: 0 },
            { q: "La participación de España ha sido:", options: ["Continua y creciente", "Puntual", "Decreciente", "Ninguna"], correct: 0 },
            { q: "Las decisiones sobre misiones son:", options: ["Gubernamentales y parlamentarias", "Solo gubernamental", "Solo parlamentaria", "Ninguno"], correct: 0 },
            { q: "Las operaciones pueden ser:", options: ["Bilaterales o multilaterales", "Solo bilaterales", "Solo multilaterales", "Ninguna"], correct: 0 },
            { q: "Las misiones incluyen:", options: ["Misión, reglas de engajamiento", "Solo misión", "Solo reglas", "Ninguno"], correct: 0 },
            { q: "Las reglas de engajamiento permiten:", options: ["Usar la fuerza según reglas", "Todo", "Nada", "Solo defensa"], correct: 0 },
            { q: "Los militares en misión tienen:", options: ["Derecho a protección", "Solo obligaciones", "Solo restricciones", "Ninguno"], correct: 0 },
            { q: "Los derechos en misión incluyen:", options: ["Seguro, repatriación, permisos", "Solo seguro", "Solo repatriación", "Ninguna"], correct: 0 },
            { q: "El reconocimiento de misiones incluye:", options: ["Por misiones realizadas", "No se reconoce", "Solo por una", "Ninguno"], correct: 0 },
            { q: "Los veteranos de misiones tienen:", options: ["Derechos específicos", "Solo veteranos", "Solo militares", "Ninguna"], correct: 0 },
            { q: "La promoción por méritos de guerra permite:", options: ["Ascenso por méritos de guerra", "Solo antigüedad", "Solo oposición", "Ninguno"], correct: 0 },
            { q: "La tradición de España en misiones es:", options: ["Tradición y compromiso", "Rechazo", "Indiferencia", "Ninguna"], correct: 0 },
            { q: "España participa en misiones internacionales en marcos como la ONU, la OTAN y la:", options: ["UE", "OSCE exclusivamente", "OCDE", "UNESCO"], correct: 0 },
            { q: "Las misiones internacionales pueden incluir cometidos de estabilización, formación y:", options: ["Seguridad", "Recaudación tributaria", "Actividad electoral", "Función judicial"], correct: 0 },
            { q: "La participación española en misiones internacionales se caracteriza por su continuidad y compromiso:", options: ["Exterior", "Municipal", "Autonómico", "Parlamentario"], correct: 0 }
        ]
    },
    
    // ============================================
    // TESTS COMBINADOS
    // ============================================
    
    // Tests combinados por bloque
    bloque1: {
        title: "Bloque 1: Organización - Completo",
        questions: []
    },
    bloque2: {
        title: "Bloque 2: Jurídico-Social - Completo",
        questions: []
    },
    bloque3: {
        title: "Bloque 3: Seguridad Nacional - Completo",
        questions: []
    },
    completo: {
        title: "Test Completo - Todo el Temario",
        questions: []
    },
    examen_1: {
        title: "Examen Oficial 1 - 100 preguntas",
        questions: []
    },
    examen_2: {
        title: "Examen Oficial 2 - 100 preguntas",
        questions: []
    },
    examen_3: {
        title: "Examen Oficial 3 - 100 preguntas",
        questions: []
    },
    examen_4: {
        title: "Examen Oficial 4 - 100 preguntas",
        questions: []
    },
    examen_5: {
        title: "Examen Oficial 5 - 100 preguntas",
        questions: []
    },
    examen_6: {
        title: "Examen Oficial 6 - 100 preguntas",
        questions: []
    },
    examen_7: {
        title: "Examen Oficial 7 - 100 preguntas",
        questions: []
    },
    examen_8: {
        title: "Examen Oficial 8 - 100 preguntas",
        questions: []
    },
    examen_9: {
        title: "Examen Oficial 9 - 100 preguntas",
        questions: []
    },
    examen_10: {
        title: "Examen Oficial 10 - 100 preguntas",
        questions: []
    },
    examen_11: {
        title: "Examen Oficial 11 - 100 preguntas",
        questions: []
    },
    examen_12: {
        title: "Examen Oficial 12 - 100 preguntas",
        questions: []
    },
    examen_13: {
        title: "Examen Oficial 13 - 100 preguntas",
        questions: []
    },
    examen_14: {
        title: "Examen Oficial 14 - 100 preguntas",
        questions: []
    },
    examen_15: {
        title: "Examen Oficial 15 - 100 preguntas",
        questions: []
    }
};

// Combinar preguntas por bloques
function combineBlockQuestions() {
    const block1Keys = ['b1_t1_cortes', 'b1_t1_gobierno', 'b1_t1_territorial', 'b1_t1_poderjudicial', 
                        'b1_t2_defensa', 'b1_t3_ley40', 'b1_t4_rd205', 'b1_t5_rd521', 'b1_t6_instrucciones'];
    const block2Keys = ['b2_t1_ley39', 'b2_t2_ordenanzas', 'b2_t3_ley9', 'b2_t4_ley8', 
                        'b2_t5_quejas', 'b2_t6_igualdad', 'b2_t7_observatorio', 'b2_t8_ley39'];
    const block3Keys = ['b3_t1_seguridad', 'b3_t2_pdc01', 'b3_t3_onu', 'b3_t4_otan', 
                        'b3_t5_osce', 'b3_t6_ue', 'b3_t7_misiones'];
    
    // Bloque 1
    let b1Questions = [];
    block1Keys.forEach(key => {
        if (testsData[key] && testsData[key].questions) {
            b1Questions = b1Questions.concat(testsData[key].questions);
        }
    });
    testsData.bloque1.questions = b1Questions;
    
    // Bloque 2
    let b2Questions = [];
    block2Keys.forEach(key => {
        if (testsData[key] && testsData[key].questions) {
            b2Questions = b2Questions.concat(testsData[key].questions);
        }
    });
    testsData.bloque2.questions = b2Questions;
    
    // Bloque 3
    let b3Questions = [];
    block3Keys.forEach(key => {
        if (testsData[key] && testsData[key].questions) {
            b3Questions = b3Questions.concat(testsData[key].questions);
        }
    });
    testsData.bloque3.questions = b3Questions;
    
    // Completo
    testsData.completo.questions = b1Questions.concat(b2Questions).concat(b3Questions);
}

function annotateQuestions() {
    Object.entries(testsData).forEach(([key, test]) => {
        if (!Array.isArray(test.questions)) return;
        test.questions = test.questions.map((question, index) => ({
            ...question,
            topicKey: question.topicKey || key,
            topicTitle: question.topicTitle || test.title,
            difficulty: question.difficulty || (
                index < 10 ? "easy" : index < 19 ? "medium" : "hard"
            )
        }));
    });
}

function seededShuffle(array, seed) {
    const copy = [...array];
    let randomSeed = seed;

    function nextRandom() {
        randomSeed = (randomSeed * 1664525 + 1013904223) % 4294967296;
        return randomSeed / 4294967296;
    }

    for (let index = copy.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(nextRandom() * (index + 1));
        [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }

    return copy;
}

function buildExamQuestions(seed) {
    const allQuestions = seededShuffle(testsData.completo.questions, seed);
    return allQuestions.slice(0, 100).map((question) => ({ ...question }));
}

function createExamTests() {
    const examConfigs = [
        ["examen_1", 101],
        ["examen_2", 202],
        ["examen_3", 303],
        ["examen_4", 404],
        ["examen_5", 505],
        ["examen_6", 606],
        ["examen_7", 707],
        ["examen_8", 808],
        ["examen_9", 909],
        ["examen_10", 1010],
        ["examen_11", 1111],
        ["examen_12", 1212],
        ["examen_13", 1313],
        ["examen_14", 1414],
        ["examen_15", 1515]
    ];

    examConfigs.forEach(([key, seed]) => {
        testsData[key].questions = buildExamQuestions(seed);
    });
}

// Combinar al cargar
combineBlockQuestions();
annotateQuestions();
createExamTests();
window.testsData = testsData;
