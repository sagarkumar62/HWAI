import hwaiLogo from "../assets/hwai-logo.jpg";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Search,
  Database,
  FileText,
  MessageCircle,
  Code,
  TrendingUp,
  Star,
  Download,
  Eye,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import LandingNav from "../components/landing/LandingNav";
import LandingHero from "../components/landing/LandingHero";
import TrendingModels from "../components/landing/TrendingModels";
import LatestPapers from "../components/landing/LatestPapers";
import ActiveDiscussions from "../components/landing/ActiveDiscussions";
import PlatformFeatures from "../components/landing/PlatformFeatures";
import LandingCTA from "../components/landing/LandingCTA";
import LandingFooter from "../components/landing/LandingFooter";

export default function HWAILanding() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LandingNav />
      <LandingHero />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <TrendingModels />
          <LatestPapers />
          <ActiveDiscussions />
        </div>
      </section>
      <PlatformFeatures />
      <LandingCTA />
      <LandingFooter />
    </div>
  )
}
