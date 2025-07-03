import hwaiLogo from "../../assets/hwai-logo.jpg";
import { Search } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src={hwaiLogo}
              alt="HWAI Logo"
              width={120}
              height={120}
              className="mx-auto rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">The AI Community Hub</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Discover, share, and collaborate on AI models, datasets, research papers, and projects. Join thousands of
            researchers, developers, and AI enthusiasts.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                placeholder="Search models, datasets, papers, or ask questions..."
                className="pl-12 pr-4 py-4 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl w-full"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold">
                Search
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-slate-600">Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">25K+</div>
              <div className="text-slate-600">Datasets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100K+</div>
              <div className="text-slate-600">Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">200K+</div>
              <div className="text-slate-600">Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
