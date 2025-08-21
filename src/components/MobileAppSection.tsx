"use client";

export default function MobileAppSection() {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-black py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Your Generation<br />
                on the Go
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Create AI videos and images anywhere with our mobile app. 
                All the power of Pollo AI in your pocket - generate, edit, 
                and share your creations on the move.
              </p>
              
              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-3 bg-black rounded-lg px-6 py-3 cursor-pointer hover:bg-gray-900 transition-colors">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-black rounded-lg px-6 py-3 cursor-pointer hover:bg-gray-900 transition-colors">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-white font-semibold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-4 border-8 border-gray-800 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 bg-gray-900">
                    <div className="text-white text-sm">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <h3 className="text-white text-lg font-bold">Pollo AI</h3>
                      <p className="text-gray-400 text-sm">Create on the go</p>
                    </div>
                    
                    {/* Video Preview */}
                    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
                      <div className="h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <div className="text-white text-2xl">🎬</div>
                      </div>
                      <div className="text-white text-sm">Generated Video</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
                        Create Video
                      </button>
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium">
                        Create Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="absolute -right-20 top-20 bg-white p-4 rounded-lg shadow-lg">
                <div className="w-24 h-24 bg-black flex items-center justify-center text-white text-xs">
                  QR CODE
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">Scan to download</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
