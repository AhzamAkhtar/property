import '../styles/globals.css'
import { WalletConnectProvider } from "../component/WalletConnectProvider";
import "../styles/globals.css";
import '@solana/wallet-adapter-react-ui/styles.css'
function MyApp({ Component, pageProps }) {
  return (
    <WalletConnectProvider>
    {/* <Navbar/> */}
    {/* <Hero/> */}
    <Component {...pageProps} />
    </WalletConnectProvider>
  

  )
}

export default MyApp
