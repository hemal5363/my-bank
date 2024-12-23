"use client";

import { Inter } from "next/font/google";
import Loader from "@/components/shared/Loader";
import "./globals.css";
import Header from "@/components/shared/Header";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter(); // Hook for client-side navigation

  const pathname = usePathname(); // Get the current path
  const hideHeaderRoutes = ["/login", "/sign-up"]; // Add all paths where you want to hide the header

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  const onLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          id="mainDiv"
          className="h-screen flex flex-col relative overflow-auto"
        >
          {shouldShowHeader && <Header onLogoutClick={onLogoutClick} />}
          <Loader />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
          />
        </div>
      </body>
    </html>
  );
}
