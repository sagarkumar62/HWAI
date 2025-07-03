import { Database, FileText, MessageCircle, Code, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Model & Dataset Hub",
    description:
      "Host, discover, and share AI models and datasets with version control and easy deployment",
    color: "text-blue-600",
  },
  {
    icon: FileText,
    title: "Research Papers",
    description: "Access latest papers with code implementations, benchmarks, and reproducible results",
    color: "text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "Q&A Forums",
    description: "Get help from experts, share knowledge, and participate in technical discussions",
    color: "text-green-600",
  },
  {
    icon: Code,
    title: "Project Showcase",
    description: "Share your AI projects, get feedback, and collaborate with the community",
    color: "text-orange-600",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Tutorials, courses, and guides from beginner to advanced AI topics",
    color: "text-red-600",
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Participate in AI challenges, hackathons, and research competitions",
    color: "text-indigo-600",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need for AI Research</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From model hosting to collaborative research, HWAI provides the complete toolkit for AI innovation
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="hover:shadow-lg transition-shadow bg-white rounded-xl p-8 text-center">
              <div
                className={`${feature.color} w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-slate-50 rounded-full`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
