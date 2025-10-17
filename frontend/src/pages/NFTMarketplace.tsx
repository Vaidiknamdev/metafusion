import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  usePushWalletContext,
  usePushChainClient,
} from "@pushchain/ui-kit";
// import Header from "../components/Header";
import MintForm from "../components/MintForm";
import NFTList from "../components/NFTList";

const CONTRACT_ADDRESS = "0xF0a3896b7d5596aA9A3c74Ce93De41a9C246aC14";
const RPC_URL = "https://evm.rpc-testnet-donut-node1.push.org/";

interface NFTData {
  id: number;
  name: string;
  description: string;
  image: string;
  price: bigint;
  originChainNamespace: string;
  originChainId: string;
  creator: string;
  totalTips: bigint;
  isListed: boolean;
}

const ABI = [
  "function mintNFT(string _name, string _description, string _image, uint256 _price) external",
  "function buyNFT(uint256 _tokenId) external payable",
  "function tipCreator(uint256 _tokenId) external payable",
  "function getNFTDetails(uint256 _tokenId) external view returns (tuple(string name,string description,string image,uint256 price,string originChainNamespace,string originChainId,address creator,uint256 totalTips,bool isListed))",
  "function tokenCounter() view returns (uint256)",
];

const NFTMarketplace: React.FC = () => {
  const { connectionStatus } = usePushWalletContext();
  const { pushChainClient } = usePushChainClient();

  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "" });

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // const fetchNFTs = async () => {
  //   try {
  //     const total = await contract.tokenCounter();
  //     const nftArray: NFTData[] = [];
  //     for (let i = 1; i <= Number(total); i++) {
  //       const details = await contract.getNFTDetails(i);
  //       nftArray.push({
  //         id: i,
  //         name: details.name,
  //         description: details.description,
  //         image: details.image,
  //         price: details.price,
  //         originChainNamespace: details.originChainNamespace,
  //         originChainId: details.originChainId,
  //         creator: details.creator,
  //         totalTips: details.totalTips,
  //         isListed: details.isListed,
  //       });
  //     }
  //     setNfts(nftArray);
  //   } catch (err) {
  //     console.error("Error fetching NFTs:", err);
  //   }
  // };
//   const fetchNFTs = async () => {
//   try {
//     const total = await contract.tokenCounter();

//     // ✅ Create an array of token IDs
//     const ids = Array.from({ length: Number(total) }, (_, i) => i + 1);

//     // ✅ Fetch all NFT details in parallel (much faster)
//     const results = await Promise.all(ids.map((id) => contract.getNFTDetails(id)));

//     // ✅ Map results to NFTData structure
//     const nftArray: NFTData[] = results.map((details, i) => ({
//       id: i + 1,
//       name: details.name,
//       description: details.description,
//       image: details.image,
//       price: details.price,
//       originChainNamespace: details.originChainNamespace,
//       originChainId: details.originChainId,
//       creator: details.creator,
//       totalTips: details.totalTips,
//       isListed: details.isListed,
//     }));

