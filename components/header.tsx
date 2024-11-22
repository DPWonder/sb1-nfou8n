"use client";

import { Search, MapPin, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { toast } = useToast();

  const handlePostJob = () => {
    toast({
      title: "Coming Soon!",
      description: "Job posting functionality will be available soon. Stay tuned!",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">AIJobHub</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 md:gap-6">
          <form className="flex-1 md:flex-initial" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </form>
          <Button variant="outline" size="icon" className="ml-auto md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">All Locations</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem value="remote">Remote</DropdownMenuItem>
                  <DropdownMenuItem value="us">United States</DropdownMenuItem>
                  <DropdownMenuItem value="europe">Europe</DropdownMenuItem>
                  <DropdownMenuItem value="asia">Asia</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button onClick={handlePostJob}>
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </div>
        </div>
      </div>
      <div className="container px-4 py-2 text-sm text-muted-foreground">
        <p>Connecting AI Talent with the World's Best Companies</p>
      </div>
    </header>
  );
}