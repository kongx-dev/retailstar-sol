import React from "react";
import SEOHead from "../components/SEOHead";
import merchImg from "../assets/Neon Graffiti Hoodie Design.png";

export default function MerchPage() {
  return (
    <>
      <SEOHead
        customTitle="Retailstar Merch Drop"
        customDescription="The official cyberpunk hoodie drop from Retailstar Mall."
        imageUrl="/assets/Neon Graffiti Hoodie Design.png"
        canonicalUrl="https://retailstar.xyz/merch"
      />
      <main className="flex flex-col items-center justify-center text-white p-8 bg-black min-h-screen">
        <img src={merchImg} alt="Retailstar Hoodie" className="w-full max-w-xl rounded-xl shadow-lg mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-center">Retailstar Hoodie Drop</h1>
        <p className="text-lg mb-6 text-center max-w-lg">
          Official streetwear for domain dealers. First run — limited supply. DM to claim or join the drop list.
        </p>
       <a
  href="https://twitter.com/messages/compose?recipient_id=RETAILSTAR_X_ID"
  target="_blank"
  rel="noreferrer"
  className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-full text-xl font-bold hover:scale-105 transition"
>
  DM to Buy
</a>
      </main>
    </>
  );
} 