import { PushUniversalAccountButton } from "@pushchain/ui-kit";
import { useNavigate } from "react-router-dom";
// import nftShowcase from "../assets/pushcard.png"; // Uncomment if you want to use the image

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-gradient-to-b from-[#0a0a23] to-[#0f0f2e] min-h-screen text-white px-6">
     
       
<header className="flex flex-col items-center justify-center py-8 text-center landing-header">
      <img src="/chain.png" alt="Logo" className="w-10 h-10 mb-4 logo" />
     </header>
     


      {/* Hero Section */}
      <section className="py-16 text-center">
       
        <h1 className="text-5xl font-bold">Universal NFT Marketplace</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg">
          The largest and unique Super rare NFT marketplace for crypto collectors.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <PushUniversalAccountButton />
          <button className="launch-btn" onClick={() => navigate("/mint")}>
     //     Mint NFT  // </button>
        </div>
      </section>

       {/* About Section */}
      <section className="about">
        <h2>What is Universal NFT Marketplace?</h2>
        <p>
          A cross-chain NFT platform built on Push Chain where creators and collectors
          interact without boundaries. Mint NFTs, buy across chains, tip creators, and
          experience true interoperability.
        </p>
      </section>

      {/* Banner 2 */}
      <section className="flex items-center justify-center banner banner-2">
      <img src="/push1.png" alt="Push logo" className="object-contain w-1/2 h-auto max-w-md" />
     </section>
      <p>
        <br></br>
      </p>
      {/* Banner 2 */}
      <section className="flex items-center justify-center banner banner-2">
        
        <img src="/powered.png"className="object-contain w-5 h-1 max-w-md"  />
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="mb-4 text-3xl font-bold">Why choose us?</h2>
        <p >
         Mint, buy, and connect across chains — natively. No bridges. No swaps. Just seamless NFT transactions using your own tokens, whether you're on Ethereum, Solana, or Push Donut. 
         Powered by Push Universal Accounts (UEA), your identity travels with you.  </p>

      <p >
        This isn’t just a DApp — it’s a blueprint for universal interaction. 
        Designed for simplicity, composability, and real usability, Metafusion shows how Push Chain connects ecosystems and makes Web3 truly user-first.
      </p>

      </section>

      {/* Banner 2 */}
      <section className="flex items-center justify-center banner banner-2">
        
        <img src="/card.png"className="object-contain w-1/2 h-auto max-w-md"  />
      </section>


        
     


     



      {/* How-To Section */}
      <section className="howto">
        <h2>How to Use the App</h2>
        <ol>
          <li>Connect your wallet</li>
          <li>Mint your NFT with name,Description,image url,and price</li>
          <li>Buy NFTs listed by others</li>
          <li>Tip creators to support their work</li>
          <li>Enjoy cross-chain visibility and ownership</li>
        </ol>
      </section>
       <div className="flex gap-4 mt-6 justify-right">
          <PushUniversalAccountButton />
          <button className="launch-btn" onClick={() => navigate("/mint")}>
     //     Mint NFT  // </button>
        </div>
      {/* Footer */}
      <footer className="py-10 text-center text-white border-t mt-19 text-white-400 border-white-700">
        <a href="https://x.com/vaidik_namdev" target="_blank" rel="noopener noreferrer">
        <img src="https://abs.twimg.com/favicons/twitter.ico" alt="X" width="24" height="24" />
        </a>
        <a
    href="https://www.linkedin.com/in/vaidik-namdev22/"
    target="_blank"
    rel="noopener noreferrer"
    className="transition hover:opacity-80"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
      alt="LinkedIn"
      width="24"
      height="24"
    />
  </a>
        <br></br>
       <span> © 2025 Metafusion — The Universal NFT Marketplace on Push Chain.</span>
      </footer>
      
    </main>
  );
}
































// import { Hero } from "../components/Hero";
// import { WhyChoose } from "../components/Whychoose";
// // import { FeaturedCard } from "../components/FeaturedCard";

// export default function LandingPage() {
//   return (
//     <main className="bg-gradient-to-b from-[#0a0a23] to-[#0f0f2e] min-h-screen px-6">
//       <Hero />
//       {/* <FeaturedCard /> */}
//       <WhyChoose />
//     </main>
//   );
// }



//   return (
//     <main className="bg-gradient-to-b from-[#0a0a23] to-[#0f0f2e] min-h-screen text-white px-6">
//       {/* Hero Section */}
//       <section className="py-16 text-center">
//         <h1 className="text-5xl font-bold">Super NFT Marketplace</h1>
//         <p className="max-w-xl mx-auto mt-4 text-lg">
//           The largest and unique Super rare NFT marketplace for crypto collectors.
//         </p>
//         <div className="flex justify-center gap-4 mt-6">
//           <PushUniversalAccountButton />
//           {/* <button
//             onClick={() => navigate("/mint")}
//             className="px-6 py-2 font-semibold transition border border-white rounded-lg hover:bg-white hover:text-blue-600"
//           >
//             Create NFTs →
//           </button> */}
//           {/* <button
//   onClick={() => navigate("/mint")}
//   className="px-6 py-2 font-semibold text-white transition-transform duration-300 rounded-full shadow-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:scale-105"
// >
//   Create NFTs →
// </button> */}
// <button
//   onClick={() => navigate("/mint")}
//   className="px-6 py-2 font-semibold text-white transition-transform duration-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105"
// >
//   Create NFTs →
// </button>

         

