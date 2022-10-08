import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function UserLogin() {
  return (
    <div className="mx-4">
      <ConnectButton showBalance={false} />
    </div>
  );
}
