import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import Layout from "../components/layout";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";
import {
  chain,
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// Will default to goerli if nothing set in the ENV
export const targetChainId =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0") || 5;

// filter down to just mainnet + optional target testnet chain so that rainbowkit can tell
// the user to switch network if they're on an alternative one
const targetChains = defaultChains.filter(
  (chain) => chain.id === 1 || chain.id === targetChainId
);

export const { chains, provider, webSocketProvider } = configureChains(
  targetChains,
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Example NFT",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/holic/example-nft",
});

const MyApp = ({ Component, pageProps }) => {
  // If avaialbale, use the layout defined at the page level. Else use the default Layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>Example NFT</title>
      </Head>
      <GraphProvider value={graphClient}>
        <WagmiConfig client={wagmiClient}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <RainbowKitProvider chains={chains}>
              {getLayout(<Component {...pageProps} />)}
            </RainbowKitProvider>
          </SessionProvider>
        </WagmiConfig>
      </GraphProvider>
      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default MyApp;
