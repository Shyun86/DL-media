interface AuthHeaderProps {
  pageType: "Login" | "Create account";
}

export function AuthHeader({ pageType }: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/60 to-violet-500/40 ring-1 ring-white/10" />
      <div className="leading-tight">
        <div className="text-white text-lg font-semibold">MediaFetcher</div>
        <div className="text-white/45 text-sm">{pageType}</div>
      </div>
    </div>
  );
}
