import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
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

  const [sellerName , setSellerName] = useState()
  const [sellerPofileUrl , setSellerProfileUrl] = useState()

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
  }, [publicKey, program]);

  const initializeSeller = async () => {
    try {
      if (program && publicKey) {
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
      }
    } catch (error) {
      console.log(error);
      setTransactionPending(false)
    } finally {
        setLoading(false)
        setTransactionPending(false)
        setSellerName("")
        setSellerProfileUrl("")
    }
  }

  const initializedBuyer = async () => {
    
  }



  return{
    loading,
    transactionPending,
    sellerName,
    sellerPofileUrl,
    initializeSeller
  }
}
