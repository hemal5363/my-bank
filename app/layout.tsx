import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import { UserProvider } from "@/hooks/UserContext";
import Loader from "@/components/shared/Loader";
import Header from "@/components/shared/Header";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Bank",
  icons: "/icon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div
            id="mainDiv"
            className="h-screen flex flex-col relative overflow-auto"
          >
            <Header />
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
        </UserProvider>
      </body>
    </html>
  );
}
