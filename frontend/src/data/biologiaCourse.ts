import type { AnswerChoice, ExerciseQuestion, Lesson, SkillUnit } from './geometriaCourse'

export interface BiologyStage { id: string; title: string; subtitle: string; sections: SkillUnit[] }

type Fact = { term: string; definition: string; application: string }
type Difficulty = ExerciseQuestion['difficulty']
type Blueprint = { id: string; lessons: [string, string, string, string]; facts: Fact[] }

const choices = (id: string, values: string[]): AnswerChoice[] => values.map((text, index) => ({ id: `${id}-c${index}`, text }))
const steps = (ideaKey: string, explanation: string) => ['Identifica la pista decisiva del enunciado.', `Relaciona esa pista con: ${ideaKey}`, explanation]
const mc = (id: string, question: string, values: string[], answer: number, explanation: string, ideaKey: string, difficulty: Difficulty = 'basico'): ExerciseQuestion => ({ id, type: 'multiple-choice', question, choices: choices(id, values), correctAnswer: `${id}-c${answer}`, explanation, ideaKey, difficulty, resolutionSteps: steps(ideaKey, explanation) })
const tf = (id: string, question: string, answer: boolean, explanation: string, ideaKey: string, difficulty: Difficulty = 'basico'): ExerciseQuestion => ({ ...mc(id, question, ['Verdadero', 'Falso'], answer ? 0 : 1, explanation, ideaKey, difficulty), type: 'true-false' })
const wb = (id: string, template: string, values: string[], answer: number, explanation: string, ideaKey: string, difficulty: Difficulty): ExerciseQuestion => { const tokens = choices(id, values); return { id, type: 'word-bank', question: 'Completa el enunciado.', correctAnswer: tokens[answer].id, explanation, ideaKey, difficulty, wordBank: { template, blankId: 'respuesta', tokens, correctTokenId: tokens[answer].id }, resolutionSteps: steps(ideaKey, explanation) } }
const matching = (id: string, question: string, pairs: [string, string][], explanation: string, ideaKey: string, difficulty: Difficulty): ExerciseQuestion => ({ id, type: 'matching', question, correctAnswer: pairs.map((_, index) => `${id}-l${index}:${id}-r${index}`), explanation, ideaKey, difficulty, resolutionSteps: steps(ideaKey, explanation), matching: { pairs: pairs.map(([left, right], index) => ({ left: { id: `${id}-l${index}`, text: left }, right: { id: `${id}-r${index}`, text: right } })) } })

