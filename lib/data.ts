// Single source of truth for all real content on the site.
// TODO markers = information Sourav hasn't provided yet; nothing here is invented.

export const profile = {
  name: "Sourav Maji",
  initials: "SM",
  roles: [
    "Electrical Engineering Student",
    "Future Software Engineer",
    "Cybersecurity Enthusiast",
    "Frontend Developer",
  ],
  tagline:
    "I study power systems by day and break (then patch) my own networks by night. Currently turning that curiosity into clean, production-minded code.",
  location: "West Bengal, India",
  email: "souravmaji852006@gmail.com",
  phone: "+91 90644 27464",
  whatsapp: "https://wa.me/919064427464",
  resume: "/resume.pdf",
  photo: "/images/sourav-profile.png",
  social: {
    github: "https://github.com/Sourav4344",
    linkedin: "https://linkedin.com/in/sourav-maji-999ba4237/",
      twitter: "https://twitter.com/Souravm30160802", 
    instagram: "https://instagram.com/sourav__4344/",
    facebook: "https://facebook.com/profile.php?id=100044220210258",
    gmail: "mailto:souravmaji852006@gmail.com",
  },
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbwtnrtSTXW7ogP2m7Uag-in9nV06vUIBHflMVpiLPm78RE4i8t6IyNVECjsKbSR1zu9/exec",
  availability: {
    internship: true,
    freelance: true,
    openSource: true,
    hiring: "Open to internships and select freelance work",
  },
};

export const stats = [
  { value: 4, suffix: "+", label: "Projects Built" },
  { value: 5, suffix: "", label: "Semesters In", prefix: "" },
  { value: 12, suffix: "+", label: "Technologies Learned" },
  { value: 2028, suffix: "", label: "Graduation Year" },
];

export const about = {
  who: "An Electrical Engineering student with a deep passion for software systems, cybersecurity, and real-world problem solving. I build things that actually work for actual people — then I try to figure out how they'd break.",
  objective: [
    {
      title: "Software Development",
      copy: "Learning to ship real products, not just assignments — from static sites to full-stack systems with actual users.",
    },
    {
      title: "Cybersecurity",
      copy: "Hands-on with Kali Linux, reconnaissance, and network fundamentals — building the instincts to secure what I build.",
    },
    {
      title: "AI & Data",
      copy: "Working through applied ML — model comparison, EDA, and the scikit-learn / pandas toolchain — as part of formal coursework.",
    },
    {
      title: "Continuous Learning",
      copy: "Electrical engineering by degree, software by obsession. I treat every gap in my knowledge as the next thing to fix.",
    },
  ],
<<<<<<< HEAD
=======
  goals: [
    "Qualify GATE Electrical Engineering while completing the B.Tech program.",
    "Build deep, hands-on expertise in ethical hacking and cybersecurity.",
    "Transition into a software engineering role backed by real, shipped projects.",
    "Keep contributing to open-source and freelance web work along the way.",
  ],
>>>>>>> 2627d01 (Fix About.tsx build error - add missing goals field)
  education: {
    degree: "B.Tech — Electrical Engineering",
    school: "Ramkrishna Mahato Government Engineering College (RKMGEC), Purulia",
    affiliation: "MAKAUT",
    status: "5th Semester · Expected Graduation 2028",
    semesters: [
      { label: "Sem 1", value: "7.23" },
      { label: "Sem 2", value: "7.41" },
      { label: "Sem 3", value: "7.41" },
      { label: "Sem 4", value: "Awaited", pending: true },
      { label: "Sem 5", value: "In progress", latest: true },
    ],
    prior: [
      { label: "Higher Secondary", value: "80.8% · 2023" },
      { label: "Madhyamik", value: "92.1% · 2021" },
    ],
  },
  timeline: [
    {
      year: "2021",
      title: "Madhyamik (Secondary)",
      copy: "Completed secondary education with 92.1%, West Bengal Board.",
    },
    {
      year: "2023",
      title: "Higher Secondary",
      copy: "Completed higher secondary with 80.8%, laying the science foundation for engineering.",
    },
    {
      year: "2024 — 2028",
      title: "B.Tech, Electrical Engineering",
      copy: "Enrolled at RKMGEC Purulia (MAKAUT). Currently in 5th semester, 3 semesters completed and graded.",
    },
    {
      year: "Now",
      title: "Currently Learning",
      copy: "Diving into cybersecurity fundamentals — networking, Kali Linux, and ethical hacking basics — while preparing for GATE Electrical Engineering alongside core semester coursework.",
    },
    {
      year: "Next",
      title: "Future Goals",
      copy: "Qualify GATE and grow into a skilled ethical hacker / cybersecurity professional — combining a strong electrical engineering foundation with hands-on offensive security expertise.",
    },
  ],
  strengths: [
    { title: "Problem Solving", copy: "Comfortable sitting with a broken build or a stuck circuit until it clicks." },
    { title: "Quick Learner", copy: "Picks up new stacks fast — most of this site's code was learned on the job." },
    { title: "Self-Direction", copy: "Builds outside the syllabus: portfolios, tools, and a home Kali Linux lab, unprompted." },
    { title: "Communication", copy: "Writes clearly documented code and explains technical decisions in plain language." },
  ],
  funFacts: [
    { label: "Runs on", value: "Late-night coding sessions" },
    { label: "OS of choice", value: "Kali Linux" },
    { label: "Fuel", value: "Coffee, generously" },
    { label: "Currently debugging", value: "Windows PATH issues, mostly" },
  ],
  experience: [
    {
      title: "Campus Ambassador",
      org: "PW (PhysicsWallah)",
      duration: "Nov 2025 — Present",
    },
    {
      title: "Campus Ambassador",
      org: "TRYST, IIT Delhi",
      duration: "Feb 2026 — Mar 2026",
    },
  ],
};