//     setNfts(nftArray);
//   } catch (err) {
//     console.error("Error fetching NFTs:", err);
//   }
// };
const fetchNFTs = async () => {
  console.time("⏱ Total NFT Fetch Time");

  try {
    console.time("🔹 Get token count");
    const total = await contract.tokenCounter();
    console.timeEnd("🔹 Get token count");

    const ids = Array.from({ length: Number(total) }, (_, i) => i + 1);

    console.time("🔹 Fetch NFT details");
    const results = await Promise.all(ids.map((id) => contract.getNFTDetails(id)));
    console.timeEnd("🔹 Fetch NFT details");

    const nftArray: NFTData[] = results.map((details, i) => ({
      id: i + 1,
      name: details.name,
      description: details.description,
      image: details.image,
      price: details.price,
      originChainNamespace: details.originChainNamespace,
      originChainId: details.originChainId,
      creator: details.creator,
      totalTips: details.totalTips,
      isListed: details.isListed,
    }));

    setNfts(nftArray);
  } catch (err) {
    console.error("Error fetching NFTs:", err);
  }

  console.timeEnd("⏱ Total NFT Fetch Time");
};


  useEffect(() => {
    fetchNFTs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mintNFT = async () => {
    if (!pushChainClient || connectionStatus !== "connected")
      return alert("Connect wallet first!");

    try {
      setIsLoading(true);
      const data = contract.interface.encodeFunctionData("mintNFT", [
        form.name,
        form.description,
        form.image,
        ethers.parseUnits(form.price || "0", 18),
      ]) as `0x${string}`;

      const tx = await pushChainClient.universal.sendTransaction({
        to: CONTRACT_ADDRESS,
        data,
        value: BigInt(0),
      });

      await tx.wait();
      alert("✅ NFT Minted Successfully!");
      setForm({ name: "", description: "", image: "", price: "" });
      fetchNFTs();
    } catch (err) {
      console.error("Mint error:", err);
      alert("Mint failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const buyNFT = async (id: number, price: bigint) => {
    if (!pushChainClient) return alert("Connect wallet first!");
    try {
      setIsLoading(true);
      const data = contract.interface.encodeFunctionData("buyNFT", [id]) as `0x${string}`;
      const tx = await pushChainClient.universal.sendTransaction({
        to: CONTRACT_ADDRESS,
        data,
        value: price,
      });

      await tx.wait();
      alert("✅ NFT Purchased!");
      fetchNFTs();
    } catch (err) {
      console.error("Buy error:", err);
      alert("Purchase failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const tipCreator = async (id: number) => {
    if (!pushChainClient) return alert("Connect wallet first!");
    const tip = prompt("Enter tip amount in ETH:");
    if (!tip) return;
    try {
      setIsLoading(true);
      const data = contract.interface.encodeFunctionData("tipCreator", [id]) as `0x${string}`;
      const tx = await pushChainClient.universal.sendTransaction({
        to: CONTRACT_ADDRESS,
        data,
        value: ethers.parseEther(tip),
      });

      await tx.wait();
      alert("✅ Tip Sent Successfully!");
      fetchNFTs();
    } catch (err) {
      console.error("Tip error:", err);
      alert("Tip failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700">
      {/* <Header /> */}
      <MintForm form={form} setForm={setForm} mintNFT={mintNFT} isLoading={isLoading} />
      <NFTList nfts={nfts} buyNFT={buyNFT} tipCreator={tipCreator} />
    </div>
  );
};

export default NFTMarketplace;










































































































































































































































































































































































// ####################################################

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import {
//   PushUniversalAccountButton,
//   usePushWalletContext,
//   usePushChainClient,
// } from "@pushchain/ui-kit";

// // ✅ Your deployed contract and Push Donut RPC
// const CONTRACT_ADDRESS = "0xAEd8bd088E629E95da7F3D3823Fa2c7D76B4a008";
// const RPC_URL = "https://evm.rpc-testnet-donut-node1.push.org/";

// // ✅ NFT Type Interface
// interface NFTData {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   price: bigint;
//   originChainNamespace: string;
//   originChainId: string;
//   creator: string;
//   totalTips: bigint;
//   isListed: boolean;
// }

// // ✅ Contract ABI
// const ABI = [
//   "function mintNFT(string _name, string _description, string _image, uint256 _price) external",
//   "function buyNFT(uint256 _tokenId) external payable",
//   "function tipCreator(uint256 _tokenId) external payable",
//   "function getNFTDetails(uint256 _tokenId) external view returns (tuple(string name,string description,string image,uint256 price,string originChainNamespace,string originChainId,address creator,uint256 totalTips,bool isListed))",
//   "function tokenCounter() view returns (uint256)",
// ];

// const NFTMarketplace: React.FC = () => {
//   const { connectionStatus } = usePushWalletContext();
//   const { pushChainClient } = usePushChainClient();

//   const [nfts, setNfts] = useState<NFTData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", description: "", image: "", price: "" });

//   const provider = new ethers.JsonRpcProvider(RPC_URL);
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

//   // ✅ Fetch all NFTs
//   const fetchNFTs = async () => {
//     try {
//       const total = await contract.tokenCounter();
//       const nftArray: NFTData[] = [];
//       for (let i = 1; i <= Number(total); i++) {
//         const details = await contract.getNFTDetails(i);
//         nftArray.push({
//           id: i,
//           name: details.name,
//           description: details.description,
//           image: details.image,
//           price: details.price,
//           originChainNamespace: details.originChainNamespace,
//           originChainId: details.originChainId,
//           creator: details.creator,
//           totalTips: details.totalTips,
//           isListed: details.isListed,
//         });
//       }
//       setNfts(nftArray);
//     } catch (err) {
//       console.error("Error fetching NFTs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNFTs();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ✅ Mint NFT
//   const mintNFT = async () => {
//     if (!pushChainClient || connectionStatus !== "connected")
//       return alert("Connect wallet first!");

//     try {
//       setIsLoading(true);

//       const data = contract.interface.encodeFunctionData("mintNFT", [
//         form.name,
//         form.description,
//         form.image,
//         ethers.parseUnits(form.price || "0", 18),
//       ]) as `0x${string}`;

//       const tx = await pushChainClient.universal.sendTransaction({
//         to: CONTRACT_ADDRESS,
//         data,
//         value: BigInt(0),
//       });

//       await tx.wait();
//       alert("✅ NFT Minted Successfully!");
//       setForm({ name: "", description: "", image: "", price: "" });
//       fetchNFTs();
//     } catch (err) {
//       console.error("Mint error:", err);
//       alert("Mint failed!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Buy NFT
//   const buyNFT = async (id: number, price: bigint) => {
//     if (!pushChainClient) return alert("Connect wallet first!");
//     try {
//       setIsLoading(true);

//       const data = contract.interface.encodeFunctionData("buyNFT", [id]) as `0x${string}`;

//       const tx = await pushChainClient.universal.sendTransaction({
//         to: CONTRACT_ADDRESS,
//         data,
//         value: price,
//       });

//       await tx.wait();
//       alert("✅ NFT Purchased!");
//       fetchNFTs();
//     } catch (err) {
//       console.error("Buy error:", err);
//       alert("Purchase failed!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Tip Creator
//   const tipCreator = async (id: number) => {
//     if (!pushChainClient) return alert("Connect wallet first!");
//     const tip = prompt("Enter tip amount in ETH:");
//     if (!tip) return;
//     try {
//       setIsLoading(true);

//       const data = contract.interface.encodeFunctionData("tipCreator", [id]) as `0x${string}`;

//       const tx = await pushChainClient.universal.sendTransaction({
//         to: CONTRACT_ADDRESS,
//         data,
//         value: ethers.parseEther(tip),
//       });

//       await tx.wait();
//       alert("✅ Tip Sent Successfully!");
//       fetchNFTs();
//     } catch (err) {
//       console.error("Tip error:", err);
//       alert("Tip failed!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8 text-white">
//       <h1 className="mb-6 text-3xl font-bold">🌐 Universal NFT Marketplace</h1>
//       <PushUniversalAccountButton />

//       {/* Mint Section */}
//       <div className="mt-8 p-6 bg-[#1b1b1b] rounded-2xl w-[400px]">
//         <h2 className="mb-4 text-xl font-semibold">Mint New NFT</h2>
//         <input
//           className="w-full mb-3 p-2 rounded bg-[#2a2a2a]"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="w-full mb-3 p-2 rounded bg-[#2a2a2a]"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />
//         <input
//           className="w-full mb-3 p-2 rounded bg-[#2a2a2a]"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />
//         <input
//           className="w-full mb-4 p-2 rounded bg-[#2a2a2a]"
//           placeholder="Price (in ETH)"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />
//         <button
//           onClick={mintNFT}
//           disabled={isLoading}
//           className="w-full py-2 font-bold bg-pink-500 rounded"
//         >
//           {isLoading ? "Minting..." : "Mint NFT"}
//         </button>
//       </div>

//       {/* NFT Listing Section */}
//       <h2 className="mt-10 mb-4 text-2xl font-semibold">All NFTs</h2>
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {nfts.length === 0 && <p>No NFTs minted yet.</p>}
//         {nfts.map((nft) => (
//           <div
//             key={nft.id}
//             className="bg-[#1b1b1b] p-4 rounded-2xl shadow-lg w-[300px]"
//           >
//             <img
//               src={nft.image}
//               alt={nft.name}
//               className="rounded-lg h-[200px] w-full object-cover mb-3"
//             />
//             <h3 className="text-xl font-semibold">{nft.name}</h3>
//             <p className="text-sm text-gray-400">{nft.description}</p>
//             <p className="mt-2 text-sm">
//               Price: {ethers.formatEther(nft.price)} ETH
//             </p>
//             <p className="text-sm">
//               Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
//             </p>
//             <p className="text-sm">
//               Tips: {ethers.formatEther(nft.totalTips)} ETH
//             </p>

//             {nft.isListed ? (
//               <button
//                 onClick={() => buyNFT(nft.id, nft.price)}
//                 className="w-full py-2 mt-3 font-bold bg-green-500 rounded"
//               >
//                 Buy
//               </button>
//             ) : (
//               <p className="mt-3 text-red-400">Not for sale</p>
//             )}

//             <button
//               onClick={() => tipCreator(nft.id)}
//               className="w-full py-2 mt-2 font-bold bg-blue-500 rounded"
//             >
//               Tip Creator
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NFTMarketplace;










// ################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############





























