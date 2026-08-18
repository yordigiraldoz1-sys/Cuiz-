import type { AnswerChoice, ExerciseQuestion, Lesson, SkillUnit } from './geometriaCourse'

export interface EconomyTopic { id: string; title: string }
export interface EconomyUnit { id: string; title: string; description: string; topics: EconomyTopic[] }
export interface EconomyStage { id: string; title: string; subtitle: string; sections: SkillUnit[] }

export const ECONOMIA_UNITS: EconomyUnit[] = [
  { id: 'eco-bases', title: 'Bases para decidir', description: 'Cómo nace la economía y qué problemas busca resolver.', topics: [{ id: 'eco-ciencia', title: 'Definiciones y problema económico' }, { id: 'eco-division', title: 'División de la economía' }, { id: 'eco-necesidades', title: 'Necesidades humanas y pobreza' }, { id: 'eco-bienes', title: 'Bienes y servicios' }, { id: 'eco-proceso', title: 'Proceso económico' }] },
  { id: 'eco-produccion', title: 'Producción y empresa', description: 'Los recursos, el trabajo y las decisiones detrás de producir.', topics: [{ id: 'eco-sectores', title: 'Producción y sectores productivos' }, { id: 'eco-costos', title: 'Costos de producción y FPP' }, { id: 'eco-capital', title: 'Naturaleza y capital' }, { id: 'eco-trabajo', title: 'Trabajo y estructura laboral' }, { id: 'eco-empresa', title: 'Empresa' }] },
  { id: 'eco-mercados', title: 'Cómo funcionan los mercados', description: 'Intercambio, precios y decisiones de consumidores y productores.', topics: [{ id: 'eco-emprendimiento', title: 'Emprendimiento' }, { id: 'eco-circulacion', title: 'Circulación y flujo circular' }, { id: 'eco-modelos', title: 'Modelos de mercado' }, { id: 'eco-demanda', title: 'Demanda' }, { id: 'eco-oferta', title: 'Oferta y equilibrio' }] },
  { id: 'eco-finanzas', title: 'Dinero y sistema financiero', description: 'Por qué usamos dinero y cómo se mueve dentro de la economía.', topics: [{ id: 'eco-dinero', title: 'Dinero' }, { id: 'eco-inflacion', title: 'Inflación' }, { id: 'eco-credito', title: 'Crédito' }, { id: 'eco-sistema-financiero', title: 'Sistema financiero' }, { id: 'eco-sistema-bancario', title: 'Sistema bancario' }] },
  { id: 'eco-estado', title: 'Estado y comercio exterior', description: 'Tributos, presupuesto e intercambio con otros países.', topics: [{ id: 'eco-tributario', title: 'Sistema tributario' }, { id: 'eco-informal', title: 'Economía informal' }, { id: 'eco-presupuesto', title: 'Presupuesto público' }, { id: 'eco-comercio', title: 'Comercio exterior' }, { id: 'eco-elementos-comercio', title: 'Elementos del comercio exterior' }] },
  { id: 'eco-pais-mundo', title: 'Economía del país y del mundo', description: 'Indicadores, integración y las ideas que explican la economía.', topics: [{ id: 'eco-balanza', title: 'Balanza de pagos, FMI y BM' }, { id: 'eco-agregados', title: 'Agregados e indicadores económicos' }, { id: 'eco-ciclos', title: 'Ciclos, distribución e inversión' }, { id: 'eco-globalizacion', title: 'Globalización e integración económica' }, { id: 'eco-doctrinas', title: 'Doctrinas económicas' }] },
]
export const ECONOMIA_TOTAL_TOPICS = ECONOMIA_UNITS.reduce((total, unit) => total + unit.topics.length, 0)

const choices = (id: string, values: string[]): AnswerChoice[] => values.map((text, index) => ({ id: `${id}-c${index}`, text }))
const mc = (id: string, question: string, values: string[], answer: number, explanation: string, ideaKey: string, visual?: ExerciseQuestion['visual']): ExerciseQuestion => ({ id, type: 'multiple-choice', question, choices: choices(id, values), correctAnswer: `${id}-c${answer}`, explanation, ideaKey, difficulty: 'basico', visual, resolutionSteps: [ideaKey, explanation] })
const tf = (id: string, question: string, answer: boolean, explanation: string, ideaKey: string): ExerciseQuestion => { const questionData = mc(id, question, ['Verdadero', 'Falso'], answer ? 0 : 1, explanation, ideaKey); return { ...questionData, type: 'true-false' } }
const wb = (id: string, template: string, values: string[], answer: number, explanation: string, ideaKey: string, visual?: ExerciseQuestion['visual']): ExerciseQuestion => { const tokens = choices(id, values); return { id, type: 'word-bank', question: 'Completa la idea.', correctAnswer: tokens[answer].id, explanation, ideaKey, difficulty: 'basico', visual, wordBank: { template, blankId: 'respuesta', tokens, correctTokenId: tokens[answer].id }, resolutionSteps: [ideaKey, explanation] } }
const matching = (id: string, question: string, pairs: [string, string][], explanation: string, ideaKey: string): ExerciseQuestion => ({ id, type: 'matching', question, correctAnswer: pairs.map((_, index) => `${id}-l${index}:${id}-r${index}`), explanation, ideaKey, difficulty: 'intermedio', matching: { pairs: pairs.map(([left, right], index) => ({ left: { id: `${id}-l${index}`, text: left }, right: { id: `${id}-r${index}`, text: right } })) } })
const ordering = (id: string, question: string, values: string[], explanation: string, ideaKey: string): ExerciseQuestion => { const items = choices(id, values); return { id, type: 'ordering', question, correctAnswer: items.map((item) => item.id), explanation, ideaKey, difficulty: 'intermedio', ordering: { items, correctOrder: items.map((item) => item.id) } } }
const fpp = (variant: 'basic' | 'growth' | 'contraction' | 'opportunity-cost', alt: string): ExerciseQuestion['visual'] => ({ kind: 'diagram', diagram: { type: 'fpp', variant }, alt })

