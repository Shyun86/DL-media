import { Outlet } from 'react-router-dom';

/**
 * AuthLayout: Provides the background gradient from the mockups and a
 * centered container for the authentication pages rendered via the Outlet.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-[radial-gradient(1200px_600px_at_15%_0%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(900px_500px_at_85%_10%,rgba(236,72,153,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.97))]">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};