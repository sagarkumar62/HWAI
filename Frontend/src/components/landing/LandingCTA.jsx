import { Zap } from "lucide-react";

export default function LandingCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Accelerate Your AI Journey?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join HWAI today and get access to cutting-edge models, datasets, research, and a thriving community of AI
          practitioners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center">
            <Zap className="mr-2 h-5 w-5" />
            Get Started Free
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 text-lg bg-transparent rounded-lg font-semibold">
            Explore Platform
          </button>
        </div>
      </div>
    </section>
  );
}