const BLUEPRINTS: Blueprint[] = [
  { id: 'bio-biologia', lessons: ['Biología: la ciencia de la vida', 'Seres vivos y organización', 'Bioelementos y agua', 'Reto de fundamentos'], facts: [
    { term: 'Biología', definition: 'Ciencia fáctica que estudia los seres vivos, su origen, evolución y propiedades.', application: 'Analizar cómo una población responde al ambiente.' },
    { term: 'Método científico', definition: 'Conjunto de procedimientos que permite formular y contrastar explicaciones sobre un fenómeno.', application: 'Una hipótesis se contrasta con un experimento controlado.' },
    { term: 'Ser vivo', definition: 'Materia altamente organizada capaz de realizar metabolismo, autorregularse y evolucionar.', application: 'Un organismo mantiene funciones internas mientras intercambia materia y energía.' },
    { term: 'Organización biológica', definition: 'Jerarquía de niveles que va desde componentes químicos hasta niveles ecológicos.', application: 'Células forman tejidos, estos forman órganos y los organismos integran poblaciones.' },
    { term: 'Homeostasis', definition: 'Capacidad de mantener condiciones internas relativamente estables.', application: 'Regular la temperatura corporal ante el calor.' },
    { term: 'Bioelemento primario', definition: 'Elemento abundante que forma parte esencial de biomoléculas, como C, H, O y N.', application: 'El carbono integra glúcidos, lípidos y proteínas.' },
    { term: 'Agua', definition: 'Molécula polar que actúa como solvente y participa en reacciones biológicas.', application: 'Disolver sales y facilitar el transporte en la sangre.' },
    { term: 'Proteína', definition: 'Biomolécula formada por aminoácidos con funciones estructurales, catalíticas y defensivas.', application: 'Una enzima acelera una reacción metabólica.' },
  ] },
  { id: 'bio-virus-procariota', lessons: ['Virus: estructura y ciclo', 'Bacterias y procariotas', 'Comparar virus y células', 'Reto de microbiología'], facts: [
    { term: 'Virus', definition: 'Complejo acelular con ácido nucleico y cápside que requiere una célula para replicarse.', application: 'Un virus usa la maquinaria de una célula hospedera.' },
    { term: 'Cápside', definition: 'Cubierta proteica que protege el material genético viral.', application: 'Rodea al ADN o ARN de un virión.' },
    { term: 'Célula procariota', definition: 'Célula sin núcleo delimitado por membrana y sin organelas membranosas.', application: 'Una bacteria posee su ADN en el nucleoide.' },
    { term: 'Peptidoglucano', definition: 'Componente característico de la pared celular de muchas bacterias.', application: 'Aporta rigidez a la pared bacteriana.' },
    { term: 'Bipartición', definition: 'Reproducción asexual en la que una célula procariota se divide en dos células.', application: 'Una bacteria duplica su ADN y origina dos descendientes.' },
  ] },
  { id: 'bio-eucariotas', lessons: ['Membrana y transporte', 'Organelas celulares', 'Núcleo y expresión genética', 'Reto de citología'], facts: [
    { term: 'Membrana plasmática', definition: 'Barrera selectiva formada principalmente por lípidos y proteínas que regula el intercambio.', application: 'Controla el ingreso de glucosa a la célula.' },
    { term: 'Ósmosis', definition: 'Movimiento de agua a través de una membrana desde menor hacia mayor concentración de solutos.', application: 'Una célula cambia su volumen en un medio hipertónico.' },
    { term: 'Mitocondria', definition: 'Organelo donde ocurre gran parte de la respiración celular y producción de ATP.', application: 'Oxida nutrientes para obtener energía utilizable.' },
    { term: 'Aparato de Golgi', definition: 'Organelo que modifica, empaqueta y dirige productos celulares para su secreción.', application: 'Empaqueta proteínas antes de la exocitosis.' },
    { term: 'Núcleo', definition: 'Organelo que contiene la mayor parte del ADN y regula actividades celulares.', application: 'La cromatina se condensa en cromosomas durante la división.' },
  ] },
  { id: 'bio-tejidos', lessons: ['Tejidos vegetales', 'Tejidos animales', 'Transporte y sostén', 'Reto de histología'], facts: [
    { term: 'Xilema', definition: 'Tejido vascular vegetal que transporta savia bruta principalmente desde la raíz.', application: 'Conduce agua y sales minerales hacia las hojas.' },
    { term: 'Floema', definition: 'Tejido vascular vegetal que transporta savia elaborada desde órganos fotosintéticos.', application: 'Distribuye azúcares producidos por las hojas.' },
    { term: 'Tejido epitelial', definition: 'Tejido de revestimiento con células muy unidas y poca matriz extracelular.', application: 'Cubre la epidermis y reviste cavidades internas.' },
    { term: 'Tejido conectivo', definition: 'Tejido con abundante matriz extracelular que cumple soporte, unión y defensa.', application: 'El tejido óseo y la sangre pertenecen a este grupo.' },
    { term: 'Tejido nervioso', definition: 'Tejido especializado en recibir, procesar y transmitir información.', application: 'Neuronas y neuroglía integran este tejido.' },
  ] },
  { id: 'bio-nutricion', lessons: ['Nutrición y fotosíntesis', 'Fase luminosa y Calvin', 'Respiración celular', 'Reto de bioenergética'], facts: [
    { term: 'Fotosíntesis', definition: 'Proceso autótrofo que usa energía luminosa para formar compuestos orgánicos a partir de CO2 y agua.', application: 'Una planta produce glucosa y libera oxígeno.' },
    { term: 'Fase luminosa', definition: 'Etapa fotosintética en tilacoides que produce ATP, NADPH y libera oxígeno.', application: 'La fotólisis del agua ocurre en esta etapa.' },
    { term: 'Ciclo de Calvin', definition: 'Etapa fotosintética en el estroma que fija CO2 usando ATP y NADPH.', application: 'La enzima Rubisco participa en la fijación del carbono.' },
    { term: 'Glucólisis', definition: 'Ruta del citosol que degrada glucosa a piruvato y obtiene ATP neto.', application: 'Puede ocurrir sin oxígeno.' },
    { term: 'Fermentación', definition: 'Proceso anaeróbico que regenera NAD+ sin usar oxígeno como aceptor final.', application: 'Las levaduras producen etanol y CO2.' },
  ] },
  { id: 'bio-digestivo', lessons: ['Digestión en animales', 'Sistema digestivo humano', 'Enzimas y absorción', 'Reto de nutrición animal'], facts: [
    { term: 'Digestión intracelular', definition: 'Degradación del alimento dentro de vacuolas celulares mediante enzimas.', application: 'Una ameba engloba partículas por fagocitosis.' },
    { term: 'Digestión extracelular', definition: 'Degradación del alimento fuera de las células, en cavidades o tubos digestivos.', application: 'Las enzimas actúan en el tubo digestivo humano.' },
    { term: 'Peristaltismo', definition: 'Contracciones musculares que impulsan el alimento a lo largo del tubo digestivo.', application: 'El bolo avanza por el esófago.' },
    { term: 'Absorción', definition: 'Paso de nutrientes digeridos desde el tubo digestivo hacia sangre o linfa.', application: 'Ocurre principalmente en el intestino delgado.' },
    { term: 'Pepsina', definition: 'Enzima que inicia la digestión de proteínas en el estómago.', application: 'Se activa en el medio ácido gástrico.' },
  ] },
  { id: 'bio-circulatorio-excretor', lessons: ['Circulación y transporte', 'Sangre y vasos', 'Excreción y nefrona', 'Reto de homeostasis'], facts: [
    { term: 'Sistema circulatorio', definition: 'Sistema que transporta sustancias entre células y órganos mediante un fluido circulante.', application: 'Lleva oxígeno y nutrientes a los tejidos.' },
    { term: 'Eritrocito', definition: 'Célula sanguínea especializada en transportar oxígeno mediante hemoglobina.', application: 'En mamíferos maduros carece de núcleo.' },
    { term: 'Circulación cerrada', definition: 'Tipo de circulación en la que la sangre permanece dentro de vasos.', application: 'Ocurre en vertebrados y anélidos.' },
    { term: 'Nefrona', definition: 'Unidad funcional del riñón que filtra sangre y forma orina.', application: 'Regula agua, sales y elimina desechos.' },
    { term: 'Filtración glomerular', definition: 'Paso inicial de formación de orina desde capilares hacia la cápsula de Bowman.', application: 'Moléculas pequeñas pasan al filtrado renal.' },
  ] },
  { id: 'bio-endocrino-inmune', lessons: ['Hormonas y glándulas', 'Respuesta inmune', 'Defensas del organismo', 'Reto de regulación'], facts: [
    { term: 'Hormona', definition: 'Mensajero químico liberado por células o glándulas que actúa sobre órganos diana.', application: 'La insulina contribuye a regular glucosa sanguínea.' },
    { term: 'Glándula endocrina', definition: 'Glándula que libera hormonas directamente al medio interno o sangre.', application: 'La tiroides secreta hormonas tiroideas.' },
    { term: 'Antígeno', definition: 'Sustancia reconocida como extraña que puede desencadenar una respuesta inmune.', application: 'Una proteína viral activa defensas específicas.' },
    { term: 'Anticuerpo', definition: 'Proteína producida por linfocitos B que reconoce específicamente un antígeno.', application: 'Se une a una estructura de un patógeno.' },
    { term: 'Vacuna', definition: 'Preparación que estimula memoria inmunológica sin causar la enfermedad completa.', application: 'Prepara al sistema inmune ante un agente infeccioso.' },
  ] },
  { id: 'bio-nervioso', lessons: ['Neuronas y comunicación', 'Sistema nervioso humano', 'Reflejos y respuesta', 'Reto de coordinación'], facts: [
    { term: 'Neurona', definition: 'Célula especializada en recibir, integrar y transmitir señales nerviosas.', application: 'Conduce impulsos desde un receptor hacia un efector.' },
    { term: 'Sinapsis', definition: 'Zona funcional de comunicación entre neuronas o entre neurona y célula efectora.', application: 'Un neurotransmisor cruza un espacio sináptico.' },
    { term: 'Sistema nervioso central', definition: 'Conjunto formado por encéfalo y médula espinal que integra información.', application: 'Procesa estímulos y coordina respuestas.' },
    { term: 'Sistema simpático', definition: 'División autónoma que prepara al organismo para una situación de alerta.', application: 'Aumenta frecuencia cardiaca ante peligro.' },
    { term: 'Arco reflejo', definition: 'Circuito nervioso que produce una respuesta rápida e involuntaria ante un estímulo.', application: 'Retirar la mano de una superficie caliente.' },
  ] },
  { id: 'bio-reproduccion', lessons: ['Reproducción asexual', 'Reproducción sexual', 'Fecundación y desarrollo', 'Reto de ciclos de vida'], facts: [
    { term: 'Reproducción asexual', definition: 'Formación de descendencia a partir de un solo progenitor sin fusión de gametos.', application: 'Una bacteria se multiplica por bipartición.' },
    { term: 'Reproducción sexual', definition: 'Formación de descendencia mediante unión de gametos y recombinación genética.', application: 'La fecundación une óvulo y espermatozoide.' },
    { term: 'Fecundación interna', definition: 'Unión de gametos que ocurre dentro del aparato reproductor de la hembra.', application: 'Es característica de mamíferos.' },
    { term: 'Partenogénesis', definition: 'Desarrollo de un organismo a partir de un óvulo no fecundado.', application: 'Puede presentarse en algunos insectos.' },
    { term: 'Metamorfosis', definition: 'Conjunto de cambios marcados en forma y función durante el desarrollo de un animal.', application: 'Una larva se transforma en adulto.' },
  ] },
  { id: 'bio-genetica-1', lessons: ['Genes, alelos y cromosomas', 'Genotipo y fenotipo', 'Leyes de Mendel', 'Reto de herencia simple'], facts: [
    { term: 'Gen', definition: 'Segmento de ADN que contiene información para un producto funcional o rasgo.', application: 'Un gen puede influir en una característica heredable.' },
    { term: 'Alelo', definition: 'Forma alternativa de un gen ubicada en un mismo locus cromosómico.', application: 'A y a son variantes de un gen.' },
    { term: 'Genotipo', definition: 'Conjunto de alelos que posee un organismo para un carácter.', application: 'Un individuo Aa es heterocigoto.' },
    { term: 'Fenotipo', definition: 'Características observables resultado de genotipo y ambiente.', application: 'El color visible de una flor.' },
    { term: 'Segregación', definition: 'Principio mendeliano por el que los alelos de un gen se separan al formarse gametos.', application: 'Un individuo Aa forma gametos A y a.' },
  ] },
  { id: 'bio-genetica-2', lessons: ['Herencia no mendeliana', 'Grupos sanguíneos', 'Herencia ligada al sexo', 'Reto de genética humana'], facts: [
    { term: 'Dominancia incompleta', definition: 'Patrón en el que el heterocigoto presenta un fenotipo intermedio.', application: 'Cruzar flores rojas y blancas produce flores rosadas.' },
    { term: 'Codominancia', definition: 'Patrón en el que ambos alelos se expresan plenamente en el heterocigoto.', application: 'El grupo sanguíneo AB expresa antígenos A y B.' },
    { term: 'Herencia ligada al sexo', definition: 'Herencia de genes ubicados en cromosomas sexuales, con frecuencia en X.', application: 'Un rasgo recesivo ligado a X se observa más en varones.' },
    { term: 'Cariotipo', definition: 'Ordenamiento de cromosomas de una célula según tamaño y forma.', application: 'Permite detectar ciertas anomalías cromosómicas.' },
    { term: 'Trisomía', definition: 'Anomalía cromosómica caracterizada por tres copias de un cromosoma.', application: 'La trisomía 21 se relaciona con síndrome de Down.' },
  ] },
  { id: 'bio-evolucion', lessons: ['Origen y cambio biológico', 'Selección natural', 'Evidencias de evolución', 'Reto evolutivo'], facts: [
    { term: 'Evolución', definition: 'Cambio heredable en poblaciones a través de generaciones.', application: 'Una población cambia su frecuencia de alelos con el tiempo.' },
    { term: 'Selección natural', definition: 'Proceso por el que individuos con rasgos heredables favorables dejan más descendencia.', application: 'Una variante que mejora supervivencia se vuelve más frecuente.' },
    { term: 'Adaptación', definition: 'Rasgo heredable que aumenta supervivencia o reproducción en un ambiente.', application: 'Coloración que permite camuflaje.' },
    { term: 'Especiación', definition: 'Proceso de formación de nuevas especies por divergencia de poblaciones.', application: 'Poblaciones aisladas acumulan diferencias reproductivas.' },
    { term: 'Órgano homólogo', definition: 'Estructura con origen evolutivo común aunque pueda tener funciones distintas.', application: 'Brazo humano y aleta de ballena.' },
  ] },
  { id: 'bio-animalia', lessons: ['Diversidad animal', 'Invertebrados', 'Vertebrados', 'Reto de clasificación'], facts: [
    { term: 'Invertebrado', definition: 'Animal que no posee columna vertebral.', application: 'Un insecto pertenece a este grupo.' },
    { term: 'Vertebrado', definition: 'Animal que posee cráneo y columna vertebral.', application: 'Un anfibio pertenece a este grupo.' },
    { term: 'Artrópodo', definition: 'Invertebrado con exoesqueleto de quitina, cuerpo segmentado y apéndices articulados.', application: 'Arañas e insectos pertenecen a este filo.' },
    { term: 'Molusco', definition: 'Invertebrado de cuerpo blando, usualmente con manto y en muchos casos con concha.', application: 'Un caracol es un molusco.' },
    { term: 'Anfibio', definition: 'Vertebrado ectotermo que suele presentar vida asociada a ambientes acuáticos y terrestres.', application: 'Una rana adulta realiza respiración pulmonar y cutánea.' },
  ] },
  { id: 'bio-plantae', lessons: ['Grupos vegetales', 'Transporte vegetal', 'Reproducción en plantas', 'Reto de botánica'], facts: [
    { term: 'Briófita', definition: 'Planta no vascular que requiere ambientes húmedos para su reproducción.', application: 'Los musgos pertenecen a este grupo.' },
    { term: 'Pteridófita', definition: 'Planta vascular sin semillas que se reproduce por esporas.', application: 'Los helechos pertenecen a este grupo.' },
    { term: 'Gimnosperma', definition: 'Planta con semillas no encerradas en un fruto.', application: 'Los pinos producen semillas expuestas en conos.' },
    { term: 'Angiosperma', definition: 'Planta con flores y semillas encerradas dentro de un fruto.', application: 'Un árbol de mango pertenece a este grupo.' },
    { term: 'Estoma', definition: 'Estructura epidérmica vegetal que regula intercambio gaseoso y pérdida de agua.', application: 'Permite ingreso de CO2 a la hoja.' },
  ] },
  { id: 'bio-salud-higiene', lessons: ['Salud y enfermedad', 'Transmisión de infecciones', 'Prevención e higiene', 'Reto de salud pública'], facts: [
    { term: 'Patógeno', definition: 'Agente biológico capaz de causar enfermedad en un hospedero.', application: 'Una bacteria puede producir una infección.' },
    { term: 'Enfermedad infecciosa', definition: 'Enfermedad producida por un agente que puede transmitirse directa o indirectamente.', application: 'La influenza se transmite entre personas.' },
    { term: 'Vector biológico', definition: 'Organismo que transmite un patógeno y en el que este puede desarrollarse o multiplicarse.', application: 'Un mosquito transmite un protozoo causante de enfermedad.' },
    { term: 'Vía de transmisión', definition: 'Ruta por la cual un agente infeccioso pasa de una fuente a un hospedero susceptible.', application: 'Contacto, agua contaminada o gotas respiratorias.' },
    { term: 'Higiene', definition: 'Conjunto de prácticas orientadas a conservar salud y prevenir enfermedades.', application: 'Lavado de manos antes de manipular alimentos.' },
  ] },
  { id: 'bio-ecologia', lessons: ['Niveles ecológicos', 'Relaciones biológicas', 'Energía y ciclos', 'Reto de ecosistemas'], facts: [
    { term: 'Población', definition: 'Conjunto de individuos de la misma especie que habitan una zona y tiempo determinados.', application: 'Los zorros de una reserva natural.' },
    { term: 'Comunidad', definition: 'Conjunto de poblaciones de especies diferentes que interactúan en un área.', application: 'Plantas, aves, insectos y hongos de un bosque.' },
    { term: 'Ecosistema', definition: 'Sistema formado por comunidad de seres vivos y factores abióticos que interactúan.', application: 'Un humedal con agua, suelo, plantas y animales.' },
    { term: 'Cadena trófica', definition: 'Secuencia de transferencia de materia y energía mediante relaciones alimentarias.', application: 'Planta, herbívoro y depredador.' },
    { term: 'Sucesión ecológica', definition: 'Cambio gradual de comunidades en un ecosistema a lo largo del tiempo.', application: 'Colonización de una zona tras una erupción.' },
  ] },
  { id: 'bio-contaminacion', lessons: ['Contaminación ambiental', 'Cambio climático', 'Conservación y ANP', 'Reto ambiental'], facts: [
    { term: 'Contaminación', definition: 'Alteración perjudicial del ambiente por agentes físicos, químicos o biológicos.', application: 'Descargas de residuos deterioran la calidad de un río.' },
    { term: 'Efecto invernadero', definition: 'Fenómeno natural por el que gases atmosféricos retienen parte del calor terrestre.', application: 'El aumento excesivo de estos gases intensifica el calentamiento.' },
    { term: 'Biodiversidad', definition: 'Variedad de genes, especies y ecosistemas presentes en una región o planeta.', application: 'Un bosque con muchas especies posee alta diversidad biológica.' },
    { term: 'Área natural protegida', definition: 'Espacio terrestre o marino establecido para conservar biodiversidad y valores naturales.', application: 'Una reserva protege especies y ecosistemas vulnerables.' },
    { term: 'Desarrollo sostenible', definition: 'Desarrollo que satisface necesidades actuales sin comprometer las de generaciones futuras.', application: 'Usar recursos reduciendo impactos y conservando ecosistemas.' },
  ] },
]

