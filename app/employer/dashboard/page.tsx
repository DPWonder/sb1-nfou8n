"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { JobMetrics } from "@/components/employer/job-metrics";
import { JobsList } from "@/components/employer/jobs-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your job postings and track applications
          </p>
        </div>
        <Button asChild>
          <Link href="/employer/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <JobMetrics />
      </div>

      <div className="mt-8">
        <Card>
          <JobsList />
        </Card>
      </div>
    </div>
  );
}