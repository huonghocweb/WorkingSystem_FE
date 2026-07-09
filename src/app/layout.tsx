import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QueryProvider from "../providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./ModalProvider";
import { AppProvider } from "./AppProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ModalProvider />
          <AppProvider>
            {children}
            <Toaster
              toastOptions={{
                duration: 2500,
              }}
              position="top-right"
              reverseOrder={false}
            />
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
