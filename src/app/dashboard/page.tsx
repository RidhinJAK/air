"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData { id: number; name: string; email: string; role: string; bio: string | null; createdAt: string; }

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview"|"profile"|"settings">("overview");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try { const r = await fetch("/api/auth/me"); if (!r.ok) { router.push("/login"); return; } const d = await r.json(); if (!d.user) { router.push("/login"); return; } setUser(d.user); } catch { router.push("/login"); } finally { setLoading(false); }
  }, [router]);
  useEffect(() => { fetchUser(); }, [fetchUser]);

  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); };
  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSaving(true);
    await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) });
    setSaved(true); setTimeout(() => setSaved(false), 2000); fetchUser(); setSaving(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="w-5 h-5 border-2 border-lux/30 border-t-lux rounded-full animate-spin" /></div>;
  if (!user) return null;

  const activity = [
    { q: "Why did APAC revenue drop?", t: "2h ago", c: "99%" },
    { q: "Top 10 customers by LTV", t: "5h ago", c: "97%" },
    { q: "Churn prediction Q2", t: "1d ago", c: "94%" },
    { q: "Revenue by product line", t: "2d ago", c: "99%" },
  ];

  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
              <div><h1 className="text-3xl type-heading text-bone">Welcome, {user.name.split(" ")[0]}</h1><p className="text-[14px] text-bone-ghost mt-1">Your analytics overview</p></div>
              <button onClick={logout} className="text-[11px] tracking-wide uppercase text-bone-ghost hover:text-bone px-4 py-2 rounded-full border border-bone-faint/10 hover:border-lux-border transition-all">Sign out</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[{ l: "Queries", v: "1,247", c: "+12%" }, { l: "Sources", v: "3", c: "" }, { l: "Reports", v: "28", c: "+5%" }, { l: "Thinkboxes", v: "2", c: "" }].map(s => (
                <div key={s.l} className="rounded-2xl bg-void-card border border-bone-faint/8 p-6 relative overflow-hidden edge-light">
                  <div className="absolute inset-0 grain pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="type-caption text-bone-ghost">{s.l}</span>
                      {s.c && <span className="text-[11px] text-lux font-medium">{s.c}</span>}
                    </div>
                    <span className="text-2xl font-bold text-bone">{s.v}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 mb-10 border-b border-bone-faint/8">
              {(["overview","profile","settings"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className={`text-[12px] tracking-wide uppercase px-4 py-3 -mb-px border-b-2 transition-colors capitalize ${tab === t ? "border-lux text-lux font-semibold" : "border-transparent text-bone-ghost hover:text-bone"}`}>{t}</button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="divide-y divide-bone-faint/8">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-5 group cursor-default hover:bg-void-hover -mx-4 px-4 rounded-xl transition-colors">
                    <div><p className="text-[14px] text-bone font-medium">{a.q}</p><p className="type-mono text-bone-ghost/40 mt-0.5">{a.t}</p></div>
                    <span className="type-mono text-lux bg-lux/8 px-2 py-0.5 rounded-md text-[10px]">{a.c}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "profile" && (
              <div className="max-w-lg">
                <form onSubmit={saveProfile} className="space-y-8">
                  <div><label className="type-caption text-bone-ghost mb-3 block">Name</label><input name="name" defaultValue={user.name} className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone py-3 focus:outline-none focus:border-lux transition-colors" /></div>
                  <div><label className="type-caption text-bone-ghost mb-3 block">Email</label><input value={user.email} disabled className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone-ghost py-3 opacity-50" /></div>
                  <div><label className="type-caption text-bone-ghost mb-3 block">Bio</label><textarea name="bio" rows={3} defaultValue={user.bio||""} placeholder="Tell us about yourself..." className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone placeholder:text-bone-faint py-3 focus:outline-none focus:border-lux transition-colors resize-none" /></div>
                  <button type="submit" disabled={saving} className="text-[11px] font-semibold tracking-wide uppercase bg-lux text-void px-6 py-3 rounded-full hover:bg-lux/90 transition-all disabled:opacity-50">
                    {saved ? "Saved ✓" : saving ? "Saving..." : "Save changes"}
                  </button>
                </form>
              </div>
            )}

            {tab === "settings" && (
              <div className="max-w-lg space-y-6">
                {[{ l: "Email notifications", d: "Receive analytics alerts", on: true }, { l: "Weekly digest", d: "Summary of activity", on: false }].map(s => (
                  <div key={s.l} className="flex items-center justify-between py-4 border-b border-bone-faint/8">
                    <div><p className="text-[14px] text-bone font-medium">{s.l}</p><p className="text-[12px] text-bone-ghost">{s.d}</p></div>
                    <div className={`w-10 h-6 rounded-full relative ${s.on ? "bg-lux" : "bg-bone-faint/20"} cursor-pointer`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow ${s.on ? "right-0.5 bg-void" : "left-0.5 bg-bone"}`} />
                    </div>
                  </div>
                ))}
                <div className="pt-6">
                  <p className="type-caption text-bone-ghost mb-3">Account</p>
                  <div className="text-[13px] text-bone-muted space-y-1.5">
                    <p>Plan: <span className="text-bone font-medium">Starter (Free)</span></p>
                    <p>Role: <span className="text-bone font-medium capitalize">{user.role}</span></p>
                    <p>Since: <span className="text-bone font-medium">{new Date(user.createdAt).toLocaleDateString()}</span></p>
                  </div>
                  <Link href="/pricing" className="inline-flex mt-4 text-[12px] text-lux hover:underline underline-offset-4 font-medium">Upgrade plan →</Link>
                </div>
              </div>
            )}
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
