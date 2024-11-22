import { Job } from '@/lib/types';
import { AI_COMPANY_KEYWORDS, ENGINEERING_ROLE_KEYWORDS } from '@/lib/constants';
import { SAMPLE_JOBS } from '@/lib/jobs';

// Cache jobs in memory
let jobsCache: Job[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchYCJobs(): Promise<{ jobs: Job[], source: string }> {
  try {
    // Check if cache is still valid
    if (jobsCache.length > 0 && Date.now() - lastFetchTime < CACHE_DURATION) {
      console.log('Using cached YC jobs data');
      return { jobs: jobsCache, source: 'cache' };
    }

    // In a production environment, you would implement the actual API call here
    // For now, we'll use the sample data
    console.log('Using sample jobs as fallback');
    jobsCache = SAMPLE_JOBS;
    lastFetchTime = Date.now();

    return { jobs: jobsCache, source: 'sample' };
  } catch (error) {
    console.error('Error fetching YC jobs:', error);
    return { jobs: SAMPLE_JOBS, source: 'fallback' };
  }
}

// Helper function to determine if a job is from an AI company
export function isAICompany(description: string, tags: string[]): boolean {
  const text = description.toLowerCase();
  return AI_COMPANY_KEYWORDS.some(keyword => 
    text.includes(keyword.toLowerCase()) || 
    tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
  );
}

// Helper function to determine if a role is engineering focused
export function isEngineeringRole(title: string): boolean {
  const titleLower = title.toLowerCase();
  return ENGINEERING_ROLE_KEYWORDS.some(keyword => 
    titleLower.includes(keyword.toLowerCase())
  );
}

// Helper function to extract requirements from description
export function extractRequirements(description: string): string[] {
  const requirements: string[] = [];
  const lines = description.split('\n');
  
  let inRequirements = false;
  for (const line of lines) {
    if (line.toLowerCase().includes('requirements') || 
        line.toLowerCase().includes('qualifications')) {
      inRequirements = true;
      continue;
    }
    
    if (inRequirements && line.trim().startsWith('-')) {
      requirements.push(line.trim().slice(1).trim());
    }
  }
  
  return requirements;
}

// Helper function to extract skills from description and tags
export function extractSkills(description: string): string[] {
  const commonSkills = [
    'python', 'javascript', 'typescript', 'react', 'node.js', 
    'pytorch', 'tensorflow', 'aws', 'kubernetes', 'docker'
  ];
  
  const skills = new Set<string>();
  const text = description.toLowerCase();
  
  commonSkills.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      skills.add(skill);
    }
  });
  
  return Array.from(skills);
}

// Helper function to determine experience level
export function determineExperienceLevel(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('senior') || text.includes('sr.') || text.includes('lead')) {
    return 'senior';
  } else if (text.includes('junior') || text.includes('jr.') || text.includes('entry')) {
    return 'entry';
  } else {
    return 'mid';
  }
}