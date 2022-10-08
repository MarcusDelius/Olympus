import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function UserLogin() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain.id, network: "evm" };
      const { data } = await axios.post("/api/auth/request-message", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const messageObject = data.message;
      const message = messageObject.message;
      try {
        const signature = await signMessageAsync({ message });
        // redirect user after success authentication to '/home' page
        const { url } = await signIn("credentials", {
          message,
          signature,
          redirect: false,
          callbackUrl: "/home",
        });
        push(url);
      } catch (error) {
        return;
        //console.log(error);
      }
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
    if (status === "authenticated" && !isConnected) {
      signOut();
    }
  }, [isConnected, status]);

  return (
    <div className="mx-4">
      <ConnectButton showBalance={false} />
    </div>
  );
}
