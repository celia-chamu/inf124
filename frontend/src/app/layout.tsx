import "./globals.css";
import NavMenu from "@/components/NavMenu";

function RootLayout({children}: propTypes) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}

type propTypes = {
  children: React.ReactNode
};

export default RootLayout