const UNIT_DATA = [
  { id: 'bio-bases', title: 'Bases de la vida', subtitle: 'Biomoléculas, microorganismos y célula.', icon: '🧬', color: 'from-[#48A87A] to-[#2D7D5A]', nodes: ['bio-biologia', 'bio-virus-procariota', 'bio-eucariotas'] },
  { id: 'bio-organizacion', title: 'Organización y nutrición', subtitle: 'Tejidos, energía y digestión.', icon: '🔬', color: 'from-[#54B892] to-[#358567]', nodes: ['bio-tejidos', 'bio-nutricion', 'bio-digestivo'] },
  { id: 'bio-fisiologia', title: 'Fisiología y coordinación', subtitle: 'Sistemas que mantienen vivo al organismo.', icon: '🫀', color: 'from-[#62AFC7] to-[#3B789D]', nodes: ['bio-circulatorio-excretor', 'bio-endocrino-inmune', 'bio-nervioso'] },
  { id: 'bio-herencia', title: 'Reproducción y herencia', subtitle: 'Continuidad, variación y genética.', icon: '🧪', color: 'from-[#A183D5] to-[#735AB2]', nodes: ['bio-reproduccion', 'bio-genetica-1', 'bio-genetica-2'] },
  { id: 'bio-diversidad', title: 'Evolución y diversidad', subtitle: 'Origen, clasificación y plantas.', icon: '🦋', color: 'from-[#E6A454] to-[#C67B36]', nodes: ['bio-evolucion', 'bio-animalia', 'bio-plantae'] },
  { id: 'bio-ambiente', title: 'Salud y ambiente', subtitle: 'Prevención, ecosistemas y conservación.', icon: '🌿', color: 'from-[#4DAA7A] to-[#2B7955]', nodes: ['bio-salud-higiene', 'bio-ecologia', 'bio-contaminacion'] },
] as const