//         </div>
//       </section>

//       {/* Static Image Showcase */}
//       {/* <section className="flex justify-center py-12">
//         <img
//           src={nftShowcase}
//           alt="NFT Showcase"
//           className="w-full max-w-5xl shadow-lg rounded-xl"
//         />
//       </section> */}

//       {/* Why Choose Us Section */}
//       <section className="max-w-3xl py-16 mx-auto text-center">
//         <h2 className="mb-4 text-3xl font-bold">Why choose us?</h2>
//         <p className="mb-4 text-gray-300">
//           Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque urna semper.
//         </p>
//         <p className="mb-6 text-gray-300">
//           Eu feugiat adipiscing vulputate ultrices. Molio tellus malesuada massa...
//         </p>
//         <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
//           Connect Wallet
//         </button>
//       </section>
//     </main>
//   );
// }



































































































// import Hero from '../components/Hero'
// import WhyChooseUs from '../components/WhyChooseUs'

// const Landing = () => {
//   return (
//     <main className="min-h-screen font-sans bg-black">
//       <Hero />
//       <WhyChooseUs />
//     </main>
//   )
// }

// export default Landing;


















// import { useNavigate } from "react-router-dom";
// import { PushUniversalAccountButton } from "@pushchain/ui-kit";

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-wrapper bg-gradient-to-br from-[#120A2F] to-[#1A1033] text-white min-h-screen font-sans">
//       {/* Header */}
//      <header className="flex items-center px-2 py-2 space-x-2">
//   <img src="/chain.png" alt="Logo" className="w-12 h-12 drop-shadow-xl" />
//   <div className="flex flex-col justify-center">
//     <h1 className="text-2xl font-bold leading-tight text-white">Metafusion</h1>
//     <span className="text-sm text-gray-400">Universal NFT Marketplace</span>
//   </div>
// </header>

//       {/* Tagline */}
//       <section className="my-12 text-center">
//         <h2 className="text-2xl font-semibold text-[#00CFFF] drop-shadow-md">NFTs on Push Chain</h2>
//         <p className="max-w-xl mx-auto mt-2 text-gray-300">
//           Users from across chains can mint, buy, tip, and interact seamlessly.
//         </p>
//       </section>

//       {/* Action Buttons */}
//       <section className="flex flex-col items-center justify-center gap-4 my-12 sm:flex-row">
//         <PushUniversalAccountButton />
//         <button
//           className="px-6 py-3 bg-gradient-to-r from-[#E63996] to-[#6A3AB2] rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
//           onClick={() => navigate("/mint")}
//         >
//           Mint NFT
//         </button>
//       </section>

//       {/* Banner 1 */}
//       <section className="flex justify-center my-10">
//         <img
//           src="/banner.png"
//           alt="Marketplace Banner"
//           className="w-full max-w-4xl shadow-lg rounded-xl"
//         />
//       </section>

//       {/* About Section */}
//       <section className="max-w-2xl p-6 mx-auto my-16 text-center shadow-lg bg-white/5 backdrop-blur-md rounded-xl">
//         <h2 className="text-2xl font-semibold text-[#7B00FF] mb-4">What is Universal NFT Marketplace?</h2>
//         <p className="leading-relaxed text-gray-300">
//           A cross-chain NFT platform built on Push Chain where creators and collectors
//           interact without boundaries. Mint NFTs, buy across chains, tip creators, and
//           experience true interoperability.
//         </p>
//       </section>

//       {/* Banner 2 */}
//       <section className="flex justify-center my-10">
//         <img
//           src="/push1.png"
//           alt="Push Chain Banner"
//           className="w-full max-w-4xl shadow-lg rounded-xl"
//         />
//       </section>

//       {/* How-To Section */}
//       <section className="max-w-2xl p-6 mx-auto my-16 shadow-lg bg-white/5 backdrop-blur-md rounded-xl">
//         <h2 className="text-2xl font-semibold text-[#00CFFF] text-center mb-4">How to Use the App</h2>
//         <ol className="space-y-3 text-gray-300 list-decimal list-inside">
//           <li>Connect your wallet using Push Wallet</li>
//           <li>Mint your NFT with name, image, and price</li>
//           <li>Buy NFTs listed by others</li>
//           <li>Tip creators to support their work</li>
//           <li>Enjoy cross-chain visibility and ownership</li>
//         </ol>
//       </section>

// //       {/* Footer */}
//       <footer className="py-6 mt-10 text-center text-gray-400 border-t border-gray-700">
//         © 2025 Metafusion — The Universal NFT Marketplace on Push Chain.
//       </footer>
//     </div>
//   );
// };

// export default Landing;




// import { useNavigate } from "react-router-dom";
// import { PushUniversalAccountButton } from "@pushchain/ui-kit";

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-wrapper">
//       {/* Header */}
//       <header className="flex flex-col items-center justify-center py-8 text-center landing-header">
//         <img src="/chain.png" alt="Logo" className="w-10 h-10 mb-4 logo" />
//          <h1 className="text-4xl font-bold text-white project-name">
//           Metafusion{" "}
//         </h1>
//       </header>

//       {/* Tagline */}
//       <section className="my-10 text-center tagline">
//         <h2 className="text-2xl font-semibold text-white">NFTs on Push Chain</h2>
//         <p className="mt-2 text-gray-300">
//           Users from across chains can mint, buy, tip, and interact seamlessly.
//         </p>
//       </section>
//       {/* Action Buttons */}
//       <section className="flex items-center justify-center my-12 space-x-6 actions">
//   <PushUniversalAccountButton />

//   <button
//     className="px-6 py-3 text-white transition-all bg-purple-700 hover:bg-purple-800 rounded-xl"
//     onClick={() => navigate("/mint")}
//   >
//     Mint NFT
//   </button>
// </section>



//       {/* Banner 1 */}
//       <section className="flex items-center justify-center my-10 banner banner-1">
//         <img
//           src="/banner.png"
//           className="object-contain w-1/2 h-auto max-w-md"
//           alt="Banner"
//         />
//       </section>

//       {/* About Section */}
//       <section className="max-w-2xl mx-auto my-10 text-center about">
//         <h2 className="text-2xl font-semibold text-white">
//           What is Universal NFT Marketplace?
//         </h2>
//         <p className="mt-3 leading-relaxed text-gray-300">
//           A cross-chain NFT platform built on Push Chain where creators and collectors
//           interact without boundaries. Mint NFTs, buy across chains, tip creators, and
//           experience true interoperability.
//         </p>
//       </section>

//       {/* Banner 2 */}
//       <section className="flex items-center justify-center my-10 banner banner-2">
//         <img
//           src="/push1.png"
//           alt="Push logo"
//           className="object-contain w-1/2 h-auto max-w-md"
//         />
//       </section>

//       {/* How-To Section */}
//       <section className="max-w-2xl mx-auto my-10 text-center howto">
//         <h2 className="mb-4 text-2xl font-semibold text-white">How to Use the App</h2>
//         <ol className="space-y-2 text-left text-gray-300 list-decimal list-inside">
//           <li>Connect your wallet using Push Wallet</li>
//           <li>Mint your NFT with name, image, and price</li>
//           <li>Buy NFTs listed by others</li>
//           <li>Tip creators to support their work</li>
//           <li>Enjoy cross-chain visibility and ownership</li>
//         </ol>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 mt-10 text-center text-gray-400 border-t border-gray-700">
//         © 2025 Metafusion — The Universal NFT Marketplace on Push Chain.
//       </footer>
//     </div>
//   );
// };

// export default Landing;

// import { useNavigate } from "react-router-dom";
// import { PushUniversalAccountButton } from "@pushchain/ui-kit";
// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-wrapper">
//       {/* Header */}
//       <header className="landing-header">
//        <img src="/cahin.png" alt="Logo" className="logo" />
//         <h1 className="project-name">Universal NFT Marketplace</h1>
//       </header>

//       {/* Tagline */}
//       <section className="tagline">
//         <h2>NFTs on Push Chain</h2>
//         <p>Users from across chains can mint, buy, tip, and interact seamlessly.</p>
//       </section>

//       {/* Action Buttons */}
//       <section className="actions">
//        <div className="connect-btn-wrapper">
//        <PushUniversalAccountButton />
//        </div>

//         <button className="launch-btn" onClick={() => navigate("/mint")}>
//           Mint NFT
//         </button>
//       </section>

//       {/* Banner 1 */}
//       <section className="flex items-center justify-center banner banner-1">
//         <img src="/banner.png"className="object-contain w-1/2 h-auto max-w-md"  />
//       </section>

//       {/* About Section */}
//       <section className="about">
//         <h2>What is Universal NFT Marketplace?</h2>
//         <p>
//           A cross-chain NFT platform built on Push Chain where creators and collectors
//           interact without boundaries. Mint NFTs, buy across chains, tip creators, and
//           experience true interoperability.
//         </p>
//       </section>

//       {/* Banner 2 */}
//     <section className="flex items-center justify-center banner banner-2">
//   <img src="/push1.png" alt="Push logo" className="object-contain w-1/2 h-auto max-w-md" />
// </section>



//       {/* How-To Section */}
//       <section className="howto">
//         <h2>How to Use the App</h2>
//         <ol>
//           <li>Connect your wallet using Push Wallet</li>
//           <li>Mint your NFT with name, image, and price</li>
//           <li>Buy NFTs listed by others</li>
//           <li>Tip creators to support their work</li>
//           <li>Enjoy cross-chain visibility and ownership</li>
//         </ol>
//       </section>
// //     </div>
// //   );
// // };

// // export default Landing;