const firstTopicLessons: Lesson[] = [
  { id: 'eco-def-v3-lesson-1', title: 'La ciencia económica', order: 1, theory: 'La Economía estudia actividades humanas y decisiones frente a recursos limitados.', exercises: [
    mc('eco-v3-1-1', 'La Economía estudia principalmente', ['la administración de recursos escasos', 'los fenómenos climáticos', 'la composición de minerales', 'la estructura de las palabras', 'las órbitas planetarias'], 0, 'Analiza decisiones humanas sobre medios limitados.', 'La Economía estudia elecciones ante la escasez.'),
    wb('eco-v3-1-2', 'La Economía es una ciencia {{respuesta}} porque estudia la conducta humana en sociedad.', ['social', 'natural', 'médica', 'exacta'], 0, 'Sus fenómenos centrales son actividades humanas en sociedad.', 'La Economía es una ciencia social.'),
    tf('eco-v3-1-3', 'La Economía estudia únicamente dinero y bancos.', false, 'También estudia producción, intercambio, distribución y consumo.', 'La Economía no se limita al dinero.'),
    mc('eco-v3-1-4', 'El objeto de estudio de la Economía son', ['las actividades económicas humanas', 'los cuerpos celestes', 'las reacciones químicas', 'las reglas ortográficas', 'los seres vivos'], 0, 'Producir, intercambiar y consumir son actividades económicas.', 'El objeto indica qué estudia una ciencia.'),
    mc('eco-v3-1-5', 'Explicar por qué sube el desempleo cumple un fin', ['teórico', 'práctico', 'recreativo', 'jurídico', 'contable'], 0, 'El fin teórico busca explicar la realidad.', 'El fin teórico explica la realidad económica.'),
    wb('eco-v3-1-6', 'El fin práctico busca contribuir al {{respuesta}} general.', ['bienestar', 'azar', 'silencio', 'prestigio'], 0, 'Aplica conocimientos para orientar acciones útiles.', 'El fin práctico busca bienestar general.'),
    mc('eco-v3-1-7', 'Proponer una política para reducir el desempleo corresponde al fin', ['práctico', 'teórico', 'lingüístico', 'astronómico', 'histórico'], 0, 'Aquí se usa conocimiento para actuar sobre un problema.', 'El fin práctico aplica la teoría.'),
    tf('eco-v3-1-8', 'La Economía puede usar métodos inductivo y deductivo.', true, 'La inducción generaliza y la deducción aplica una regla a un caso.', 'Los métodos ayudan a estudiar la realidad.'),
    mc('eco-v3-1-9', 'Observar casos y formular una regla general es un método', ['inductivo', 'deductivo', 'aleatorio', 'contable', 'normativo'], 0, 'La inducción parte de observaciones particulares.', 'Inductivo: casos particulares a regla general.'),
    wb('eco-v3-1-10', 'El método deductivo va de una idea {{respuesta}} a un caso particular.', ['general', 'casual', 'imprecisa', 'personal'], 0, 'Parte de una ley o teoría y la aplica.', 'Deductivo: de lo general a lo particular.'),
    mc('eco-v3-1-11', 'Aplicar una ley de demanda al caso de una bodega usa el método', ['deductivo', 'inductivo', 'experimental', 'histórico', 'estadístico'], 0, 'Se aplica una generalidad a una situación concreta.', 'La deducción aplica una regla general.'),
    matching('eco-v3-1-12', 'Relaciona cada elemento con su función.', [['Objeto', 'Actividades económicas'], ['Fin teórico', 'Explicar la realidad'], ['Fin práctico', 'Orientar bienestar']], 'El objeto dice qué se estudia y los fines para qué.', 'Objeto es qué; finalidad es para qué.'),
    ordering('eco-v3-1-13', 'Ordena el método inductivo.', ['Observar casos particulares', 'Encontrar una regularidad', 'Formular una regla general'], 'La inducción construye una conclusión general desde hechos.', 'La inducción construye teoría desde observaciones.'),
    mc('eco-v3-1-14', '¿Qué situación pertenece al estudio económico?', ['Una familia reparte su ingreso', 'Un astrónomo estudia un cometa', 'Una bióloga clasifica especies', 'Un químico mide acidez', 'Un lingüista analiza una oración'], 0, 'Distribuir ingreso limitado entre necesidades es una decisión económica.', 'La Economía estudia decisiones sobre recursos.'),
    mc('eco-v3-1-15', 'Explicar inflación y luego proponer una medida combina', ['fin teórico y práctico', 'objeto y método', 'escasez y consumo', 'precio y moneda', 'producción y distribución'], 0, 'Primero se explica; después se orienta una acción.', 'La teoría puede guiar decisiones prácticas.'),
  ] },
  { id: 'eco-def-v3-lesson-2', title: 'Escasez y elección', order: 2, theory: 'Las necesidades son múltiples y los recursos tienen usos alternativos; por eso se debe elegir.', exercises: [
    mc('eco-v3-2-1', 'Un recurso escaso es aquel que', ['no alcanza para todos los usos deseados', 'ha desaparecido totalmente', 'solo posee el Estado', 'carece de utilidad', 'no tiene valor'], 0, 'Escaso significa insuficiente frente a fines posibles.', 'La escasez compara medios y fines.'),
    wb('eco-v3-2-2', 'Las necesidades son múltiples y los recursos son {{respuesta}}.', ['limitados', 'infinitos', 'idénticos', 'irrelevantes'], 0, 'Esa diferencia origina el problema económico.', 'Fines múltiples y medios limitados originan escasez.'),
    tf('eco-v3-2-3', 'La escasez obliga a priorizar usos alternativos.', true, 'Un recurso limitado no puede destinarse a todo al mismo tiempo.', 'La escasez obliga a elegir.'),
    mc('eco-v3-2-4', 'Una estudiante tiene dos horas para trabajar, descansar o estudiar. El recurso escaso es', ['el tiempo', 'las alternativas', 'el deseo de aprender', 'el descanso', 'la elección'], 0, 'Cada hora solo puede usarse en una actividad.', 'El tiempo es un recurso limitado.'),
    mc('eco-v3-2-5', 'Fabricar cuadernos en vez de mochilas responde a', ['qué producir', 'cómo producir', 'para quién producir', 'qué método usar', 'cuánto ahorrar'], 0, 'Se está eligiendo el bien que se ofrecerá.', 'Qué producir identifica el bien.'),
    wb('eco-v3-2-6', 'Elegir maquinaria o trabajo manual responde a {{respuesta}} producir.', ['cómo', 'qué', 'para quién', 'cuándo'], 0, 'Se decide la técnica y los insumos.', 'Cómo producir se refiere a técnica y factores.'),
    mc('eco-v3-2-7', 'Dirigir becas a estudiantes de zonas alejadas responde a', ['para quién producir', 'qué producir', 'cómo producir', 'qué precio cobrar', 'qué método usar'], 0, 'Lo relevante es el grupo destinatario.', 'Para quién producir identifica al destinatario.'),
    ordering('eco-v3-2-8', 'Ordena una decisión económica.', ['Reconocer el recurso limitado', 'Comparar alternativas', 'Elegir una prioridad'], 'Primero se reconoce la restricción y después se elige.', 'Elegir supone evaluar alternativas bajo una restricción.'),
    mc('eco-v3-2-9', 'Cultivar papa, usar riego y vender a comedores responde, en orden,', ['qué, cómo y para quién', 'cómo, qué y para quién', 'para quién, cómo y qué', 'qué, para quién y cómo', 'para quién, qué y cómo'], 0, 'Papa es producto, riego es técnica y comedores son destinatario.', 'Las tres preguntas aparecen en un mismo caso.'),
    wb('eco-v3-2-10', 'La escasez hace que debamos {{respuesta}} entre alternativas.', ['elegir', 'desaparecer', 'producir infinito', 'evitar necesidades'], 0, 'No se pueden realizar todos los usos simultáneamente.', 'La elección responde a la escasez.'),
    tf('eco-v3-2-11', 'Una decisión económica permite realizar todas las alternativas a la vez.', false, 'Si no hubiera renuncia, no habría elección real.', 'La elección aparece porque no se puede hacer todo.'),
    mc('eco-v3-2-12', 'La conducta racional supone que una persona', ['compara objetivos y recursos', 'nunca se equivoca', 'compra siempre lo más caro', 'solo busca dinero', 'ignora restricciones'], 0, 'Ser racional es decidir considerando fines y medios.', 'Racionalidad no significa perfección.'),
    matching('eco-v3-2-13', 'Relaciona la pregunta con lo que decide.', [['Qué producir', 'Bien o servicio'], ['Cómo producir', 'Técnica e insumos'], ['Para quién producir', 'Destinatario']], 'Cada pregunta enfoca una parte distinta de la decisión.', 'Producto, técnica y destinatario organizan la decisión.'),
    mc('eco-v3-2-14', 'Repartir presupuesto entre una posta y una plaza es', ['asignar recursos escasos', 'un fenómeno natural', 'una demostración matemática', 'una acción sin elección', 'comercio exterior'], 0, 'El presupuesto limitado debe destinarse a prioridades.', 'Asignar recursos limitados es decidir.'),
    mc('eco-v3-2-15', 'El problema económico se resume en', ['necesidades múltiples y recursos limitados', 'recursos ilimitados y deseos fijos', 'ausencia de decisiones', 'solo falta de dinero', 'solo decisiones del gobierno'], 0, 'La escasez no depende únicamente del dinero.', 'El problema económico relaciona fines y medios.'),
  ] },
  { id: 'eco-def-v3-lesson-3', title: 'FPP y capacidad productiva', order: 3, theory: 'La FPP representa combinaciones máximas alcanzables con los recursos y tecnología actuales.', exercises: [
    mc('eco-v3-3-1', 'Un punto sobre la FPP representa', ['uso eficiente de recursos', 'recursos ociosos', 'una meta imposible', 'una decisión sin costo', 'un error'], 0, 'La frontera reúne las combinaciones máximas alcanzables.', 'La frontera representa eficiencia.', fpp('basic', 'FPP con un punto sobre la curva.')),
    wb('eco-v3-3-2', 'La FPP muestra combinaciones {{respuesta}} de dos bienes.', ['máximas', 'imaginarias', 'ilimitadas', 'aleatorias'], 0, 'Indica el límite productivo actual.', 'La FPP representa el máximo alcanzable.', fpp('basic', 'FPP con dos ejes de producción.')),
    mc('eco-v3-3-3', 'Un punto dentro de la FPP indica', ['recursos ociosos o ineficiencia', 'pleno empleo', 'producción imposible', 'crecimiento tecnológico', 'costo nulo'], 0, 'Todavía se puede producir más usando recursos disponibles.', 'Un punto interior refleja ineficiencia.', fpp('basic', 'FPP con punto interior.')),
    mc('eco-v3-3-4', 'Un punto interior de la FPP refleja recursos', ['ociosos', 'infinitos', 'agotados', 'perfectos', 'inexistentes'], 0, 'La capacidad existente no se aprovecha totalmente.', 'Dentro de la frontera hay capacidad desaprovechada.', fpp('basic', 'FPP con punto interior etiquetado.')),
    mc('eco-v3-3-5', 'Un punto fuera de la FPP es', ['inalcanzable hoy', 'eficiente', 'interior', 'obligatorio', 'sin elección'], 0, 'Supera la capacidad disponible en ese momento.', 'Fuera de la frontera es inalcanzable.', fpp('basic', 'FPP con punto exterior.')),
    wb('eco-v3-3-6', 'Con recursos actuales, un punto exterior es {{respuesta}}.', ['inalcanzable', 'eficiente', 'interior', 'habitual'], 0, 'Harían falta más recursos o mejor tecnología.', 'La FPP marca un límite actual.', fpp('basic', 'FPP con punto exterior.')),
    mc('eco-v3-3-7', 'Al moverse por la FPP y aumentar un bien se reduce otro porque', ['los recursos son limitados', 'los bienes son idénticos', 'la producción no tiene límites', 'no existe tecnología', 'los precios son iguales'], 0, 'Los recursos se trasladan de una producción a otra.', 'Moverse en la frontera implica elección.', fpp('opportunity-cost', 'FPP con dos puntos sobre la curva.')),
    tf('eco-v3-3-8', 'Un punto sobre la FPP implica pleno uso de recursos.', true, 'La frontera representa combinaciones eficientes.', 'En la frontera se usa la capacidad productiva.'),
    mc('eco-v3-3-9', 'Una mejora tecnológica desplaza la FPP', ['hacia afuera', 'hacia adentro', 'al origen', 'solo hacia abajo', 'sin cambiarla'], 0, 'Aumenta las combinaciones posibles.', 'El crecimiento desplaza la FPP hacia afuera.', fpp('growth', 'Dos FPP: la nueva está más alejada del origen.')),
    wb('eco-v3-3-10', 'Más capital, trabajo o tecnología desplaza la FPP hacia {{respuesta}}.', ['afuera', 'el origen', 'adentro', 'ningún lado'], 0, 'La economía puede producir más de ambos bienes.', 'Crecimiento es mayor capacidad productiva.', fpp('growth', 'Dos FPP que muestran crecimiento.')),
    mc('eco-v3-3-11', 'La pérdida de maquinaria desplaza la FPP', ['hacia adentro', 'hacia afuera', 'sin cambio', 'solo a la derecha', 'solo arriba'], 0, 'Disminuye la capacidad de producción.', 'Perder recursos contrae la FPP.', fpp('contraction', 'FPP contraída por pérdida de recursos.')),
    mc('eco-v3-3-12', 'La FPP permite representar visualmente', ['la escasez de recursos', 'las reglas gramaticales', 'los cambios climáticos', 'la herencia biológica', 'la estructura política'], 0, 'No toda combinación puede alcanzarse con recursos limitados.', 'La FPP visualiza la escasez.'),
    tf('eco-v3-3-13', 'Todo punto interior de la FPP es inalcanzable.', false, 'Es alcanzable, pero no usa todos los recursos.', 'Interior significa alcanzable, no eficiente.'),
    matching('eco-v3-3-14', 'Relaciona ubicación y significado.', [['Sobre la FPP', 'Producción eficiente'], ['Dentro de la FPP', 'Recursos ociosos'], ['Fuera de la FPP', 'Producción inalcanzable']], 'La posición indica el nivel de aprovechamiento.', 'Frontera, interior y exterior son distintos.'),
    ordering('eco-v3-3-15', 'Ordena cómo leer un punto en una FPP.', ['Ubicarlo respecto de la curva', 'Clasificarlo', 'Concluir su alcance o eficiencia'], 'La ubicación permite clasificar y luego interpretar.', 'La lectura depende de la posición del punto.'),
  ] },
  { id: 'eco-def-v3-lesson-4', title: 'Costo de oportunidad', order: 4, theory: 'El costo de oportunidad es la mejor alternativa a la que se renuncia al decidir.', exercises: [
    mc('eco-v3-4-1', 'El costo de oportunidad es', ['la mejor alternativa no elegida', 'todo lo elegido', 'el dinero gastado siempre', 'una necesidad satisfecha', 'un recurso ilimitado'], 0, 'No es lo elegido, sino la mejor opción descartada.', 'El costo es la alternativa sacrificada.'),
    wb('eco-v3-4-2', 'Al elegir se renuncia a la mejor alternativa {{respuesta}}.', ['no elegida', 'gratuita', 'idéntica', 'imposible'], 0, 'El costo se encuentra en lo que se deja de hacer.', 'El costo mira la opción sacrificada.'),
    mc('eco-v3-4-3', 'Ana estudia en vez de trabajar y ganar S/50. Su costo es', ['los S/50 que dejó de ganar', 'las horas de estudio', 'el cuaderno', 'la nota esperada', 'el pasaje'], 0, 'Trabajar era la mejor alternativa sacrificada.', 'El costo puede ser ingreso no recibido.'),
    tf('eco-v3-4-4', 'El costo de oportunidad es la opción que se eligió.', false, 'La elección y la alternativa sacrificada son distintas.', 'Costo y elección no son lo mismo.'),
    mc('eco-v3-4-5', 'Un terreno se usa para biblioteca en vez de mercado. El costo es', ['el mercado no construido', 'el terreno usado', 'el nombre de la biblioteca', 'la obra terminada', 'el presupuesto'], 0, 'La mejor alternativa descartada era el mercado.', 'El costo es la opción dejada de lado.'),
    wb('eco-v3-4-6', 'Producir más de un bien implica {{respuesta}} parte de otro.', ['sacrificar', 'duplicar', 'eliminar', 'ignorar'], 0, 'Con capacidad fija, los recursos se trasladan desde otro bien.', 'La escasez hace visible el sacrificio.'),
    mc('eco-v3-4-7', 'No existe costo de oportunidad cuando', ['se pueden realizar ambas actividades', 'una actividad es importante', 'interviene dinero', 'hay una empresa', 'la decisión es difícil'], 0, 'Sin renuncia entre opciones, no hay costo de oportunidad.', 'El costo aparece cuando una elección excluye otra.'),
    ordering('eco-v3-4-8', 'Ordena cómo hallar un costo de oportunidad.', ['Reconocer alternativas', 'Elegir una opción', 'Identificar la mejor descartada'], 'El costo se identifica después de comparar y elegir.', 'El costo es la mejor opción sacrificada.'),
    mc('eco-v3-4-9', 'Moverse en la FPP hacia más alimentos y menos textiles muestra', ['costo de oportunidad', 'ausencia de escasez', 'un punto exterior', 'método deductivo', 'actividad no económica'], 0, 'Recursos destinados a alimentos dejan de producir textiles.', 'Moverse sobre la FPP implica renunciar.', fpp('opportunity-cost', 'FPP con más alimentos y menos textiles.')),
    wb('eco-v3-4-10', 'El costo de oportunidad surge por la {{respuesta}} de recursos.', ['escasez', 'abundancia', 'igualdad', 'inercia'], 0, 'Con recursos ilimitados no habría sacrificio entre alternativas.', 'La escasez origina el costo.', fpp('opportunity-cost', 'FPP con movimiento entre dos puntos.')),
    mc('eco-v3-4-11', 'Un agricultor siembra maíz en vez de quinua, la más rentable. El costo es', ['la ganancia de la quinua', 'el maíz cosechado', 'la parcela', 'las semillas de maíz', 'sus herramientas'], 0, 'La quinua era la mejor alternativa abandonada.', 'El costo considera la mejor opción descartada.'),
    tf('eco-v3-4-12', 'Escasez, elección y costo de oportunidad están relacionados.', true, 'Los recursos limitados obligan a elegir y elegir implica renunciar.', 'La escasez lleva a elegir; elegir implica costo.'),
    matching('eco-v3-4-13', 'Relaciona concepto e idea.', [['Escasez', 'Medios insuficientes'], ['Elección', 'Priorizar alternativas'], ['Costo de oportunidad', 'Mejor alternativa sacrificada']], 'Los tres conceptos explican decisiones económicas.', 'Escasez lleva a elegir y elegir implica renuncia.'),
    mc('eco-v3-4-14', 'Observar desempleo, explicarlo y proponer una política combina', ['inducción, fin teórico y práctico', 'solo costo de oportunidad', 'solo producción', 'solo consumo', 'ningún método'], 0, 'Los datos permiten explicar y la política aplica conocimiento.', 'La Economía explica y orienta acciones.'),
    mc('eco-v3-4-15', '¿Qué caso integra escasez, elección y costo?', ['Usar una tarde libre para repasar y dejar un trabajo pagado', 'Hacer dos actividades sin límite de tiempo', 'Producir sin recursos', 'Eliminar necesidades', 'No tomar decisiones'], 0, 'La tarde es limitada, repasar es la elección y el trabajo pagado es la alternativa sacrificada.', 'Una elección bajo escasez tiene costo de oportunidad.'),
  ] },
]

