import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-14 min-h-[calc(100vh-3.5rem)] px-4 mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">New Project</h1>
        <Link href="/projects">
          <Button variant="secondary">Back to Projects</Button>
        </Link>
      </div>

        <div className="rounded-lg border border-gray-200 p-6 text-gray-600">
          Project creation form and wizard will be placed here (placeholder).
        </div>
      </main>
    </div>
  );
}
