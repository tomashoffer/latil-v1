import { C } from "./data";

const OK = C.accentLight;
const WAIT = C.wait;

export type Lang = "es" | "en";

export const COPY = {
  es: {
    nav: { solutions: "Soluciones", how: "Cómo trabajamos", about: "Nosotros", contact: "Contacto", cta: "Agendar reunión" },
    menu: [
      { label: "Cloud y gasto en IA", items: [
        { name: "FinOps Optimization", micro: "Gobierno del costo cloud que ejecuta" },
        { name: "Token Optimization", micro: "Un presupuesto para todos los proveedores" } ] },
      { label: "Agentes y operaciones", items: [
        { name: "Customer AI Platform", micro: "Voz, chat, email y apps" },
        { name: "Finance Agents", micro: "Conciliación, reportes y cierre" },
        { name: "HealthCare Agent", micro: "Operación clínica y administrativa" } ] },
      { label: "Confianza, seguridad y espacios", items: [
        { name: "Evidence Guard", micro: "Verificación forense de evidencia digital" },
        { name: "Vision Shield", micro: "Reconocimiento sobre tus cámaras actuales" },
        { name: "Smart Spaces", micro: "Smart city y smart retail" },
        { name: "Desarrollo a medida", micro: "Construido para tu operación" } ] }
    ],
    hero: {
      eyebrow: "Tu socio de tecnología e integración de IA",
      titleA: "El hub de soluciones de IA",
      titleB: "para tus desafíos críticos.",
      sub1: "Integramos un ecosistema de herramientas probadas y acompañamos a tu equipo.",
      sub2: "Cuellos de botella, infraestructura y escala, medidos en números reales.",
      cta1: "Traenos un caso real",
      cta2: "Ver soluciones"
    },
    partners: "Partners y alianzas de implementación",
    frictions: {
      titleA: "Todos compran IA.",
      titleB: "Casi nadie la tiene funcionando.",
      items: [
        { num: "01", title: "Las recomendaciones se acumulan. La ejecución nunca llega.",
          body: "Tu equipo detecta ahorros en AWS, Azure y GCP cada semana. Nadie tiene el mandato de aplicarlos." },
        { num: "02", title: "Los pilotos mueren justo donde empieza el trabajo real.",
          body: "Conectar voz, chat, CRM y back-office toma meses. Sin gobierno, el equipo vuelve al Excel." },
        { num: "03", title: "Un presupuesto de IA se parte en miles de decisiones diarias.",
          body: "Cinco proveedores, ninguna vista única. El gasto crece más rápido de lo que se puede gobernar." }
      ]
    },
    solutions: {
      title: "Cuatro puntos donde arrancan la mayoría de los proyectos.",
      audience: "Para CFOs, CTOs, CISOs y compradores del sector público",
      learn: "Ver más",
      illustrative: "Interfaz ilustrativa · reemplazar por captura real",
      restTitle: "El resto del portfolio",
      restMeta: "Cinco más, mismo estándar"
    },
    how: {
      label: "Cómo trabajamos",
      title: "No reemplazamos tus sistemas. Hacemos que ejecuten.",
      step: "Paso",
      items: [
        { num: "01", title: "Nos juntamos y exploramos tus dolores", body: "Nos sentamos con tu equipo para entender dónde está la fricción real, no la que se supone." },
        { num: "02", title: "Aplicamos las mejores herramientas", body: "Elegimos entre un ecosistema probado la solución que resuelve tu problema puntual, sin forzar un producto único." },
        { num: "03", title: "Acompañamos con soporte y servicios profesionales", body: "Durante todo el proceso, no solo en el arranque. Implementación, ajuste y soporte de la mano de nuestro equipo." },
        { num: "04", title: "Ahorros y eficiencia medibles", body: "El resultado se ve en números: ahorro financiero y operativo, optimización y eficiencia en tu operación." }
      ]
    },
    team: {
      label: "Con quiénes vas a trabajar",
      title: "Construido por gente que operó esto a escala.",
      lead: "Ingenieros senior, product managers y practicantes de FinOps. Los mismos de la primera llamada son los que están en producción.",
      roles: ["CEO y fundador", "COO y cofundador", "CSO y socio", "Global Head of Client Partnerships", "Head of Strategic Partnerships & Innovation"],
      bios: [
        "Lidera la visión y la estrategia de Latil, construyendo partnerships con soluciones de IA de clase mundial para que las empresas escalen su operación.",
        "Conduce operaciones, go-to-market y customer success. Background en operaciones y tecnología, enfocado en escalar automatización empresarial.",
        "Más de 15 años como CEO, CFO y director de transformación digital en el sector público, con foco en operaciones de negocio e innovación a escala.",
        "Más de 30 años de liderazgo ejecutivo en telecomunicaciones, incluyendo CEO de Cable & Wireless Panamá.",
        "Lidera alianzas en EMEA y LATAM, conectando startups con organizaciones tecnológicas globales."
      ]
    },
    contact: {
      title: "Traenos un caso real.",
      line1: "Una llamada de 20 minutos, sin compromiso.",
      line2: "Escuchamos tu situación, la mapeamos a soluciones concretas y te damos un número.",
      b1: "Respuesta en menos de 24 horas",
      b2: "Primera consulta sin costo",
      b3: "Estimación del ahorro sobre la mesa",
      fName: "Nombre y apellido", fEmail: "Email corporativo", fCompany: "Empresa",
      fChallenge: "¿Cuál es tu principal desafío?", fOther: "Otro",
      fMessage: "Contanos brevemente el caso",
      fRequired: "Completá nombre, email y empresa para continuar.",
      fError: "No pudimos enviar el mensaje. Intentá nuevamente.",
      fOk: "Gracias. Te respondemos en menos de 24 horas.",
      fSending: "Enviando...",
      fSend: "Enviar mensaje"
    },
    footer: {
      tagline: "Tu socio de tecnología e integración de IA. LATAM y Europa.",
      coverage: "Cobertura global",
      legal: "Términos · Privacidad"
    },
    restItems: [
      "FinOps para IA. Un presupuesto para todos los proveedores de modelos.",
      "Reconocimiento en tiempo real sobre las cámaras que ya tenés.",
      "Smart city y smart retail, construidos desde el alumbrado existente.",
      "Operación clínica y administrativa, anclada en los datos del hospital.",
      "Cuando nada de estante resuelve tu operación, lo construimos."
    ],
    restNames: ["Token Optimization", "Vision Shield", "Smart Spaces", "HealthCare Agent", "Desarrollo a medida"],
    restCta: "Hablemos de esto",
    restOpen: "Ver detalle",
    restDetails: [
      { lead: "La revolución de la IA no pide reinventar FinOps, pide acelerarlo. Una decisión grande se parte en miles de decisiones diarias entre cinco o más proveedores.",
        bullets: [
          "Consolida OpenAI, Anthropic, Google y el resto en una sola vista, con billing multi-organización y las API keys separadas por equipo",
          "Presupuestos con efecto real: seguimiento de tokens por equipo, workflow y modelo, cortando el desvío antes de que llegue la factura",
          "Reportes ejecutivos que traducen el uso a lenguaje de negocio, con vistas por rol para FinOps, Finanzas y DevOps"
        ],
        metrics: [{ value: "5+", label: "proveedores en una vista" }, { value: "1.000+", label: "decisiones diarias gobernadas" }, { value: "Activo", label: "control de presupuesto" }] },
      { lead: "Convierte la infraestructura de cámaras que ya tenés en una plataforma de seguridad inteligente, sin hardware nuevo.",
        bullets: [
          "Precisión reconocida por NIST en 6 condiciones difíciles: mala calidad de video, oscuridad exterior, clima extremo, distancia, movimiento y rostro cubierto",
          "Va más allá del match facial: detecta hurto y merodeo, identifica clientes VIP al ingresar y analiza tiempos de cola",
          "Alertas de watchlist en tiempo real, integración nativa con el VMS y app móvil para el equipo de seguridad"
        ],
        metrics: [{ value: "99,2%", label: "precisión de reconocimiento" }, { value: "<0,5s", label: "tiempo de respuesta" }, { value: "GDPR Art.25", label: "cumplimiento por diseño" }] },
      { lead: "Convierte ciudades y tiendas en entornos digitales. Las luminarias inteligentes reemplazan a las existentes y suman visión por computadora, conectividad y edge AI.",
        bullets: [
          "Reemplazo de alumbrado o luminarias en tienda: sensores, procesamiento en el borde, LED y Wi-Fi o 5G público, sin zanjeo de fibra",
          "Tránsito, seguridad y analítica de tienda corriendo en el propio equipo: menos latencia, menos ancho de banda y metadatos en vez de video crudo",
          "Una plataforma para servicios urbanos y operación de tienda, con APIs abiertas hacia sistemas de terceros"
        ],
        metrics: [{ value: "75%", label: "menos TCO que infraestructura nueva" }, { value: "10-15%", label: "aumento de ventas en retail" }, { value: "10m", label: "de instalación por luminaria" }] },
      { lead: "La documentación clínica es la base de mejores resultados. El agente asiste desde el primer borrador y estructura la información del EHR.",
        bullets: [
          "Notas clínicas asistidas siguiendo guías y buenas prácticas, completas, consistentes y defendibles",
          "Arquitectura de confianza: RAG anclado en datos del hospital para eliminar alucinaciones, con validación por especialidad y firma médica",
          "Módulos opcionales de análisis de riesgo y soporte de codificación, con trazabilidad completa para auditoría"
        ],
        metrics: [{ value: "10-15 h", label: "ahorradas por semana por clínico" }, { value: "150+", label: "notas automatizadas por día" }, { value: "30%", label: "menos carga documental" }] },
      { lead: "¿Ninguna solución estándar encaja con tu negocio? Nuestro equipo se asocia con vos desde el concepto hasta el lanzamiento para construir exactamente lo que necesitás.",
        bullets: [
          "Desarrolladores senior y product managers dedicados a tu proyecto",
          "De discovery a launch: estrategia, construcción y soporte posterior",
          "Diseño de arquitectura y automatización de procesos propios"
        ],
        metrics: [{ value: "20+", label: "años de experiencia combinada" }, { value: "Senior", label: "equipo dedicado" }] }
    ],

    flagships: [
      { tag: "Cloud · AWS · Azure · GCP",
        lead: "Gobierno automático del costo cloud: detecta, prioriza y ejecuta el ahorro de verdad.",
        bullets: ["Automatización no-code, sin esfuerzo de ingeniería", "Ejecución en un click con traza de auditoría completa"],
        panelTitle: "Cola de ahorros", panelMeta: "eu-west-1 · en vivo",
        rows: [
          { label: "Instancias RDS ociosas", meta: "14 recursos", value: "$4.120/mes", state: "Listo", color: OK },
          { label: "Volúmenes EBS sin uso", meta: "63 volúmenes", value: "$860/mes", state: "Listo", color: OK },
          { label: "Flota EC2 sobredimensionada", meta: "9 instancias", value: "$2.340/mes", state: "Aprobación", color: WAIT }
        ],
        footL: "Ejecutar todo", footR: "Auditoría activa" },
      { tag: "Voz · Chat · Email · Apps",
        lead: "Agentes que resuelven la interacción de punta a punta, con memoria y contexto compartido entre canales.",
        bullets: ["Una sola infraestructura para todos los canales", "Equipo local de implementación y piloto de un mes"],
        panelTitle: "Actividad por canal", panelMeta: "últimas 24 h",
        rows: [
          { label: "Voz", meta: "prom. 1m 48s", value: "312", state: "Resuelto", color: OK },
          { label: "Chat", meta: "prom. 42s", value: "1.204", state: "Resuelto", color: OK },
          { label: "Email", meta: "prom. 6m", value: "188", state: "Escalado", color: WAIT }
        ],
        footL: "Memoria compartida entre canales", footR: "Un agente, un contexto" },
      { tag: "Cierre · Conciliación · Reportes",
        lead: "Agentes que automatizan conciliaciones, reportes y cierre mensual aprendiendo de tu proceso actual.",
        bullets: ["Aprende tu flujo existente por observación", "Control de revisión y aprobación en cada paso"],
        panelTitle: "Cierre mensual", panelMeta: "día 1 de 3",
        rows: [
          { label: "Conciliación bancaria", meta: "4 cuentas", value: "2 min", state: "Listo", color: OK },
          { label: "Matcheo intercompany", meta: "3 entidades", value: "4 min", state: "Listo", color: OK },
          { label: "Devengos y provisiones", meta: "espera aprobación", value: "s/d", state: "En revisión", color: WAIT }
        ],
        footL: "Cada paso es revisable", footR: "Nada se contabiliza sin aprobación" },
      { tag: "Forense digital · Patentado",
        lead: "Infraestructura de confianza para evidencia digital en la era de la IA generativa.",
        bullets: ["Doble motor: biometría de movimiento + análisis espectral", "Desplegado en entornos Fortune 500 y de gobierno"],
        panelTitle: "Reporte de verificación", panelMeta: "archivo #4471-B",
        rows: [
          { label: "Biometría de movimiento", meta: "marcha y micromovimiento", value: "consistente", state: "Pasa", color: OK },
          { label: "Análisis espectral", meta: "marcadores de síntesis", value: "sin hallazgos", state: "Pasa", color: OK },
          { label: "Cadena de origen", meta: "captura a presentación", value: "intacta", state: "Pasa", color: OK }
        ],
        footL: "Veredicto: auténtico", footR: "Reporte firmado, válido en juicio" }
    ]
  },

  en: {
    nav: { solutions: "Solutions", how: "How we work", about: "About", contact: "Contact", cta: "Book a meeting" },
    menu: [
      { label: "Cloud & AI spend", items: [
        { name: "FinOps Optimization", micro: "Cloud cost governance that executes" },
        { name: "Token Optimization", micro: "One budget across model providers" } ] },
      { label: "Agents & operations", items: [
        { name: "Customer AI Platform", micro: "Voice, chat, email and apps" },
        { name: "Finance Agents", micro: "Reconciliation, reporting and close" },
        { name: "HealthCare Agent", micro: "Clinical and admin operations" } ] },
      { label: "Trust, security & spaces", items: [
        { name: "Evidence Guard", micro: "Forensic verification of digital evidence" },
        { name: "Vision Shield", micro: "Real-time recognition, existing cameras" },
        { name: "Smart Spaces", micro: "Smart city and smart retail" },
        { name: "Custom Development", micro: "Built for your operation" } ] }
    ],
    hero: {
      eyebrow: "Your AI technology & integration partner",
      titleA: "The AI solutions hub",
      titleB: "for your critical challenges.",
      sub1: "We integrate an ecosystem of proven tools and work alongside your team.",
      sub2: "Operational bottlenecks, infrastructure and scale, measured in real numbers.",
      cta1: "Bring us a real case",
      cta2: "See solutions"
    },
    partners: "Delivery partners & alliances",
    frictions: {
      titleA: "Everyone is buying AI.",
      titleB: "Almost no one has it working.",
      items: [
        { num: "01", title: "Recommendations pile up. Execution never happens.",
          body: "Your team finds savings in AWS, Azure and GCP every week. Nobody has the mandate to apply them." },
        { num: "02", title: "Pilots die exactly where the real work starts.",
          body: "Wiring voice, chat, CRM and back-office takes months. Without governance, teams revert to spreadsheets." },
        { num: "03", title: "One AI budget splits into thousands of daily decisions.",
          body: "Five providers, no single view. Spend grows faster than anyone can govern it." }
      ]
    },
    solutions: {
      title: "Four places we start most engagements.",
      audience: "Built for CFOs, CTOs, CISOs and public-sector buyers",
      learn: "Learn more",
      illustrative: "Illustrative interface · swap for a real capture",
      restTitle: "The rest of the portfolio",
      restMeta: "Five more, same standard"
    },
    how: {
      label: "How we work",
      title: "We don't replace your systems. We make them execute.",
      step: "Step",
      items: [
        { num: "01", title: "We meet you and explore your pain points", body: "We sit with your team to understand where the real friction is, not the assumed one." },
        { num: "02", title: "We bring the best tools for the job", body: "We pick from a proven ecosystem the solution that fits your specific problem, no forced one-size-fits-all product." },
        { num: "03", title: "We stay with support and professional services", body: "Through the whole process, not just the kickoff. Implementation, tuning and support from our own team." },
        { num: "04", title: "Measurable savings and efficiency", body: "The result shows up in numbers: financial and operational savings, optimization and efficiency across your operation." }
      ]
    },
    team: {
      label: "Who you'll be working with",
      title: "Built by people who have run these operations at scale.",
      lead: "Senior engineers, product managers and FinOps practitioners. The same people in the first call are the ones in production.",
      roles: ["CEO & Founder", "COO & Co-Founder", "CSO & Partner", "Global Head of Client Partnerships", "Head of Strategic Partnerships & Innovation"],
      bios: [
        "Leads Latil's vision and strategy, building partnerships with world-class AI solutions so enterprises can scale their operations.",
        "Runs operations, go-to-market and customer success. A background in operations and technology, focused on scaling enterprise automation.",
        "15+ years as CEO, CFO and director of digital transformation in the public sector, with deep expertise in business operations and innovation at scale.",
        "30+ years of executive leadership in telecom, including CEO of Cable & Wireless Panamá.",
        "Leads alliances across EMEA and LATAM, connecting startups with global technology organisations."
      ]
    },
    contact: {
      title: "Bring us a real case.",
      line1: "A 20-minute call, no commitment.",
      line2: "We listen to your situation, map it to concrete solutions and give you a number.",
      b1: "Reply in under 24 hours",
      b2: "First consultation at no cost",
      b3: "Estimate of the savings on the table",
      fName: "Full name", fEmail: "Corporate email", fCompany: "Company",
      fChallenge: "What is your main challenge?", fOther: "Something else",
      fMessage: "Tell us briefly about the case",
      fRequired: "Please complete name, email and company before sending.",
      fError: "We could not send the message. Please try again.",
      fOk: "Thanks. We’ll get back to you within 24 hours.",
      fSending: "Sending...",
      fSend: "Send message"
    },
    footer: {
      tagline: "Your AI technology and integration partner. LATAM and Europe.",
      coverage: "Global coverage",
      legal: "Terms · Privacy"
    },
    restItems: [
      "FinOps for AI. One budget across every model provider.",
      "Real-time recognition on the cameras you already have.",
      "Smart city and smart retail, built from existing street lighting.",
      "Clinical and administrative operations, grounded in hospital data.",
      "When nothing off the shelf fits your operation, we build it."
    ],
    restNames: ["Token Optimization", "Vision Shield", "Smart Spaces", "HealthCare Agent", "Custom Development"],
    restCta: "Let's talk about this",
    restOpen: "See detail",
    restDetails: [
      { lead: "The AI revolution does not require reinventing FinOps. It requires accelerating it. One big decision splits into thousands of daily ones across five or more providers.",
        bullets: [
          "Consolidates OpenAI, Anthropic, Google and the rest into one view, with multi-organization billing and API keys kept separate per team",
          "Budgets with real efficacy: track tokens by team, workflow and model, stopping silent overruns before they hit the invoice",
          "Executive reports that translate token usage into business language, with role-based views for FinOps, Finance and DevOps"
        ],
        metrics: [{ value: "5+", label: "providers in one view" }, { value: "1,000+", label: "daily decisions governed" }, { value: "Active", label: "budget control" }] },
      { lead: "Turns the camera infrastructure you already own into an intelligent security platform, with no new hardware.",
        bullets: [
          "NIST-recognized accuracy across 6 challenging conditions: poor video quality, outdoor darkness, extreme weather, distance, motion and face coverage",
          "Beyond face matching: detects shoplifting and loitering, identifies VIP customers on arrival and analyses queue wait times",
          "Real-time watchlist alerting, native VMS integration and a mobile app for the security team"
        ],
        metrics: [{ value: "99.2%", label: "recognition accuracy" }, { value: "<0.5s", label: "response time" }, { value: "GDPR Art.25", label: "compliant by design" }] },
      { lead: "Turns cities and stores into digital environments. Smart fixtures replace existing lights and add computer vision, connectivity and edge AI.",
        bullets: [
          "Replace streetlights or in-store fixtures: sensors, edge processors, LED and public Wi-Fi or 5G, with no fiber trenching",
          "Traffic, safety and store analytics run on the fixture: lower latency, less bandwidth, privacy-first metadata instead of raw video",
          "One platform for urban services and store operations, with open APIs for third-party systems"
        ],
        metrics: [{ value: "75%", label: "lower TCO vs new infrastructure" }, { value: "10-15%", label: "retail revenue uplift" }, { value: "10m", label: "install time per fixture" }] },
      { lead: "Clinical documentation is the foundation for better outcomes. The agent assists from the first draft and structures information from EHR data.",
        bullets: [
          "Assisted clinical notes following guidelines and best practices: complete, consistent and defensible",
          "Trust architecture: RAG grounded in real hospital data to eliminate hallucinations, with specialty validation and physician sign-off",
          "Optional risk analysis and coding support modules, with full traceability for audit and legal review"
        ],
        metrics: [{ value: "10-15 h", label: "saved weekly per clinician" }, { value: "150+", label: "notes automated daily" }, { value: "30%", label: "documentation reduction" }] },
      { lead: "Nothing off the shelf fits your business? Our team partners with you from concept to launch to build exactly what you need.",
        bullets: [
          "Senior developers and product managers dedicated to your project",
          "Discovery to launch: strategy, build and ongoing support",
          "Architecture design and automation of your own processes"
        ],
        metrics: [{ value: "20+", label: "years of combined experience" }, { value: "Senior", label: "dedicated team" }] }
    ],

    flagships: [
      { tag: "Cloud · AWS · Azure · GCP",
        lead: "Automated governance of cloud cost: detect, prioritise and actually execute the saving.",
        bullets: ["No-code automation, zero engineering effort", "One-click execution with a full audit trail"],
        panelTitle: "Savings queue", panelMeta: "eu-west-1 · live",
        rows: [
          { label: "Idle RDS instances", meta: "14 resources", value: "$4,120/mo", state: "Ready", color: OK },
          { label: "Unattached EBS volumes", meta: "63 volumes", value: "$860/mo", state: "Ready", color: OK },
          { label: "Oversized EC2 fleet", meta: "9 instances", value: "$2,340/mo", state: "Approval", color: WAIT }
        ],
        footL: "Execute all", footR: "Audit trail on" },
      { tag: "Voice · Chat · Email · Apps",
        lead: "Agents that resolve interactions end to end, with shared memory and context across channels.",
        bullets: ["One infrastructure for every channel", "Local delivery team and a one-month pilot"],
        panelTitle: "Channel activity", panelMeta: "last 24 h",
        rows: [
          { label: "Voice", meta: "avg 1m 48s", value: "312", state: "Resolved", color: OK },
          { label: "Chat", meta: "avg 42s", value: "1,204", state: "Resolved", color: OK },
          { label: "Email", meta: "avg 6m", value: "188", state: "Escalated", color: WAIT }
        ],
        footL: "Shared memory across channels", footR: "One agent, one context" },
      { tag: "Close · Reconciliation · Reporting",
        lead: "Agents that automate reconciliation, reporting and the monthly close by learning your current process.",
        bullets: ["Learns your existing workflow by observation", "Review and approval control at every step"],
        panelTitle: "Monthly close", panelMeta: "day 1 of 3",
        rows: [
          { label: "Bank reconciliation", meta: "4 accounts", value: "2 min", state: "Done", color: OK },
          { label: "Intercompany matching", meta: "3 entities", value: "4 min", state: "Done", color: OK },
          { label: "Accruals & provisions", meta: "awaiting sign-off", value: "n/a", state: "In review", color: WAIT }
        ],
        footL: "Every step reviewable", footR: "Nothing posts without approval" },
      { tag: "Digital forensics · Patented",
        lead: "Trust infrastructure for digital evidence in the era of generative AI.",
        bullets: ["Dual engine: motion biometrics + spectral analysis", "Deployed in Fortune 500 and government environments"],
        panelTitle: "Verification report", panelMeta: "file #4471-B",
        rows: [
          { label: "Motion biometrics", meta: "gait & micro-movement", value: "consistent", state: "Pass", color: OK },
          { label: "Spectral analysis", meta: "synthesis markers", value: "none found", state: "Pass", color: OK },
          { label: "Origin chain", meta: "capture to submission", value: "intact", state: "Pass", color: OK }
        ],
        footL: "Verdict: authentic", footR: "Signed, court-ready report" }
    ]
  }
};

export type Copy = (typeof COPY)["es"];

/** Product names are identical in both languages. */
export const SOLUTION_NAMES = [
  "FinOps Optimization",
  "Customer AI Platform",
  "Finance Agents",
  "Evidence Guard",
  "Token Optimization",
  "Vision Shield",
  "Smart Spaces",
  "HealthCare Agent",
];