type TopicFact = { term: string; definition: string; application: string }
type TopicBlueprint = { id: string; lessons: [string, string, string, string]; facts: [TopicFact, TopicFact, TopicFact, TopicFact, TopicFact] }

const topicBlueprints: TopicBlueprint[] = [
  { id: 'eco-division', lessons: ['Economía positiva y normativa', 'Micro y macroeconomía', 'Teoría, descripción y política', 'Reto: leer un caso económico'], facts: [
    { term: 'Economía positiva', definition: 'Describe y explica los hechos económicos tal como ocurren, sin juicios de valor.', application: 'El PBI del Perú creció 2% durante un año.' },
    { term: 'Economía normativa', definition: 'Formula juicios de valor sobre cómo debería funcionar la economía.', application: 'El Estado debería priorizar el empleo juvenil.' },
    { term: 'Microeconomía', definition: 'Estudia decisiones de consumidores, empresas y mercados particulares.', application: 'Una panadería decide cuánto producir ante un cambio de costos.' },
    { term: 'Macroeconomía', definition: 'Estudia variables agregadas de una economía, como inflación, PBI y desempleo.', application: 'Se analiza la inflación nacional de un año.' },
    { term: 'Política económica', definition: 'Conjunto de medidas del Estado para alcanzar objetivos económicos.', application: 'El gobierno modifica impuestos para incentivar inversión.' },
  ] },
  { id: 'eco-necesidades', lessons: ['Origen y fases de las necesidades', 'Clases de necesidades', 'Características y utilidad', 'Reto: priorizar con criterio'], facts: [
    { term: 'Necesidad primaria', definition: 'Necesidad vinculada directamente con la conservación de la vida.', application: 'Alimentación, vivienda y salud.' },
    { term: 'Necesidad secundaria', definition: 'Necesidad que complementa el bienestar y el desarrollo de la persona.', application: 'Educación, deporte o transporte.' },
    { term: 'Necesidad terciaria', definition: 'Necesidad superflua o suntuaria cuya satisfacción no es indispensable.', application: 'Comprar una joya costosa sin requerirla.' },
    { term: 'Ley de Gossen', definition: 'La satisfacción adicional obtenida disminuye conforme se satisface una misma necesidad.', application: 'El primer vaso de agua brinda más satisfacción que el cuarto.' },
    { term: 'Necesidades concurrentes', definition: 'Necesidades que aparecen al mismo tiempo y exigen una priorización.', application: 'Decidir entre pagar un pasaje o comprar un cuaderno con dinero limitado.' },
  ] },
  { id: 'eco-bienes', lessons: ['Bienes libres y económicos', 'Clasificación de bienes', 'Servicios y sus rasgos', 'Reto: clasificar situaciones'], facts: [
    { term: 'Bien económico', definition: 'Bien escaso, útil y apropiable que posee valor de cambio.', application: 'Una laptop vendida en una tienda.' },
    { term: 'Bien libre', definition: 'Bien abundante de la naturaleza que no posee valor de cambio.', application: 'El aire en condiciones normales.' },
    { term: 'Bien complementario', definition: 'Bien que se usa junto con otro para satisfacer una necesidad.', application: 'Impresora y tinta.' },
    { term: 'Bien sustituto', definition: 'Bien que puede reemplazar a otro en el consumo.', application: 'Té y café para una persona que busca una bebida caliente.' },
    { term: 'Servicio', definition: 'Actividad intangible destinada a satisfacer directamente necesidades de terceros.', application: 'La atención de una médica en un consultorio.' },
  ] },
  { id: 'eco-proceso', lessons: ['Etapas del proceso económico', 'Producción y circulación', 'Distribución, consumo e inversión', 'Reto: seguir el recorrido de un bien'], facts: [
    { term: 'Producción', definition: 'Etapa en la que se combinan factores para crear bienes y servicios.', application: 'Una fábrica transforma algodón en telas.' },
    { term: 'Circulación', definition: 'Etapa de traslado e intercambio de bienes y servicios.', application: 'Un mayorista distribuye frutas a mercados.' },
    { term: 'Distribución', definition: 'Etapa en la que se reparte el ingreso entre participantes de la producción.', application: 'Trabajadores reciben salarios y propietarios rentas.' },
    { term: 'Consumo', definition: 'Etapa de uso de bienes y servicios para satisfacer necesidades.', application: 'Una familia utiliza el servicio de agua.' },
    { term: 'Inversión', definition: 'Etapa que destina recursos para ampliar o mantener la capacidad productiva.', application: 'Una empresa compra una máquina nueva.' },
  ] },
  { id: 'eco-sectores', lessons: ['Factores de producción', 'Sectores productivos', 'Productividad', 'Reto: identificar producción real'], facts: [
    { term: 'Sector primario', definition: 'Sector dedicado a la extracción directa de recursos naturales.', application: 'Pesca, agricultura y minería.' },
    { term: 'Sector secundario', definition: 'Sector que transforma materias primas en productos elaborados.', application: 'Una industria textil convierte algodón en prendas.' },
    { term: 'Sector terciario', definition: 'Sector dedicado principalmente a la prestación de servicios.', application: 'Transporte, comercio y banca.' },
    { term: 'Productividad media', definition: 'Producción promedio obtenida por cada unidad de un factor variable.', application: 'Dividir la producción total entre el número de trabajadores.' },
    { term: 'Productividad marginal', definition: 'Variación de la producción total causada por una unidad adicional de factor variable.', application: 'Medir cuánto aumenta la producción al contratar a una persona más.' },
  ] },
  { id: 'eco-costos', lessons: ['Costos fijos y variables', 'Costo total y medio', 'Producción eficiente', 'Reto: decidir con costos'], facts: [
    { term: 'Costo fijo', definition: 'Costo que no cambia al variar la cantidad producida en el corto plazo.', application: 'El alquiler mensual de un local.' },
    { term: 'Costo variable', definition: 'Costo que cambia cuando cambia la cantidad producida.', application: 'La compra de harina para elaborar más panes.' },
    { term: 'Costo total', definition: 'Suma del costo fijo y el costo variable.', application: 'Agregar alquiler e insumos utilizados.' },
    { term: 'Costo medio', definition: 'Costo total dividido entre las unidades producidas.', application: 'Calcular cuánto cuesta, en promedio, cada polo.' },
    { term: 'Costo marginal', definition: 'Aumento del costo total al producir una unidad adicional.', application: 'Comparar el costo de producir 100 y 101 unidades.' },
  ] },
  { id: 'eco-capital', lessons: ['Factor naturaleza', 'Capital y tecnología', 'Recursos renovables', 'Reto: reconocer factores'], facts: [
    { term: 'Factor naturaleza', definition: 'Conjunto de elementos físicos y biológicos preexistentes al ser humano.', application: 'Suelo, mar, clima y minerales.' },
    { term: 'Capital', definition: 'Recurso producido por el ser humano que sirve para generar otros bienes o servicios.', application: 'Una maquinaria usada para fabricar muebles.' },
    { term: 'Capital fijo', definition: 'Capital que participa en varios procesos productivos sin agotarse de inmediato.', application: 'Un horno industrial.' },
    { term: 'Capital circulante', definition: 'Capital que se consume o transforma en un solo proceso productivo.', application: 'La harina utilizada para una tanda de pan.' },
    { term: 'Recurso no renovable', definition: 'Recurso cuya reposición natural requiere periodos muy largos o no es posible a escala humana.', application: 'Petróleo o cobre extraído.' },
  ] },
  { id: 'eco-trabajo', lessons: ['Trabajo y población', 'PEA y desempleo', 'Remuneraciones', 'Reto: leer el mercado laboral'], facts: [
    { term: 'Factor trabajo', definition: 'Actividad física o intelectual consciente destinada a producir bienes y servicios.', application: 'Una enfermera brinda atención profesional.' },
    { term: 'PEA', definition: 'Población en edad de trabajar que está ocupada o busca empleo activamente.', application: 'Personas que laboran o están disponibles para laborar.' },
    { term: 'Desempleo friccional', definition: 'Desempleo temporal originado por el tránsito entre un empleo y otro.', application: 'Una persona renuncia y busca un nuevo puesto.' },
    { term: 'Salario nominal', definition: 'Monto de dinero que recibe un trabajador por su labor.', application: 'Recibir S/ 1500 mensuales.' },
    { term: 'Salario real', definition: 'Cantidad de bienes y servicios que puede comprar un salario.', application: 'El poder adquisitivo de S/ 1500 frente a los precios.' },
  ] },
  { id: 'eco-empresa', lessons: ['Empresa y organización', 'Tipos de empresa', 'Sociedades y responsabilidad', 'Reto: leer un caso empresarial'], facts: [
    { term: 'Empresa', definition: 'Unidad económica que organiza factores para producir bienes o servicios.', application: 'Una empresa combina trabajo, capital y naturaleza para vender productos.' },
    { term: 'Ganancia', definition: 'Retribución que recibe la empresa por organizar y asumir riesgos.', application: 'Beneficio obtenido tras cubrir costos.' },
    { term: 'Empresa pública', definition: 'Empresa administrada o controlada por el Estado y orientada al interés social.', application: 'Una entidad estatal que presta un servicio público.' },
    { term: 'Empresa privada', definition: 'Empresa administrada por particulares y orientada usualmente al lucro.', application: 'Una cadena comercial de propiedad privada.' },
    { term: 'Sociedad anónima', definition: 'Sociedad cuyo capital se divide en acciones y cuyos socios tienen responsabilidad limitada.', application: 'Accionistas aportan capital a una empresa.' },
  ] },
  { id: 'eco-emprendimiento', lessons: ['Idea y oportunidad', 'Riesgo y organización', 'Costos y decisión', 'Reto: evaluar un emprendimiento'], facts: [
    { term: 'Emprendimiento', definition: 'Iniciativa que identifica una oportunidad y organiza recursos para ofrecer valor.', application: 'Crear un servicio de reparto para una zona sin cobertura.' },
    { term: 'Riesgo empresarial', definition: 'Posibilidad de obtener resultados distintos a los esperados al invertir recursos.', application: 'Abrir un negocio sin conocer aún la demanda exacta.' },
    { term: 'Inversión inicial', definition: 'Recursos destinados al inicio para poner en marcha una actividad productiva.', application: 'Comprar equipos y permisos antes de abrir una cafetería.' },
    { term: 'Mercado objetivo', definition: 'Grupo de personas al que se dirige principalmente un producto o servicio.', application: 'Estudiantes que buscan almuerzos económicos cerca de una universidad.' },
    { term: 'Valor agregado', definition: 'Incremento de valor que se obtiene al transformar o mejorar un bien o servicio.', application: 'Convertir cacao en chocolate empacado.' },
  ] },
  { id: 'eco-circulacion', lessons: ['Mercado e intercambio', 'Flujo real y monetario', 'Agentes económicos', 'Reto: seguir el flujo circular'], facts: [
    { term: 'Mercado', definition: 'Espacio físico o virtual donde interactúan oferentes y demandantes.', application: 'Una plataforma donde hogares compran productos a empresas.' },
    { term: 'Flujo real', definition: 'Movimiento de factores productivos, bienes y servicios entre agentes económicos.', application: 'Hogares ofrecen trabajo y empresas entregan bienes.' },
    { term: 'Flujo monetario', definition: 'Movimiento de dinero que corresponde al flujo real.', application: 'Empresas pagan salarios y hogares pagan por bienes.' },
    { term: 'Hogares', definition: 'Agentes que consumen bienes y ofrecen factores de producción.', application: 'Familias compran alimentos y brindan trabajo.' },
    { term: 'Empresas', definition: 'Agentes que demandan factores y ofrecen bienes y servicios.', application: 'Una fábrica contrata trabajadores y vende calzado.' },
  ] },
  { id: 'eco-modelos', lessons: ['Competencia y mercado', 'Monopolio y oligopolio', 'Fallas de mercado', 'Reto: identificar estructuras'], facts: [
    { term: 'Competencia perfecta', definition: 'Mercado con muchos oferentes y demandantes, producto homogéneo y sin control individual del precio.', application: 'Productores pequeños venden un producto estandarizado.' },
    { term: 'Monopolio', definition: 'Mercado en el que un único oferente abastece un bien o servicio sin sustitutos cercanos.', application: 'Una sola empresa controla completamente un servicio exclusivo.' },
    { term: 'Oligopolio', definition: 'Mercado dominado por pocas empresas cuyas decisiones se afectan mutuamente.', application: 'Pocas firmas concentran la mayor parte de ventas de un sector.' },
    { term: 'Competencia monopolística', definition: 'Mercado con muchos oferentes que diferencian sus productos.', application: 'Restaurantes compiten por sabor, ubicación y marca.' },
    { term: 'Externalidad', definition: 'Efecto de una actividad económica sobre terceros que no se refleja plenamente en el precio.', application: 'Una fábrica contamina un río usado por vecinos.' },
  ] },
  { id: 'eco-demanda', lessons: ['Demanda y cantidad demandada', 'Determinantes de demanda', 'Elasticidad', 'Reto: interpretar cambios'], facts: [
    { term: 'Demanda', definition: 'Relación entre cantidades que los consumidores desean comprar y diversos factores.', application: 'La intención de compra de café según precio, ingreso y gustos.' },
    { term: 'Cantidad demandada', definition: 'Cantidad que se compra a un precio determinado, manteniendo otros factores constantes.', application: 'Comprar dos panes cuando cada uno cuesta S/ 0.50.' },
    { term: 'Ley de demanda', definition: 'Relación inversa entre precio y cantidad demandada, ceteris paribus.', application: 'Al bajar el precio de entradas, más personas desean comprarlas.' },
    { term: 'Bien sustituto', definition: 'Bien cuyo aumento de precio puede elevar la demanda de otro bien alternativo.', application: 'Si sube el precio del té, puede aumentar la demanda de café.' },
    { term: 'Elasticidad precio de la demanda', definition: 'Mide qué tanto varía la cantidad demandada frente a un cambio porcentual del precio.', application: 'Evaluar la reacción de compras ante una subida de precio.' },
  ] },
  { id: 'eco-oferta', lessons: ['Oferta y cantidad ofrecida', 'Equilibrio de mercado', 'Cambios de oferta', 'Reto: resolver un mercado'], facts: [
    { term: 'Oferta', definition: 'Relación entre cantidades que los productores desean vender y los factores que las determinan.', application: 'Una empresa decide cuánto pan ofrecer según precio y costos.' },
    { term: 'Ley de oferta', definition: 'Relación directa entre precio y cantidad ofrecida, ceteris paribus.', application: 'Un mayor precio de venta incentiva a ofrecer más unidades.' },
    { term: 'Precio de equilibrio', definition: 'Precio en el que la cantidad demandada es igual a la cantidad ofrecida.', application: 'En ese precio no hay exceso de demanda ni de oferta.' },
    { term: 'Exceso de demanda', definition: 'Situación en la que la cantidad demandada supera la cantidad ofrecida.', application: 'Hay más compradores que unidades disponibles a ese precio.' },
    { term: 'Exceso de oferta', definition: 'Situación en la que la cantidad ofrecida supera la cantidad demandada.', application: 'Quedan productos sin vender a ese precio.' },
  ] },
  { id: 'eco-dinero', lessons: ['Funciones del dinero', 'Clases y características', 'Valor del dinero', 'Reto: leer medios de pago'], facts: [
    { term: 'Medio de pago', definition: 'Función del dinero que permite realizar transacciones.', application: 'Usar monedas o billetes para comprar alimentos.' },
    { term: 'Unidad de cuenta', definition: 'Función del dinero que permite expresar y comparar valores.', application: 'Fijar el precio de una bicicleta en soles.' },
    { term: 'Depósito de valor', definition: 'Función del dinero que permite conservar poder de compra para el futuro.', application: 'Ahorrar parte del ingreso para una compra posterior.' },
    { term: 'Dinero legal', definition: 'Dinero cuya aceptación está respaldada por la autoridad monetaria.', application: 'Billetes y monedas emitidos conforme a ley.' },
    { term: 'Cuasidinero', definition: 'Activo de alta liquidez que puede convertirse en dinero con facilidad.', application: 'Un depósito a plazo que puede hacerse efectivo.' },
  ] },
  { id: 'eco-inflacion', lessons: ['Qué es inflación', 'Medición con IPC', 'Causas y efectos', 'Reto: interpretar precios'], facts: [
    { term: 'Inflación', definition: 'Aumento persistente y generalizado del nivel de precios.', application: 'La canasta habitual cuesta cada vez más durante varios meses.' },
    { term: 'IPC', definition: 'Índice que mide la variación de precios de una canasta de consumo representativa.', application: 'Comparar el costo de una canasta entre dos periodos.' },
    { term: 'Inflación por demanda', definition: 'Inflación originada por un aumento de la demanda agregada respecto de la oferta.', application: 'El gasto crece rápidamente y la producción no alcanza a responder.' },
    { term: 'Inflación por costos', definition: 'Inflación causada por aumentos en costos de producción.', application: 'Sube el precio del combustible y se encarece el transporte.' },
    { term: 'Deflación', definition: 'Disminución sostenida y generalizada del nivel de precios.', application: 'Los precios promedio de una canasta bajan de forma persistente.' },
  ] },
  { id: 'eco-credito', lessons: ['Elementos del crédito', 'Agentes e instrumentos', 'Clases de crédito', 'Reto: decidir con crédito'], facts: [
    { term: 'Crédito', definition: 'Operación basada en confianza mediante la cual se entrega un bien o dinero con promesa de pago futuro.', application: 'Un banco presta dinero que será devuelto con interés.' },
    { term: 'Acreedor', definition: 'Persona o entidad que entrega recursos y tiene derecho a cobrar.', application: 'La entidad financiera que otorga un préstamo.' },
    { term: 'Deudor', definition: 'Persona o entidad que recibe recursos y asume la obligación de pagar.', application: 'Quien recibe un préstamo para comprar equipo.' },
    { term: 'Interés', definition: 'Retribución pagada por el uso temporal de dinero ajeno.', application: 'Monto adicional que cobra el banco por prestar.' },
    { term: 'Garantía real', definition: 'Bien ofrecido para respaldar el cumplimiento de una deuda.', application: 'Una vivienda respalda un crédito hipotecario.' },
  ] },
  { id: 'eco-sistema-financiero', lessons: ['Sistema financiero', 'Intermediación financiera', 'Mercado de valores', 'Reto: ubicar instituciones'], facts: [
    { term: 'Sistema financiero', definition: 'Conjunto de instituciones y mercados que canalizan ahorro hacia crédito e inversión.', application: 'Bancos captan depósitos y otorgan préstamos.' },
    { term: 'Intermediación financiera', definition: 'Proceso por el que entidades conectan ahorristas con quienes requieren financiamiento.', application: 'Un banco usa depósitos para colocar créditos.' },
    { term: 'Mercado de dinero', definition: 'Mercado donde se negocian instrumentos financieros de corto plazo.', application: 'Operaciones financieras con vencimientos cercanos.' },
    { term: 'Mercado de capitales', definition: 'Mercado donde se negocian instrumentos de mediano y largo plazo.', application: 'Emisión de bonos o acciones para financiar proyectos.' },
    { term: 'SBS', definition: 'Entidad que supervisa el sistema financiero, seguros y fondos de pensiones en el Perú.', application: 'Fiscaliza la solvencia de entidades supervisadas.' },
  ] },
  { id: 'eco-sistema-bancario', lessons: ['BCRP y estabilidad monetaria', 'Encaje y crédito', 'Banco de la Nación', 'Reto: leer una política monetaria'], facts: [
    { term: 'BCRP', definition: 'Banco central autónomo encargado de preservar la estabilidad monetaria en el Perú.', application: 'Aplica medidas para controlar presiones inflacionarias.' },
    { term: 'Encaje legal', definition: 'Porcentaje de depósitos que las entidades financieras deben mantener como reserva.', application: 'El banco no puede prestar toda la suma captada.' },
    { term: 'Política monetaria expansiva', definition: 'Medida que busca aumentar liquidez y crédito en la economía.', application: 'Reducir encaje para facilitar préstamos.' },
    { term: 'Política monetaria contractiva', definition: 'Medida que busca reducir liquidez y frenar presiones inflacionarias.', application: 'Elevar encaje para restringir crédito.' },
    { term: 'Banco de la Nación', definition: 'Entidad estatal que brinda servicios bancarios principalmente al sector público.', application: 'Gestiona operaciones financieras de organismos públicos.' },
  ] },
  { id: 'eco-tributario', lessons: ['Tributos y sus elementos', 'Impuestos, tasas y contribuciones', 'Tributos directos e indirectos', 'Reto: clasificar pagos'], facts: [
    { term: 'Tributo', definition: 'Prestación obligatoria exigida por el Estado para financiar fines públicos.', application: 'Pago establecido por ley a favor de una entidad pública.' },
    { term: 'Impuesto', definition: 'Tributo sin contraprestación directa para financiar gasto público general.', application: 'Pago del IGV al comprar un producto.' },
    { term: 'Tasa', definition: 'Tributo pagado por un servicio público individualizado o actividad administrativa.', application: 'Pago por la emisión de un documento administrativo.' },
    { term: 'Contribución', definition: 'Tributo vinculado a un beneficio derivado de una obra o actividad estatal.', application: 'Aporte asociado a una mejora pública específica.' },
    { term: 'Impuesto directo', definition: 'Impuesto que grava renta o patrimonio y recae directamente sobre el contribuyente.', application: 'Impuesto a la renta.' },
  ] },
  { id: 'eco-informal', lessons: ['Economía informal', 'Causas y consecuencias', 'Trabajo e informalidad', 'Reto: analizar un caso peruano'], facts: [
    { term: 'Economía informal', definition: 'Actividades económicas que operan total o parcialmente fuera de las normas y registros exigidos.', application: 'Negocio que no emite comprobantes ni está registrado.' },
    { term: 'Evasión tributaria', definition: 'Incumplimiento ilegal de obligaciones tributarias para evitar el pago de impuestos.', application: 'Ocultar ventas para no declarar ingresos.' },
    { term: 'Elusión tributaria', definition: 'Uso de mecanismos legales para reducir la carga tributaria.', application: 'Elegir una forma permitida de operación con menor impuesto.' },
    { term: 'Subempleo', definition: 'Situación laboral con ingreso insuficiente o jornada menor a la deseada.', application: 'Persona que quiere trabajar tiempo completo, pero solo consigue pocas horas.' },
    { term: 'Formalización', definition: 'Proceso de incorporación de una actividad económica al cumplimiento de normas y registros.', application: 'Inscribir un negocio y emitir comprobantes de pago.' },
  ] },
  { id: 'eco-presupuesto', lessons: ['Presupuesto público', 'Ingresos y gastos', 'Déficit, equilibrio y superávit', 'Reto: leer finanzas públicas'], facts: [
    { term: 'Presupuesto público', definition: 'Instrumento que programa ingresos, gastos y objetivos del Estado para un año fiscal.', application: 'Plan anual para financiar servicios y proyectos públicos.' },
    { term: 'Ingreso corriente', definition: 'Ingreso público permanente, como el proveniente de tributos.', application: 'Recaudación habitual de impuestos.' },
    { term: 'Gasto corriente', definition: 'Gasto destinado al funcionamiento regular del Estado.', application: 'Pago de remuneraciones del sector público.' },
    { term: 'Déficit fiscal', definition: 'Situación en la que los gastos públicos superan los ingresos públicos.', application: 'El Estado gasta más de lo que recauda en el periodo.' },
    { term: 'Superávit fiscal', definition: 'Situación en la que los ingresos públicos superan los gastos públicos.', application: 'La recaudación excede el gasto del periodo.' },
  ] },
  { id: 'eco-comercio', lessons: ['Comercio internacional', 'Exportaciones e importaciones', 'Ventajas del intercambio', 'Reto: decidir en comercio exterior'], facts: [
    { term: 'Comercio internacional', definition: 'Intercambio de bienes y servicios entre residentes de diferentes países.', application: 'Una empresa peruana vende productos a Chile.' },
    { term: 'Exportación', definition: 'Venta de bienes o servicios al exterior que genera entrada de divisas.', application: 'Perú vende uvas a un mercado extranjero.' },
    { term: 'Importación', definition: 'Compra de bienes o servicios del exterior que implica salida de divisas.', application: 'Una empresa compra maquinaria de otro país.' },
    { term: 'Ventaja absoluta', definition: 'Capacidad de producir un bien usando menos recursos que otro productor.', application: 'Un país produce café con mayor eficiencia física.' },
    { term: 'Ventaja comparativa', definition: 'Capacidad de producir un bien con menor costo de oportunidad.', application: 'Un país se especializa en aquello que sacrifica menos.' },
  ] },
  { id: 'eco-elementos-comercio', lessons: ['Divisas y tipo de cambio', 'Aranceles', 'RIN y DEG', 'Reto: interpretar el mercado cambiario'], facts: [
    { term: 'Divisa', definition: 'Moneda extranjera aceptada como medio de pago internacional.', application: 'Dólar usado para pagar una importación.' },
    { term: 'Tipo de cambio', definition: 'Precio de una moneda extranjera expresado en moneda nacional.', application: 'Cantidad de soles necesaria para comprar un dólar.' },
    { term: 'Arancel', definition: 'Impuesto que grava la importación de bienes.', application: 'Cobro aplicado a productos que ingresan del exterior.' },
    { term: 'RIN', definition: 'Activos externos líquidos administrados por el banco central.', application: 'Reservas que ayudan a enfrentar pagos externos y volatilidad.' },
    { term: 'Depreciación', definition: 'Aumento del tipo de cambio en un régimen flexible, que encarece la moneda extranjera.', application: 'Se necesitan más soles para adquirir un dólar.' },
  ] },
  { id: 'eco-balanza', lessons: ['Balanza de pagos', 'Cuenta corriente y financiera', 'Organismos internacionales', 'Reto: registrar operaciones externas'], facts: [
    { term: 'Balanza de pagos', definition: 'Registro contable de las transacciones económicas de un país con el exterior.', application: 'Resume exportaciones, importaciones y movimientos financieros.' },
    { term: 'Balanza comercial', definition: 'Parte de la balanza de pagos que registra exportaciones e importaciones de bienes.', application: 'Comparar ventas y compras de mercancías al exterior.' },
    { term: 'Cuenta corriente', definition: 'Cuenta que registra bienes, servicios, rentas y transferencias corrientes.', application: 'Incluye exportación de servicios y remesas.' },
    { term: 'Cuenta financiera', definition: 'Cuenta que registra movimientos de inversión y financiamiento.', application: 'Ingreso de capital para invertir en una empresa.' },
    { term: 'FMI', definition: 'Organismo internacional que promueve cooperación monetaria y apoya ante problemas externos.', application: 'Otorga asistencia financiera a países con desequilibrios.' },
  ] },
  { id: 'eco-agregados', lessons: ['PBI y producción', 'PBN, PNN e ingreso', 'Indicadores por habitante', 'Reto: calcular con criterio'], facts: [
    { term: 'PBI', definition: 'Valor monetario de los bienes y servicios finales producidos dentro de un territorio.', application: 'Mide la producción final realizada en el Perú.' },
    { term: 'PBN', definition: 'Valor de la producción de los factores nacionales dentro y fuera del país.', application: 'Incorpora la producción de empresas peruanas en el exterior.' },
    { term: 'PNN', definition: 'Producto nacional bruto menos la depreciación del capital fijo.', application: 'Descuenta el desgaste de maquinaria y equipos.' },
    { term: 'PBI real', definition: 'Medida de producción que elimina el efecto de los cambios de precios.', application: 'Compara cantidades producidas usando precios de un año base.' },
    { term: 'PBI per cápita', definition: 'PBI dividido entre la población total.', application: 'Producción promedio atribuible a cada habitante.' },
  ] },
  { id: 'eco-ciclos', lessons: ['Ciclos económicos', 'Crecimiento y recesión', 'Inversión y distribución', 'Reto: diagnosticar una fase'], facts: [
    { term: 'Expansión', definition: 'Fase del ciclo económico caracterizada por aumento de producción, empleo e inversión.', application: 'Las empresas venden más y contratan trabajadores.' },
    { term: 'Auge', definition: 'Punto alto de la actividad económica previo a una posible desaceleración.', application: 'La producción se encuentra cerca de su máximo del ciclo.' },
    { term: 'Recesión', definition: 'Fase de disminución de la actividad económica, producción e inversión.', application: 'Bajan ventas y se reducen contrataciones.' },
    { term: 'Depresión', definition: 'Fase profunda y prolongada de caída de la actividad económica.', application: 'Hay fuerte desempleo y producción muy reducida.' },
    { term: 'Inversión', definition: 'Gasto destinado a crear o ampliar capacidad productiva futura.', application: 'Construir una planta o adquirir maquinaria.' },
  ] },
  { id: 'eco-globalizacion', lessons: ['Globalización', 'Integración económica', 'Acuerdos comerciales', 'Reto: comparar integración'], facts: [
    { term: 'Globalización', definition: 'Proceso de creciente interconexión económica, tecnológica y cultural entre países.', application: 'Una empresa vende digitalmente a clientes de varios países.' },
    { term: 'Zona de libre comercio', definition: 'Acuerdo que reduce barreras comerciales entre países miembros.', application: 'Dos países disminuyen aranceles para comerciar entre sí.' },
    { term: 'Unión aduanera', definition: 'Integración que añade un arancel externo común a la libre circulación interna.', application: 'Miembros aplican la misma tarifa a importaciones de terceros países.' },
    { term: 'Mercado común', definition: 'Integración que permite mayor movilidad de bienes, servicios y factores entre miembros.', application: 'Países coordinan para facilitar trabajo y capital dentro del bloque.' },
    { term: 'OMC', definition: 'Organización internacional que promueve reglas y cooperación en el comercio mundial.', application: 'Sirve de foro para acuerdos y solución de controversias comerciales.' },
  ] },
  { id: 'eco-doctrinas', lessons: ['Escuelas clásicas', 'Socialismo y neoclásicos', 'Keynesianismo y monetarismo', 'Reto: reconocer doctrinas'], facts: [
    { term: 'Mercantilismo', definition: 'Doctrina que vinculó la riqueza con la acumulación de metales y una balanza comercial favorable.', application: 'Promover exportaciones y restringir importaciones para acumular metales.' },
    { term: 'Fisiocracia', definition: 'Doctrina que consideró a la naturaleza y agricultura como fuente principal de riqueza.', application: 'Destacar la actividad agraria como productiva.' },
    { term: 'Escuela clásica', definition: 'Doctrina que resaltó el trabajo, la libre competencia y la menor intervención estatal.', application: 'Defender el laissez faire y la mano invisible.' },
    { term: 'Keynesianismo', definition: 'Enfoque que propone un papel activo del Estado ante crisis y desempleo.', application: 'Aumentar gasto público para impulsar demanda en una recesión.' },
    { term: 'Monetarismo', definition: 'Enfoque que destaca el control de la cantidad de dinero para explicar la inflación.', application: 'Relacionar exceso de emisión con aumento de precios.' },
  ] },
]

