import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Mail, Zap, ExternalLink, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function RetailstarAppHome() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has already submitted
  useEffect(() => {
    const submitted = localStorage.getItem("retailstar_waitlist_submitted");
    if (submitted) {
      setIsSubmitted(true);
    }
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store submission
    localStorage.setItem("retailstar_waitlist_submitted", "true");
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className={`min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 animate-pulse"></div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Logo/Brand section */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/25">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Retailstar
          </h1>
          <p className="text-lg text-muted-foreground mb-2">App</p>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            Your gateway to Solana's dopest domain storefronts
          </p>
        </div>

        {/* Marketplace Link */}
        <div className="mb-6 animate-fade-in">
          <Link
            to="/marketplace"
            className="inline-block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-purple-500/20 text-lg transition-all duration-200 hover:scale-105 text-center"
          >
            🛒 Enter Marketplace
          </Link>
        </div>

        {/* Waitlist Card */}
        <Card className="bg-zinc-900/90 border border-zinc-700/50 rounded-3xl backdrop-blur-sm shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="py-8 px-6">
            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🚀 Join the Waitlist
                </h2>
                <p className="text-sm mb-6 text-muted-foreground leading-relaxed">
                  Be the first to access our mobile dashboard, claim exclusive drops, and unlock the future of digital storefronts.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="you@solanafam.xyz"
                      value={email}
                      onChange={handleEmailChange}
                      className="bg-zinc-800/80 border-zinc-600 text-white placeholder:text-zinc-400 rounded-xl h-12 px-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl h-12 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Joining...
                      </div>
                    ) : (
                      "Notify Me"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-green-400">
                  You're In! 🎉
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll notify you as soon as the app drops. Get ready to claim your digital destiny.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Desktop site link */}
        <div className="mt-8 text-sm text-muted-foreground/80">
          <p className="mb-2">Or explore the full experience at</p>
          <a 
            href="https://retailstar.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors duration-200 underline decoration-purple-400/50 hover:decoration-purple-400"
          >
            retailstar.xyz
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-muted-foreground/60 text-center px-4">
        <p className="mb-1">Built for the culture • Powered by Solana ⚡</p>
        <p className="text-[10px]">Cyberpunk vibes only</p>
      </footer>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
} 