import React from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  KeyRound,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// ------------------------
// Single-file mock: /login
// Auth method: email + password
// Roles exist (admin/user) but not exposed here.
// ------------------------

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [remember, setRemember] = React.useState(true);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    setError(null);
    if (!email.trim()) return setError("Email is required");
    if (!password) return setError("Password is required");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    // mock auth
    if (password.length < 4) return setError("Invalid credentials (mock)");
    alert(`Login success (mock)\nemail=${email}\nremember=${remember}`);
    // real app: navigate("/dashboard")
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.97))] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
          <div className="leading-tight">
            <div className="text-white text-lg font-semibold">MediaFetcher</div>
            <div className="text-white/45 text-sm">Login</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-violet-500/60 via-fuchsia-500/40 to-violet-500/60" />

          <div className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold text-violet-200">Welcome back</div>
                <div className="text-white/50 text-sm mt-1">
                  Sign in to manage downloads, feed and libraries
                </div>
              </div>
              <Badge className="bg-white/10 text-white/80 border border-white/10">
                <Shield className="h-3.5 w-3.5 mr-1" /> Encrypted
              </Badge>
            </div>

            {/* Fields */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm text-white/80 mb-2">Email</div>
                <div className="relative">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                    autoComplete="email"
                  />
                  <Mail className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="text-sm text-white/80 mb-2">Password</div>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type={showPw ? "text" : "password"}
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10 pr-11"
                    autoComplete="current-password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />
                  <Lock className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                    onClick={() => setShowPw((v) => !v)}
                    type="button"
                    title={showPw ? "Hide" : "Show"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(v) => setRemember(Boolean(v))}
                    className="border-white/20"
                  />
                  Remember me
                </label>

                <button
                  className="text-sm text-violet-200/90 hover:text-violet-200"
                  onClick={() => alert("Forgot password (v1 mock)")}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200 flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <Button
                className="w-full bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <KeyRound className="h-4 w-4 animate-pulse" /> Signing in…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Sign in <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Footer links */}
            <div className="mt-6 text-sm text-white/55 flex items-center justify-center gap-2">
              No account?
              <a
                href="/signup"
                className="text-violet-200/90 hover:text-violet-200"
              >
                Create one
              </a>
            </div>

            {/* Security note */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/55">
              <div className="flex items-center gap-2 text-white/70 font-semibold">
                <Shield className="h-4 w-4" /> Security
              </div>
              <div className="mt-1">
                Cookies and platform sessions are stored encrypted on the backend (v1).
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/35">
          MediaFetcher • Dark theme + violet accent
        </div>
      </div>
    </div>
  );
}
