export const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export const marqueeItems = [
  'AI / ML Engineering',
  'Team Leadership',
  'Enterprise Java',
  'Spring Boot',
];

export const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
];

export const experience = [
  {
    company: 'M2P Fintech',
    role: 'Senior Engineering Manager',
    duration: '2025 — Present',
    achievements: [
      'Leading the development of AI-powered developer tools and productivity solutions in the Org',
      'Managing teams working on GitHub Copilot integration and custom LLM implementations',
      'Architecting enterprise-scale Credit Card applications with Spring Boot and Cloud technologies',
    ],
  },
  {
    company: 'M2P Fintech',
    role: 'Technical Lead',
    duration: '2017 — 2025',
    achievements: [
      'Led the development of Credit Card stack',
      'Lead the development of Debit Card stack',
      'Scaled company from 10+ to 3000+',
      'Built multiple 0-1 and 1-100 products',
    ],
  },
  {
    company: 'IBM',
    role: 'Associate Software Engineer',
    duration: '2015 — 2016',
    achievements: ['Contributed to Citizens bank, ALDO, National Bank of Canada'],
  },
];

export const projects = [
  {
    title: 'Tiny LLM',
    description:
      'A lightweight local LLM implementation using Ollama, optimized for development environments. Features custom model fine-tuning, efficient vector storage with Postgres, and a streamlined API for seamless integration.',
    tech: ['Python', 'Ollama', 'Postgres'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Code Review MCP Server',
    description:
      'An enterprise-grade Model Context Protocol server for automated code reviews, leveraging Spring Boot for robust performance and scalability. Implements advanced code analysis and review automation.',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Kubernetes'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'AI Knowledge Assistant',
    description:
      'A sophisticated AI-powered knowledge management system built with Spring AI. Integrates Claude and AWS Bedrock for advanced natural language processing, with vector embeddings for efficient information retrieval and contextual understanding.',
    tech: ['Claude', 'Bedrock', 'Vector Embedding', 'Spring AI', 'Spring Boot'],
    githubUrl: '#',
    demoUrl: '#',
  },
];

export const skillGroups = [
  {
    category: 'Backend & Cloud',
    items: ['Java', 'Spring Boot', 'Spring Cloud', 'Spring AI'],
  },
  {
    category: 'DevOps & CI/CD',
    items: ['Kubernetes', 'ArgoCD', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Prometheus', 'Grafana', 'Docker'],
  },
];

export const contactInfo = {
  email: 'chocoobar.dev@gmail.com',
  location: 'Chennai, India',
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/chocoobar', icon: 'github' as const },
  { label: 'LinkedIn', href: 'https://in.linkedin.com/in/narenviswa', icon: 'linkedin' as const },
  { label: 'X (Twitter)', href: 'https://x.com/narenviswa', icon: 'twitter' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/narenviswa', icon: 'instagram' as const },
];
