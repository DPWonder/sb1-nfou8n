"use client";

import { useState } from "react";
import { JobCard } from "@/components/job-card";
import { JobFilters } from "@/components/job-filters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SAMPLE_JOBS = [
  {
    id: "1",
    title: "Senior Machine Learning Engineer",
    company: "Anthropic",
    location: "San Francisco, CA",
    salary: {
      min: 200000,
      max: 350000,
      currency: "USD"
    },
    type: "Full-time",
    description: "Join Anthropic's core ML team to develop and improve large language models. Work on cutting-edge AI alignment and safety challenges.",
    skills: ["PyTorch", "ML Systems", "Python", "Distributed Computing"],
    postedAt: "2024-02-10",
    applicationUrl: "https://anthropic.com/careers"
  },
  {
    id: "2",
    title: "AI Software Engineer",
    company: "Scale AI",
    location: "Remote",
    salary: {
      min: 150000,
      max: 250000,
      currency: "USD"
    },
    type: "Full-time",
    description: "Build the data engine powering AI development. Work on Scale's core infrastructure for autonomous vehicles and language models.",
    skills: ["Python", "Kubernetes", "ML Ops", "AWS"],
    postedAt: "2024-02-09",
    applicationUrl: "https://scale.com/careers"
  },
  {
    id: "3",
    title: "Full Stack Engineer - AI Platform",
    company: "Jasper",
    location: "Remote",
    salary: {
      min: 140000,
      max: 220000,
      currency: "USD"
    },
    type: "Full-time",
    description: "Build the future of AI-powered content creation. Develop Jasper's core platform features and AI integrations.",
    skills: ["React", "Node.js", "TypeScript", "AI Integration"],
    postedAt: "2024-02-08",
    applicationUrl: "https://jasper.ai/careers"
  }
];

export function JobBoard() {
  const [filters, setFilters] = useState({
    search: "",
    jobType: [] as string[],
    experienceLevel: [] as string[],
    location: "",
    salaryRange: [0, 300000] as [number, number],
    skills: [] as string[]
  });
  const [sortBy, setSortBy] = useState("recent");

  // Filter jobs based on current filters
  const filteredJobs = SAMPLE_JOBS.filter(job => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!job.title.toLowerCase().includes(searchLower) &&
          !job.company.toLowerCase().includes(searchLower) &&
          !job.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.skills.length > 0 && !filters.skills.some(skill => 
      job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
    )) {
      return false;
    }

    return true;
  });

  // Sort jobs based on selected sorting option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "salary-high":
        return b.salary.max - a.salary.max;
      case "salary-low":
        return a.salary.min - b.salary.min;
      case "recent":
      default:
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    }
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
      <aside className="hidden md:block">
        <JobFilters filters={filters} setFilters={setFilters} />
      </aside>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured AI Jobs</h2>
            <p className="text-sm text-muted-foreground">
              Showing {sortedJobs.length} jobs matching your criteria
            </p>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary-high">Highest Salary</SelectItem>
              <SelectItem value="salary-low">Lowest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={`${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`}
              type={job.type}
              description={job.description}
              tags={job.skills}
              postedAt={job.postedAt}
              applicationUrl={job.applicationUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}