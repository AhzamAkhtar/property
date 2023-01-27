import Image from "next/image";
import { CiLogin } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useProperty } from "../connector/property";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
const Hero = () => {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  const { publicKey } = useWallet();
  const router = useRouter();
  const [isPublicKey, setPublicKey] = useState(false);
  const { sellerInitialized, buyerInitialized } = useProperty();
  useEffect(() => {
    const check = () => {
      if (publicKey) {
        setPublicKey(true);
      }
    };
    check();
  }, [publicKey]);
  return (
    <>
      <div id="top">
        <div
          style={{
            zIndex: -1,
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Image
            src="/2.jpg"
            className="rounded-3xl"
            alt="Mountains with snow"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1
            style={{
              paddingTop: "20vh",
              fontFamily: "monospace",
              fontSize: "3.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Buy and Start Property
            <p>With deProp... </p>
          </h1>
          <div class="flex justify-center">
            {isPublicKey ? (
              <>
                {sellerInitialized ? (
                  <>
                    <button
                      onClick={() => router.push("/main")}
                      class={`md:mr-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span>List Property</span>
                      <BsArrowRight className="ml-1 w-5 text-3xl" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      class={`md:ml-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span className="text-xl">
                        Create Your Selling Account
                      </span>
                      <CiLogin className="ml-1 w-8 text-3xl" />
                    </button>
                  </>
                )}
                {buyerInitialized ? (
                  <>
                    <button
                      onClick={() => router.push("/main")}
                      class={`md:mr-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span>Buy Property</span>
                      <BsArrowRight className="ml-1 w-5 text-3xl" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      class={`md:ml-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span className="text-xl">
                        Create Your User Account
                      </span>
                      <CiLogin className="ml-1 w-8 text-3xl" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <WalletMultiButtonDynamic
                  style={{
                    marginRight: "10px",
                    borderRadius: "50vw",
                  }}
                />
              </>
            )}


          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
