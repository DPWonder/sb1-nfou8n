"use client";

import { Card } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function JobMetrics() {
  const { data: metrics } = useQuery({
    queryKey: ["jobMetrics"],
    queryFn: async () => {
      const response = await fetch("/api/employer/metrics");
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const cards = [
    {
      title: "Active Jobs",
      value: metrics?.activeJobs ?? 0,
      icon: Briefcase,
      trend: "+5%",
    },
    {
      title: "Total Applications",
      value: metrics?.totalApplications ?? 0,
      icon: Users,
      trend: "+12%",
    },
    {
      title: "Total Views",
      value: metrics?.totalViews ?? 0,
      icon: Eye,
      trend: "+8%",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <Card key={card.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <p className="mt-1 text-2xl font-bold">{card.value}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            {card.trend} from last month
          </div>
        </Card>
      ))}
    </>
  );
}