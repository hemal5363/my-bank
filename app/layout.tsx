import { Inter } from "next/font/google";
import Loader from "@/components/shared/Loader";
import "./globals.css";
import Header from "@/components/shared/Header";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/hooks/UserContext";

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
