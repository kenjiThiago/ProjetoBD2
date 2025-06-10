// Dados centralizados para toda a aplicação
export interface Course {
  id: number
  title: string
  instructor: string
  instructorAvatar: string
  description: string
  duration: string
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: string
  rating: number
  students: number
  thumbnail: string
  tags: string[]
  lessons: number
  certificate: boolean
  lastUpdated: string
  language: string
  prerequisites: string[]
  whatYouWillLearn: string[]
  isPopular?: boolean
  isNew?: boolean
  isBestseller?: boolean
  progress?: number
  completedLessons?: number
  lastAccessed?: string
  nextLesson?: string
}

export interface Company {
  id: number
  name: string
  logo: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  rating: number
  employees: string
  founded: string
  isPartner: boolean
  isPremium: boolean
  activeJobs: number
  totalHires: number
  benefits: string[]
  technologies: string[]
  culture: string[]
}

export interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Remoto' | 'Presencial' | 'Híbrido'
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Estágio'
  salaryRange: string
  description: string
  requirements: string[]
  technologies: string[]
  benefits: string[]
  postedAt: string
  deadline: string
  applicants: number
  isUrgent?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

// CURSOS PADRONIZADOS
export const courses: Course[] = [
  {
    id: 1,
    title: "React Avançado com TypeScript",
    instructor: "Ana Silva",
    instructorAvatar: "AS",
    description: "Domine React com TypeScript do zero ao nível profissional. Aprenda hooks avançados, context API, performance e muito mais.",
    duration: "18h 30m",
    level: "Avançado",
    category: "Frontend",
    rating: 4.9,
    students: 3245,
    thumbnail: "react-typescript",
    tags: ["React", "TypeScript", "Hooks", "Context API", "Performance"],
    lessons: 32,
    certificate: true,
    lastUpdated: "2025-06-01",
    language: "Português",
    prerequisites: ["JavaScript ES6+", "React Básico"],
    whatYouWillLearn: [
      "TypeScript com React do zero",
      "Hooks avançados e custom hooks",
      "Context API e gerenciamento de estado",
      "Otimização de performance",
      "Testes com Jest e React Testing Library"
    ],
    isPopular: true,
    progress: 75,
    completedLessons: 24,
    lastAccessed: "2025-06-04",
    nextLesson: "Context API com TypeScript"
  },
  {
    id: 2,
    title: "Node.js API Development",
    instructor: "Carlos Santos",
    instructorAvatar: "CS",
    description: "Construa APIs robustas e escaláveis com Node.js, Express e MongoDB. Inclui autenticação, testes e deploy.",
    duration: "24h 15m",
    level: "Intermediário",
    category: "Backend",
    rating: 4.8,
    students: 2890,
    thumbnail: "nodejs-api",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "API REST"],
    lessons: 28,
    certificate: true,
    lastUpdated: "2025-05-28",
    language: "Português",
    prerequisites: ["JavaScript", "Conceitos de HTTP"],
    whatYouWillLearn: [
      "Criação de APIs RESTful",
      "Autenticação JWT",
      "Integração com MongoDB",
      "Middleware e validações",
      "Deploy e documentação"
    ],
    isBestseller: true,
    progress: 45,
    completedLessons: 13,
    lastAccessed: "2025-06-03",
    nextLesson: "Middleware de Autenticação"
  },
  {
    id: 3,
    title: "Python para Data Science",
    instructor: "Marina Costa",
    instructorAvatar: "MC",
    description: "Aprenda análise de dados com Python, Pandas, NumPy e visualização. Ideal para quem quer entrar em Data Science.",
    duration: "20h 45m",
    level: "Intermediário",
    category: "Data Science",
    rating: 4.9,
    students: 4156,
    thumbnail: "python-datascience",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Analysis"],
    lessons: 25,
    certificate: true,
    lastUpdated: "2025-05-25",
    language: "Português",
    prerequisites: ["Python Básico", "Matemática Básica"],
    whatYouWillLearn: [
      "Manipulação de dados com Pandas",
      "Análise estatística com NumPy",
      "Visualização com Matplotlib e Seaborn",
      "Limpeza e preparação de dados",
      "Projeto prático completo"
    ],
    isPopular: true,
    progress: 100,
    completedLessons: 25,
    lastAccessed: "2025-05-28",
    nextLesson: "Concluído"
  },
  {
    id: 4,
    title: "Vue.js 3 Completo",
    instructor: "Roberto Lima",
    instructorAvatar: "RL",
    description: "Domine Vue.js 3 com Composition API, Pinia, Vue Router e muito mais. Do básico ao avançado.",
    duration: "16h 20m",
    level: "Intermediário",
    category: "Frontend",
    rating: 4.7,
    students: 1967,
    thumbnail: "vuejs-complete",
    tags: ["Vue.js", "Composition API", "Pinia", "Vue Router", "Vite"],
    lessons: 24,
    certificate: true,
    lastUpdated: "2025-06-02",
    language: "Português",
    prerequisites: ["JavaScript ES6+", "HTML/CSS"],
    whatYouWillLearn: [
      "Vue.js 3 e Composition API",
      "Gerenciamento de estado com Pinia",
      "Roteamento com Vue Router",
      "Componentes reutilizáveis",
      "Deploy em produção"
    ],
    isNew: true
  },
  {
    id: 5,
    title: "Docker e Kubernetes",
    instructor: "Pedro Oliveira",
    instructorAvatar: "PO",
    description: "Containerização com Docker e orquestração com Kubernetes. Essencial para DevOps moderno.",
    duration: "14h 50m",
    level: "Intermediário",
    category: "DevOps",
    rating: 4.6,
    students: 2134,
    thumbnail: "docker-kubernetes",
    tags: ["Docker", "Kubernetes", "Containers", "DevOps", "Orquestração"],
    lessons: 20,
    certificate: true,
    lastUpdated: "2025-05-30",
    language: "Português",
    prerequisites: ["Linux Básico", "Conceitos de redes"],
    whatYouWillLearn: [
      "Criação e gestão de containers",
      "Docker Compose para multi-containers",
      "Kubernetes para orquestração",
      "Deploy de aplicações",
      "Monitoramento e logs"
    ],
    progress: 20,
    completedLessons: 4,
    lastAccessed: "2025-06-02",
    nextLesson: "Containers e Imagens"
  },
  {
    id: 6,
    title: "Flutter Development",
    instructor: "Juliana Ferreira",
    instructorAvatar: "JF",
    description: "Desenvolvimento mobile nativo para iOS e Android com Flutter e Dart. Crie apps profissionais.",
    duration: "22h 10m",
    level: "Intermediário",
    category: "Mobile",
    rating: 4.8,
    students: 1876,
    thumbnail: "flutter-development",
    tags: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
    lessons: 30,
    certificate: true,
    lastUpdated: "2025-05-20",
    language: "Português",
    prerequisites: ["Programação Básica", "OOP"],
    whatYouWillLearn: [
      "Dart e fundamentos do Flutter",
      "Widgets e layouts responsivos",
      "Navegação e gerenciamento de estado",
      "Integração com APIs",
      "Publicação nas stores"
    ],
    isPopular: true
  },
  {
    id: 7,
    title: "Machine Learning com Python",
    instructor: "Dr. Fernando Silva",
    instructorAvatar: "FS",
    description: "Introdução prática ao Machine Learning com Python, Scikit-learn e TensorFlow. Projetos reais inclusos.",
    duration: "28h 30m",
    level: "Avançado",
    category: "Data Science",
    rating: 4.9,
    students: 2567,
    thumbnail: "machine-learning",
    tags: ["Machine Learning", "Python", "Scikit-learn", "TensorFlow", "AI"],
    lessons: 35,
    certificate: true,
    lastUpdated: "2025-06-03",
    language: "Português",
    prerequisites: ["Python", "Estatística", "Álgebra Linear"],
    whatYouWillLearn: [
      "Algoritmos de ML supervisionado",
      "Aprendizado não supervisionado",
      "Redes neurais com TensorFlow",
      "Avaliação de modelos",
      "Deploy de modelos em produção"
    ],
    isBestseller: true
  },
  {
    id: 8,
    title: "UI/UX Design Fundamentals",
    instructor: "Carla Designer",
    instructorAvatar: "CD",
    description: "Aprenda os fundamentos do design de interfaces e experiência do usuário. Figma, prototipagem e usabilidade.",
    duration: "12h 45m",
    level: "Iniciante",
    category: "Design",
    rating: 4.7,
    students: 3456,
    thumbnail: "uiux-design",
    tags: ["UI/UX", "Figma", "Design System", "Prototipagem", "Usabilidade"],
    lessons: 18,
    certificate: true,
    lastUpdated: "2025-05-15",
    language: "Português",
    prerequisites: ["Conhecimentos básicos de design"],
    whatYouWillLearn: [
      "Princípios de design",
      "Prototipagem no Figma",
      "Design Systems",
      "Testes de usabilidade",
      "Portfolio profissional"
    ],
    progress: 100,
    completedLessons: 18,
    lastAccessed: "2025-05-15",
    nextLesson: "Concluído"
  },
  {
    id: 9,
    title: "AWS Cloud Practitioner",
    instructor: "Marcos DevOps",
    instructorAvatar: "MD",
    description: "Fundamentos da AWS para iniciantes. Prepare-se para a certificação Cloud Practitioner.",
    duration: "15h 20m",
    level: "Iniciante",
    category: "Cloud",
    rating: 4.6,
    students: 2890,
    thumbnail: "aws-cloud",
    tags: ["AWS", "Cloud", "EC2", "S3", "Lambda"],
    lessons: 22,
    certificate: true,
    lastUpdated: "2025-05-18",
    language: "Português",
    prerequisites: ["Conhecimentos básicos de TI"],
    whatYouWillLearn: [
      "Conceitos fundamentais de cloud",
      "Principais serviços AWS",
      "Modelos de precificação",
      "Segurança na nuvem",
      "Preparação para certificação"
    ],
    isNew: true
  },
  {
    id: 10,
    title: "JavaScript Moderno ES6+",
    instructor: "Lucas Frontend",
    instructorAvatar: "LF",
    description: "Domine as funcionalidades modernas do JavaScript ES6+. Base sólida para qualquer framework.",
    duration: "14h 15m",
    level: "Intermediário",
    category: "Frontend",
    rating: 4.8,
    students: 4567,
    thumbnail: "javascript-modern",
    tags: ["JavaScript", "ES6+", "Async/Await", "Modules", "Classes"],
    lessons: 26,
    certificate: true,
    lastUpdated: "2025-05-22",
    language: "Português",
    prerequisites: ["JavaScript Básico"],
    whatYouWillLearn: [
      "Arrow functions e destructuring",
      "Promises e async/await",
      "Modules e imports",
      "Classes e herança",
      "APIs modernas do navegador"
    ],
    isPopular: true
  },
  {
    id: 11,
    title: "JavaScript Moderno ES6+",
    instructor: "Lucas Frontend",
    instructorAvatar: "LF",
    description: "Domine as funcionalidades modernas do JavaScript ES6+. Base sólida para qualquer framework.",
    duration: "14h 15m",
    level: "Intermediário",
    category: "Frontend",
    rating: 4.8,
    students: 4567,
    thumbnail: "javascript-modern",
    tags: ["JavaScript", "ES6+", "Async/Await", "Modules", "Classes"],
    lessons: 26,
    certificate: true,
    lastUpdated: "2025-05-22",
    language: "Português",
    prerequisites: ["JavaScript Básico"],
    whatYouWillLearn: [
      "Arrow functions e destructuring",
      "Promises e async/await",
      "Modules e imports",
      "Classes e herança",
      "APIs modernas do navegador"
    ],
    isPopular: true,
    isNew: true
  }
]

