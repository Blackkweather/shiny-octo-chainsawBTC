export const metadata = {
  title: "Blackkweather — Agency OS",
  description: "Revenue command center for the AI automation agency.",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#0B0E13",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
