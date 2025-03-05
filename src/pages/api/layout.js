import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "./lib/utils"
import { PostHogProvider } from "../pages/api/posthog-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HackSphere",
  description: "Global event board for hackathons and tech events",
  authors: [
    {
      name: "HackSphere Team",
      url: "https://hacksphere.com",
    },
  ],
  openGraph: {
    title: "HackSphere",
    description: "Global event board for hackathons and tech events",
    url: "https://hacksphere.com",
    siteName: "HackSphere",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