function buildLessons(blueprint: Blueprint): Lesson[] {
  return blueprint.lessons.map((title, lessonIndex) => {
    const facts = blueprint.facts
    const at = (offset: number) => facts[(lessonIndex + offset) % facts.length]
    const level: Difficulty = lessonIndex === 0 ? 'basico' : lessonIndex === 1 ? 'intermedio' : lessonIndex === 2 ? 'intermedio' : 'avanzado'
    const questionId = (position: number) => `${blueprint.id}-lesson-${lessonIndex + 1}-q${position}`
    const optionsFor = (target: Fact, mapper: (fact: Fact) => string) => {
      const pool = [target, ...facts.filter((fact) => fact !== target)].slice(0, 5)
      return { values: pool.map(mapper), answer: pool.indexOf(target) }
    }
    const definition = (position: number, fact: Fact) => { const option = optionsFor(fact, (item) => item.definition); return mc(questionId(position), `¿Qué enunciado define con precisión ${fact.term.toLowerCase()}?`, option.values, option.answer, `${fact.term} se distingue por lo siguiente: ${fact.definition}`, `Busca el rasgo exclusivo de ${fact.term.toLowerCase()}, no una definición relacionada.`, level) }
    const caseQuestion = (position: number, fact: Fact) => { const option = optionsFor(fact, (item) => item.term); return mc(questionId(position), `${fact.application} A partir de esta situación, ¿qué concepto debe emplearse?`, option.values, option.answer, `El dato funcional del caso conduce a ${fact.term.toLowerCase()}. ${fact.definition}`, `La respuesta debe explicar lo que ocurre en el caso completo.`, level) }
    const exampleQuestion = (position: number, fact: Fact) => { const option = optionsFor(fact, (item) => item.application); return mc(questionId(position), `¿Cuál de las siguientes situaciones ejemplifica mejor ${fact.term.toLowerCase()}?`, option.values, option.answer, `El ejemplo correcto muestra su función en acción: ${fact.application}`, `${fact.term}: ${fact.definition}`, level) }
    const correctionQuestion = (position: number, fact: Fact, confusedWith: Fact) => { const option = optionsFor(fact, (item) => item.definition); return mc(questionId(position), `Un estudiante afirma que ${fact.term.toLowerCase()} es «${confusedWith.definition.toLowerCase()}». ¿Qué corrección debería realizar?`, option.values, option.answer, `La afirmación confundió ${fact.term.toLowerCase()} con ${confusedWith.term.toLowerCase()}. La definición correcta es: ${fact.definition}`, `Distingue ambos conceptos por su función y no por palabras compartidas.`, level) }
    const wordBank = (position: number, fact: Fact) => { const option = optionsFor(fact, (item) => item.term); return wb(questionId(position), `El caso «${fact.application}» corresponde a {{respuesta}}.`, option.values, option.answer, `La situación describe ${fact.term.toLowerCase()}: ${fact.definition}`, 'La pista está en el proceso o función que se realiza.', level) }
    const relationQuestion = (position: number, first: Fact, second: Fact) => {
      const third = facts.find((fact) => fact !== first && fact !== second) || at(2)
      const fourth = facts.find((fact) => fact !== first && fact !== second && fact !== third) || at(3)
      const values = [`${first.term} y ${second.term}`, `${second.term} y ${first.term}`, `${first.term} y ${third.term}`, `${third.term} y ${second.term}`, `${fourth.term} y ${first.term}`]
      return mc(questionId(position), `Primero ocurre lo siguiente: ${first.application} Luego se observa que ${second.application} ¿Qué conceptos explican ambos casos, respectivamente?`, values, 0, `El primer caso corresponde a ${first.term.toLowerCase()} y el segundo a ${second.term.toLowerCase()}. El orden importa porque cada concepto responde a una pista distinta.`, `${first.term}: ${first.definition} ${second.term}: ${second.definition}`, level)
    }
    const statementsQuestion = (position: number, first: Fact, second: Fact, third: Fact) => mc(questionId(position), `Analiza los enunciados: I. ${first.term} se caracteriza porque ${first.definition.toLowerCase()} II. ${second.application} es un ejemplo de ${second.term.toLowerCase()}. III. ${third.term} presenta la definición de ${first.term.toLowerCase()}. ¿Cuáles son correctos?`, ['Solo I', 'Solo II', 'I y II', 'II y III', 'I, II y III'], 2, `I y II conservan la definición y el ejemplo correspondientes. III intercambia dos conceptos diferentes: ${third.term} no se define como ${first.term.toLowerCase()}.`, 'Comprueba cada enunciado por separado antes de elegir la combinación.', level)
    const relationActivity = (position: number) => matching(questionId(position), 'Relaciona cada situación con el proceso o estructura que la explica.', [[at(0).application, at(0).term], [at(1).application, at(1).term], [at(2).application, at(2).term]], 'Cada caso contiene una pista funcional distinta; por eso no basta reconocer una palabra aislada.', 'Relaciona primero la acción descrita y luego el nombre del concepto.', level)
    const trueStatement = (position: number, fact: Fact) => tf(questionId(position), `${fact.application} Esta situación es coherente con ${fact.term.toLowerCase()}.`, true, `La afirmación es verdadera: el caso muestra ${fact.term.toLowerCase()}, que ${fact.definition.toLowerCase()}`, `${fact.term}: ${fact.definition}`, level)
    const falseStatement = (position: number, fact: Fact, confusedWith: Fact) => tf(questionId(position), `${fact.application} Esta situación corresponde a ${confusedWith.term.toLowerCase()}.`, false, `La afirmación es falsa. El caso corresponde a ${fact.term.toLowerCase()}, no a ${confusedWith.term.toLowerCase()}.`, `${fact.term}: ${fact.definition}`, level)
    const lessonIntro = lessonIndex === 0 ? 'Reconoce el concepto y su rasgo más importante.' : lessonIndex === 1 ? 'Diferencia conceptos cercanos usando su función.' : lessonIndex === 2 ? 'Aplica los conceptos a situaciones breves de biología.' : 'Integra pistas, descarta distractores y justifica tu decisión.'
    const exercises = lessonIndex === 0
      ? [definition(1, at(0)), exampleQuestion(2, at(1)), wordBank(3, at(2)), trueStatement(4, at(3)), caseQuestion(5, at(4)), correctionQuestion(6, at(0), at(1)), relationActivity(7), exampleQuestion(8, at(2)), statementsQuestion(9, at(0), at(1), at(3)), relationQuestion(10, at(3), at(4))]
      : lessonIndex === 1
        ? [correctionQuestion(1, at(0), at(1)), caseQuestion(2, at(1)), exampleQuestion(3, at(2)), falseStatement(4, at(3), at(4)), wordBank(5, at(4)), relationQuestion(6, at(0), at(2)), definition(7, at(3)), relationActivity(8), statementsQuestion(9, at(1), at(2), at(4)), caseQuestion(10, at(0))]
        : lessonIndex === 2
          ? [caseQuestion(1, at(0)), exampleQuestion(2, at(1)), relationQuestion(3, at(2), at(3)), trueStatement(4, at(4)), statementsQuestion(5, at(0), at(2), at(4)), correctionQuestion(6, at(1), at(3)), caseQuestion(7, at(4)), wordBank(8, at(2)), relationActivity(9), caseQuestion(10, at(3))]
          : [relationQuestion(1, at(0), at(1)), statementsQuestion(2, at(1), at(2), at(4)), caseQuestion(3, at(2)), falseStatement(4, at(3), at(0)), exampleQuestion(5, at(4)), correctionQuestion(6, at(0), at(2)), relationActivity(7), caseQuestion(8, at(1)), wordBank(9, at(3)), relationQuestion(10, at(4), at(2))]
    return { id: `${blueprint.id}-lesson-${lessonIndex + 1}`, title, order: lessonIndex + 1, theory: lessonIntro, exercises }
  })
}

