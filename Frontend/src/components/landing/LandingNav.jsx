import hwaiLogo from "../../assets/hwai-logo.jpg";



import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={hwaiLogo} alt="HWAI Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HWAI
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/models" className="text-slate-600 hover:text-slate-900 font-medium">
              Models
            </Link>
            <Link to="/datasets" className="text-slate-600 hover:text-slate-900 font-medium">
              Datasets
            </Link>
            <Link to="/papers" className="text-slate-600 hover:text-slate-900 font-medium">
              Papers
            </Link>
            <Link to="/discussions" className="text-slate-600 hover:text-slate-900 font-medium">
              Discussions
            </Link>
            <Link to="/projects" className="text-slate-600 hover:text-slate-900 font-medium">
              Projects
            </Link>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded text-white font-semibold">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
