import { AuthHeader } from "./components/AuthHeader";
import { LoginForm } from "./components/LoginForm";

/**
 * LoginPage: Assembles the authentication header and the login form.
 * This component is rendered within the AuthLayout, which provides the background
 * and centered container.
 */
export function LoginPage() {
  return (
    <div>
      <AuthHeader pageType="Login" />
      <LoginForm />
      <div className="mt-6 text-center text-xs text-white/35">
          MediaFetcher • Dark theme + violet accent
      </div>
    </div>
  );
}
