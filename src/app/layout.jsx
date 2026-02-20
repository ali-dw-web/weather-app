
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
   <head>
     <link rel="stylesheet" href="/images/icofont/icofont.min.css"></link>
   </head>
    <html lang="en">

      <body>
        {children}
      </body>
    </html>
    </>
  );
}
