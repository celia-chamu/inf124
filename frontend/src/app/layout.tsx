import "./globals.css";
import Header from "@/components/Header";

function RootLayout({children}: propTypes) {
  return (
    <html className="overscroll-none">
      <body className="min-h-screen overflow-y-scroll overscroll-x-none">
        <Header/>
        {children}
      </body>
    </html>
  );
}

type propTypes = {
  children: React.ReactNode
};

export default RootLayout