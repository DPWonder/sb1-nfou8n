"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { JobFilters as JobFiltersType } from "@/lib/types";

interface JobFiltersProps {
  filters: JobFiltersType;
  setFilters: (filters: JobFiltersType) => void;
  onReset: () => void;
}

export function JobFilters({ filters, setFilters, onReset }: JobFiltersProps) {
  const handleSkillAdd = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({ ...filters, skills: [...filters.skills, skill] });
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Job Type</h3>
        <div className="space-y-2">
          {["full-time", "part-time", "contract", "remote"].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={type}
                checked={filters.jobType.includes(type)}
                onChange={(e) => {
                  const updatedTypes = e.target.checked
                    ? [...filters.jobType, type]
                    : filters.jobType.filter((t) => t !== type);
                  setFilters({ ...filters, jobType: updatedTypes });
                }}
                className="mr-2"
              />
              <Label htmlFor={type} className="capitalize">
                {type.replace("-", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Experience Level</h3>
        <Select
          value={filters.experienceLevel[0] || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, experienceLevel: value === "all" ? [] : [value] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="entry">Entry Level</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="senior">Senior Level</SelectItem>
            <SelectItem value="lead">Lead / Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Salary Range</h3>
        <div className="space-y-4">
          <Slider
            value={filters.salaryRange}
            max={300000}
            min={0}
            step={10000}
            onValueChange={(value) =>
              setFilters({ ...filters, salaryRange: value as [number, number] })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.salaryRange[0].toLocaleString()}</span>
            <span>${filters.salaryRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Skills</h3>
        <div className="space-y-4">
          <Input
            placeholder="Add a skill (e.g., Python, ML)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSkillAdd((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {filters.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleSkillRemove(skill)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button 
        className="w-full" 
        variant="outline"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}