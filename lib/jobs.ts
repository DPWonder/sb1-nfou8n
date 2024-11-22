import { Job } from '@/lib/types';
import { addDays } from 'date-fns';

// Helper to generate realistic dates for sample data
const getRecentDate = (daysAgo: number) => 
  new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

export const SAMPLE_JOBS: Job[] = [
  {
    id: "yc-1",
    title: "Senior Machine Learning Engineer",
    company: "Anthropic",
    companyLogo: "https://logo.clearbit.com/anthropic.com",
    location: "San Francisco, CA",
    salary: {
      min: 200000,
      max: 350000,
      currency: "USD"
    },
    type: "full-time",
    description: "Join our team to advance AI alignment research and development. Work on large language models, safety mechanisms, and core ML infrastructure.",
    requirements: ["5+ years ML experience", "Strong background in deep learning", "Python expertise"],
    skills: ["PyTorch", "ML Systems", "Python", "LLMs", "AI Alignment"],
    experienceLevel: "senior",
    postedAt: getRecentDate(2),
    applicationUrl: "https://jobs.ashbyhq.com/anthropic/79df5290-d51d-4345-9c69-3f23c4d07ff2",
    views: 342,
    expiresAt: addDays(new Date(), 30).toISOString()
  },
  {
    id: "yc-2",
    title: "AI Research Engineer",
    company: "Cohere",
    companyLogo: "https://logo.clearbit.com/cohere.ai",
    location: "Remote",
    salary: {
      min: 180000,
      max: 300000,
      currency: "USD"
    },
    type: "full-time",
    description: "Join Cohere to work on next-generation language models. Focus on model architecture, training infrastructure, and pushing the boundaries of NLP.",
    requirements: ["PhD or equivalent experience in ML/AI", "Publication track record", "Strong coding skills"],
    skills: ["PyTorch", "Transformers", "Python", "Research", "NLP"],
    experienceLevel: "senior",
    postedAt: getRecentDate(1),
    applicationUrl: "https://jobs.lever.co/cohere/5b9fb5d3-b961-4d84-a8c3-aa1c23f3d35b",
    views: 289,
    expiresAt: addDays(new Date(), 29).toISOString()
  },
  {
    id: "yc-3",
    title: "Senior Software Engineer - AI Infrastructure",
    company: "Scale AI",
    companyLogo: "https://logo.clearbit.com/scale.com",
    location: "San Francisco, CA",
    salary: {
      min: 190000,
      max: 320000,
      currency: "USD"
    },
    type: "full-time",
    description: "Build the infrastructure powering AI development at Scale. Work on distributed systems, ML pipelines, and data processing at scale.",
    requirements: ["5+ years software engineering experience", "Distributed systems expertise", "Strong systems design skills"],
    skills: ["Python", "Kubernetes", "ML Ops", "Distributed Systems", "AWS"],
    experienceLevel: "senior",
    postedAt: getRecentDate(3),
    applicationUrl: "https://scale.com/careers/4891809004",
    views: 245,
    expiresAt: addDays(new Date(), 28).toISOString()
  },
  {
    id: "yc-4",
    title: "Machine Learning Engineer - Foundation Models",
    company: "Weights & Biases",
    companyLogo: "https://logo.clearbit.com/wandb.com",
    location: "Remote",
    salary: {
      min: 170000,
      max: 280000,
      currency: "USD"
    },
    type: "full-time",
    description: "Join W&B to build the future of ML experiment tracking and model management. Work on large-scale ML infrastructure and developer tools.",
    requirements: ["3+ years ML engineering experience", "Experience with ML frameworks", "Strong Python skills"],
    skills: ["PyTorch", "TensorFlow", "MLOps", "Python", "Distributed Training"],
    experienceLevel: "mid",
    postedAt: getRecentDate(4),
    applicationUrl: "https://boards.greenhouse.io/wandb/jobs/4899477004",
    views: 198,
    expiresAt: addDays(new Date(), 27).toISOString()
  }
];