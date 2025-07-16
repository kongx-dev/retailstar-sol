import React, { useState } from "react";
import { Link } from "react-router-dom";
import FireflyFX from "../components/FireflyFX";

export default function UpgradePage() {
  const [formData, setFormData] = useState({
    domain: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestArtwork = () => {
    // Open Twitter DM to @retailstarsol
    window.open('https://twitter.com/messages/compose?recipient_id=retailstarsol&text=Hi! I\'d like to request custom SNS artwork for my domain.', '_blank');
  };

  const handleReserveBuildSlot = () => {
    // Open Twitter DM to @retailstarsol
    window.open('https://twitter.com/messages/compose?recipient_id=retailstarsol&text=Hi! I\'d like to reserve a build slot for my domain.', '_blank');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.domain.trim()) {
      alert("Please enter your domain name");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setFormData({ domain: "", description: "" });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-mono relative side-glow">
      <FireflyFX count={15} />
      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* HEADER */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl tracking-widest font-bold">
            🧱 /UPGRADE
          </h1>
          <p className="text-sm text-gray-400">
            Syndicate Access Point: Deployment & Enhancement Requests
          </p>
        </header>

        {/* SNS UPGRADE OFFER */}
        <section className="relative border border-gray-700 rounded-xl p-6 bg-zinc-900 shadow-inner neon-panel">
          <h2 className="text-xl font-semibold mb-2">🎨 Custom SNS Artwork</h2>
          <p className="text-sm text-gray-300 mb-4">
            Already hold the domain but missing the drip? Request a full SNS
            visual pack: profile pic, banner, and bio-ready assets.
          </p>
          <p className="text-xs text-yellow-400 mb-2">🔹 Starts at 0.3 SOL</p>
          <button 
            onClick={handleRequestArtwork}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Request Artwork
          </button>
        </section>

        {/* FIXER BUILD REQUEST */}
        <section className="relative border border-gray-700 rounded-xl p-6 bg-zinc-900 shadow-inner neon-panel">
          <h2 className="text-xl font-semibold mb-2">🛠️ Fixer Build Deployment</h2>
          <p className="text-sm text-gray-300 mb-4">
            Turn your domain into a full interactive build. Choose your tier
            (Quick Snag, Mid, or Premium) and lock your slot before prices rise.
          </p>
          <ul className="text-xs text-gray-400 mb-3 space-y-1">
            <li>• Quick Snag: 1–2 SOL</li>
            <li>• Mid Tier: 3–5 SOL</li>
            <li>• Premium: 9+ SOL</li>
          </ul>
          <button 
            onClick={handleReserveBuildSlot}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Reserve a Build Slot
          </button>
        </section>

        {/* REQUEST FORM */}
        <section className="relative border border-gray-700 rounded-xl p-6 bg-zinc-900 shadow-inner neon-panel">
          <h2 className="text-xl font-semibold mb-2">📨 Deployment Request Form</h2>
          <p className="text-sm text-gray-300 mb-4">
            Not sure what you need? Send a brief and we'll get back to you.
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              placeholder="Your domain (e.g. jpegdealer.sol)"
              className="w-full p-2 rounded bg-black border border-gray-600 text-white focus:border-cyan-400 focus:outline-none"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us what you're envisioning..."
              className="w-full p-2 rounded bg-black border border-gray-600 text-white h-24 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-2 px-4 rounded transition-colors duration-200 ${
                isSubmitting 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-black'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </section>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            ✅ Request submitted! We'll get back to you soon.
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            ← Back to Access Point
          </Link>
        </div>
      </div>
    </div>
  );
} 