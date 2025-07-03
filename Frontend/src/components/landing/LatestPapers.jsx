import { FileText, Eye, Code } from "lucide-react";

export default function LatestPapers() {
  const papers = [
    {
      title: "Attention Is All You Need",
      authors: "Vaswani et al.",
      venue: "NeurIPS 2017",
      citations: "45,231",
      code: "Available",
      category: "Transformers",
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      authors: "Devlin et al.",
      venue: "NAACL 2019",
      citations: "38,492",
      code: "Available",
      category: "NLP",
    },
  ];
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center">
          <FileText className="mr-3 h-8 w-8 text-purple-600" />
          Latest Research Papers
        </h2>
        <button className="flex items-center bg-transparent border border-slate-200 px-4 py-2 rounded font-semibold">
          Browse Papers
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {papers.map((paper, i) => (
          <div key={i} className="hover:shadow-lg transition-shadow cursor-pointer bg-white rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-lg font-bold mb-2 leading-tight">{paper.title}</div>
                <p className="text-slate-600 text-sm">{paper.authors} • {paper.venue}</p>
              </div>
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold">{paper.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {paper.citations} citations
              </div>
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-1" />
                {paper.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