const byId = new Map(BLUEPRINTS.map((item) => [item.id, item]))
const TOPIC_TITLES: Record<string, string> = {
  'bio-biologia': 'Biología y biomoléculas', 'bio-virus-procariota': 'Virus y procariotas', 'bio-eucariotas': 'Células eucariotas',
  'bio-tejidos': 'Tejidos vegetales y animales', 'bio-nutricion': 'Nutrición y bioenergética', 'bio-digestivo': 'Sistema digestivo',
  'bio-circulatorio-excretor': 'Circulación y excreción', 'bio-endocrino-inmune': 'Sistema endocrino e inmune', 'bio-nervioso': 'Sistema nervioso',
  'bio-reproduccion': 'Reproducción y desarrollo', 'bio-genetica-1': 'Genética mendeliana', 'bio-genetica-2': 'Genética humana y no mendeliana',
  'bio-evolucion': 'Evolución', 'bio-animalia': 'Reino Animalia', 'bio-plantae': 'Reino Plantae',
  'bio-salud-higiene': 'Salud e higiene', 'bio-ecologia': 'Ecología y ecosistemas', 'bio-contaminacion': 'Contaminación y conservación',
}
export const BIOLOGIA_STAGE: BiologyStage = { id: 'stage-biologia-anual', title: 'Ruta anual de Biología', subtitle: 'Construye la base celular, fisiológica, genética y ecológica para resolver preguntas de admisión.', sections: UNIT_DATA.map((unit) => ({ id: unit.id, title: unit.title, subtitle: unit.subtitle, icon: unit.icon, color: unit.color, nodes: unit.nodes.map((nodeId, index) => { const blueprint = byId.get(nodeId)!; return { id: blueprint.id, title: TOPIC_TITLES[blueprint.id], icon: ['🧠', '🔎', '🧩'][index], lessons: buildLessons(blueprint) } }) })) }
