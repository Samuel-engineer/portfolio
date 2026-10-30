// ✏️ ALL THE CONTENT TO PERSONALISE LIVES HERE.
export const profile = {
  name: 'Samuel Tan',
  role: 'AI/ML Engineer · GenAI · multi-agent systems · MLOps',
  tagline: 'I build agents that cooperate, on infrastructure that holds up.',
  intro: 'Generative AI, multi-agent systems and MLOps: connecting what intelligent systems can do with the discipline it takes to run them for real.',
  motto: 'Intelligence, built to work together.',
  github: 'https://github.com/Samuel-engineer',
  linkedin: 'https://www.linkedin.com/in/samuelb-tan',
  aboutTitle: 'Curiosity, with an operational mindset.',
  aboutLead: "I'm interested in what happens when intelligence stops being a single model and starts becoming a system.",
  about: [
    "I'm Samuel, an AI/ML engineer from EFREI Paris (Big Data & Machine Learning major). My path started in Côte d'Ivoire, with an honourable mention at the Pan-African Mathematics Olympiad and two years of MPSI/MP* preparatory classes at INP-HB Yamoussoukro.",
    'I specialise in generative AI, multi-agent systems and MLOps. I like the moment when several specialised agents (a researcher, an analyst, a writer) start working together and produce something none of them could alone.',
    "Through an AI engineering work-study at SNCF Voyageurs and an internship at InnovQube, I learned to scope real needs, prototype fast and design for real constraints: latency, connectivity, integration. I'm interested in how data and agentic AI transform companies, and in taking those solutions to production.",
  ],
}

// Shown under the About text, one per column.
export const principles = [
  { title: 'Cooperation over complexity', text: 'Clear roles, shared context and explicit handoffs.' },
  { title: 'Evidence over intuition', text: 'Evaluation belongs in the loop, not at the end.' },
  { title: 'Reliability by design', text: 'Observable, reproducible and ready for change.' },
]

// `group` is shown inside the agent nodes of the skills map: keep it short.
// `icon` is a key of components/Icon.jsx.
export const skills = [
  {
    group: 'Agents', icon: 'workflow', tagline: 'Design the cooperation.',
    desc: 'Retrieval, tool calling and crews of specialised agents with clear roles and handoffs.',
    items: ['RAG, LangChain, CrewAI', 'Hugging Face, Ollama', 'Tool calling'],
  },
  {
    group: 'ML / DL', icon: 'sparkles', tagline: 'Train what the problem needs.',
    desc: 'Classical ML and deep learning, from tabular models to speech pipelines.',
    items: ['PyTorch', 'Scikit-Learn', 'Speech: Whisper, Piper'],
  },
  {
    group: 'MLOps', icon: 'layers', tagline: 'Keep it dependable.',
    desc: 'Tracked experiments, packaged models and pipelines that redeploy the same way every time.',
    items: ['MLflow, Prefect', 'Docker, Git, CI/CD', 'AWS CDK'],
  },
  {
    group: 'Backend', icon: 'server', tagline: 'Serve it properly.',
    desc: 'APIs and data layers that put models behind clean, testable interfaces.',
    items: ['Python, FastAPI', 'PostgreSQL', 'Linux'],
  },
  {
    group: 'Cloud', icon: 'cloud', tagline: 'Run it where it lives.',
    desc: 'Managed AI services and infrastructure as code on AWS and Azure.',
    items: ['AWS (Bedrock, Lambda, S3, Amplify)', 'Azure (AI Foundry)'],
  },
]

