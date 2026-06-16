export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Skills',
    'nav.contact': 'Contacto',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',

    // Theme
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',
    'theme.toggle': 'Cambiar tema',

    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Andrés Guerrero',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'Construyo productos digitales end-to-end con arquitectura limpia, microservicios e integración de IA en los flujos de entrega.',
    'hero.cta.primary': 'Ver experiencia',
    'hero.cta.secondary': 'Descargar CV',
    'hero.available': 'Disponible para proyectos',

    // About
    'about.title': 'Sobre mí',
    'about.p1': 'Full Stack Developer con más de 7 años de experiencia construyendo productos digitales end-to-end para entornos B2A, B2C y B2E. Enfocado en diseñar soluciones escalables, arquitectura de microservicios e integraciones con servicios en la nube.',
    'about.p2': 'Aplico herramientas de IA y diseño flujos agénticos para optimizar procesos de implementación, integración y entrega continua de valor.',
    'about.p3': 'Cuando no estoy programando, estoy explorando nuevas herramientas de IA, contribuyendo a proyectos open source o tomando café mientras debuggeo algo que "debería funcionar".',
    'about.location': 'Cartagena, Colombia',
    'about.experience': '7+ años de experiencia',
    'about.remote': 'Disponible para remote',
    'about.card.architecture': 'Clean Architecture',
    'about.card.architecture.desc': 'Diseño soluciones escalables con arquitectura limpia y microservicios antes de escribir la primera línea.',
    'about.card.quality': 'Testing & CI/CD',
    'about.card.quality.desc': 'Jest, Playwright, Azure Pipelines y Docker son parte del workflow, no un extra.',
    'about.card.delivery': 'IA en el flujo',
    'about.card.delivery.desc': 'Integro herramientas de IA y flujos agénticos para acelerar la entrega de valor.',

    // Skills
    'skills.title': 'Skills',
    'skills.subtitle': 'Tecnologías y herramientas con las que trabajo día a día.',
    'skills.filter.all': 'Todos',
    'skills.filter.frontend': 'Frontend',
    'skills.filter.backend': 'Backend',
    'skills.filter.tools': 'Tools',
    'skills.filter.soft': 'Soft Skills',
    'skills.level.1': 'Básico',
    'skills.level.2': 'Básico-Intermedio',
    'skills.level.3': 'Intermedio',
    'skills.level.4': 'Avanzado',
    'skills.level.5': 'Experto',
    'skills.error': 'No se pudieron cargar los skills.',
    'skills.empty': 'No hay skills para mostrar.',

    // Experience
    'experience.title': 'Experiencia',
    'experience.subtitle': 'Mi trayectoria profesional construyendo productos reales.',
    'experience.present': 'Presente',
    'experience.error': 'No se pudo cargar la experiencia.',
    'experience.empty': 'No hay experiencia para mostrar.',
    'experience.achievements': 'Logros destacados',

    // Education
    'education.title': 'Educación',
    'education.subtitle': 'Formación académica y certificaciones.',
    'education.present': 'Presente',
    'education.error': 'No se pudo cargar la educación.',
    'education.empty': 'No hay educación para mostrar.',
    'education.certifications': 'Mis Certificados',

    // Projects
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Proyectos personales y de código abierto.',
    'projects.error': 'No se pudieron cargar los proyectos.',
    'projects.empty': 'No hay proyectos para mostrar.',
    'projects.repo': 'Ver repositorio',
    'projects.demo': 'Ver demo',

    // Certifications
    'certs.title': 'Certificaciones',
    'certs.subtitle': 'Cursos y certificados que respaldan mis skills.',
    'certs.error': 'No se pudieron cargar las certificaciones.',
    'certs.empty': 'No hay certificaciones para mostrar.',
    'certs.view': 'Ver certificado',
    'certs.count': 'cert',
    'certs.count.plural': 'certs',

    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tenés un proyecto desafiante o querés charlar sobre tecnología? Escribime.',
    'contact.email': 'Escribir email',
    'contact.linkedin': 'Conectar en LinkedIn',
    'contact.github': 'Ver GitHub',
    'contact.cta': 'Disponible para proyectos fulltime remote, contratos de consultoría o freelance.',

    // Footer
    'footer.built': 'Construido con',
    'footer.and': 'y',
    'footer.rights': 'Todos los derechos reservados.',

    // Meta
    'meta.description': 'Portfolio de Andrés Felipe Guerrero Novoa — Full Stack Developer con 7+ años construyendo productos digitales end-to-end con React, Next.js, Laravel, Go y arquitecturas escalables.',
    'meta.about.description': 'Sobre Andrés Guerrero — Full Stack Developer de Cartagena, Colombia. Experiencia, filosofía y enfoque de trabajo.',
    'meta.experience.description': 'Experiencia profesional de Andrés Guerrero — Idea Latente, GML Software, 150 Porciento y más.',
    'meta.skills.description': 'Skills de Andrés Guerrero — TypeScript, React, Next.js, PHP, Laravel, Go, Docker, Azure, AWS y más.',
    'meta.contact.description': 'Contactar a Andrés Guerrero — disponible para proyectos remote, consultoría y freelance.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'theme.toggle': 'Toggle theme',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Andrés Guerrero',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'I build end-to-end digital products with clean architecture, microservices and AI-powered delivery workflows.',
    'hero.cta.primary': 'View experience',
    'hero.cta.secondary': 'Download CV',
    'hero.available': 'Available for projects',

    // About
    'about.title': 'About me',
    'about.p1': 'Full Stack Developer with 7+ years of experience building end-to-end digital products for B2A, B2C and B2E environments. Focused on scalable solutions, microservices architecture and cloud integrations.',
    'about.p2': 'I apply AI tools and design agentic workflows to optimize implementation, integration and continuous value delivery processes.',
    'about.p3': "When I'm not coding, I'm exploring new AI tools, contributing to OSS, or debugging something that 'should work' over a coffee.",
    'about.location': 'Cartagena, Colombia',
    'about.experience': '7+ years experience',
    'about.remote': 'Available for remote',
    'about.card.architecture': 'Clean Architecture',
    'about.card.architecture.desc': 'I design scalable solutions with clean architecture and microservices before writing the first line.',
    'about.card.quality': 'Testing & CI/CD',
    'about.card.quality.desc': 'Jest, Playwright, Azure Pipelines and Docker are part of the workflow, not an extra.',
    'about.card.delivery': 'AI in the pipeline',
    'about.card.delivery.desc': 'I integrate AI tools and agentic workflows to accelerate value delivery.',

    // Skills
    'skills.title': 'Skills',
    'skills.subtitle': 'Technologies and tools I work with every day.',
    'skills.filter.all': 'All',
    'skills.filter.frontend': 'Frontend',
    'skills.filter.backend': 'Backend',
    'skills.filter.tools': 'Tools',
    'skills.filter.soft': 'Soft Skills',
    'skills.level.1': 'Beginner',
    'skills.level.2': 'Elementary',
    'skills.level.3': 'Intermediate',
    'skills.level.4': 'Advanced',
    'skills.level.5': 'Expert',
    'skills.error': 'Could not load skills.',
    'skills.empty': 'No skills to display.',

    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'My professional journey building real products.',
    'experience.present': 'Present',
    'experience.error': 'Could not load experience.',
    'experience.empty': 'No experience to display.',
    'experience.achievements': 'Key achievements',

    // Education
    'education.title': 'Education',
    'education.subtitle': 'Academic background and certifications.',
    'education.present': 'Present',
    'education.error': 'Could not load education.',
    'education.empty': 'No education to display.',
    'education.certifications': 'My Certifications',

    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Personal and open source projects.',
    'projects.error': 'Could not load projects.',
    'projects.empty': 'No projects to display.',
    'projects.repo': 'View repository',
    'projects.demo': 'View demo',

    // Certifications
    'certs.title': 'Certifications',
    'certs.subtitle': 'Courses and certificates that back my skills.',
    'certs.error': 'Could not load certifications.',
    'certs.empty': 'No certifications to display.',
    'certs.view': 'View certificate',
    'certs.count': 'cert',
    'certs.count.plural': 'certs',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Got a challenging project or want to talk tech? Reach out.',
    'contact.email': 'Send email',
    'contact.linkedin': 'Connect on LinkedIn',
    'contact.github': 'View GitHub',
    'contact.cta': 'Available for fulltime remote positions, consulting contracts or freelance.',

    // Footer
    'footer.built': 'Built with',
    'footer.and': 'and',
    'footer.rights': 'All rights reserved.',

    // Meta
    'meta.description': "Andrés Felipe Guerrero Novoa's portfolio — Full Stack Developer with 7+ years building end-to-end digital products with React, Next.js, Laravel, Go and scalable architectures.",
    'meta.about.description': "About Andrés Guerrero — Full Stack Developer from Cartagena, Colombia. Experience, philosophy and work approach.",
    'meta.experience.description': "Andrés Guerrero's professional experience — Idea Latente, GML Software, 150 Porciento and more.",
    'meta.skills.description': "Andrés Guerrero's skills — TypeScript, React, Next.js, PHP, Laravel, Go, Docker, Azure, AWS and more.",
    'meta.contact.description': 'Contact Andrés Guerrero — available for remote projects, consulting and freelance.',
  },
} as const;

export type UIKey = keyof typeof ui.es;
