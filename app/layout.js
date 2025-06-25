import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import { UserProvider } from "@/components/contexts/UserContext";
import { CartProvider } from "../components/contexts/AddToCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/contexts/AuthContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: process.env.PAGE_TITLE || 'Sneaker Store',
  description: "Get affordble modern sneakers form Melvel Stores",
  icons: {
    icon: '/assets/images/nike-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen flex flex-col w-full relative`}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }} />
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
      </body>
    </html>
  );
}