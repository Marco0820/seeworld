"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Video, Image as ImageIcon, Calendar, Clock, MoreVertical, Play } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  type: 'video' | 'image';
  thumbnail: string;
  createdAt: string;
  duration?: string;
  status: 'completed' | 'processing' | 'failed';
}

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'videos' | 'images'>('all');

  useEffect(() => {
    // Simulate fetching user project data
    const fetchProjects = async () => {
      setLoading(true);
      // This should be actual API call
      // const response = await fetch('/api/projects');
      // const data = await response.json();
      
      // Mock data - can be set to empty array to test empty state
      const mockProjects: Project[] = [
        // Uncomment the data below to test state with projects
        /*
        {
          id: '1',
          title: 'AI Generated Landscape',
          type: 'video',
          thumbnail: '/api/placeholder/300/200',
          createdAt: '2024-01-15',
          duration: '0:30',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Portrait Enhancement',
          type: 'image',
          thumbnail: '/api/placeholder/300/200',
          createdAt: '2024-01-14',
          status: 'completed'
        }
        */
      ];
      
      setProjects(mockProjects);
      setLoading(false);
    };

    if (user) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [user]);

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'videos') return project.type === 'video';
    if (selectedTab === 'images') return project.type === 'image';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Creations</h1>
              <p className="text-gray-400">Manage and organize your AI-generated content</p>
            </div>
            <Link href="/studio">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                + Create New
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 w-fit">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'all'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedTab('videos')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'videos'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedTab('images')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'images'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Images
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              {/* Retro TV Icon */}
              <div className="relative mx-auto mb-6">
                <div className="w-64 h-48 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl border-4 border-gray-600 shadow-2xl">
                  {/* Screen */}
                  <div className="m-4 h-32 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900"></div>
                    <div className="relative z-10 text-6xl">🦝</div>
                    {/* Scan lines effect */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="h-0.5 bg-gray-500 mb-4"
                          style={{ marginTop: `${i * 16}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-1 bg-gray-500 rounded"></div>
                      <div className="w-8 h-1 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Antenna */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-8 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Oops! It looks like you haven't created anything yet.
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Start your creative journey by generating your first AI video or image. 
              Let your imagination come to life!
            </p>
            
            <Link href="/studio">
              <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-lg font-medium text-lg">
                Create Video Now
              </Button>
            </Link>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.type === 'video' ? (
                      <Video className="w-12 h-12 text-gray-600" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-600" />
                    )}
                  </div>
                  
                  {/* Play button for videos */}
                  {project.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Status indicator */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  {/* More options */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70">
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate">{project.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    {project.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}