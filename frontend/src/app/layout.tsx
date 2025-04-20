import "./globals.css";
import Header from "@/components/Header";

function RootLayout({children}: propTypes) {
  return (
    <html>
      <body>
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