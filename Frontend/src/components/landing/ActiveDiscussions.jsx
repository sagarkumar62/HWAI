import { MessageCircle } from "lucide-react";

export default function ActiveDiscussions() {
  const discussions = [
    {
      title: "Best practices for fine-tuning LLMs on domain-specific data?",
      author: "alex_researcher",
      replies: 23,
      votes: 45,
      tags: ["Fine-tuning", "LLM", "Domain-specific"],
      time: "2 hours ago",
    },
    {
      title: "Comparing different attention mechanisms in vision transformers",
      author: "vision_expert",
      replies: 18,
      votes: 32,
      tags: ["Vision", "Transformers", "Attention"],
      time: "4 hours ago",
    },
    {
      title: "How to handle catastrophic forgetting in continual learning?",
      author: "ml_student",
      replies: 15,
      votes: 28,
      tags: ["Continual Learning", "Neural Networks"],
      time: "6 hours ago",
    },
  ];
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center">
          <MessageCircle className="mr-3 h-8 w-8 text-green-600" />
          Active Discussions
        </h2>
        <button className="flex items-center bg-transparent border border-slate-200 px-4 py-2 rounded font-semibold">
          Join Discussions
        </button>
      </div>
      <div className="space-y-4">
        {discussions.map((discussion, i) => (
          <div key={i} className="hover:shadow-md transition-shadow cursor-pointer bg-white rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">{discussion.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <span>by {discussion.author}</span>
                  <span>{discussion.time}</span>
                  <span>{discussion.replies} replies</span>
                  <span>{discussion.votes} votes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag, j) => (
                    <span key={j} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
