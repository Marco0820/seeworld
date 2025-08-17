"use client";

import { Card } from "@/components/ui/card";
import { Play, Eye } from "lucide-react";
import Image from "next/image";

const useCases = [
  {
    title: "A quick story about Jesus' life in one minute",
    image: "https://ext.same-assets.com/1560300687/135780542.jpeg",
    category: "Religious Content"
  },
  {
    title: "Humorous and creative Starbucks advertisement",
    image: "https://ext.same-assets.com/1560300687/2560346949.jpeg",
    category: "Advertisement"
  },
  {
    title: "The Fishing Vlog of a Gorilla Adventurer",
    image: "https://ext.same-assets.com/1560300687/3139446703.jpeg",
    category: "Entertainment"
  },
  {
    title: "Working Diary of a Cute Pink Pig",
    image: "https://ext.same-assets.com/1560300687/2005767087.jpeg",
    category: "Animation"
  },
  {
    title: "A pixel art style short video of a Japanese girl working at a convenience store",
    image: "https://ext.same-assets.com/1560300687/1543299049.jpeg",
    category: "Pixel Art"
  },
  {
    title: "Funny commercial for Estée Lauder's Advanced Night Repair (Little Brown Bottle)",
    image: "https://ext.same-assets.com/1560300687/3226886278.jpeg",
    category: "Beauty Commercial"
  },
  {
    title: "Bond between technology and emotion",
    image: "https://ext.same-assets.com/1560300687/390608527.jpeg",
    category: "Conceptual"
  },
  {
    title: "A suspenseful short drama about cosmetic surgery",
    image: "https://ext.same-assets.com/1560300687/596805921.jpeg",
    category: "Drama"
  }
];

export default function UseCases() {
  return (
    <section id="use-cases" className="px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Use Cases
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            By viewing replays of cases, you can understand the tasks that SeeWorld can currently help you accomplish.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs">
                    {useCase.category}
                  </span>
                </div>

                {/* View Count */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-white text-xs">{100 + (index * 47) + 23}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-medium text-sm leading-tight line-clamp-3">
                  {useCase.title}
                </h3>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-white/10 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full"
                    style={{ width: `${30 + (index * 7) % 60}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                  <span>AI Generated</span>
                  <span>{30 + (index * 13) % 90}s</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-sm">
            View More Examples
          </button>
        </div>
      </div>
    </section>
  );
}
