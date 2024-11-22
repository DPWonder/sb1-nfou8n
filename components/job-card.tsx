"use client";

import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, DollarSign, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  tags: string[];
  postedAt: string;
  applicationUrl: string;
}

export function JobCard({
  id,
  title,
  company,
  companyLogo,
  location,
  salary,
  type,
  description,
  tags,
  postedAt,
  applicationUrl
}: JobCardProps) {
  const { toast } = useToast();

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!applicationUrl) {
      toast({
        title: "Error",
        description: "Application URL not available. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    // Open in new tab with security best practices
    window.open(applicationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-primary/10">
              {companyLogo ? (
                <div className="relative h-full w-full">
                  <Image
                    src={companyLogo}
                    alt={`${company} logo`}
                    fill
                    className="object-contain p-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex h-full w-full items-center justify-center"><svg class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg></div>';
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          <Button onClick={handleApply} className="shrink-0">
            <ExternalLink className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-primary" />
            {salary}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {formatDistanceToNow(new Date(postedAt), { addSuffix: true })}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}