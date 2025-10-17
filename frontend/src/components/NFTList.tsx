import React from "react";
import NFTCard from "./NFTCard";

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

interface NFTListProps {
  nfts: NFTData[];
  buyNFT: (id: number, price: bigint) => void;
  tipCreator: (id: number) => void;
}

const NFTList: React.FC<NFTListProps> = ({ nfts, buyNFT, tipCreator }) => {
  return (
    <section className="w-full px-4 mx-auto mt-12 max-w-7xl">
      <h2 className="mb-6 text-2xl font-semibold text-center text-white">All NFTs</h2>
      {nfts.length === 0 ? (
        <p className="text-center text-gray-400">No NFTs minted yet.</p>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              buyNFT={buyNFT}
              tipCreator={tipCreator}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default NFTList;
//  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-items-center
























// import React from "react";
// import NFTCard from "./NFTCard";

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

// interface NFTListProps {
//   nfts: NFTData[];
//   buyNFT: (id: number, price: bigint) => void;
//   tipCreator: (id: number) => void;
// }

// const NFTList: React.FC<NFTListProps> = ({ nfts, buyNFT, tipCreator }) => {
//   return (
//     <section className="w-full px-4 mx-auto mt-12 max-w-7xl">
//       <h2 className="mb-6 text-2xl font-semibold text-center text-white">All NFTs</h2>
//       {nfts.length === 0 ? (
//         <p className="text-center text-gray-400">No NFTs minted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
//           {nfts.map((nft) => (
//             <NFTCard
//               key={nft.id}
//               nft={nft}
//               buyNFT={buyNFT}
//               tipCreator={tipCreator}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default NFTList;

























// import React from "react";
// import NFTCard from "./NFTCard";

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

// interface NFTListProps {
//   nfts: NFTData[];
//   buyNFT: (id: number, price: bigint) => void;
//   tipCreator: (id: number) => void;
// }

// const NFTList: React.FC<NFTListProps> = ({ nfts, buyNFT, tipCreator }) => {
//   return (
//     <section className="w-full mt-12">
//       <h2 className="mb-6 text-2xl font-semibold text-center text-white">All NFTs</h2>
//       {nfts.length === 0 ? (
//         <p className="text-center text-gray-400">No NFTs minted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
//           {nfts.map((nft) => (
//             <NFTCard key={nft.id} nft={nft} buyNFT={buyNFT} tipCreator={tipCreator} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default NFTList;