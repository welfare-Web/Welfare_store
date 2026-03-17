import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext"; // <-- Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "So Entry - Multivendor Store",
  description: "E-commerce built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        {/* Wrap with BOTH providers */}
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow bg-white">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}