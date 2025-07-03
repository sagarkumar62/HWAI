import hwaiLogo from "../../assets/hwai-logo.jpg";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={hwaiLogo} alt="HWAI Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold">HWAI</span>
            </div>
            <p className="text-slate-400">The premier platform for AI research, collaboration, and innovation.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/models" className="hover:text-white">
                  Models
                </a>
              </li>
              <li>
                <a href="/datasets" className="hover:text-white">
                  Datasets
                </a>
              </li>
              <li>
                <a href="/papers" className="hover:text-white">
                  Papers
                </a>
              </li>
              <li>
                <a href="/discussions" className="hover:text-white">
                  Discussions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/forums" className="hover:text-white">
                  Forums
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="/newsletter" className="hover:text-white">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/documentation" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/helpcenter" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/status" className="hover:text-white">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© 2024 HWAI. All rights reserved. Empowering AI innovation worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
