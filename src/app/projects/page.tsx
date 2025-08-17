import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-14 px-4 mx-auto max-w-5xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black">My Projects</h1>
        <Link href="/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 p-6 text-gray-600">
        No projects yet. Click "New Project" in the top right to get started.
      </div>
      </main>
    </div>
  );
}
