export const metadata = {
  title: "Bedrock Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
