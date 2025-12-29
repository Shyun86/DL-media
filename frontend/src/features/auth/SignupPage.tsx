import { AuthHeader } from "./components/AuthHeader";
import { SignupForm } from "./components/SignupForm";

/**
 * SignupPage: Assembles the authentication header and the signup form.
 * This component is rendered within the AuthLayout, which provides the background
 * and centered container.
 */
export function SignupPage() {
  return (
    <div>
      <AuthHeader pageType="Create account" />
      <SignupForm />
      <div className="mt-6 text-center text-xs text-white/35">
          MediaFetcher • Dark theme + violet accent
      </div>
    </div>
  );
}
