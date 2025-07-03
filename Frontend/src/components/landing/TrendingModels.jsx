import { TrendingUp, Download, Star } from "lucide-react";

export default function TrendingModels() {
  const models = [
    { name: "GPT-4 Vision", org: "OpenAI", downloads: "2.3M", likes: "15.2K", task: "Multimodal" },
    { name: "LLaMA-2-70B", org: "Meta", downloads: "1.8M", likes: "12.1K", task: "Text Generation" },
    { name: "DALL-E 3", org: "OpenAI", downloads: "950K", likes: "8.7K", task: "Text-to-Image" },
  ];
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center">
          <TrendingUp className="mr-3 h-8 w-8 text-blue-600" />
          Trending Models
        </h2>
        <button className="flex items-center bg-transparent border border-slate-200 px-4 py-2 rounded font-semibold">
          View All
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {models.map((model, i) => (
          <div key={i} className="hover:shadow-lg transition-shadow cursor-pointer bg-white rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-lg font-bold">{model.name}</div>
                <p className="text-slate-600">{model.org}</p>
              </div>
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold">{model.task}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {model.downloads}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                {model.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
