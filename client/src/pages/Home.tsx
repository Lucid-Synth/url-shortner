import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Base_url } from "../config/config";

export default function Home() {
  useEffect(() => {
    fetch(Base_url, {
      method: "GET",
    }).catch((err) => {
      console.error("Warm-up request failed:", err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}