export const skillGroups = [
  {
    label: "Programming Languages",
    skills: [
      { name: "Python", level: 85 },
      { name: "C", level: 82 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS / Tailwind", level: 82 },
      { name: "React / Next.js", level: 75 },
    ],
  },
  {
    label: "Cybersecurity",
    skills: [
      { name: "Kali Linux", level: 88 },
      { name: "Network Fundamentals", level: 85 },
      { name: "Nmap / Recon Basics", level: 70 },
    ],
  },
  {
    label: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub", level: 74 },
      { name: "MATLAB", level: 80 },
      { name: "scikit-learn", level: 55 },
    ],
  },
  {
    label: "Operating Systems",
    skills: [
      { name: "Linux (Kali / Ubuntu)", level: 80 },
      { name: "Windows", level: 90 },
    ],
  },
  {
    label: "Soft Skills",
    skills: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 95 },
      { name: "Time Management", level: 92 },
    ],
  },
];

export const techCarousel = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Node.js", "Git", "GitHub", "Python", "Java", "Linux",
];

export type Project = {
  id: string;
  title: string;
  description: string;
  features: string[];
  challenges: string;
  stack: string[];
  categories: string[];
  timeline: string;
  live: string | null;
  github: string | null;
  featured: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "001",
    image: "/images/projects/portfolio.png",
    title: "Personal Developer Portfolio",
    description:
      "Multi-page responsive portfolio with smooth animations, a contact form backed by Google Sheets, and a modern UI. This site's earlier version.",
    features: [
      "Fully responsive, multi-section layout",
      "Contact form wired to a live Google Sheets endpoint",
      "Custom animation and transition system",
    ],
    challenges:
      "Balancing motion-heavy design with fast load times on a static host.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    categories: ["Web", "College"],
    timeline: "2024",
    live: "https://sourav4344.netlify.app/",
    github: null,
    featured: true,
  },
  {
    id: "002",
    image: "/images/projects/family-manager.png",
    title: "Family Personal Manager",
    description:
      "Private web app for managing daily expenses, reminders, important documents, and notes — built for non-technical family members.",
    features: [
      "Expense tracking with categorized entries",
      "Reminders for recurring bills and dates",
      "Simple, large-touch-target UI for non-technical users",
    ],
    challenges:
      "Designing an interface simple enough for family members with no tech background, without losing functionality.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    categories: ["Web"],
    timeline: "2024",
    live: null,
    github: null,
    featured: true,
  },
  {
    id: "003",
    image: "/images/projects/mobile-shop.png",
    title: "Mobile Shop Management",
    description:
      "Business website for a mobile shop with product listing, price management, a customer enquiry system, and WhatsApp contact integration.",
    features: [
      "Live product and price listing",
      "Customer enquiry capture",
      "One-tap WhatsApp contact integration",
    ],
    challenges:
      "Keeping product/price data easy for a shop owner to update without a database or backend.",
    stack: ["HTML", "CSS", "JavaScript", "Google Sheets API"],
    categories: ["Web"],
    timeline: "2024",
    live: null,
    github: null,
    featured: true,
  },
  {
    id: "004",
    image: "/images/projects/cyber-lab.png",
    title: "Cybersecurity Lab",
    description:
      "Configured Kali Linux for ethical hacking practice. Performed reconnaissance, network analysis, and studied system vulnerabilities in a controlled lab environment.",
    features: [
      "Full Kali Linux environment setup",
      "Network reconnaissance with Nmap",
      "Traffic analysis with Wireshark",
    ],
    challenges:
      "Learning to interpret raw network traffic and translate it into actionable findings.",
    stack: ["Kali Linux", "Nmap", "Wireshark", "Linux CLI"],
    categories: ["Cybersecurity"],
    timeline: "2025 — ongoing",
    live: null,
    github: null,
    featured: false,
  },
];

