"use client";

import { Button } from "@/components/ui/button";

export default function UsersSection() {
  // Mock user avatars
  const userAvatars = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=100&h=100&fit=crop&crop=face`
  }));

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-16">
          {/* Main Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join <span className="text-blue-400">10M+</span> Users Using Pollo AI to<br />
              Create and Inspire
            </h2>
            
            {/* User Avatars */}
            <div className="flex justify-center">
              <div className="flex -space-x-2">
                {userAvatars.map((user) => (
                  <div 
                    key={user.id}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-black flex items-center justify-center text-white font-bold"
                  >
                    {user.id}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
