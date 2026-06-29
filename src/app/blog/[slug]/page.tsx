import Link from "next/link";

const posts: Record<string, { title: string; category: string; date: string; readTime: string; content: string }> = {
  "introducing-thinkbox": { title: "Introducing Thinkbox — The Neuro-Symbolic Reasoning Engine", category: "Product", date: "Jan 15, 2026", readTime: "8 min", content: "Thinkbox is a contextual harness for trusted data analytics, created and managed by subject matter experts. Where regular AI may guess, a Thinkbox helps AirQuery reason — combining the language understanding of modern AI with the business knowledge that exists within a specific domain.\n\nThe result is answers you can trust, answer flows you can understand, sources you can verify, and consistent responses every time the same question is asked.\n\n## How Thinkbox Reasons\n\nThinkbox uses a six-mode reasoning approach: Decomposive breaks complex questions into sub-questions. Deductive applies verified metrics and rules. Abductive identifies most likely explanations. Inductive finds patterns. Reflective validates confidence. Analogical draws from similar analyses.\n\nThis multi-modal reasoning ensures that every answer is a reasoned, verified conclusion that your team can trust." },
  "ai-hi-di": { title: "AI + HI = DI: Why Deterministic Intelligence Matters", category: "Thought Leadership", date: "Jan 10, 2026", readTime: "12 min", content: "The analytics industry is at an inflection point. Pure AI hallucinates metrics, gives different answers each time, and cannot explain its reasoning. Pure BI takes weeks per new question, relies on brittle SQL, and definitions drift across teams.\n\nThere's a third way: Deterministic Intelligence.\n\n## The Problem with Pure AI\n\nWhen you point a large language model at your data warehouse and ask \"why did revenue drop?\", you get a plausible-sounding answer. Ask again tomorrow, you get a different one.\n\n## The Third Way\n\nDeterministic Intelligence combines the language understanding of AI with the precision of human-verified business rules. The result: same question, same answer, every time." },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return <div className="pt-32 pb-24 text-center"><h1 className="text-2xl font-bold text-bone mb-4">Post not found</h1><Link href="/blog" className="text-lux text-[14px]">← Back</Link></div>;

  return (
    <div className="pt-20">
      <article className="py-24 lg:py-36">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-[12px] text-bone-ghost hover:text-lux transition-colors mb-12">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Back
          </Link>
          <div className="flex items-center gap-3 mb-8"><span className="type-caption text-lux">{post.category}</span><span className="type-mono text-bone-ghost/40">{post.date} · {post.readTime}</span></div>
          <h1 className="type-massive text-[clamp(2rem,5vw,3.5rem)] text-bone mb-16">{post.title}</h1>
          <div className="divider-glow mb-16" />
          <div className="space-y-6">
            {post.content.split("\n\n").map((p, i) => {
              if (p.startsWith("## ")) return <h2 key={i} className="text-2xl type-heading text-bone mt-16 mb-6">{p.replace("## ", "")}</h2>;
              return <p key={i} className="text-[15px] type-body text-bone-muted">{p}</p>;
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
