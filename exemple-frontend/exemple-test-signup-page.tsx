import React from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Info,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// ------------------------
// Single-file mock: /signup
// Auth method: email + password
// Roles: default user (admin created later)
// ------------------------

function scorePassword(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0..4
}

export default function SignupPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const strength = scorePassword(password);
  const strengthLabel =
    strength <= 1 ? "Weak" : strength === 2 ? "Okay" : strength === 3 ? "Strong" : "Very strong";

  const onSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (!name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");
    if (!password) return setError("Password is required");
    if (password !== confirm) return setError("Passwords do not match");
    if (!agree) return setError("You must accept the terms");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    setSuccess("Account created (mock). You can now sign in.");
    // real app: navigate("/login")
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.97))] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
          <div className="leading-tight">
            <div className="text-white text-lg font-semibold">MediaFetcher</div>
            <div className="text-white/45 text-sm">Create account</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500/60 via-fuchsia-500/40 to-violet-500/60" />

          <div className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold text-violet-200">Get started</div>
                <div className="text-white/50 text-sm mt-1">
                  Create an account to access your feed and libraries
                </div>
              </div>
              <Badge className="bg-white/10 text-white/80 border border-white/10">
                <Shield className="h-3.5 w-3.5 mr-1" /> Encrypted
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm text-white/80 mb-2">Name</div>
                <div className="relative">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                    autoComplete="name"
                  />
                  <User className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

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
                    autoComplete="new-password"
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

                {/* strength */}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <div className="text-white/50">Strength: <span className="text-white/75">{strengthLabel}</span></div>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={
                          "h-1.5 w-10 rounded-full border " +
                          (strength > i
                            ? "bg-violet-500/50 border-violet-500/40"
                            : "bg-white/5 border-white/10")
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-white/80 mb-2">Confirm password</div>
                <div className="relative">
                  <Input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    type={showPw ? "text" : "password"}
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/35 rounded-xl pl-10"
                    autoComplete="new-password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />
                  <Lock className="h-4 w-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-white/70 cursor-pointer select-none">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(v) => setAgree(Boolean(v))}
                  className="border-white/20 mt-0.5"
                />
                <div>
                  I agree to the <span className="text-violet-200/90">Terms</span> and <span className="text-violet-200/90">Privacy</span>.
                  <div className="text-xs text-white/45 mt-1">
                    v1: minimal account system (admin/user roles). Security is a priority.
                  </div>
                </div>
              </label>

              {error && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200 flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" />
                  <div>{success}</div>
                </div>
              )}

              <Button
                className="w-full bg-violet-600 hover:bg-violet-600/90 rounded-xl"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Creating…" : (
                  <span className="inline-flex items-center gap-2">
                    Create account <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            <div className="mt-6 text-sm text-white/55 flex items-center justify-center gap-2">
              Already have an account?
              <a href="/login" className="text-violet-200/90 hover:text-violet-200">
                Sign in
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/55">
              <div className="flex items-center gap-2 text-white/70 font-semibold">
                <Shield className="h-4 w-4" /> Security
              </div>
              <div className="mt-1">
                Sessions/cookies are encrypted by the backend. Frontend never stores raw cookies.
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