// The first project is featured: full width, with the larger `diagram`.
// The others show `flow` as a three-step sketch. `kind` is the small label
// under the title, `question` the problem the project had to answer.
export const projects = [
  {
    name: 'Train dashboard voice assistant',
    kind: 'SNCF Voyageurs · work-study',
    desc: 'PoC of an on-board voice assistant that opens train dashboard features by voice. Local-first architecture designed for latency and connectivity constraints of rail environments.',
    question: 'How fast must an on-board assistant answer to feel instant?',
    diagram: {
      caption: 'On board / local-first',
      hub: 'Train dashboard features',
      nodes: ['Whisper · listen', 'Ministral · decide', 'Piper · answer'],
      note: 'Runs locally. Built for weak connectivity.',
    },
    tags: ['Edge AI', 'Ollama (Ministral 3-8B)', 'Whisper Turbo', 'Piper', 'Tool calling'], link: '',
  },
  {
    name: 'Market Research Studio',
    kind: 'Multi-agent assistant',
    desc: 'Market intelligence assistant: Researcher, Analyst and Writer agents orchestrate web search, analysis and report writing.',
    question: 'What makes a handoff between agents clear enough to trust?',
    flow: { caption: 'Brief → report', steps: ['Researcher', 'Analyst', 'Writer'] },
    tags: ['CrewAI', 'Azure AI Foundry', 'GPT-4o', 'Serper API', 'Streamlit'], link: '',
  },
  {
    name: 'Predictive maintenance MLOps pipeline',
    kind: 'End-to-end MLOps',
    desc: 'Pipeline for industrial predictive maintenance: MLflow tracking, Docker packaging, FastAPI serving and a React UI.',
    question: 'How do we ship a model without losing confidence?',
    flow: { caption: 'Experiment → operation', steps: ['Track', 'Package', 'Serve'] },
    tags: ['PyTorch', 'Scikit-Learn', 'MLflow', 'Docker', 'FastAPI'], link: '',
  },
  {
    name: 'GenAI / RAG prototype for a SaaS',
    kind: 'InnovQube · internship',
    desc: 'RAG prototype giving users access to business information inside the SaaS, with automated API data collection and ingestion.',
    question: 'How do we make an answer worth trusting?',
    flow: { caption: 'Context → evidence', steps: ['Ingest', 'Retrieve', 'Answer'] },
    tags: ['LangChain', 'RAG', 'FastAPI', 'WebSockets', 'Prefect', 'PostgreSQL'], link: '',
  },
  {
    name: 'This portfolio',
    kind: 'Infrastructure as code',
    desc: 'React + GSAP + WebGL globe, deployed on AWS Amplify Hosting from a private S3 bucket. Infrastructure as code with AWS CDK, CI/CD with GitHub Actions.',
    flow: { caption: 'Commit → cloud', steps: ['Build', 'CDK deploy', 'Amplify'] },
    tags: ['AWS Amplify', 'S3', 'CDK', 'GitHub Actions', 'WebGL'], link: '',
  },
]

export const achievements = [
  'Microsoft Certified: Azure Data Scientist Associate (DP-100)',
  'Microsoft Certified: Azure AI Fundamentals (AI-900)',
  'Preparing: AWS Certified Generative AI Developer – Professional',
  'Honourable mention, Pan-African Mathematics Olympiad (PAMO 2021)',
  'English B2 (TOEIC 840) · French',
]

// 🌍 Places of the journey shown on the globe, joined by arcs in this order. location = [lat, lon].
export const places = [
  { label: 'Yamoussoukro', location: [6.8276, -5.2893] },
  { label: 'Paris', location: [48.7922, 2.3634] },
  { label: 'Kuala Lumpur', location: [3.139, 101.6869] },
  { label: 'Le Mans', location: [48.0061, 0.1996] },
]

// ⭐ Star map: stars must be linked IN THE ORDER of the journey.
// x and y are % of the map. The secret below is revealed at the end.
export const stars = [
  { label: 'Math olympiad', year: '2021', x: 12, y: 70 },
  { label: 'MP* in Yamoussoukro', year: '2021', x: 26, y: 40 },
  { label: 'EFREI Paris', year: '2023', x: 42, y: 62 },
  { label: 'First RAG', year: '2025', x: 55, y: 28 },
  { label: 'Voice AI on trains', year: '2025', x: 70, y: 55 },
  { label: 'First agent crew', year: '2026', x: 84, y: 24 },
  { label: 'This hackathon', year: '2026', x: 90, y: 74 },
]
export const secret = {
  title: 'Signal decoded: the constellation of my journey',
  text: "From a math olympiad in Côte d'Ivoire to Paris, Kuala Lumpur and AI on board French trains: every star is a real step, and every arc on the globe a real trip. Off-screen I play guitar, and I see multi-agent systems the same way as a band: each part has its role, and the magic is in how they listen to each other.",
}
