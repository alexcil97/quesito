import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: "Netgram",
  description: "OJO",
  icons: {
    icon: "./favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" className="no-scrollbar">
        <body
        >
          {children}
        </body>
      </html>
    </SessionProvider>

  );
}
