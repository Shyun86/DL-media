import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Layouts
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";


// Pages (Features)
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { FeedPage } from "@/features/feed/FeedPage";
import { HomePage } from "@/features/home/HomePage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { LibraryPage } from "@/features/library/LibraryPage";
import { NotificationsPage } from "@/features/notifications/NotificationsPage";
import { LoginPage } from "@/features/auth/LoginPage";
import { SignupPage } from "@/features/auth/SignupPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "feed",
        element: <FeedPage />,
      },
      {
        path: "library",
        element: <LibraryPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;