function factChoices(topic: TopicBlueprint) {
  return topic.facts.map((fact) => fact.definition).map((definition, index) => ({ definition, index })).sort((a, b) => a.index - b.index).map((item) => item.definition)
}

function builtLessons(topic: TopicBlueprint): Lesson[] {
  return topic.lessons.map((title, lessonIndex) => {
    const facts = topic.facts
    const at = (offset: number) => facts[(lessonIndex + offset) % facts.length]
    const factIndex = (fact: TopicFact) => facts.indexOf(fact)
    const definitionQuestion = (position: number, fact: TopicFact) => mc(`${topic.id}-lesson-${lessonIndex + 1}-q${position}`, `¿Qué enunciado define mejor ${fact.term.toLowerCase()}?`, factChoices(topic), factIndex(fact), fact.definition, `${fact.term}: ${fact.definition}`)
    const applicationQuestion = (position: number, fact: TopicFact) => mc(`${topic.id}-lesson-${lessonIndex + 1}-q${position}`, `En el siguiente caso se identifica principalmente: ${fact.application}`, facts.map((item) => item.term), factIndex(fact), `El caso corresponde a ${fact.term.toLowerCase()}.`, `${fact.term}: ${fact.definition}`)
    const wordBankQuestion = (position: number, fact: TopicFact) => wb(`${topic.id}-lesson-${lessonIndex + 1}-q${position}`, `El concepto que completa esta idea es: {{respuesta}}. ${fact.definition}`, facts.map((item) => item.term), factIndex(fact), `La definición corresponde a ${fact.term.toLowerCase()}.`, `${fact.term}: ${fact.definition}`)
    const trueFact = at(3)
    const falseFact = at(4)
    const swappedDefinition = at(0).definition
    return {
      id: `${topic.id}-lesson-${lessonIndex + 1}`,
      title,
      order: lessonIndex + 1,
      theory: `Practica ${title.toLowerCase()} con conceptos y situaciones breves.`,
      exercises: [
        definitionQuestion(1, at(0)),
        applicationQuestion(2, at(1)),
        wordBankQuestion(3, at(2)),
        tf(`${topic.id}-lesson-${lessonIndex + 1}-q4`, `${trueFact.term} se refiere a: ${trueFact.definition}`, true, `La afirmación describe correctamente ${trueFact.term.toLowerCase()}.`, `${trueFact.term}: ${trueFact.definition}`),
        tf(`${topic.id}-lesson-${lessonIndex + 1}-q5`, `${falseFact.term} se refiere a: ${swappedDefinition}`, false, `La definición mostrada no corresponde a ${falseFact.term.toLowerCase()}.`, `${falseFact.term}: ${falseFact.definition}`),
        definitionQuestion(6, at(4)),
        wordBankQuestion(7, at(0)),
        matching(`${topic.id}-lesson-${lessonIndex + 1}-q8`, 'Relaciona cada concepto con su definición.', [[at(0).term, at(0).definition], [at(1).term, at(1).definition], [at(2).term, at(2).definition]], 'Cada concepto se reconoce por su rasgo central.', 'Relacionar nombre, definición y caso evita confusiones.'),
        ordering(`${topic.id}-lesson-${lessonIndex + 1}-q9`, `Ordena una forma útil de resolver un caso de ${topic.id.replace('eco-', '').replace(/-/g, ' ')}.`, ['Leer qué ocurre en el caso', 'Identificar el concepto económico relevante', 'Descartar conceptos parecidos', 'Elegir y justificar la respuesta'], 'Primero se comprende el caso; después se reconoce el concepto y se justifica la decisión.', 'En Economía, las palabras del caso importan tanto como la definición.'),
        applicationQuestion(10, at(3)),
      ],
    }
  })
}

