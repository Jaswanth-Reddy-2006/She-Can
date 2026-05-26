import "./globals.css";

export const metadata = {
  title: "She Can Foundation | Contact Form",
  description: "A simple full-stack contact form for She Can Foundation."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
