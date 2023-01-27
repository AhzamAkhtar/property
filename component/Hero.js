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
            src="/main.jpg"
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
              color: "white",
            }}
          >
            <div style={{ marginTop: "40vh" }}>
              Buy and Sell Property
              <p>With deProp... </p>
            </div>
          </h1>
          <div class="flex justify-center">
            {isPublicKey ? (
              <>
                <div class="d-flex justify-content-center">
                  {sellerInitialized ? (
                    <>
                      <button
                        onClick={() => router.push("/main")}
                        className="btn btn-light"
                        style={{
                          marginLeft: "25px",
                          padding: "1rem",
                          borderRadius: "50px",
                        }}
                      >
                        <span>List Property</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                      onClick={()=>router.push("/SellerLogin")}
                        type="button"
                        class="btn btn-light"
                        style={{
                          margin: "25px",
                          padding: "1rem",
                          borderRadius: "50px",
                        }}
                      >
                        <span className="text-red-800">
                          Create Your Selling Account
                        </span>
                      </button>
                    </>
                  )}
                  {buyerInitialized ? (
                    <>
                      <button
                        onClick={() => router.push("/main")}
                        class="btn btn-light"
                        style={{
                          marginLeft: "25px",
                          padding: "1rem",
                          borderRadius: "50px",
                        }}
                      >
                        <span>Buy Property</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                      onClick={()=>router.push("/BuyerLogin")}
                        class="btn btn-light"
                        style={{
                          margin: "25px",
                          padding: "1rem",
                          borderRadius: "50px",
                        }}
                      >
                        <span className="text-xl">
                          Create Your User Account
                        </span>
                      </button>
                    </>
                  )}
                </div>
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
