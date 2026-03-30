import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import QueryProvider from "../providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
           {children}
           <Toaster 
            toastOptions={{
              duration :2500
            }}
            position="top-right" 
           reverseOrder={false}/>
        </QueryProvider>
             
      </body>
    </html>
  );
}
