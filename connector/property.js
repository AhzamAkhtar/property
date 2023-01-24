import * as anchor from "@project-serum/anchor";
import { use, useEffect, useMemo, useState } from "react";
import { TODO_PROGRAM_PUBKEY } from "../constants";
import todoIDL from "../constants/buzz.json";
import { toast, ToastContainer } from "react-toastify";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { authorFilter } from "../utils";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

export function useProperty() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [loading, setLoading] = useState();

  const [transactionPending, setTransactionPending] = useState(false);
  const [sellerInitialized, setSellerInitialized] = useState(false);
  const [buyerInitialized, setBuyerInitialized] = useState(false);

  const [propertyIndex, setPropertyIndex] = useState(0);

  const [sellerName, setSellerName] = useState();
  const [sellerPofileUrl, setSellerProfileUrl] = useState();
  const [buyerName, setBuyerName] = useState();
  const [buyerProfieUrl, setBuyerProfileUrl] = useState();

  const [propertyTitle, setPropertyTitle] = useState();
  const [propertyDescription, setPropertyDescription] = useState();
  const [propertyPrice, setPropertyPrice] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [propertyFirstImage, setFirstPropertyImage] = useState();
  const [propertySecondImage, setSecondPropertyImage] = useState();
  const [propertyThirdImage, setThirdPropertyImage] = useState();
  const [propertyFourthImage, setFourthPropertyImage] = useState();
  const [propertyFiveImage, setFivePropertyImage] = useState();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(todoIDL, TODO_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const getAllInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          const [sellerPda] = await findProgramAddressSync(
            [utf8.encode("SELLER_STATE"), publicKey.toBuffer()],
            program.programId
          );
          const sellerAccount = await program.account.sellerAccount.fetch(
            sellerPda
          );

          const [buyerPda] = await findProgramAddressSync(
            [utf8.encode("BUYER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const buyerAccount = await program.account.buyerAccount.fetch(
            buyerPda
          );

          if (sellerAccount) {
            setSellerInitialized(true);
          }

          if (buyerAccount) {
            setBuyerInitialized(true);
          }
        } catch (error) {
          console.log(error);
          setBuyerInitialized(false);
          setSellerInitialized(false);
        } finally {
        }
      }
    };
    getAllInfo();
  }, [publicKey, program]);

  const initializeSeller = async () => {
    if (program && publicKey) {
      try {
        setLoading(true);
        setTransactionPending(true);
        const [sellerPda] = findProgramAddressSync(
          [utf8.encode("SELLER_STATE"), publicKey.toBuffer()],
          program.programId
        );
        if (sellerName && sellerPofileUrl) {
          const tx = await program.methods
            .initializedSeller(sellerName, sellerPofileUrl)
            .accounts({
              sellerAccount: sellerPda,
              authority: publicKey,
              SystemProgram: SystemProgram.programId,
            })
            .rpc();
          setSellerInitialized(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setTransactionPending(false);
      } finally {
        setLoading(false);
        setTransactionPending(false);
        setSellerName("");
        setSellerProfileUrl("");
      }
    }
  };

  const initializedBuyer = async () => {
    if (program && publicKey) {
      try {
        setLoading(true);
        setTransactionPending(true);
        const [buyerPda] = await findProgramAddressSync(
          [utf8.encode("BUYER_STATE"), publicKey.toBuffer],
          program.programId
        );

        if ((buyerName, buyerProfieUrl)) {
          const tx = await program.methods
            .initializeBuyer(buyerName, buyerProfieUrl)
            .accounts({
              buyerAccount: buyerPda,
              authority: publicKey,
              SystemProgram: SystemProgram.programId,
            })
            .rpc();
          setBuyerInitialized(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setTransactionPending(false);
      } finally {
        setLoading(false);
        setTransactionPending(false);
        setBuyerName("");
        setBuyerProfileUrl("");
      }
    }
  };

  const listProperty = async () => {
    if (program && publicKey) {
      try {
        setLoading(true);
        setTransactionPending(true);
        const [listPropertyPda] = await findProgramAddressSync(
          [
            utf8.encode("PROPERTY_STATE"),
            publicKey.toBuffer(),
            Uint8Array.from([propertyIndex]),
          ],
          program.programId
        );

        const [sellerPda] = await findProgramAddressSync(
          [utf8.encode("SELLER_STATE"), publicKey.toBuffer],
          program.programId
        );
        if (
          (propertyTitle,
          propertyDescription,
          propertyPrice,
          videoUrl,
          propertyFirstImage,
          propertySecondImage,
          propertyThirdImage,
          propertyFourthImage,
          propertyFiveImage)
        ) {
          const tx = await program.methods
            .listProperty(
              propertyTitle,
              propertyDescription,
              propertyPrice,
              videoUrl,
              propertyFirstImage,
              propertySecondImage,
              propertyThirdImage,
              propertyFourthImage,
              propertyFiveImage
            )
            .accounts({
              sellerAccount: sellerPda,
              propertyAccount: listPropertyPda,
              authority: publicKey,
              SystemProgram: SystemProgram.programId,
            })
            .rpc();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setTransactionPending(false);
      } finally {
        setLoading(false);
        setTransactionPending(false);
        setPropertyTitle("");
        setPropertyDescription("");
        setPropertyPrice("");
        setVideoUrl("");
        setFirstPropertyImage("");
        setSecondPropertyImage("");
        setThirdPropertyImage("");
        setFourthPropertyImage("");
        setFivePropertyImage("");
      }
    }
  };

  const removeProperty = async () => {
    if (program && publicKey) {
      try {
        setLoading(true);
        setTransactionPending(false);
        const [sellerPda] = await findProgramAddressSync(
          [utf8.encode("SELLER_STATE"), publicKey.toBuffer()],
          program.programId
        );

        const [propertyPda] = await findProgramAddressSync([
          utf8.encode("PROPERTY_STATE"),
        ]);
        
      } catch (error) {
      } finally {
      }
    }
  };

  return {
    loading,
    transactionPending,
    sellerName,
    sellerPofileUrl,
    buyerName,
    buyerProfieUrl,
    propertyTitle,
    propertyDescription,
    propertyPrice,
    videoUrl,
    setFirstPropertyImage,
    propertySecondImage,
    propertyThirdImage,
    propertyFourthImage,
    propertyFiveImage,
    initializeSeller,
    initializedBuyer,
    listProperty,
    sellerInitialized,
    buyerInitialized,
  };
}
