import React from "react";
import { ethers } from "ethers";

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

interface NFTCardProps {
  nft: NFTData;
  buyNFT: (id: number, price: bigint) => void;
  tipCreator: (id: number) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, buyNFT, tipCreator }) => {
  return (
    <div className="bg-[#281D43] bg-opacity-80 backdrop-blur-md p-4 rounded-2xl shadow-[0_0_15px_#7B00FF] w-[300px] transition-all duration-300 hover:shadow-[0_0_25px_#00CFFF] text-white">
      <img
        src={nft.image}
        alt={nft.name}
        className="rounded-lg h-[200px] w-full object-cover mb-3 border border-[#7B00FF] shadow-[0_0_10px_#00CFFF]"
      />
      <h3 className="text-xl font-semibold text-center text-white">{nft.name}</h3>
      <p className="text-sm text-center text-white">{nft.description}</p>
      <p className="mt-2 text-sm text-white">
        -Price: {ethers.formatEther(nft.price)} ETH
      </p>
      <p className="text-sm text-white">
        -Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
      </p>
      <p className="text-sm text-white">
        -Tips: {ethers.formatEther(nft.totalTips)} ETH
      </p>
      <p className="mt-1 text-xs text-white">
        -Origin: {nft.originChainNamespace} / {nft.originChainId}
      </p>

      {nft.isListed ? (
        <button
          onClick={() => buyNFT(nft.id, nft.price)}
          className="bg-gradient-to-r from-[#E63996] to-[#6A3AB2] mt-3 w-full py-2 rounded font-bold text-white hover:scale-105 transition-transform"
        >
          Buy
        </button>
      ) : (
        <p className="mt-3 font-semibold text-red-400">-Not for sale</p>
      )}

      <button
        onClick={() => tipCreator(nft.id)}
        className="bg-gradient-to-r from-[#00CFFF] to-[#7B00FF] mt-2 w-full py-2 rounded font-bold text-white hover:scale-105 transition-transform"
      >
        Tip Creator
      </button>
    </div>
  );
};

export default NFTCard;















// import React from "react";
// import { ethers } from "ethers";

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

// interface NFTCardProps {
//   nft: NFTData;
//   buyNFT: (id: number, price: bigint) => void;
//   tipCreator: (id: number) => void;
// }

// const NFTCard: React.FC<NFTCardProps> = ({ nft, buyNFT, tipCreator }) => {
//   return (
//     <div className="bg-[#1b1b1b] p-4 rounded-2xl shadow-lg w-[300px] hover:shadow-purple-500/30 transition-all duration-300">
//       <img
//         src={nft.image}
//         alt={nft.name}
//         className="rounded-lg h-[200px] w-full object-cover mb-3"
//       />
//       <h3 className="text-xl font-semibold text-white">{nft.name}</h3>
//       <p className="text-sm text-gray-400">{nft.description}</p>
//       <p className="mt-2 text-sm text-white">
//         Price: {ethers.formatEther(nft.price)} ETH
//       </p>
//       <p className="text-sm text-white">
//         Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
//       </p>
//       <p className="text-sm text-white">
//         Tips: {ethers.formatEther(nft.totalTips)} ETH
//       </p>
//       <p className="mt-1 text-xs text-gray-400">
//         Origin: {nft.originChainNamespace} / {nft.originChainId}
//       </p>

//       {nft.isListed ? (
//         <button
//           onClick={() => buyNFT(nft.id, nft.price)}
//           className="w-full py-2 mt-3 font-bold transition-colors bg-green-500 rounded hover:bg-green-600"
//         >
//           Buy
//         </button>
//       ) : (
//         <p className="mt-3 font-semibold text-red-400">Not for sale</p>
//       )}

//       <button
//         onClick={() => tipCreator(nft.id)}
//         className="w-full py-2 mt-2 font-bold transition-colors bg-blue-500 rounded hover:bg-blue-600"
//       >
//         Tip Creator
//       </button>
//     </div>
//   );
// };

// export default NFTCard;