// EMPRESAS PADRONIZADAS
export const companies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "TC",
    description: "Líder em soluções tecnológicas inovadoras, desenvolvendo produtos que transformam a experiência digital.",
    industry: "Tecnologia",
    size: "Grande (500+ funcionários)",
    location: "São Paulo, SP",
    website: "techcorp.com",
    rating: 4.8,
    employees: "500-1000",
    founded: "2015",
    isPartner: true,
    isPremium: true,
    activeJobs: 12,
    totalHires: 45,
    benefits: ["Plano de saúde", "Vale refeição", "Home office", "Auxílio educação"],
    technologies: ["React", "Node.js", "AWS", "Python", "TypeScript"],
    culture: ["Inovação", "Diversidade", "Crescimento", "Flexibilidade"]
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    logo: "DF",
    description: "Especializada em Big Data e Analytics, ajudando empresas a tomar decisões baseadas em dados.",
    industry: "Data Science",
    size: "Média (100-500 funcionários)",
    location: "Rio de Janeiro, RJ",
    website: "dataflow.com.br",
    rating: 4.6,
    employees: "200-500",
    founded: "2018",
    isPartner: true,
    isPremium: false,
    activeJobs: 8,
    totalHires: 23,
    benefits: ["Plano de saúde", "Gympass", "Licença maternidade estendida", "Stock options"],
    technologies: ["Python", "Spark", "Kafka", "Tableau", "SQL"],
    culture: ["Dados", "Precisão", "Colaboração", "Aprendizado"]
  },
  {
    id: 3,
    name: "CloudNine Systems",
    logo: "C9",
    description: "Arquitetura em nuvem e DevOps, oferecendo infraestrutura escalável e segura.",
    industry: "Cloud Computing",
    size: "Pequena (50-100 funcionários)",
    location: "Florianópolis, SC",
    website: "cloudnine.tech",
    rating: 4.9,
    employees: "50-100",
    founded: "2020",
    isPartner: true,
    isPremium: true,
    activeJobs: 6,
    totalHires: 18,
    benefits: ["Trabalho remoto", "Horário flexível", "Equipamentos", "Cursos pagos"],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    culture: ["Autonomia", "Qualidade", "Inovação", "Remote-first"]
  },
  {
    id: 4,
    name: "FinTech Revolution",
    logo: "FR",
    description: "Revolucionando o sistema financeiro com soluções digitais inovadoras e seguras.",
    industry: "FinTech",
    size: "Média (100-500 funcionários)",
    location: "São Paulo, SP",
    website: "fintechrev.com",
    rating: 4.7,
    employees: "150-300",
    founded: "2017",
    isPartner: true,
    isPremium: true,
    activeJobs: 15,
    totalHires: 67,
    benefits: ["Plano de saúde premium", "PIR", "Day off aniversário", "Massagem"],
    technologies: ["Java", "Spring", "Kafka", "React", "Microservices"],
    culture: ["Segurança", "Inovação", "Transparência", "Excelência"]
  },
  {
    id: 5,
    name: "GameDev Studios",
    logo: "GD",
    description: "Estúdio independente criando jogos mobile e web com foco em experiência do usuário.",
    industry: "Gaming",
    size: "Pequena (10-50 funcionários)",
    location: "Curitiba, PR",
    website: "gamedev.studio",
    rating: 4.4,
    employees: "15-30",
    founded: "2021",
    isPartner: false,
    isPremium: false,
    activeJobs: 4,
    totalHires: 8,
    benefits: ["Ambiente criativo", "Games gratuitos", "Eventos gaming", "Pets friendly"],
    technologies: ["Unity", "C#", "JavaScript", "WebGL", "Mobile"],
    culture: ["Criatividade", "Diversão", "Paixão", "Colaboração"]
  }
]

