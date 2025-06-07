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
  price: number
  originalPrice: number
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

export interface LearningPath {
  id: number
  title: string
  description: string
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: string
  duration: string
  courses: number
  students: number
  rating: number
  thumbnail: string
  instructor: string
  instructorAvatar: string
  tags: string[]
  skills: string[]
  isPopular?: boolean
  isNew?: boolean
  price: number
  originalPrice: number
  completionRate: number
  progress?: number
  totalCourses?: number
  completedCourses?: number
  estimatedCompletion?: string
}

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  earnedAt: string
  category: string
  points: number
}

export interface Activity {
  id: number
  type: 'course_completed' | 'lesson_completed' | 'achievement_earned' | 'streak_milestone'
  title: string
  description: string
  timestamp: string
  icon: string
  points?: number
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
    price: 299.90,
    originalPrice: 399.90,
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
    price: 349.90,
    originalPrice: 499.90,
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
    price: 279.90,
    originalPrice: 399.90,
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
    price: 249.90,
    originalPrice: 349.90,
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
    price: 329.90,
    originalPrice: 449.90,
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
    price: 359.90,
    originalPrice: 499.90,
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
    price: 399.90,
    originalPrice: 599.90,
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
    price: 199.90,
    originalPrice: 299.90,
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
    price: 249.90,
    originalPrice: 349.90,
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
    price: 179.90,
    originalPrice: 249.90,
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

// TRILHAS PADRONIZADAS
export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Desenvolvedor Full Stack Moderno",
    description: "Trilha completa para se tornar um desenvolvedor full stack usando as tecnologias mais demandadas do mercado",
    level: "Intermediário",
    category: "Full Stack",
    duration: "6 meses",
    courses: 12,
    students: 4567,
    rating: 4.9,
    thumbnail: "fullstack-path",
    instructor: "Carlos Santos",
    instructorAvatar: "CS",
    tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    skills: ["Frontend", "Backend", "Database", "Deploy"],
    isPopular: true,
    price: 899.90,
    originalPrice: 1299.90,
    completionRate: 87,
    progress: 60,
    totalCourses: 12,
    completedCourses: 7,
    estimatedCompletion: "2 meses"
  },
  {
    id: 2,
    title: "Data Science com Python",
    description: "Aprenda análise de dados, machine learning e inteligência artificial do zero ao avançado",
    level: "Intermediário",
    category: "Data Science",
    duration: "4 meses",
    courses: 8,
    students: 3245,
    rating: 4.8,
    thumbnail: "datascience-path",
    instructor: "Marina Costa",
    instructorAvatar: "MC",
    tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
    skills: ["Análise de Dados", "Machine Learning", "Visualização", "IA"],
    price: 799.90,
    originalPrice: 1199.90,
    completionRate: 92,
    progress: 33,
    totalCourses: 8,
    completedCourses: 3,
    estimatedCompletion: "3 meses"
  },
  {
    id: 3,
    title: "Frontend Especialista React",
    description: "Domine React, Next.js e todo o ecossistema frontend para criar aplicações profissionais",
    level: "Intermediário",
    category: "Frontend",
    duration: "3 meses",
    courses: 6,
    students: 2890,
    rating: 4.9,
    thumbnail: "react-path",
    instructor: "Ana Silva",
    instructorAvatar: "AS",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    skills: ["Componentes", "Hooks", "Performance", "Testing"],
    isNew: true,
    price: 599.90,
    originalPrice: 899.90,
    completionRate: 89
  },
  {
    id: 4,
    title: "DevOps e Cloud Computing",
    description: "Aprenda a automatizar deploys, gerenciar infraestrutura e trabalhar com AWS",
    level: "Avançado",
    category: "DevOps",
    duration: "5 meses",
    courses: 10,
    students: 1876,
    rating: 4.7,
    thumbnail: "devops-path",
    instructor: "Pedro Oliveira",
    instructorAvatar: "PO",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    skills: ["Containers", "Orquestração", "Monitoramento", "Segurança"],
    price: 999.90,
    originalPrice: 1499.90,
    completionRate: 84,
    progress: 15,
    totalCourses: 10,
    completedCourses: 2,
    estimatedCompletion: "4 meses"
  }
]

// CONQUISTAS PADRONIZADAS
export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Primeira Conquista",
    description: "Completou seu primeiro curso",
    icon: "trophy",
    earnedAt: "2025-05-15",
    category: "Marcos",
    points: 100
  },
  {
    id: 2,
    title: "Sequência de 7 Dias",
    description: "Estudou por 7 dias consecutivos",
    icon: "flame",
    earnedAt: "2025-06-02",
    category: "Consistência",
    points: 150
  },
  {
    id: 3,
    title: "Especialista Frontend",
    description: "Completou 3 cursos de Frontend",
    icon: "code",
    earnedAt: "2025-06-01",
    category: "Especialização",
    points: 200
  },
  {
    id: 4,
    title: "Colecionador de Certificados",
    description: "Conquistou 2 certificados",
    icon: "award",
    earnedAt: "2025-05-28",
    category: "Marcos",
    points: 250
  },
  {
    id: 5,
    title: "Dedicação Total",
    description: "Estudou por mais de 50 horas",
    icon: "clock",
    earnedAt: "2025-05-30",
    category: "Tempo",
    points: 300
  }
]

// ATIVIDADES PADRONIZADAS
export const activities: Activity[] = [
  {
    id: 1,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Context API com TypeScript",
    timestamp: "2025-06-04T16:30:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 2,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Hooks Avançados em React",
    timestamp: "2025-06-04T15:45:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 3,
    type: 'achievement_earned',
    title: "Conquista desbloqueada",
    description: "Sequência de 7 Dias",
    timestamp: "2025-06-02T09:15:00",
    icon: "trophy",
    points: 150
  },
  {
    id: 4,
    type: 'lesson_completed',
    title: "Aula concluída",
    description: "Docker Compose na Prática",
    timestamp: "2025-06-02T14:20:00",
    icon: "check-circle",
    points: 10
  },
  {
    id: 5,
    type: 'course_completed',
    title: "Curso concluído",
    description: "Python para Data Science",
    timestamp: "2025-05-28T14:20:00",
    icon: "book-open",
    points: 500
  },
  {
    id: 6,
    type: 'achievement_earned',
    title: "Conquista desbloqueada",
    description: "Colecionador de Certificados",
    timestamp: "2025-05-28T14:25:00",
    icon: "trophy",
    points: 250
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
