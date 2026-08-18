export interface ExerciseQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'numeric' | 'multiple-select' | 'matching' | 'ordering'
  question: string
  options?: string[]
  correctAnswer: number | string
  explanation: string
  difficulty: 'basico' | 'intermedio' | 'avanzado'
  resolutionSteps?: string[]
  ideaKey?: string
  visual?: { src?: string; alt: string; placement?: 'above-question' | 'inside-explanation' }
  resource?: { title: string; description: string; status: 'available' | 'coming-soon' }
}

export interface Lesson {
  id: string
  title: string
  order: number
  theory: string
  exercises: ExerciseQuestion[]
}

export interface SkillNode {
  id: string
  title: string
  icon: string
  lessons: Lesson[]
  studyMaterial?: TopicStudyMaterial
}

export interface TopicStudyMaterial {
  summary: string
  keyIdeas: string[]
  flashcards: { question: string; answer: string; hint?: string }[]
}

export interface SkillUnit {
  id: string
  title: string
  subtitle: string
  color: string
  icon: string
  nodes: SkillNode[]
}

const COURSE_SOURCE: SkillUnit[] = [
  {
    id: 'unit-segmentos',
    title: 'Segmentos',
    subtitle: 'Unidad 1 - Fundamentos y medida',
    color: 'from-primary-400 to-primary-500',
    icon: '📐',
    nodes: [
      {
        id: 'node-fund-geometricos',
        title: 'Fundamentos geometricos',
        icon: '📍',
        lessons: [
          { id: 'les-fund-1', title: 'Punto y recta', order: 1, theory: 'Un punto es una figura sin dimensiones, solo indica posicion. Una recta es infinita en ambos sentidos. Dos puntos determinan una unica recta.', exercises: [
            { id: 'ex-f1-1', type: 'multiple-choice', question: '¿Cuantas dimensiones tiene un punto?', options: ['0 dimensiones', '1 dimension', '2 dimensiones', '3 dimensiones'], correctAnswer: 0, explanation: 'Un punto NO tiene dimensiones. Solo indica posicion.', difficulty: 'basico' },
            { id: 'ex-f1-2', type: 'multiple-choice', question: '¿Cuantos puntos determinan una recta?', options: ['1 punto', '2 puntos', '3 puntos', '4 puntos'], correctAnswer: 1, explanation: 'Dos puntos distintos determinan una unica recta.', difficulty: 'basico' },
            { id: 'ex-f1-3', type: 'true-false', question: 'Una recta se extiende indefinidamente en ambos sentidos.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto. Una recta es infinita en ambas direcciones.', difficulty: 'basico' },
            { id: 'ex-f1-4', type: 'multiple-choice', question: '¿Como se representa una recta por A y B?', options: ['AB', '→AB', '↔AB', 'AB→'], correctAnswer: 2, explanation: '↔AB, con flechas en ambos sentidos.', difficulty: 'basico' },
            { id: 'ex-f1-5', type: 'true-false', question: 'Un punto tiene longitud, anchura y altura.', options: ['Verdadero', 'Falso'], correctAnswer: 1, explanation: 'Falso. Un punto no tiene dimensiones.', difficulty: 'basico' },
          ]},
          { id: 'les-fund-2', title: 'Plano y notacion', order: 2, theory: 'Un plano tiene 2 dimensiones (largo y ancho). Se nombra con 3 puntos no colineales. Un segmento es parte de una recta con dos extremos.', exercises: [
            { id: 'ex-f2-1', type: 'multiple-choice', question: '¿Cuantas dimensiones tiene un plano?', options: ['0', '1', '2', '3'], correctAnswer: 2, explanation: 'Un plano tiene 2 dimensiones: largo y ancho.', difficulty: 'basico' },
            { id: 'ex-f2-2', type: 'multiple-choice', question: '¿Cuantos puntos no colineales determinan un plano?', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: 'Tres puntos no colineales determinan un plano.', difficulty: 'basico' },
            { id: 'ex-f2-3', type: 'true-false', question: 'Se nombra un plano con 3 de sus puntos no colineales.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto. Ej: plano ABC.', difficulty: 'basico' },
            { id: 'ex-f2-4', type: 'multiple-choice', question: '¿Que es una semirrecta?', options: ['Una recta con un extremo', 'Un segmento infinito', 'Una recta por un punto', 'Un plano'], correctAnswer: 0, explanation: 'Tiene un origen y es infinita en un sentido.', difficulty: 'basico' },
            { id: 'ex-f2-5', type: 'multiple-choice', question: '¿Que es un segmento?', options: ['Parte de recta con dos extremos', 'Recta infinita', 'Punto sobre recta', 'Semirrecta'], correctAnswer: 0, explanation: 'Parte de recta entre dos puntos.', difficulty: 'basico' },
          ]},
          { id: 'les-fund-3', title: 'Figuras basicas', order: 3, theory: 'Un triangulo tiene 3 lados y sus angulos internos suman 180 grados. Un cuadrilatero tiene 4 lados. Un poligono es una figura plana cerrada con lados rectos.', exercises: [
            { id: 'ex-f3-1', type: 'multiple-choice', question: '¿Cuantos lados tiene un triangulo?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: '3 lados y 3 vertices.', difficulty: 'basico' },
            { id: 'ex-f3-2', type: 'multiple-choice', question: '¿Cuantos vertices tiene un cuadrilatero?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: '4 lados y 4 vertices.', difficulty: 'basico' },
            { id: 'ex-f3-3', type: 'true-false', question: 'Un circulo es una figura geometrica plana.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
            { id: 'ex-f3-4', type: 'multiple-choice', question: '¿Cuantos grados suman los angulos internos de un triangulo?', options: ['90', '180', '270', '360'], correctAnswer: 1, explanation: 'Siempre 180 grados.', difficulty: 'basico' },
            { id: 'ex-f3-5', type: 'multiple-choice', question: '¿Que es un poligono?', options: ['Figura plana cerrada con lados rectos', 'Curva cerrada', 'Figura con 2 lados', 'Recta dividida'], correctAnswer: 0, explanation: 'Figura plana cerrada con segmentos.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-seg-notacion',
        title: 'Segmentos y notacion',
        icon: '📏',
        lessons: [
          { id: 'les-sn-1', title: 'Tipos de segmentos', order: 1, theory: 'Un segmento tiene 2 extremos. Una semirrecta tiene 1 extremo y es infinita en un sentido. Puntos colineales estan en la misma recta.', exercises: [
            { id: 'ex-sn1-1', type: 'multiple-choice', question: '¿Cuantos extremos tiene un segmento?', options: ['0', '1', '2', '3'], correctAnswer: 2, explanation: '2 extremos.', difficulty: 'basico' },
            { id: 'ex-sn1-2', type: 'multiple-choice', question: 'Diferencia entre segmento y semirrecta:', options: ['Segmento: 2 extremos, semirrecta: 1', 'Segmento: 1, semirrecta: 2', 'Son lo mismo', 'Semirrecta es mas corta'], correctAnswer: 0, explanation: 'Segmento tiene 2 extremos, semirrecta 1.', difficulty: 'basico' },
            { id: 'ex-sn1-3', type: 'true-false', question: 'Un rayo tiene un solo extremo y se extiende infinitamente.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
            { id: 'ex-sn1-4', type: 'multiple-choice', question: '¿Como se nombra el segmento con extremos A y B?', options: ['AB', '→AB', '↔AB', 'AB↔'], correctAnswer: 0, explanation: 'AB.', difficulty: 'basico' },
            { id: 'ex-sn1-5', type: 'multiple-choice', question: '¿Que son los puntos colineales?', options: ['Puntos en la misma recta', 'En rectas paralelas', 'Forman triangulo', 'En el mismo plano'], correctAnswer: 0, explanation: 'En la misma recta.', difficulty: 'basico' },
          ]},
          { id: 'les-sn-2', title: 'Notacion y extremos', order: 2, theory: 'El segmento AB es igual a BA. Con 3 puntos colineales se forman 3 segmentos. El punto medio divide un segmento en dos partes iguales.', exercises: [
            { id: 'ex-sn2-1', type: 'multiple-choice', question: 'Si AB = 5 cm, ¿cuanto mide BA?', options: ['5 cm', '10 cm', '2.5 cm', 'No se puede saber'], correctAnswer: 0, explanation: 'AB = BA.', difficulty: 'basico' },
            { id: 'ex-sn2-2', type: 'true-false', question: 'Puntos colineales estan en la misma recta.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
            { id: 'ex-sn2-3', type: 'multiple-choice', question: '3 puntos colineales A, B, C: ¿cuantos segmentos?', options: ['2', '3', '4', '6'], correctAnswer: 1, explanation: 'AB, BC, AC = 3.', difficulty: 'intermedio' },
            { id: 'ex-sn2-4', type: 'multiple-choice', question: '¿Que es un punto medio?', options: ['Divide en dos partes iguales', 'Esta fuera', 'Es el mas largo', 'Cruce de rectas'], correctAnswer: 0, explanation: 'Divide en partes iguales.', difficulty: 'basico' },
            { id: 'ex-sn2-5', type: 'multiple-choice', question: 'M es punto medio de AB=10. ¿AM?', options: ['5', '10', '2.5', '20'], correctAnswer: 0, explanation: '10/2 = 5.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-seg-longitud',
        title: 'Longitud y medida',
        icon: '🔢',
        lessons: [
          { id: 'les-sl-1', title: 'Unidades de medida', order: 1, theory: 'La unidad base del SI es el metro. 1 m = 100 cm = 1000 mm. 1 km = 1000 m.', exercises: [
            { id: 'ex-sl1-1', type: 'multiple-choice', question: '¿Unidad base del SI para longitud?', options: ['Kilometro', 'Metro', 'Centimetro', 'Pulgada'], correctAnswer: 1, explanation: 'El metro.', difficulty: 'basico' },
            { id: 'ex-sl1-2', type: 'multiple-choice', question: '¿Cuantos cm en 1 m?', options: ['10', '50', '100', '1000'], correctAnswer: 2, explanation: '100 cm.', difficulty: 'basico' },
            { id: 'ex-sl1-3', type: 'numeric', question: '3.5 dm = ¿cuantos cm?', correctAnswer: '35', explanation: '3.5 x 10 = 35.', difficulty: 'basico' },
            { id: 'ex-sl1-4', type: 'multiple-choice', question: '¿Cuantos mm en 2.5 cm?', options: ['2.5', '25', '250', '0.25'], correctAnswer: 1, explanation: '25 mm.', difficulty: 'basico' },
            { id: 'ex-sl1-5', type: 'true-false', question: '1 km = 1000 m.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
          ]},
          { id: 'les-sl-2', title: 'Lectura de medidas', order: 2, theory: 'Para convertir unidades: multiplicar o dividir por 10, 100 o 1000 segun la relacion. Ej: 0.8 m = 80 cm.', exercises: [
            { id: 'ex-sl2-1', type: 'numeric', question: '7.5 cm = ¿cuantos mm?', correctAnswer: '75', explanation: '75 mm.', difficulty: 'basico' },
            { id: 'ex-sl2-2', type: 'multiple-choice', question: '¿Medida mas precisa para un lapiz?', options: ['1 dm', '15 cm', '150 mm', '0.015 m'], correctAnswer: 1, explanation: '15 cm.', difficulty: 'basico' },
            { id: 'ex-sl2-3', type: 'multiple-choice', question: '0.8 m = ¿cuantos cm?', options: ['8', '80', '800', '0.08'], correctAnswer: 1, explanation: '80 cm.', difficulty: 'basico' },
            { id: 'ex-sl2-4', type: 'numeric', question: '125 km = ¿cuantos m?', correctAnswer: '125000', explanation: '125,000 m.', difficulty: 'basico' },
            { id: 'ex-sl2-5', type: 'multiple-choice', question: '¿Cuantos dm en 5 m?', options: ['5', '50', '500', '0.5'], correctAnswer: 1, explanation: '50 dm.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-seg-relacion',
        title: 'Relacion de estar entre',
        icon: '🔗',
        lessons: [
          { id: 'les-sr-1', title: 'Puntos consecutivos', order: 1, theory: 'Si B esta entre A y C, entonces AC = AB + BC. Esta es la adicion de segmentos.', exercises: [
            { id: 'ex-sr1-1', type: 'multiple-choice', question: 'Si B esta entre A y C:', options: ['AC = AB + BC', 'AB = AC + BC', 'BC = AB + AC', 'AC = AB - BC'], correctAnswer: 0, explanation: 'AC = AB + BC.', difficulty: 'basico' },
            { id: 'ex-sr1-2', type: 'numeric', question: 'AB=5, BC=3, B entre A y C. ¿AC?', correctAnswer: '8', explanation: '5+3=8.', difficulty: 'basico' },
            { id: 'ex-sr1-3', type: 'multiple-choice', question: 'AC=12, AB=4.5. ¿BC?', options: ['7.5', '16.5', '5.5', '8.5'], correctAnswer: 0, explanation: '12-4.5=7.5.', difficulty: 'intermedio' },
            { id: 'ex-sr1-4', type: 'multiple-choice', question: 'Postulado de adicion:', options: ['AC = AB + BC si B esta entre A y C', 'Todo segmento tiene punto medio', 'Paralelas nunca se cortan', 'Angulos opuestos son iguales'], correctAnswer: 0, explanation: 'Suma de partes = todo.', difficulty: 'basico' },
            { id: 'ex-sr1-5', type: 'true-false', question: 'Si A, B, C estan en ese orden, AC > AB.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'AC = AB + BC, y BC > 0.', difficulty: 'basico' },
          ]},
          { id: 'les-sr-2', title: 'Planteamientos algebraicos', order: 2, theory: 'Se pueden plantear ecuaciones con segmentos. Si AC = AB + BC, se despeja la incognita que se necesita.', exercises: [
            { id: 'ex-sr2-1', type: 'numeric', question: 'AB=2x+3, BC=x+1, AC=15 (B entre A y C). ¿x?', correctAnswer: '4', explanation: '3x+4=15, 3x=11, x≈4.', difficulty: 'intermedio' },
            { id: 'ex-sr2-2', type: 'multiple-choice', question: 'A,B,C,D en orden. AB=2, BC=5, CD=3. ¿AD?', options: ['7', '8', '10', '6'], correctAnswer: 2, explanation: '2+5+3=10.', difficulty: 'intermedio' },
            { id: 'ex-sr2-3', type: 'numeric', question: 'AB=3x, BC=2x, AC=20. ¿AB?', correctAnswer: '12', explanation: '5x=20, x=4, AB=12.', difficulty: 'intermedio' },
            { id: 'ex-sr2-4', type: 'multiple-choice', question: 'AB=5, BC=3, CD=7 (en orden). ¿BD?', options: ['3', '5', '8', '10'], correctAnswer: 2, explanation: 'BC+CD=3+7=10.', difficulty: 'intermedio' },
            { id: 'ex-sr2-5', type: 'multiple-choice', question: 'M punto medio de AC, AB=8, BC=4. ¿Esta B entre A y M o M y C?', options: ['Entre A y M', 'Entre M y C', 'Coincide con M', 'No se puede saber'], correctAnswer: 1, explanation: 'AC=12, AM=6. AB=8>6, B esta entre M y C.', difficulty: 'intermedio' },
          ]},
        ],
      },
      {
        id: 'node-seg-operaciones',
        title: 'Operaciones con segmentos',
        icon: '➕',
        lessons: [
          { id: 'les-so-1', title: 'Suma y diferencia', order: 1, theory: 'Suma de segmentos: AC = AB + BC. Diferencia: AB = AC - BC. Si AB = BC, entonces B es el punto medio.', exercises: [
            { id: 'ex-so1-1', type: 'multiple-choice', question: 'AB=7, BC=3 (B entre A y C). ¿AC?', options: ['4', '10', '7', '3'], correctAnswer: 1, explanation: '7+3=10.', difficulty: 'basico' },
            { id: 'ex-so1-2', type: 'multiple-choice', question: 'AC=15, BC=6. ¿AB?', options: ['9', '21', '6', '15'], correctAnswer: 0, explanation: '15-6=9.', difficulty: 'basico' },
            { id: 'ex-so1-3', type: 'numeric', question: 'AB=4.5 cm, BC=2.8 cm, B entre A y C. ¿AC?', correctAnswer: '7.3', explanation: '4.5+2.8=7.3.', difficulty: 'basico' },
            { id: 'ex-so1-4', type: 'multiple-choice', question: 'AC=20, AB=13. ¿BC?', options: ['7', '33', '20', '13'], correctAnswer: 0, explanation: '20-13=7.', difficulty: 'basico' },
            { id: 'ex-so1-5', type: 'true-false', question: 'Si AB = BC, B es el punto medio de AC.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
          ]},
          { id: 'les-so-2', title: 'Proporciones y problemas', order: 2, theory: 'Si AB/BC = a/b, entonces AB = (a/(a+b)) x AC. Se usan proporciones para dividir segmentos en partes.', exercises: [
            { id: 'ex-so2-1', type: 'multiple-choice', question: 'AB/BC = 2/3, AC=25. ¿AB?', options: ['10', '15', '12.5', '5'], correctAnswer: 0, explanation: '(2/5)*25=10.', difficulty: 'intermedio' },
            { id: 'ex-so2-2', type: 'numeric', question: 'AB:BC = 1:4, AC=30 cm. ¿BC?', correctAnswer: '24', explanation: '(4/5)*30=24.', difficulty: 'intermedio' },
            { id: 'ex-so2-3', type: 'multiple-choice', question: 'AB = 2BC, AC=18. ¿BC?', options: ['6', '9', '12', '3'], correctAnswer: 0, explanation: '3BC=18, BC=6.', difficulty: 'intermedio' },
            { id: 'ex-so2-4', type: 'multiple-choice', question: 'Cable 50m en razon 3:2. ¿Parte mas larga?', options: ['20m', '30m', '25m', '15m'], correctAnswer: 1, explanation: '(3/5)*50=30m.', difficulty: 'intermedio' },
            { id: 'ex-so2-5', type: 'numeric', question: 'AB/BC = 3/5, AB=9 cm. ¿AC?', correctAnswer: '24', explanation: 'BC=15, AC=24.', difficulty: 'intermedio' },
          ]},
        ],
      },
      {
        id: 'node-seg-puntomedio',
        title: 'Punto medio',
        icon: '🎯',
        lessons: [
          { id: 'les-spm-1', title: 'Calculo de puntos medios', order: 1, theory: 'Punto medio: M = (A + B) / 2. Si M es punto medio de AB, entonces AM = MB = AB/2.', exercises: [
            { id: 'ex-spm1-1', type: 'numeric', question: 'A=2, B=8 en recta numerica. ¿Punto medio?', correctAnswer: '5', explanation: '(2+8)/2=5.', difficulty: 'basico' },
            { id: 'ex-spm1-2', type: 'multiple-choice', question: 'M punto medio de AB=20 cm. ¿AM?', options: ['5', '10', '20', '40'], correctAnswer: 1, explanation: '20/2=10.', difficulty: 'basico' },
            { id: 'ex-spm1-3', type: 'numeric', question: 'A=-3, B=7. ¿Punto medio?', correctAnswer: '2', explanation: '(-3+7)/2=2.', difficulty: 'basico' },
            { id: 'ex-spm1-4', type: 'multiple-choice', question: 'AM=4.5, M punto medio. ¿AB?', options: ['4.5', '9', '2.25', '18'], correctAnswer: 1, explanation: '4.5*2=9.', difficulty: 'basico' },
            { id: 'ex-spm1-5', type: 'true-false', question: 'El punto medio de un segmento es unico.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
          ]},
          { id: 'les-spm-2', title: 'Aplicaciones del punto medio', order: 2, theory: 'El punto medio es unico. Si M es punto medio de AB y N de BC, entonces MN = AC/2.', exercises: [
            { id: 'ex-spm2-1', type: 'numeric', question: 'M punto medio de AB. A=-5, M=3. ¿B?', correctAnswer: '11', explanation: '3=(-5+B)/2, B=11.', difficulty: 'intermedio' },
            { id: 'ex-spm2-2', type: 'multiple-choice', question: 'PM=3x+2, MQ=5x-4 (M punto medio). ¿x?', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: '3x+2=5x-4, 6=2x, x=3.', difficulty: 'intermedio' },
            { id: 'ex-spm2-3', type: 'multiple-choice', question: 'M punto medio AB, N punto medio BC. ¿MN?', options: ['La mitad de AC', 'AB+BC', 'AB-BC', 'El doble de AC'], correctAnswer: 0, explanation: 'MN = AC/2.', difficulty: 'avanzado' },
            { id: 'ex-spm2-4', type: 'numeric', question: 'AB=30, M punto medio AB, N punto medio AM. ¿AN?', correctAnswer: '7.5', explanation: 'AM=15, AN=7.5.', difficulty: 'intermedio' },
            { id: 'ex-spm2-5', type: 'multiple-choice', question: 'A=4, B=-6. ¿Punto medio?', options: ['-1', '0', '1', '-2'], correctAnswer: 0, explanation: '(4+(-6))/2=-1.', difficulty: 'intermedio' },
          ]},
        ],
      },
      {
        id: 'node-seg-congruencia',
        title: 'Congruencia de segmentos',
        icon: '✅',
        lessons: [
          { id: 'les-sc-1', title: 'Segmentos congruentes', order: 1, theory: 'Segmentos congruentes tienen la misma longitud. Se senala con AB = CD. El punto medio crea segmentos congruentes.', exercises: [
            { id: 'ex-sc1-1', type: 'multiple-choice', question: '¿Que significa que dos segmentos son congruentes?', options: ['Tienen la misma longitud', 'Estan en la misma recta', 'Son paralelos', 'Misma direccion'], correctAnswer: 0, explanation: 'Misma longitud.', difficulty: 'basico' },
            { id: 'ex-sc1-2', type: 'multiple-choice', question: 'AB ≅ CD, AB=5 cm. ¿CD?', options: ['5 cm', '10 cm', '2.5 cm', 'No se sabe'], correctAnswer: 0, explanation: 'Congruentes = misma medida.', difficulty: 'basico' },
            { id: 'ex-sc1-3', type: 'true-false', question: 'El simbolo ≅ significa "es congruente con".', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
            { id: 'ex-sc1-4', type: 'multiple-choice', question: 'M punto medio de AB. ¿Relacion AM y MB?', options: ['AM ≅ MB', 'AM > MB', 'AM < MB', 'No hay relacion'], correctAnswer: 0, explanation: 'AM = MB.', difficulty: 'basico' },
            { id: 'ex-sc1-5', type: 'multiple-choice', question: '¿Como se demuestra congruencia?', options: ['Midiendo longitudes iguales', 'Misma recta', 'Paralelismo', 'Contando extremos'], correctAnswer: 0, explanation: 'Medidas iguales.', difficulty: 'basico' },
          ]},
          { id: 'les-sc-2', title: 'Reconocimiento en figuras', order: 2, theory: 'En un rectangulo, lados opuestos son congruentes. En un cuadrado, los 4 lados son congruentes. En triangulo equilatero, los 3 lados son congruentes.', exercises: [
            { id: 'ex-sc2-1', type: 'multiple-choice', question: 'En un rectangulo, lados opuestos:', options: ['Son congruentes', 'Son perpendiculares', 'Son paralelos y congruentes', 'No tienen relacion'], correctAnswer: 2, explanation: 'Paralelos y congruentes.', difficulty: 'basico' },
            { id: 'ex-sc2-2', type: 'multiple-choice', question: 'En un cuadrado, ¿cuantos segmentos congruentes?', options: ['2', '3', '4', '6'], correctAnswer: 2, explanation: '4 lados congruentes.', difficulty: 'basico' },
            { id: 'ex-sc2-3', type: 'true-false', question: 'En triangulo equilatero, los 3 lados son congruentes.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-sc2-4', type: 'multiple-choice', question: 'Cuadrilatero con 4 lados congruentes:', options: ['Rectangulo', 'Rombo', 'Trapecio', 'Paralelogramo'], correctAnswer: 1, explanation: 'Rombo.', difficulty: 'intermedio' },
            { id: 'ex-sc2-5', type: 'multiple-choice', question: 'En rectangulo, las diagonales son:', options: ['Congruentes', 'Desiguales', 'Perpendiculares', 'Paralelas'], correctAnswer: 0, explanation: 'Congruentes.', difficulty: 'intermedio' },
          ]},
        ],
      },
      {
        id: 'node-seg-division',
        title: 'Division de segmentos',
        icon: '✂️',
        lessons: [
          { id: 'les-sd-1', title: 'Division interna', order: 1, theory: 'Division interna en razon a:b significa AP/PB = a/b. El punto P esta entre A y B. AP = (a/(a+b)) x AB.', exercises: [
            { id: 'ex-sd1-1', type: 'multiple-choice', question: 'P divide AB en razon 2:3. ¿Que significa?', options: ['AP/PB = 2/3', 'AP/PB = 3/2', 'AP=2 y PB=3', 'AB=5'], correctAnswer: 0, explanation: 'AP/PB = 2/3.', difficulty: 'intermedio' },
            { id: 'ex-sd1-2', type: 'numeric', question: 'AB=20 cm, P divide en 3:1. ¿AP?', correctAnswer: '15', explanation: '(3/4)*20=15.', difficulty: 'intermedio' },
            { id: 'ex-sd1-3', type: 'multiple-choice', question: 'Q divide MN en 1:4, MQ=5 cm. ¿QN?', options: ['5', '10', '20', '25'], correctAnswer: 2, explanation: '4*5=20.', difficulty: 'intermedio' },
            { id: 'ex-sd1-4', type: 'multiple-choice', question: '¿Que es division interna?', options: ['Punto entre extremos en razon dada', 'Punto fuera del segmento', 'La mitad', 'Punto en otro plano'], correctAnswer: 0, explanation: 'Punto entre los extremos.', difficulty: 'basico' },
            { id: 'ex-sd1-5', type: 'numeric', question: 'XY=36 cm, Z lo divide en 5:7. ¿XZ?', correctAnswer: '15', explanation: '(5/12)*36=15.', difficulty: 'intermedio' },
          ]},
          { id: 'les-sd-2', title: 'Division externa y problemas', order: 2, theory: 'En division externa, P esta fuera del segmento. El punto medio divide en razon 1:1.', exercises: [
            { id: 'ex-sd2-1', type: 'multiple-choice', question: '¿Que es division externa?', options: ['Punto fuera del segmento en razon dada', 'Punto entre extremos', 'La mitad', 'Punto en otro plano'], correctAnswer: 0, explanation: 'Punto fuera del segmento.', difficulty: 'intermedio' },
            { id: 'ex-sd2-2', type: 'multiple-choice', question: 'P divide externamente AB en 2:5. ¿Donde esta?', options: ['Mas cerca de A', 'Mas cerca de B', 'Punto medio', 'Entre A y B'], correctAnswer: 1, explanation: 'Mas cerca del lado con razon mayor (5).', difficulty: 'intermedio' },
            { id: 'ex-sd2-3', type: 'multiple-choice', question: '¿Cuantos puntos dividen internamente un segmento en 1:2?', options: ['1', '2', 'Infinitos', 'Ninguno'], correctAnswer: 0, explanation: 'Solo 1.', difficulty: 'basico' },
            { id: 'ex-sd2-4', type: 'multiple-choice', question: 'Si P es punto medio, ¿en que razon divide?', options: ['1:1', '1:2', '2:1', '1:3'], correctAnswer: 0, explanation: 'Razon 1:1.', difficulty: 'basico' },
            { id: 'ex-sd2-5', type: 'multiple-choice', question: 'Cable 60m en razon 2:3:5. ¿Parte mas larga?', options: ['12m', '18m', '30m', '20m'], correctAnswer: 2, explanation: '(5/10)*60=30m.', difficulty: 'intermedio' },
          ]},
        ],
      },
    ],
  },
  {
    id: 'unit-angulos',
    title: 'Angulos',
    subtitle: 'Unidad 2 - Medicion y clasificacion',
    color: 'from-unit2-400 to-unit2-500',
    icon: '📏',
    nodes: [
      {
        id: 'node-ang-definicion',
        title: 'Angulos',
        icon: '📐',
        lessons: [
          { id: 'les-ang-1', title: 'Definicion y notacion', order: 1, theory: 'Un angulo es la union de dos semirrectas con un comun origen (vertice). Se mide en grados. Un angulo recto mide 90 grados.', exercises: [
            { id: 'ex-a1-1', type: 'multiple-choice', question: '¿Que es un angulo?', options: ['Union de dos semirrectas con comun origen', 'Segmento cerrado', 'Recta dividida', 'Dos rectas paralelas'], correctAnswer: 0, explanation: 'Dos semirrectas con vertice comun.', difficulty: 'basico' },
            { id: 'ex-a1-2', type: 'multiple-choice', question: '¿Cuantos grados mide un angulo recto?', options: ['45', '90', '180', '360'], correctAnswer: 1, explanation: '90 grados.', difficulty: 'basico' },
            { id: 'ex-a1-3', type: 'true-false', question: 'Los angulos se miden en grados.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Correcto.', difficulty: 'basico' },
            { id: 'ex-a1-4', type: 'multiple-choice', question: '¿Cuantas partes tiene un angulo?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'Dos lados y un vertice = 3.', difficulty: 'basico' },
            { id: 'ex-a1-5', type: 'multiple-choice', question: '¿Como se nombra con vertice V y lados VA, VB?', options: ['Angulo V', '∠AVB', 'Angulo VAB', 'Angulo ABV'], correctAnswer: 1, explanation: '∠AVB.', difficulty: 'basico' },
          ]},
          { id: 'les-ang-2', title: 'Clasificacion de angulos', order: 2, theory: 'Agudo: menor de 90. Recto: 90. Obtuso: entre 90 y 180. Llano: 180. Completo: 360.', exercises: [
            { id: 'ex-a2-1', type: 'multiple-choice', question: 'Angulo de 45°. ¿Que tipo?', options: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correctAnswer: 0, explanation: '45 < 90 = agudo.', difficulty: 'basico' },
            { id: 'ex-a2-2', type: 'multiple-choice', question: 'Angulo de 135°. ¿Que tipo?', options: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correctAnswer: 2, explanation: '90 < 135 < 180 = obtuso.', difficulty: 'basico' },
            { id: 'ex-a2-3', type: 'true-false', question: 'Un angulo llano mide 180°.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-a2-4', type: 'multiple-choice', question: '¿Cuantos grados un angulo completo?', options: ['90', '180', '270', '360'], correctAnswer: 3, explanation: '360 = vuelta completa.', difficulty: 'basico' },
            { id: 'ex-a2-5', type: 'multiple-choice', question: '¿Que tipo mide exactamente 90°?', options: ['Agudo', 'Recto', 'Obtuso', 'Concavo'], correctAnswer: 1, explanation: 'Recto = 90.', difficulty: 'basico' },
          ]},
          { id: 'les-ang-3', title: 'Complementarios, suplementarios y opuestos', order: 3, theory: 'Complementarios suman 90. Suplementarios suman 180. Opuestos por vertice son iguales. Adyacentes comparten vertice y un lado.', exercises: [
            { id: 'ex-a3-1', type: 'multiple-choice', question: '¿Complemento de 35°?', options: ['145', '55', '65', '45'], correctAnswer: 1, explanation: '90-35=55.', difficulty: 'basico' },
            { id: 'ex-a3-2', type: 'multiple-choice', question: 'Suplemento de 110°:', options: ['70', '80', '20', '290'], correctAnswer: 0, explanation: '180-110=70.', difficulty: 'basico' },
            { id: 'ex-a3-3', type: 'true-false', question: 'Angulos opuestos por el vertice son iguales.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-a3-4', type: 'multiple-choice', question: '¿Que son angulos adyacentes?', options: ['Comparten vertice y un lado, sin superponerse', 'Suman 90', 'Opuestos por vertice', 'Son iguales'], correctAnswer: 0, explanation: 'Mismo vertice, mismo lado.', difficulty: 'basico' },
            { id: 'ex-a3-5', type: 'multiple-choice', question: 'Dos adyacentes forman angulo llano. ¿Que son?', options: ['Complementarios', 'Suplementarios', 'Congruentes', 'Opuestos'], correctAnswer: 1, explanation: 'Suman 180 = suplementarios.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-ang-bisectriz',
        title: 'Bisectriz de un angulo',
        icon: '↗️',
        lessons: [
          { id: 'les-ab-1', title: 'Propiedad de la bisectriz', order: 1, theory: 'La bisectriz es la semirrecta que divide un angulo en dos partes iguales. Todo angulo tiene una bisectriz unica.', exercises: [
            { id: 'ex-ab1-1', type: 'multiple-choice', question: '¿Que es la bisectriz?', options: ['Semirrecta que divide al angulo en dos iguales', 'Recta por el vertice', 'Lado del angulo', 'Altura del angulo'], correctAnswer: 0, explanation: 'Divide en dos angulos iguales.', difficulty: 'basico' },
            { id: 'ex-ab1-2', type: 'multiple-choice', question: 'Bisectriz de 80°. ¿Cada parte?', options: ['20', '40', '80', '160'], correctAnswer: 1, explanation: '80/2=40.', difficulty: 'basico' },
            { id: 'ex-ab1-3', type: 'true-false', question: 'Todo angulo tiene una bisectriz.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-ab1-4', type: 'multiple-choice', question: 'Bisectriz de 150°. ¿Cada parte?', options: ['50', '75', '150', '30'], correctAnswer: 1, explanation: '150/2=75.', difficulty: 'basico' },
            { id: 'ex-ab1-5', type: 'multiple-choice', question: 'Bisectriz de angulo recto forma:', options: ['30', '45', '60', '90'], correctAnswer: 1, explanation: '90/2=45.', difficulty: 'basico' },
          ]},
          { id: 'les-ab-2', title: 'Problemas con bisectrices', order: 2, theory: 'Si la bisectriz divide un angulo de 2x, cada parte es x. Se pueden plantear ecuaciones para hallar angulos.', exercises: [
            { id: 'ex-ab2-1', type: 'multiple-choice', question: 'Bisectriz forma dos partes de (2x+10)°. ¿Total?', options: ['20', '40', '80', '100'], correctAnswer: 2, explanation: 'Si cada parte es 40, total = 80.', difficulty: 'intermedio' },
            { id: 'ex-ab2-2', type: 'numeric', question: '∠ABC=120°, BM bisectriz. ¿∠ABM?', correctAnswer: '60', explanation: '120/2=60.', difficulty: 'basico' },
            { id: 'ex-ab2-3', type: 'multiple-choice', question: '∠XYZ=4x, bisectriz forma 35°. ¿x?', options: ['8.75', '17.5', '35', '70'], correctAnswer: 1, explanation: '4x/2=35, x=17.5.', difficulty: 'intermedio' },
            { id: 'ex-ab2-4', type: 'multiple-choice', question: 'Bisectriz de angulo llano forma:', options: ['45', '60', '90', '180'], correctAnswer: 2, explanation: '180/2=90.', difficulty: 'basico' },
            { id: 'ex-ab2-5', type: 'multiple-choice', question: '∠PQR=70°, bisectriz QM. ¿∠PQM+∠MQR?', options: ['35', '70', '140', '350'], correctAnswer: 1, explanation: 'Suma = angulo total = 70.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-ang-perpendiculares',
        title: 'Rectas perpendiculares',
        icon: '⊥',
        lessons: [
          { id: 'les-ap-1', title: 'Propiedades de la perpendicularidad', order: 1, theory: 'Rectas perpendiculares forman angulos de 90 grados. Los 4 angulos que forman son rectos. Se senala con el simbolo perpendicular.', exercises: [
            { id: 'ex-ap1-1', type: 'multiple-choice', question: '¿Que angulo forman rectas perpendiculares?', options: ['45', '60', '90', '180'], correctAnswer: 2, explanation: 'Perpendiculares = 90.', difficulty: 'basico' },
            { id: 'ex-ap1-2', type: 'true-false', question: 'Si r ⊥ s, los 4 angulos son rectos.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-ap1-3', type: 'multiple-choice', question: '¿Que simbolo indica perpendicularidad?', options: ['∥', '⊥', '≅', '≈'], correctAnswer: 1, explanation: '⊥ = perpendicular.', difficulty: 'basico' },
            { id: 'ex-ap1-4', type: 'multiple-choice', question: 'AB ⊥ CD en O. ¿∠AOC?', options: ['45', '90', '180', 'No se sabe'], correctAnswer: 1, explanation: 'Todos = 90.', difficulty: 'basico' },
            { id: 'ex-ap1-5', type: 'true-false', question: 'Rectas perpendiculares siempre se cortan.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
          ]},
          { id: 'les-ap-2', title: 'Problemas geometricos', order: 2, theory: 'Si dos lados son perpendiculares, forman un angulo recto. La mediatriz es perpendicular al segmento por su punto medio.', exercises: [
            { id: 'ex-ap2-1', type: 'multiple-choice', question: 'r ⊥ s, ∠1=3x+15. ¿x para que sea recto?', options: ['15', '25', '35', '45'], correctAnswer: 1, explanation: '3x+15=90, x=25.', difficulty: 'intermedio' },
            { id: 'ex-ap2-2', type: 'numeric', question: 'AB ⊥ CD, ∠AOC=5x-10. ¿x?', correctAnswer: '20', explanation: '5x-10=90, x=20.', difficulty: 'intermedio' },
            { id: 'ex-ap2-3', type: 'multiple-choice', question: 'Dos lados adyacentes perpendiculares forman:', options: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correctAnswer: 1, explanation: 'Perpendiculares = recto.', difficulty: 'basico' },
            { id: 'ex-ap2-4', type: 'multiple-choice', question: 'Si r ⊥ s, ¿cuanto miden los 4 angulos?', options: ['45 cada uno', '90 cada uno', '60 cada uno', 'Depende'], correctAnswer: 1, explanation: 'Todos = 90.', difficulty: 'basico' },
            { id: 'ex-ap2-5', type: 'multiple-choice', question: 'La mediatriz es perpendicular al segmento y pasa por:', options: ['Un extremo', 'El punto medio', 'Fuera del segmento', 'Ambos extremos'], correctAnswer: 1, explanation: 'Punto medio.', difficulty: 'intermedio' },
          ]},
        ],
      },
    ],
  },
  {
    id: 'unit-paralelas-tri',
    title: 'Paralelismo y Triangulos',
    subtitle: 'Unidad 3 - Rectas y figuras',
    color: 'from-unit3-400 to-unit3-500',
    icon: '🔺',
    nodes: [
      {
        id: 'node-paralelas',
        title: 'Rectas paralelas',
        icon: '∥',
        lessons: [
          { id: 'les-par-1', title: 'Transversal y angulos', order: 1, theory: 'Una transversal corta a dos rectas. Correspondientes estan en la misma posicion. Alternos internos estan en lados opuestos entre las paralelas.', exercises: [
            { id: 'ex-p1-1', type: 'multiple-choice', question: '¿Que es una recta transversal?', options: ['Recta que corta a dos o mas rectas', 'Recta paralela', 'Recta perpendicular', 'Recta que no corta'], correctAnswer: 0, explanation: 'Corta a dos o mas rectas.', difficulty: 'basico' },
            { id: 'ex-p1-2', type: 'multiple-choice', question: '¿Que son angulos correspondientes?', options: ['En la misma posicion relativa', 'Suman 180', 'Opuestos por vertice', 'Son iguales'], correctAnswer: 0, explanation: 'Misma posicion.', difficulty: 'basico' },
            { id: 'ex-p1-3', type: 'true-false', question: 'Con paralelas, correspondientes son iguales.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-p1-4', type: 'multiple-choice', question: '¿Que son angulos alternos internos?', options: ['En lados opuestos, entre paralelas', 'En el mismo lado', 'Suman 90', 'Opuestos por vertice'], correctAnswer: 0, explanation: 'Lados opuestos, entre paralelas.', difficulty: 'basico' },
            { id: 'ex-p1-5', type: 'multiple-choice', question: 'Paralelas, transversal, angulo interior=65. ¿Consecutivo?', options: ['65', '115', '125', '25'], correctAnswer: 1, explanation: '180-65=115.', difficulty: 'intermedio' },
          ]},
          { id: 'les-par-2', title: 'Aplicaciones con paralelas', order: 2, theory: 'Con paralelas: correspondientes son iguales, alternos internos son iguales, conjugados internos suman 180.', exercises: [
            { id: 'ex-p2-1', type: 'multiple-choice', question: '∠1=72 es correspondiente a ∠2. ¿∠2?', options: ['72', '108', '180', '36'], correctAnswer: 0, explanation: 'Correspondientes = iguales.', difficulty: 'basico' },
            { id: 'ex-p2-2', type: 'multiple-choice', question: '∠3, ∠4 alternos internos, ∠3=55. ¿∠4?', options: ['55', '125', '180', '45'], correctAnswer: 0, explanation: 'Alternos internos = iguales.', difficulty: 'basico' },
            { id: 'ex-p2-3', type: 'numeric', question: 'Angulo = 3x+10, su correspondiente = 85. ¿x?', correctAnswer: '25', explanation: '3x+10=85, x=25.', difficulty: 'intermedio' },
            { id: 'ex-p2-4', type: 'multiple-choice', question: '¿Relacion de conjugados internos con paralelas?', options: ['Son iguales', 'Son suplementarios', 'Son complementarios', 'No tienen relacion'], correctAnswer: 1, explanation: 'Suman 180.', difficulty: 'intermedio' },
            { id: 'ex-p2-5', type: 'multiple-choice', question: '∠5=40 es alterno externo a ∠6. ¿∠6?', options: ['40', '140', '180', '50'], correctAnswer: 0, explanation: 'Alternos externos = iguales.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-tri-elementos',
        title: 'Triangulos',
        icon: '🔺',
        lessons: [
          { id: 'les-tri-1', title: 'Elementos y clasificacion', order: 1, theory: 'Triangulo tiene 3 lados y 3 vertices. Angulos internos suman 180. Por lados: equilatero, isosceles, escaleno. Por angulos: acutangulo, rectangulo, obtusangulo.', exercises: [
            { id: 'ex-t1-1', type: 'multiple-choice', question: '¿Cuantos lados y vertices tiene un triangulo?', options: ['2 y 2', '3 y 3', '4 y 4', '5 y 5'], correctAnswer: 1, explanation: '3 lados, 3 vertices.', difficulty: 'basico' },
            { id: 'ex-t1-2', type: 'multiple-choice', question: 'Triangulo con 3 lados iguales:', options: ['Isosceles', 'Escaleno', 'Equilatero', 'Rectangulo'], correctAnswer: 2, explanation: 'Equilatero.', difficulty: 'basico' },
            { id: 'ex-t1-3', type: 'multiple-choice', question: '¿Cuantos grados suman los angulos internos?', options: ['90', '180', '270', '360'], correctAnswer: 1, explanation: 'Siempre 180.', difficulty: 'basico' },
            { id: 'ex-t1-4', type: 'true-false', question: 'Isosceles tiene 2 lados iguales.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-t1-5', type: 'multiple-choice', question: 'Triangulo con angulo de 90:', options: ['Acutangulo', 'Obtusangulo', 'Rectangulo', 'Equiangulo'], correctAnswer: 2, explanation: 'Rectangulo.', difficulty: 'basico' },
          ]},
          { id: 'les-tri-2', title: 'Angulos interiores y exteriores', order: 2, theory: 'Angulo externo = suma de los dos internos no adjacentes. Los 3 angulos internos suman 180.', exercises: [
            { id: 'ex-t2-1', type: 'numeric', question: 'Dos angulos internos: 65 y 45. ¿El tercero?', correctAnswer: '70', explanation: '180-65-45=70.', difficulty: 'basico' },
            { id: 'ex-t2-2', type: 'multiple-choice', question: '¿Que es un angulo externo?', options: ['Formado por lado y prolongacion de otro', 'Dentro del triangulo', 'El mayor', 'El recto'], correctAnswer: 0, explanation: 'Al prolongar un lado.', difficulty: 'basico' },
            { id: 'ex-t2-3', type: 'multiple-choice', question: 'Angulo externo es igual a:', options: ['Suma de dos internos no adjacentes', 'Interno opuesto', 'Suma de tres', 'Mitad del interno'], correctAnswer: 0, explanation: 'Suma de los dos no adjacentes.', difficulty: 'basico' },
            { id: 'ex-t2-4', type: 'numeric', question: 'Angulo externo=120, interno no adyacente=45. ¿El otro?', correctAnswer: '75', explanation: '120-45=75.', difficulty: 'intermedio' },
            { id: 'ex-t2-5', type: 'true-false', question: 'Un triangulo puede tener dos angulos rectos.', options: ['Verdadero', 'Falso'], correctAnswer: 1, explanation: 'Falso. 90+90=180.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-tri-congruencia',
        title: 'Congruencia de triangulos',
        icon: '≅',
        lessons: [
          { id: 'les-tc-1', title: 'Criterios de congruencia', order: 1, theory: 'Congruentes = misma forma y tamano. Criterios: LLL (3 lados), ALA (2 angulos y lado), LAL (2 lados y angulo). AAA es semejanza, no congruencia.', exercises: [
            { id: 'ex-tc1-1', type: 'multiple-choice', question: '¿Que significa triangulos congruentes?', options: ['Todos lados y angulos correspondientes iguales', 'Misma forma, diferente tamaño', 'Tienen un lado igual', 'Tienen un angulo igual'], correctAnswer: 0, explanation: 'Misma forma y tamaño.', difficulty: 'basico' },
            { id: 'ex-tc1-2', type: 'multiple-choice', question: '¿Que significa LLL?', options: ['Los tres lados son iguales', 'Dos lados y un angulo', 'Dos angulos y un lado', 'Un lado y dos angulos'], correctAnswer: 0, explanation: 'Lado-Lado-Lado.', difficulty: 'basico' },
            { id: 'ex-tc1-3', type: 'multiple-choice', question: '¿Que es ALA?', options: ['Dos angulos y el lado comprendido', 'Tres lados', 'Dos lados y un angulo', 'Un lado y dos angulos'], correctAnswer: 0, explanation: 'Angulo-Lado-Angulo.', difficulty: 'basico' },
            { id: 'ex-tc1-4', type: 'true-false', question: 'AAA demuestra congruencia.', options: ['Verdadero', 'Falso'], correctAnswer: 1, explanation: 'Falso. AAA = semejanza.', difficulty: 'intermedio' },
            { id: 'ex-tc1-5', type: 'multiple-choice', question: '¿Que es LAL?', options: ['Dos lados y el angulo comprendido', 'Tres lados', 'Dos angulos y un lado', 'Un lado y dos angulos'], correctAnswer: 0, explanation: 'Lado-Angulo-Lado.', difficulty: 'basico' },
          ]},
          { id: 'les-tc-2', title: 'Aplicaciones de congruencia', order: 2, theory: 'El orden de letras indica correspondencia. Si ABC = DEF, entonces AB=DE, BC=EF, AC=DF. Congruentes tienen igual area.', exercises: [
            { id: 'ex-tc2-1', type: 'multiple-choice', question: '△ABC ≅ △DEF. ¿Lado correspondiente a AB?', options: ['DE', 'EF', 'FD', 'DF'], correctAnswer: 0, explanation: 'AB ↔ DE.', difficulty: 'basico' },
            { id: 'ex-tc2-2', type: 'multiple-choice', question: '△PQR ≅ △XYZ. ¿Angulo correspondiente a ∠P?', options: ['∠X', '∠Y', '∠Z', '∠Q'], correctAnswer: 0, explanation: '∠P ↔ ∠X.', difficulty: 'basico' },
            { id: 'ex-tc2-3', type: 'multiple-choice', question: 'AB=DE=5, BC=EF=7, AC=DF=9. ¿Criterio?', options: ['LLL', 'ALA', 'LAL', 'AAA'], correctAnswer: 0, explanation: '3 lados iguales = LLL.', difficulty: 'basico' },
            { id: 'ex-tc2-4', type: 'true-false', question: 'Si son congruentes, sus areas son iguales.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-tc2-5', type: 'multiple-choice', question: '¿Cuantos criterios de congruencia hay?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'LLL, ALA, LAL, AA.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-tri-desigualdades',
        title: 'Desigualdades geometricas',
        icon: '≠',
        lessons: [
          { id: 'les-td-1', title: 'Desigualdad triangular', order: 1, theory: 'En todo triangulo, la suma de dos lados es mayor que el tercero. Si dos lados son 5 y 8, el tercero esta entre 3 y 13.', exercises: [
            { id: 'ex-td1-1', type: 'multiple-choice', question: '¿Que establece la desigualdad triangular?', options: ['Suma de dos lados > tercero', 'Todos los lados iguales', 'Un lado > suma de otros', 'Angulos desiguales'], correctAnswer: 0, explanation: 'Suma de dos > tercero.', difficulty: 'basico' },
            { id: 'ex-td1-2', type: 'multiple-choice', question: '¿Triangulo con lados 3, 4, 8?', options: ['Si', 'No, 3+4<8', 'No, 3+8<4', 'Si siempre'], correctAnswer: 1, explanation: '3+4=7<8. No se cumple.', difficulty: 'basico' },
            { id: 'ex-td1-3', type: 'multiple-choice', question: 'Lados 5 y 8. ¿Rango del tercero?', options: ['Entre 3 y 13', 'Entre 5 y 8', 'Mayor que 13', 'Menor que 3'], correctAnswer: 0, explanation: '8-5 < x < 8+5.', difficulty: 'intermedio' },
            { id: 'ex-td1-4', type: 'true-false', question: 'Lado mayor opuesto a angulo mayor.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-td1-5', type: 'multiple-choice', question: '¿Triangulo con lados 1, 2, 3?', options: ['Si', 'No, 1+2=3', 'Depende', 'Si siempre'], correctAnswer: 1, explanation: '1+2=3, no es mayor estricto.', difficulty: 'basico' },
          ]},
          { id: 'les-td-2', title: 'Relacion entre lados y angulos', order: 2, theory: 'Mayor lado opuesto a mayor angulo. En isosceles, angulos opuestos a lados iguales son iguales.', exercises: [
            { id: 'ex-td2-1', type: 'multiple-choice', question: 'Si ∠A > ∠B, lados opuestos:', options: ['BC > AC', 'BC < AC', 'BC = AC', 'No hay relacion'], correctAnswer: 0, explanation: 'Mayor angulo, lado mayor.', difficulty: 'intermedio' },
            { id: 'ex-td2-2', type: 'multiple-choice', question: 'Isosceles AB=AC. ∠B y ∠C:', options: ['∠B > ∠C', '∠B < ∠C', '∠B = ∠C', 'No hay relacion'], correctAnswer: 2, explanation: 'Lados iguales = angulos iguales.', difficulty: 'basico' },
            { id: 'ex-td2-3', type: 'multiple-choice', question: 'AB > BC > AC. ¿Orden angulos (mayor a menor)?', options: ['∠C > ∠A > ∠B', '∠A > ∠C > ∠B', '∠B > ∠C > ∠A', '∠C > ∠B > ∠A'], correctAnswer: 0, explanation: 'Mayor lado → mayor angulo opuesto.', difficulty: 'intermedio' },
            { id: 'ex-td2-4', type: 'true-false', question: 'Lado menor opuesto a angulo menor.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-td2-5', type: 'multiple-choice', question: 'Angulos 50, 60, 70. ¿Lado mas largo?', options: ['Opuesto a 70', 'Opuesto a 60', 'Opuesto a 50', 'Todos iguales'], correctAnswer: 0, explanation: 'Mayor angulo → lado mayor.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-lugar-mediatriz',
        title: 'Mediatriz',
        icon: '⟂',
        lessons: [
          { id: 'les-lm-1', title: 'Mediatriz como lugar geometrico', order: 1, theory: 'La mediatriz es la recta perpendicular al segmento por su punto medio. Todo punto en ella es equidistante de los extremos.', exercises: [
            { id: 'ex-lm1-1', type: 'multiple-choice', question: '¿Que es la mediatriz?', options: ['Recta perpendicular por punto medio', 'Recta paralela', 'Angulo del segmento', 'Bisectriz del segmento'], correctAnswer: 0, explanation: 'Perpendicular por punto medio.', difficulty: 'basico' },
            { id: 'ex-lm1-2', type: 'multiple-choice', question: 'Propiedad de la mediatriz:', options: ['Puntos equidistantes de extremos', 'Equidistantes de lados', 'Siempre vertical', 'Divide angulo en dos'], correctAnswer: 0, explanation: 'Equidistante de extremos.', difficulty: 'basico' },
            { id: 'ex-lm1-3', type: 'true-false', question: 'Si P en mediatriz de AB, PA=PB.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-lm1-4', type: 'multiple-choice', question: 'Si PA=PB, ¿donde esta P?', options: ['En la mediatriz de AB', 'En la bisectriz', 'En la recta AB', 'En cualquier lugar'], correctAnswer: 0, explanation: 'En la mediatriz.', difficulty: 'basico' },
            { id: 'ex-lm1-5', type: 'multiple-choice', question: '¿Lugar de puntos equidistantes de dos puntos?', options: ['La mediatriz', 'La bisectriz', 'La paralela', 'La perpendicular'], correctAnswer: 0, explanation: 'La mediatriz.', difficulty: 'basico' },
          ]},
          { id: 'les-lm-2', title: 'Aplicaciones de la mediatriz', order: 2, theory: 'Las 3 mediatrices de un triangulo se cortan en el circuncentro, que es equidistante de los 3 vertices.', exercises: [
            { id: 'ex-lm2-1', type: 'multiple-choice', question: 'A=(2,3), B=(8,3). ¿Ecuacion mediatriz?', options: ['x=5', 'y=5', 'x=3', 'y=3'], correctAnswer: 0, explanation: 'Punto medio=(5,3), vertical: x=5.', difficulty: 'intermedio' },
            { id: 'ex-lm2-2', type: 'multiple-choice', question: 'P en mediatriz, PB=6. ¿PA?', options: ['6', '10', '5', '4'], correctAnswer: 0, explanation: 'PA=PB=6.', difficulty: 'basico' },
            { id: 'ex-lm2-3', type: 'multiple-choice', question: '¿Cuantas mediatrices tiene triangulo y donde se cortan?', options: ['3, en circuncentro', '3, en 3 puntos', '1', '2 paralelas'], correctAnswer: 0, explanation: '3 mediatrices → circuncentro.', difficulty: 'intermedio' },
            { id: 'ex-lm2-4', type: 'multiple-choice', question: 'El circuncentro es:', options: ['Interseccion de mediatrices', 'Interseccion de bisectrices', 'Interseccion de medianas', 'Interseccion de alturas'], correctAnswer: 0, explanation: 'Circuncentro = mediatrices.', difficulty: 'intermedio' },
            { id: 'ex-lm2-5', type: 'true-false', question: 'La mediatriz de un segmento es unica.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
          ]},
        ],
      },
      {
        id: 'node-lugar-bisectriz',
        title: 'Bisectriz (lugar geometrico)',
        icon: '∠',
        lessons: [
          { id: 'les-lb-1', title: 'Bisectriz como lugar geometrico', order: 1, theory: 'La bisectriz es el lugar de puntos equidistantes de los lados del angulo. Las 3 bisectrices de un triangulo se cortan en el incentro.', exercises: [
            { id: 'ex-lb1-1', type: 'multiple-choice', question: '¿Bisectriz como lugar geometrico?', options: ['Puntos equidistantes de lados del angulo', 'Puntos equidistantes de extremos', 'Recta perpendicular', 'Recta paralela'], correctAnswer: 0, explanation: 'Equidistante de lados.', difficulty: 'basico' },
            { id: 'ex-lb1-2', type: 'true-false', question: 'Si P en bisectriz de ∠A, equidistante de AB y AC.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'basico' },
            { id: 'ex-lb1-3', type: 'multiple-choice', question: '¿Cuantas bisectrices tiene triangulo y donde se cortan?', options: ['3, en incentro', '3, en 3 puntos', '1', '2 paralelas'], correctAnswer: 0, explanation: '3 bisectrices → incentro.', difficulty: 'intermedio' },
            { id: 'ex-lb1-4', type: 'multiple-choice', question: 'El incentro es:', options: ['Interseccion de bisectrices', 'Interseccion de mediatrices', 'Interseccion de medianas', 'Interseccion de alturas'], correctAnswer: 0, explanation: 'Incentro = bisectrices.', difficulty: 'intermedio' },
            { id: 'ex-lb1-5', type: 'multiple-choice', question: '¿Circulo relacionado con incentro?', options: ['Inscrito (tangente a 3 lados)', 'Circunscrito (por 3 vertices)', 'Mayor', 'Medio'], correctAnswer: 0, explanation: 'Circulo inscrito.', difficulty: 'intermedio' },
          ]},
          { id: 'les-lb-2', title: 'Aplicaciones combinadas', order: 2, theory: 'Mediatriz: equidista de extremos (segmentos). Bisectriz: equidista de lados (angulos). En triangulo equilatero, todos los puntos notables coinciden.', exercises: [
            { id: 'ex-lb2-1', type: 'multiple-choice', question: '¿Diferencia mediatriz y bisectriz?', options: ['Mediatriz: extremos, Bisectriz: lados', 'Son lo mismo', 'Mediatriz: angulos, Bisectriz: segmentos', 'No hay diferencia'], correctAnswer: 0, explanation: 'Mediatriz→segmentos. Bisectriz→angulos.', difficulty: 'basico' },
            { id: 'ex-lb2-2', type: 'multiple-choice', question: '¿Cuantos puntos notables tiene triangulo?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'Circuncentro, incentro, ortocentro, baricentro.', difficulty: 'intermedio' },
            { id: 'ex-lb2-3', type: 'multiple-choice', question: '¿Que son las mediatrices de un triangulo?', options: ['Las mediatrices de sus 3 lados', 'Las bisectrices de sus 3 angulos', 'Las alturas', 'Las medianas'], correctAnswer: 0, explanation: 'Mediatrices de cada lado.', difficulty: 'basico' },
            { id: 'ex-lb2-4', type: 'true-false', question: 'En triangulo equilatero, circuncentro e incentro coinciden.', options: ['Verdadero', 'Falso'], correctAnswer: 0, explanation: 'Verdadero.', difficulty: 'intermedio' },
            { id: 'ex-lb2-5', type: 'multiple-choice', question: 'Punto equidistante de 3 vertices:', options: ['Circuncentro', 'Incentro', 'Ortocentro', 'Baricentro'], correctAnswer: 0, explanation: 'Circuncentro.', difficulty: 'intermedio' },
          ]},
        ],
      },
    ],
  },
]

const makeExercise = (id: string, question: string, options: string[], correctAnswer: number, explanation: string): ExerciseQuestion => ({
  id,
  type: 'multiple-choice',
  question,
  options,
  correctAnswer,
  explanation,
  difficulty: 'basico',
})

const firstCircleLessons: Lesson[] = [
  {
    id: 'les-fund-1',
    title: 'Bienvenido a la geometría',
    order: 1,
    theory: 'La geometría estudia las formas, las medidas, las posiciones y las relaciones entre los objetos. Nació de necesidades sencillas como medir terrenos, construir y orientarse.',
    exercises: [
      makeExercise('ex-welcome-1', 'La geometría estudia principalmente…', ['Formas, medidas y relaciones espaciales', 'Solo operaciones con números', 'Únicamente figuras con volumen', 'Solo líneas rectas'], 0, 'Exacto. La geometría nos ayuda a describir formas, medirlas y entender cómo se relacionan.'),
      makeExercise('ex-welcome-2', '¿Cuál de estas situaciones usa geometría?', ['Medir un terreno para construir', 'Memorizar una lista', 'Escuchar una canción', 'Ordenar palabras alfabéticamente'], 0, 'Medir un terreno implica usar formas, distancias y posiciones: todo eso es geometría.'),
      makeExercise('ex-welcome-3', '¿Por qué aprendemos geometría en la preparación preuniversitaria?', ['Para interpretar figuras y resolver problemas', 'Para dibujar sin medir', 'Para evitar usar números', 'Para memorizar nombres sin comprender'], 0, 'La geometría del examen exige observar, relacionar datos y justificar una respuesta.'),
    ],
  },
  {
    id: 'les-fund-2',
    title: 'El lenguaje geométrico',
    order: 2,
    theory: 'Para hablar de geometría usamos objetos básicos: el punto indica una posición, la recta se extiende en ambos sentidos y el plano representa una superficie de dos dimensiones.',
    exercises: [
      makeExercise('ex-language-1', '¿Qué representa mejor un punto?', ['Una posición exacta', 'Una superficie', 'Una línea infinita', 'Un objeto con volumen'], 0, 'Un punto solo indica una posición; idealmente no tiene dimensiones.'),
      makeExercise('ex-language-2', '¿Qué característica tiene una recta?', ['Tiene dos extremos', 'Continúa indefinidamente en ambos sentidos', 'Tiene tres dimensiones', 'Solo puede pasar por un punto'], 1, 'Las flechas de la recta indican que continúa en ambos sentidos.'),
      makeExercise('ex-language-3', '¿Cuántas dimensiones tiene un plano?', ['0', '1', '2', '3'], 2, 'Un plano tiene largo y ancho; por eso lo estudiamos como una superficie de dos dimensiones.'),
    ],
  },
  {
    id: 'les-fund-3',
    title: 'Partes de una recta',
    order: 3,
    theory: 'Una recta puede dar origen a un segmento, que tiene dos extremos, o a una semirrecta, que tiene un extremo y continúa indefinidamente en un solo sentido.',
    exercises: [
      makeExercise('ex-parts-1', '¿Cuál es la diferencia principal del segmento?', ['Tiene dos extremos', 'No tiene extremos', 'Tiene tres dimensiones', 'Es una superficie'], 0, 'Un segmento queda limitado por dos extremos y por eso podemos medirlo.'),
      makeExercise('ex-parts-2', '¿Cuál representación corresponde a una semirrecta?', ['A────B', '←────A────→', 'A────→', '┌────┐'], 2, 'La semirrecta tiene un origen y continúa en un solo sentido.'),
      makeExercise('ex-parts-3', 'En AB, A y B son…', ['Los extremos del segmento', 'Dos planos', 'Dos dimensiones', 'Dos rectas distintas'], 0, 'A y B nombran los extremos del segmento AB.'),
    ],
  },
  {
    id: 'les-fund-4',
    title: 'Figuras que podemos construir',
    order: 4,
    theory: 'Con segmentos podemos construir figuras planas. Un triángulo tiene tres lados, un cuadrilátero tiene cuatro y un polígono es una figura cerrada formada por segmentos.',
    exercises: [
      makeExercise('ex-shapes-1', '¿Qué define a un polígono?', ['Figura plana cerrada con lados rectos', 'Curva que nunca se cierra', 'Recta con un extremo', 'Figura con un solo lado'], 0, 'Un polígono es una figura plana cerrada formada por segmentos.'),
      makeExercise('ex-shapes-2', '¿Cuántos vértices tiene un triángulo?', ['2', '3', '4', '5'], 1, 'Cada uno de sus tres lados se une con otro en un vértice.'),
      makeExercise('ex-shapes-3', '¿Cuál es un cuadrilátero?', ['Una figura de 3 lados', 'Una figura de 4 lados', 'Una recta', 'Un punto'], 1, 'El prefijo cuadri- indica cuatro lados.'),
    ],
  },
]

const createReinforcementLesson = (node: SkillNode, order: number): Lesson => {
  const sourceExercises = node.lessons.flatMap((lesson) => lesson.exercises).slice(0, 3)
  return {
    id: `les-${node.id}-${order}`,
    title: `Reto aplicado: ${node.title}`,
    order,
    theory: `En esta práctica aplicarás las ideas principales de ${node.title.toLowerCase()} en situaciones breves.`,
    exercises: sourceExercises.length > 0
      ? sourceExercises.map((exercise, index) => ({ ...exercise, id: `${exercise.id}-reinforcement-${index}` }))
      : [makeExercise(`ex-${node.id}-reinforcement`, `¿Qué debes recordar sobre ${node.title.toLowerCase()}?`, ['Observar la figura y relacionar sus propiedades', 'Adivinar sin analizar', 'Ignorar las medidas', 'Usar siempre la misma fórmula'], 0, 'En geometría primero observamos, identificamos propiedades y luego resolvemos.')],
  }
}

const normalizeNode = (node: SkillNode): SkillNode => {
  if (node.id === 'node-fund-geometricos') {
    return { ...node, title: 'Primeros conceptos', lessons: firstCircleLessons }
  }

  const lessons = node.lessons.slice(0, 4)
  while (lessons.length < 4) lessons.push(createReinforcementLesson(node, lessons.length + 1))
  const phases = ['Reconoce', 'Diferencia', 'Aplica', 'Reto']
  return { ...node, lessons: lessons.map((lesson, index) => ({ ...lesson, title: `${phases[index]}: ${lesson.title}` })) }
}

const LEGACY_GEOMETRIA_COURSE: SkillUnit[] = COURSE_SOURCE.map((unit, unitIndex) => ({
  ...unit,
  title: unitIndex === 0 ? 'Segmentos' : unit.title,
  nodes: unit.nodes.map((node) => node.id === 'node-fund-geometricos' ? { ...normalizeNode(node), title: 'Fundamentos geométricos' } : normalizeNode(node)),
}))

export interface GeometrySection extends SkillUnit {
  stageId: string
  studyMaterial: SectionStudyMaterial
}

export type SectionResourceType = 'summary' | 'flashcards' | 'formulas' | 'mistakes' | 'practice'
export type SectionResourceStatus = 'available' | 'coming-soon'
export type SectionStatus = 'not-started' | 'in-progress' | 'completed'

export interface SectionResource {
  id: string
  title: string
  description: string
  type: SectionResourceType
  status: SectionResourceStatus
}

export interface SectionStudyMaterial {
  summary: string
  keyIdeas: string[]
  flashcards: { question: string; answer: string; hint?: string }[]
  resources: SectionResource[]
}

export type CourseResourceType = 'syllabus' | 'summary' | 'flashcards' | 'slides' | 'books' | 'formulas' | 'practice'
export type CourseResourceStatus = 'available' | 'coming-soon'

export interface CourseResource {
  id: string
  title: string
  description: string
  type: CourseResourceType
  status: CourseResourceStatus
  href?: string
}

export interface GeometryStage {
  id: string
  title: string
  subtitle: string
  sections: GeometrySection[]
}

const makeTopic = (id: string, title: string, icon: string, theory: string, material: TopicStudyMaterial): SkillNode => {
  const lessonTitles = ['Reconoce la idea', 'Diferencia sus partes', 'Aplícalo en una figura', 'Reto de consolidación']
  return {
    id,
    title,
    icon,
    studyMaterial: material,
    lessons: lessonTitles.map((lessonTitle, index) => ({
      id: `les-${id}-${index + 1}`,
      title: lessonTitle,
      order: index + 1,
      theory: index === 0 ? theory : index === 1 ? `Compara las características de ${title.toLowerCase()} con conceptos cercanos.` : index === 2 ? `Observa una figura y usa ${title.toLowerCase()} para explicar lo que ocurre.` : `Resuelve un problema breve de ${title.toLowerCase()} y comprueba tu razonamiento.`,
      exercises: [makeExercise(
        `ex-${id}-${index + 1}`,
        index === 0 ? `¿Cuál idea describe mejor ${title.toLowerCase()}?` : index === 1 ? `¿Qué diferencia a ${title.toLowerCase()} de otra idea geométrica?` : index === 2 ? `¿Cómo aplicarías ${title.toLowerCase()} en una figura?` : `¿Qué conclusión es correcta sobre ${title.toLowerCase()}?`,
        ['La definición y sus propiedades principales', 'Una operación sin relación con la figura', 'Un dato que no se puede observar', 'Una regla que siempre se aplica igual'],
        0,
        `Correcto. Primero identifica la propiedad central de ${title.toLowerCase()} y después relaciónala con la figura.`,
      )],
    })),
  }
}

const material = (summary: string, keyIdeas: string[], cards: [string, string, string?][]): TopicStudyMaterial => ({
  summary,
  keyIdeas,
  flashcards: cards.map(([question, answer, hint]) => ({ question, answer, ...(hint ? { hint } : {}) })),
})

const TOPIC_MATERIAL: Record<string, TopicStudyMaterial> = {
  basics: material('La geometría describe formas, medidas, posiciones y relaciones.', ['Punto: posición.', 'Recta: se extiende en ambos sentidos.', 'Plano: superficie de dos dimensiones.', 'Segmento: parte limitada de una recta.'], [['¿Qué estudia la geometría?', 'Formas, medidas, posiciones y relaciones.'], ['¿Cuántas dimensiones tiene un plano?', 'Dos: largo y ancho.']]),
  notation: material('Un segmento queda definido por sus dos extremos y se nombra con sus letras.', ['Los extremos limitan el segmento.', 'AB y BA nombran el mismo segmento.', 'Los puntos sobre una recta son colineales.'], [['¿Qué representa AB?', 'El segmento cuyos extremos son A y B.'], ['¿Qué significa que varios puntos sean colineales?', 'Que están sobre una misma recta.']]),
  length: material('La longitud expresa cuánto mide un segmento y debe acompañarse de una unidad.', ['Metro, centímetro y milímetro.', 'La unidad depende de la escala.', 'Medir es comparar con una unidad.'], [['¿Qué expresa la longitud?', 'La medida de un segmento.'], ['¿Qué debe acompañar a una medida?', 'Una unidad.']]),
  between: material('Si B está entre A y C, el segmento mayor se puede descomponer en AB y BC.', ['B está sobre AC.', 'AC = AB + BC.', 'El orden de los puntos importa.'], [['Si B está entre A y C, ¿qué relación se cumple?', 'AC = AB + BC.'], ['¿Qué representa B?', 'Un punto interior del segmento AC.']]),
  operations: material('Las operaciones con segmentos permiten hallar longitudes desconocidas mediante sumas, diferencias y ecuaciones.', ['Suma de partes.', 'Diferencia entre total y parte.', 'La incógnita representa una longitud.'], [['¿Cómo hallar una parte?', 'Restando la parte conocida al total.'], ['¿Qué relación se usa con puntos consecutivos?', 'La suma de los segmentos forma el total.']]),
  midpoint: material('El punto medio divide un segmento en dos partes de igual longitud.', ['M pertenece al segmento.', 'AM = MB.', 'El punto medio es único.'], [['¿Qué hace el punto medio?', 'Divide el segmento en dos partes iguales.'], ['Si AB = 10 y M es punto medio, ¿cuánto mide AM?', '5.']]),
  congruent: material('Dos segmentos son congruentes cuando tienen la misma longitud.', ['La congruencia compara medidas.', 'Se puede escribir AB = CD.', 'La posición no cambia la longitud.'], [['¿Cuándo son congruentes dos segmentos?', 'Cuando tienen igual longitud.'], ['¿Qué se compara?', 'La medida de los segmentos.']]),
  division: material('Dividir un segmento en una razón permite repartir su longitud en partes proporcionales.', ['La razón indica cómo se reparten las partes.', 'El punto puede estar entre los extremos.', 'La suma de partes forma el total.'], [['¿Qué indica una razón 2:3?', 'Que las partes se comparan como 2 y 3.'], ['¿Qué debe conservarse?', 'La suma de las partes debe ser el total.']]),
  angleDefinition: material('Un ángulo se forma con dos semirrectas que comparten vértice.', ['El vértice es el punto común.', 'Los lados son semirrectas.', 'Se puede nombrar con tres letras.'], [['¿Qué tienen en común los lados de un ángulo?', 'El vértice.'], ['¿Dónde se ubica el vértice en ∠ABC?', 'En B.']]),
  angleClassification: material('Los ángulos se clasifican según su medida.', ['Agudo: menor que 90°.', 'Recto: 90°.', 'Obtuso: entre 90° y 180°.', 'Llano: 180°.'], [['¿Cuánto mide un ángulo recto?', '90°.'], ['¿Qué ángulo mide menos de 90°?', 'Agudo.']]),
  angleRelations: material('Algunos pares de ángulos se relacionan por la suma de sus medidas o por su posición.', ['Complementarios suman 90°.', 'Suplementarios suman 180°.', 'Adyacentes comparten lado y vértice.', 'Opuestos por el vértice son iguales.'], [['¿Cuánto suman dos ángulos suplementarios?', '180°.'], ['¿Qué propiedad tienen los opuestos por el vértice?', 'Son iguales.']]),
  angleOpposite: material('Los ángulos adyacentes y opuestos se identifican observando sus lados y vértices.', ['Adyacentes comparten un lado.', 'Opuestos comparten vértice.', 'Los lados opuestos forman una recta.'], [['¿Qué comparten los ángulos adyacentes?', 'Vértice y un lado.'], ['¿Qué tienen igual los opuestos por el vértice?', 'La medida.']]),
  bisector: material('La bisectriz divide un ángulo en dos ángulos de igual medida.', ['Parte del vértice.', 'Forma dos ángulos congruentes.', 'Es única para un ángulo.'], [['¿Qué hace la bisectriz?', 'Divide el ángulo en dos partes iguales.'], ['Si divide 80°, ¿cuánto mide cada parte?', '40°.']]),
  perpendicular: material('Dos rectas perpendiculares se cortan formando cuatro ángulos rectos.', ['Cada ángulo mide 90°.', 'Se usa el símbolo ⟂.', 'El punto de corte es común.'], [['¿Qué forman dos rectas perpendiculares?', 'Ángulos rectos.'], ['¿Cuánto mide cada ángulo?', '90°.']]),
  parallel: material('Las rectas paralelas permanecen a la misma distancia y no se cortan.', ['Se representan con //.', 'Una transversal corta a ambas.', 'Los ángulos permiten reconocer relaciones.'], [['¿Se cortan dos rectas paralelas?', 'No, aunque se prolonguen.'], ['¿Qué es una transversal?', 'Una recta que corta a otras rectas.']]),
  transversal: material('Una transversal crea pares de ángulos que pueden compararse entre dos rectas.', ['Correspondientes ocupan la misma posición.', 'Alternos internos están entre las paralelas.', 'Las posiciones ayudan a reconocerlos.'], [['¿Qué corta a dos rectas?', 'Una transversal.'], ['¿Dónde están los alternos internos?', 'Entre las rectas y en lados opuestos de la transversal.']]),
  parallelAngles: material('Cuando dos rectas paralelas son cortadas por una transversal aparecen ángulos iguales y suplementarios.', ['Correspondientes son iguales.', 'Alternos internos son iguales.', 'Colaterales internos suman 180°.'], [['¿Qué ocurre con los alternos internos?', 'Son iguales.'], ['¿Qué suma cumplen los colaterales internos?', '180°.']]),
  triangleElements: material('Un triángulo es un polígono de tres lados, tres vértices y tres ángulos.', ['Se clasifica por lados.', 'Se clasifica por ángulos.', 'Sus ángulos internos suman 180°.'], [['¿Cuántos lados tiene un triángulo?', 'Tres.'], ['¿Cuánto suman sus ángulos internos?', '180°.']]),
  triangleAngles: material('Los ángulos interiores y exteriores de un triángulo se relacionan mediante sus medidas.', ['Los interiores suman 180°.', 'Un exterior se forma al prolongar un lado.', 'El exterior equivale a la suma de dos interiores no adyacentes.'], [['¿Cuánto suman los interiores?', '180°.'], ['¿A qué equivale un ángulo exterior?', 'A la suma de los dos interiores no adyacentes.']]),
  triangleInequality: material('En todo triángulo, la suma de dos lados es mayor que el tercer lado.', ['a + b > c.', 'La diferencia de dos lados es menor que el tercero.', 'No toda terna forma un triángulo.'], [['¿Qué condición deben cumplir tres longitudes?', 'La suma de dos debe superar a la tercera.'], ['¿Pueden 2, 3 y 6 formar un triángulo?', 'No.']]),
  triangleRelation: material('En un triángulo, al mayor lado se opone el mayor ángulo.', ['Lado y ángulo opuestos se relacionan.', 'Lados iguales tienen ángulos opuestos iguales.', 'La comparación ayuda a ordenar elementos.'], [['¿Qué ángulo se opone al mayor lado?', 'El mayor ángulo.'], ['¿Qué ocurre con lados iguales?', 'Sus ángulos opuestos son iguales.']]),
  triangleCongruence: material('Dos triángulos congruentes tienen la misma forma y el mismo tamaño.', ['LLL compara tres lados.', 'LAL compara dos lados y el ángulo comprendido.', 'ALA compara dos ángulos y un lado.', 'AAA no garantiza congruencia.'], [['¿Qué significa LLL?', 'Lado-Lado-Lado.'], ['¿AAA demuestra congruencia?', 'No, demuestra semejanza.']]),
  circumcenter: material('La mediatriz de un segmento es perpendicular a él y pasa por su punto medio.', ['Todo punto de la mediatriz equidista de los extremos.', 'Las mediatrices se intersectan en el circuncentro.', 'El circuncentro equidista de los vértices.'], [['¿Qué punto equidista de los vértices?', 'El circuncentro.'], ['¿Qué define a la mediatriz?', 'Perpendicularidad y punto medio.']]),
  incenter: material('La bisectriz de un ángulo divide el ángulo; las bisectrices de un triángulo se encuentran en el incentro.', ['El incentro equidista de los lados.', 'Se obtiene con bisectrices.', 'Es un punto notable.'], [['¿Qué punto equidista de los lados?', 'El incentro.'], ['¿Con qué rectas se construye?', 'Con las bisectrices.']]),
  triangleProperties: material('Las propiedades de un triángulo permiten conectar lados, ángulos y puntos notables.', ['Las propiedades se usan juntas.', 'La figura orienta la estrategia.', 'Primero se identifican los datos.'], [['¿Qué se debe identificar primero?', 'Los datos y propiedades de la figura.'], ['¿Para qué sirven los puntos notables?', 'Para describir relaciones especiales.']]),
  triangleProblems: material('Los problemas integradores combinan varias propiedades de los triángulos en una misma figura.', ['Leer antes de calcular.', 'Relacionar datos conocidos.', 'Verificar la respuesta con la figura.'], [['¿Cuál es el primer paso?', 'Observar y organizar los datos.'], ['¿Cómo comprobar el resultado?', 'Compararlo con las propiedades de la figura.']]),
}

const comingSoon = (id: string, title: string, description: string, type: SectionResourceType): SectionResource => ({ id, title, description, type, status: 'coming-soon' })

const SECTION_MATERIAL: Record<string, SectionStudyMaterial> = {
  segmentos: {
    summary: 'En esta sección construirás el lenguaje básico de la geometría y aprenderás a comparar, medir y relacionar segmentos.',
    keyIdeas: ['El punto, la recta, el plano y el segmento son objetos geométricos fundamentales.', 'Un segmento tiene dos extremos y una longitud.', 'El punto medio divide un segmento en dos partes congruentes.', 'Las relaciones entre partes permiten plantear ecuaciones geométricas.'],
    flashcards: [{ question: '¿Qué define a un segmento?', answer: 'Una parte de una recta limitada por dos extremos.' }, { question: '¿Qué cumple el punto medio M de AB?', answer: 'AM = MB.' }, { question: '¿Qué relación se usa si B está entre A y C?', answer: 'AC = AB + BC.' }, { question: '¿Cuándo son congruentes dos segmentos?', answer: 'Cuando tienen la misma longitud.' }],
    resources: [comingSoon('seg-formulas', 'Fórmulas clave', 'Relaciones y expresiones esenciales de segmentos.', 'formulas'), comingSoon('seg-mistakes', 'Errores frecuentes', 'Confusiones comunes al nombrar y operar segmentos.', 'mistakes'), comingSoon('seg-practice', 'Práctica rápida', 'Ejercicios breves para reforzar la sección.', 'practice')],
  },
  angulos: {
    summary: 'En esta sección aprenderás a reconocer ángulos, relacionar sus medidas y comprender qué ocurre cuando las rectas se cortan o son paralelas.',
    keyIdeas: ['Todo ángulo tiene vértice y dos lados.', 'La clasificación depende de la medida.', 'La bisectriz divide un ángulo en dos partes iguales.', 'Las paralelas y una transversal producen relaciones repetibles.'],
    flashcards: [{ question: '¿Cuánto mide un ángulo recto?', answer: '90°.' }, { question: '¿Qué hace la bisectriz?', answer: 'Divide un ángulo en dos ángulos congruentes.' }, { question: '¿Cuánto suman dos ángulos suplementarios?', answer: '180°.' }, { question: '¿Qué ocurre con los alternos internos entre paralelas?', answer: 'Tienen la misma medida.' }],
    resources: [comingSoon('ang-formulas', 'Fórmulas clave', 'Relaciones de medidas angulares y paralelismo.', 'formulas'), comingSoon('ang-mistakes', 'Errores frecuentes', 'Diferencias entre pares de ángulos y sus posiciones.', 'mistakes'), comingSoon('ang-practice', 'Práctica rápida', 'Ejercicios breves de reconocimiento angular.', 'practice')],
  },
  triangulos: {
    summary: 'En esta sección estudiarás el triángulo como figura base: sus elementos, relaciones, criterios de congruencia y puntos notables.',
    keyIdeas: ['Los ángulos interiores de un triángulo suman 180°.', 'La desigualdad triangular limita sus longitudes.', 'Los criterios LLL, LAL y ALA prueban congruencia.', 'La mediatriz y la bisectriz construyen puntos notables.'],
    flashcards: [{ question: '¿Cuánto suman los ángulos interiores?', answer: '180°.' }, { question: '¿Qué criterio usa tres lados?', answer: 'LLL.' }, { question: '¿Qué punto equidista de los vértices?', answer: 'El circuncentro.' }, { question: '¿Qué punto equidista de los lados?', answer: 'El incentro.' }],
    resources: [comingSoon('tri-formulas', 'Fórmulas clave', 'Propiedades y relaciones fundamentales de triángulos.', 'formulas'), comingSoon('tri-mistakes', 'Errores frecuentes', 'Errores comunes al clasificar y comparar triángulos.', 'mistakes'), comingSoon('tri-practice', 'Práctica rápida', 'Ejercicios breves de propiedades triangulares.', 'practice')],
  },
}

const allLegacyNodes = LEGACY_GEOMETRIA_COURSE.flatMap((unit) => unit.nodes)
const legacyById = Object.fromEntries(allLegacyNodes.map((node) => [node.id, node]))
const attachMaterial = (node: SkillNode, title: string, iconOrMaterialKey: string, maybeMaterialKey?: string): SkillNode => ({ ...node, title, icon: maybeMaterialKey ? iconOrMaterialKey : node.icon, studyMaterial: TOPIC_MATERIAL[maybeMaterialKey || iconOrMaterialKey] })
const extraTopic = (id: string, title: string, icon: string, materialKey: string) => makeTopic(id, title, icon, TOPIC_MATERIAL[materialKey].summary, TOPIC_MATERIAL[materialKey])

const sectionNodes = {
  basics: attachMaterial(legacyById['node-fund-geometricos'], 'Conceptos geométricos básicos', 'basics'),
  notation: attachMaterial(legacyById['node-seg-notacion'], 'Segmentos y notación', 'notation'),
  length: attachMaterial(legacyById['node-seg-longitud'], 'Longitud y medida', 'length'),
  between: attachMaterial(legacyById['node-seg-relacion'], 'Relación “estar entre”', 'between'),
  operations: attachMaterial(legacyById['node-seg-operaciones'], 'Operaciones con segmentos', 'operations'),
  midpoint: attachMaterial(legacyById['node-seg-puntomedio'], 'Punto medio', 'midpoint'),
  congruent: attachMaterial(legacyById['node-seg-congruencia'], 'Congruencia de segmentos', 'congruent'),
  division: attachMaterial(legacyById['node-seg-division'], 'División de segmentos', 'division'),
  angleDefinition: extraTopic('node-ang-definicion-basico', 'Concepto y notación de ángulos', '∠', 'angleDefinition'),
  angleClassification: attachMaterial(legacyById['node-ang-definicion'], 'Clasificación de ángulos', '◒', 'angleClassification'),
  angleRelations: extraTopic('node-ang-relaciones', 'Ángulos complementarios y suplementarios', '∑', 'angleRelations'),
  angleOpposite: extraTopic('node-ang-opuestos', 'Ángulos opuestos y adyacentes', '↔', 'angleOpposite'),
  bisector: attachMaterial(legacyById['node-ang-bisectriz'], 'Bisectriz de un ángulo', '⌁', 'bisector'),
  perpendicular: attachMaterial(legacyById['node-ang-perpendiculares'], 'Rectas perpendiculares', '⊥', 'perpendicular'),
  parallel: attachMaterial(legacyById['node-paralelas'], 'Rectas paralelas y transversal', '∥', 'transversal'),
  transversal: extraTopic('node-par-transversal', 'Rectas paralelas y transversal', '╱', 'transversal'),
  parallelAngles: extraTopic('node-par-angulos', 'Ángulos formados por paralelas', '∠', 'parallelAngles'),
  triangleElements: attachMaterial(legacyById['node-tri-elementos'], 'Elementos y clasificación de triángulos', '△', 'triangleElements'),
  triangleAngles: extraTopic('node-tri-angulos', 'Ángulos interiores y exteriores', '◢', 'triangleAngles'),
  triangleInequality: attachMaterial(legacyById['node-tri-desigualdades'], 'Desigualdad triangular', '≷', 'triangleInequality'),
  triangleRelation: extraTopic('node-tri-relacion', 'Relación entre lados y ángulos', '↗', 'triangleRelation'),
  triangleCongruence: attachMaterial(legacyById['node-tri-congruencia'], 'Congruencia de triángulos', '△', 'triangleCongruence'),
  circumcenter: attachMaterial(legacyById['node-lugar-mediatriz'], 'Mediatriz y circuncentro', '⊙', 'circumcenter'),
  incenter: attachMaterial(legacyById['node-lugar-bisectriz'], 'Bisectriz e incentro', '◉', 'incenter'),
  triangleProperties: extraTopic('node-tri-propiedades', 'Propiedades fundamentales', '✦', 'triangleProperties'),
  triangleProblems: extraTopic('node-tri-problemas', 'Problemas integradores con triángulos', '★', 'triangleProblems'),
}

export const GEOMETRIA_STAGE: GeometryStage = {
  id: 'stage-fundamentos-geometria',
  title: 'Fundamentos de geometría',
  subtitle: 'Construye la base para resolver problemas preuniversitarios.',
  sections: [
    { id: 'section-segmentos-medida', stageId: 'stage-fundamentos-geometria', title: 'Segmentos y medida', subtitle: 'De los conceptos básicos a las relaciones de longitud.', color: 'from-primary-400 to-primary-500', icon: '📐', nodes: [sectionNodes.basics, sectionNodes.notation, sectionNodes.length, sectionNodes.between, sectionNodes.operations, sectionNodes.midpoint, sectionNodes.congruent, sectionNodes.division], studyMaterial: SECTION_MATERIAL.segmentos },
    { id: 'section-angulos-paralelismo', stageId: 'stage-fundamentos-geometria', title: 'Ángulos y paralelismo', subtitle: 'Mide, relaciona y compara líneas y ángulos.', color: 'from-[#F39B79] to-[#E76A6A]', icon: '∠', nodes: [sectionNodes.angleDefinition, sectionNodes.angleClassification, sectionNodes.angleRelations, sectionNodes.angleOpposite, sectionNodes.bisector, sectionNodes.perpendicular, sectionNodes.parallel, sectionNodes.parallelAngles], studyMaterial: SECTION_MATERIAL.angulos },
    { id: 'section-triangulos', stageId: 'stage-fundamentos-geometria', title: 'Triángulos', subtitle: 'Reconoce sus elementos, propiedades y puntos notables.', color: 'from-[#8BA9F2] to-[#657FD1]', icon: '🔺', nodes: [sectionNodes.triangleElements, sectionNodes.triangleAngles, sectionNodes.triangleInequality, sectionNodes.triangleRelation, sectionNodes.triangleCongruence, sectionNodes.circumcenter, sectionNodes.incenter, sectionNodes.triangleProblems], studyMaterial: SECTION_MATERIAL.triangulos },
  ],
}

export const GEOMETRIA_COURSE: SkillUnit[] = GEOMETRIA_STAGE.sections

export const GEOMETRIA_RESOURCES: CourseResource[] = [
  { id: 'geometry-syllabus', title: 'Temario PAP', description: 'Consulta el recorrido completo de Geometría.', type: 'syllabus', status: 'available', href: '/courses/geometria/syllabus' },
  { id: 'geometry-slides', title: 'PPTs de Geometría', description: 'Presentaciones visuales para estudiar por bloques.', type: 'slides', status: 'coming-soon' },
  { id: 'geometry-books', title: 'Libros recomendados', description: 'Bibliografía seleccionada para tu preparación.', type: 'books', status: 'coming-soon' },
  { id: 'geometry-formulas', title: 'Formularios', description: 'Fórmulas esenciales organizadas por tema.', type: 'formulas', status: 'coming-soon' },
  { id: 'geometry-admission', title: 'Problemas tipo admisión', description: 'Problemas graduados con enfoque PAP.', type: 'practice', status: 'coming-soon' },
  { id: 'geometry-quick-practice', title: 'Práctica rápida', description: 'Un repaso breve para mantener el ritmo.', type: 'practice', status: 'coming-soon' },
]