export const jobs: Job[] = [
  {
    id: 1,
    title: "Desenvolvedor React Sênior",
    company: "TechCorp Solutions",
    companyLogo: "TC",
    location: "São Paulo, SP",
    type: "Híbrido",
    level: "Sênior",
    salaryRange: "R$ 12.000 - R$ 18.000",
    description: "Buscamos um desenvolvedor React sênior para liderar projetos frontend e mentorar desenvolvedores juniores.",
    requirements: ["5+ anos com React", "TypeScript", "Next.js", "Testes automatizados", "Liderança técnica"],
    technologies: ["React", "TypeScript", "Next.js", "Jest", "Cypress"],
    benefits: ["Plano de saúde", "Vale refeição", "Home office", "Auxílio educação"],
    postedAt: "2025-06-01",
    deadline: "2025-06-30",
    applicants: 47,
    isFeatured: true
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataFlow Analytics",
    companyLogo: "DF",
    location: "Rio de Janeiro, RJ",
    type: "Remoto",
    level: "Pleno",
    salaryRange: "R$ 8.000 - R$ 12.000",
    description: "Profissional para desenvolvimento de modelos de ML e análise de grandes volumes de dados.",
    requirements: ["Python", "Pandas", "Scikit-learn", "SQL", "Estatística"],
    technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL"],
    benefits: ["Plano de saúde", "Gympass", "Cursos online", "Stock options"],
    postedAt: "2025-05-30",
    deadline: "2025-06-25",
    applicants: 32,
    isNew: true
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudNine Systems",
    companyLogo: "C9",
    location: "Florianópolis, SC",
    type: "Remoto",
    level: "Pleno",
    salaryRange: "R$ 10.000 - R$ 15.000",
    description: "Responsável por CI/CD, infraestrutura como código e automação de deploy.",
    requirements: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    benefits: ["100% remoto", "Horário flexível", "Equipamentos", "Cursos AWS"],
    postedAt: "2025-05-28",
    deadline: "2025-06-20",
    applicants: 28,
    isUrgent: true
  },
  {
    id: 4,
    title: "Estágio em Desenvolvimento Web",
    company: "StartupHub Ventures",
    companyLogo: "SH",
    location: "Belo Horizonte, MG",
    type: "Presencial",
    level: "Estágio",
    salaryRange: "R$ 1.200 - R$ 1.800",
    description: "Oportunidade para estudantes desenvolverem habilidades em desenvolvimento web full stack.",
    requirements: ["Estudante", "HTML/CSS/JS", "React básico", "Git", "Inglês básico"],
    technologies: ["React", "Node.js", "MongoDB", "Git", "JavaScript"],
    benefits: ["Vale transporte", "Vale refeição", "Mentorias", "Ambiente startup"],
    postedAt: "2025-06-02",
    deadline: "2025-06-15",
    applicants: 156,
    isNew: true
  },
  {
    id: 5,
    title: "Backend Developer Java",
    company: "FinTech Revolution",
    companyLogo: "FR",
    location: "São Paulo, SP",
    type: "Híbrido",
    level: "Pleno",
    salaryRange: "R$ 9.000 - R$ 14.000",
    description: "Desenvolvimento de APIs e microserviços para soluções financeiras de alta performance.",
    requirements: ["Java 11+", "Spring Boot", "Microserviços", "Apache Kafka", "Banco de dados"],
    technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
    benefits: ["Plano de saúde premium", "PIR", "Day off aniversário", "Massagem"],
    postedAt: "2025-05-29",
    deadline: "2025-06-28",
    applicants: 64,
    isFeatured: true
  },
  {
    id: 6,
    title: "Game Developer Unity",
    company: "GameDev Studios",
    companyLogo: "GD",
    location: "Curitiba, PR",
    type: "Presencial",
    level: "Júnior",
    salaryRange: "R$ 4.000 - R$ 6.000",
    description: "Desenvolvimento de jogos mobile e web usando Unity e C#.",
    requirements: ["Unity", "C#", "Game design", "Git", "Matemática"],
    technologies: ["Unity", "C#", "Blender", "Git", "Mobile"],
    benefits: ["Ambiente criativo", "Games gratuitos", "Eventos gaming", "Pets friendly"],
    postedAt: "2025-06-03",
    deadline: "2025-06-18",
    applicants: 89,
    isNew: true
  }
]

// Funções utilitárias
export const getCoursesInProgress = () =>
  courses.filter(course => course.progress && course.progress > 0 && course.progress < 100)

export const getCompletedCourses = () =>
  courses.filter(course => course.progress === 100)

export const getCoursesWithCertificates = () =>
  courses.filter(course => course.certificate && course.progress === 100)

export const getCoursesByCategory = (category: string) =>
  courses.filter(course => course.category === category)

export const getFeaturedCourses = () =>
  courses.filter(course => course.isPopular || course.isBestseller || course.isNew)

export const getPopularCourses = () =>
  courses.filter(course => course.isPopular)

export const getNewCourses = () =>
  courses.filter(course => course.isNew)

export const getBestsellerCourses = () =>
  courses.filter(course => course.isBestseller)