const topicIcons = ['💡', '📚', '🔎', '🧩', '📊']
const unitColors = ['from-[#58A878] to-[#3D8B5C]', 'from-[#6DB58A] to-[#47956A]', 'from-[#65AFA0] to-[#3D8D80]', 'from-[#79A7D8] to-[#587FC0]', 'from-[#E7A958] to-[#CE873A]', 'from-[#9A8BD3] to-[#7967BD]']
function topicLessons(topicId: string) { return topicId === 'eco-ciencia' ? firstTopicLessons : builtLessons(topicBlueprints.find((topic) => topic.id === topicId) || { id: topicId, lessons: ['Reconocer', 'Comprender', 'Aplicar', 'Reto final'], facts: [{ term: 'Concepto', definition: 'Idea central del tema.', application: 'Reconocer una situación.' }, { term: 'Relación', definition: 'Vínculo entre elementos del tema.', application: 'Comparar alternativas.' }, { term: 'Aplicación', definition: 'Uso del concepto en un caso.', application: 'Resolver una situación.' }, { term: 'Análisis', definition: 'Interpretación de un resultado.', application: 'Explicar una decisión.' }, { term: 'Síntesis', definition: 'Integración de las ideas principales.', application: 'Relacionar lo aprendido.' }] }) }
export const ECONOMIA_STAGE: EconomyStage = { id: 'stage-economia-anual', title: 'Ruta anual de Economía', subtitle: 'Avanza desde las decisiones básicas hasta la economía nacional y mundial.', sections: ECONOMIA_UNITS.map((unit, unitIndex) => ({ id: unit.id, title: unit.title, subtitle: unit.description, color: unitColors[unitIndex], icon: ['🧠', '🏭', '📈', '💰', '🏛️', '🌎'][unitIndex], nodes: unit.topics.map((topic, topicIndex) => ({ id: topic.id, title: topic.title, icon: topicIcons[topicIndex], lessons: topicLessons(topic.id) })) })) }