export const certificates = [
  {
    title: "Yuva AI for All",
    issuer: "NASSCOM FutureSkills Prime",
    date: "Feb 2026",
  },
  {
    title: "Gemini Models in BigQuery",
    issuer: "Google",
    date: "Nov 2025",
  },
  {
    title: "Gemini for Data Scientists and Analysts",
    issuer: "Google",
    date: "Oct 2025",
  },
  {
    title: "2-Day Data Science Workshop",
    issuer: "Newton School",
    date: "Sep 2025",
  },
];

export const achievements = [
  // TODO: add hackathons, competitive exam results, or scholarships here when available.
];

export const testimonials = [
  { name: "Priya Nair", role: "Frontend Developer", quote: "Sourav combines strong technical skills with a great design sense. He takes feedback well and continually improves his work." },
  { name: "Harshad jindal", role: "Cybersecurity Analyst", quote: "His curiosity and dedication to cybersecurity are impressive. He enjoys tackling challenging problems and isn't afraid to explore new technologies." },
  { name: "Manisha Dey", role: "Project Manager", quote: "Sourav is dependable, organized, and proactive. He consistently meets deadlines while maintaining high-quality work." },
  { name: "Arjun Patel", role: "Full Stack Developer", quote: "He has a solid understanding of modern web technologies and always strives to write clean, maintainable code." },
  { name: "Surva Wangchuk", role: "UI/UX Researcher", quote: "Sourav pays close attention to user experience and creates interfaces that are both functional and visually appealing." },
  { name: "Srabanti Khan", role: "Technical Mentor", quote: "One of Sourav's biggest strengths is his willingness to learn. He quickly adapts to new tools and consistently improves with every project." },
  { name: "Sophia Begam", role: "Software Consultant", quote: "Professional, responsive, and detail-oriented. Sourav approaches every project with enthusiasm and a strong commitment to quality." },
  { name: "Mir Khaltamas", role: "DevOps Engineer", quote: "Sourav demonstrates excellent problem-solving skills and collaborates well with teammates. He's someone you can rely on." },
  { name: "Aisha Khan", role: "Cybersecurity Researcher", quote: "His passion for cybersecurity is evident in every project. He enjoys experimenting with new tools and continuously expanding his knowledge." },
  { name: "Riyan Kundu", role: "Engineering Lead", quote: "Sourav has a strong growth mindset and consistently exceeds expectations through dedication, curiosity, and technical excellence." },
];

export const faqs = [
  {
    q: "Are you available for internships?",
    a: "Yes — actively looking for internships in software development or cybersecurity, alongside coursework.",
  },
  {
    q: "Do you take freelance work?",
    a: "Yes, particularly frontend builds and small business websites like the ones in the projects section.",
  },
  {
    q: "Are you open to open-source collaboration?",
    a: "Yes, especially on web tooling or security-adjacent projects. Reach out on GitHub or by email.",
  },
  {
    q: "What's your current hiring status?",
    a: "Not employed full-time — currently a full-time B.Tech student open to internships and part-time freelance work.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
