"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Pollo AI?",
      answer: "Pollo AI is a comprehensive AI-powered platform for creating stunning videos and images. We integrate multiple leading AI models to provide you with the best creative tools in one place."
    },
    {
      question: "How can I get started with Pollo AI as a beginner?",
      answer: "Getting started is easy! Simply sign up for a free account, choose whether you want to create a video or image, and follow our intuitive interface. We provide templates and guides to help beginners create amazing content."
    },
    {
      question: "Which AI models do you use to power your video generation?",
      answer: "We integrate with leading AI models including Kling AI, Runway, Hailuo AI, Vidu AI, Luma AI, Pika AI, and many others to ensure you get the best results for your creative projects."
    },
    {
      question: "Are there any free features, or is it completely paid?",
      answer: "Pollo AI offers both free and premium features. You can start creating with our free tier, which includes basic video and image generation capabilities. Premium plans unlock advanced features and higher quality outputs."
    },
    {
      question: "How many videos can I create per day with my subscription?",
      answer: "The number of videos depends on your subscription plan. Free users get a limited number of generations per day, while premium subscribers enjoy higher limits or unlimited generations."
    },
    {
      question: "Can I use Pollo AI for commercial purposes?",
      answer: "Yes, depending on your subscription plan, you can use Pollo AI-generated content for commercial purposes. Please check our terms of service for specific usage rights."
    },
    {
      question: "What video formats do you support?",
      answer: "We support multiple video formats including MP4, MOV, and AVI. You can also choose different resolutions and aspect ratios to suit your needs."
    },
    {
      question: "How can I contact your support team?",
      answer: "You can reach our support team through multiple channels: email support, live chat on our website, or through our help center. We're here to help you create amazing content!"
    }
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Questions<br />
            and Answers
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-900/50 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
