import React from "react";

interface MintFormProps {
  form: {
    name: string;
    description: string;
    image: string;
    price: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      image: string;
      price: string;
    }>
  >;
  mintNFT: () => void;
  isLoading: boolean;
}

const MintForm: React.FC<MintFormProps> = ({
  form,
  setForm,
  mintNFT,
  isLoading,
}) => {
  return (
    <div className="mt-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 rounded-3xl bg-gradient-to-br from-[#1C1033] to-[#281D43] shadow-[0_0_35px_rgba(230,57,150,0.2)] backdrop-blur-md border border-[#2e1d4a]/70 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold tracking-wide text-center text-white">
        Mint New NFT
      </h2>

      <div className="flex flex-col gap-4">
        <input
          className="w-full px-5 py-4 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-5 py-4 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="w-full px-5 py-4 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="w-full px-5 py-4 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/60 focus:bg-[#2f214d] transition-all duration-200"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button
          onClick={mintNFT}
          disabled={isLoading}
          className={`mt-5 w-full py-3 rounded-xl font-semibold text-white text-lg tracking-wide transition-all duration-300 ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#E63996] to-[#6A3AB2] hover:opacity-90 shadow-[0_0_15px_rgba(230,57,150,0.5)] hover:shadow-[0_0_25px_rgba(230,57,150,0.8)]"
          }`}
        >
          {isLoading ? "Minting..." : "✨ Mint NFT"}
        </button>
      </div>
    </div>
  );
};

export default MintForm;

















































// import React from "react";

// interface MintFormProps {
//   form: {
//     name: string;
//     description: string;
//     image: string;
//     price: string;
//   };
//   setForm: React.Dispatch<
//     React.SetStateAction<{
//       name: string;
//       description: string;
//       image: string;
//       price: string;
//     }>
//   >;
//   mintNFT: () => void;
//   isLoading: boolean;
// }

// const MintForm: React.FC<MintFormProps> = ({
//   form,
//   setForm,
//   mintNFT,
//   isLoading,
// }) => {
//   return (
//     <div className="mt-10 w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#1C1033] to-[#281D43] shadow-[0_0_25px_rgba(230,57,150,0.2)] backdrop-blur-md border border-[#2e1d4a]/60">
//       <h2 className="mb-6 text-2xl font-semibold tracking-wide text-center text-white">
//         Mint New NFT
//       </h2>

//       <div className="flex flex-col gap-3">
//         <input
//           className="w-full px-4 py-2.5 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="w-full px-4 py-2.5 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />
//         <input
//           className="w-full px-4 py-2.5 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />
//         <input
//           className="w-full px-4 py-2.5 rounded-xl bg-[#2A1E45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63996]/70 focus:bg-[#2f214d] transition-all duration-200"
//           placeholder="Price (in ETH)"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <button
//           onClick={mintNFT}
//           disabled={isLoading}
//           className={`mt-4 w-full py-3 rounded-xl font-semibold text-white text-lg tracking-wide transition-all duration-300 ${
//             isLoading
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-gradient-to-r from-[#E63996] to-[#6A3AB2] hover:opacity-90 shadow-[0_0_15px_rgba(230,57,150,0.5)] hover:shadow-[0_0_25px_rgba(230,57,150,0.8)]"
//           }`}
//         >
//           {isLoading ? "Minting..." : "✨ Mint NFT"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MintForm;









































// import React from "react";

// interface MintFormProps {
//   form: {
//     name: string;
//     description: string;
//     image: string;
//     price: string;
//   };
//   setForm: React.Dispatch<React.SetStateAction<{
//     name: string;
//     description: string;
//     image: string;
//     price: string;
//   }>>;
//   mintNFT: () => void;
//   isLoading: boolean;
// }

// const MintForm: React.FC<MintFormProps> = ({ form, setForm, mintNFT, isLoading }) => {
//   return (
//     <div className="mt-8 p-6 bg-[#1b1b1b] rounded-2xl w-full max-w-md shadow-xl">
//       <h2 className="mb-4 text-xl font-semibold text-white">Mint New NFT</h2>
//       <input
//         className="w-full mb-3 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         className="w-full mb-3 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />
//       <input
//         className="w-full mb-3 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
//         placeholder="Image URL"
//         value={form.image}
//         onChange={(e) => setForm({ ...form, image: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
//         placeholder="Price (in ETH)"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />
//       <button
//         onClick={mintNFT}
//         disabled={isLoading}
//         className={`w-full py-2 rounded font-bold transition-colors ${
//           isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
//         }`}
//       >
//         {isLoading ? "Minting..." : "Mint NFT"}
//       </button>
//     </div>
//   );
// };

// export default MintForm;