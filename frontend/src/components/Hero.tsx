import { PushUniversalAccountButton } from "@pushchain/ui-kit";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 text-center text-white">
      <h1 className="text-5xl font-bold">Super NFT Marketplace</h1>
      <p className="max-w-xl mx-auto mt-4 text-lg">
        The largest and unique Super rare NFT marketplace for crypto collectors.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <PushUniversalAccountButton />
        <button
          onClick={() => navigate("/mint")}
          className="px-6 py-2 font-semibold border rounded-lg border-Black"
        >
          Create NFTs →
        </button>
      </div>
    </section>
  );
};
export default Hero;