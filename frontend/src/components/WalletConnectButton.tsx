"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { BrutalistButton } from "./BrutalistButton";

export function WalletConnectButton() {
  const { connectors } = useConnect();
  const [uri, setUri] = React.useState<string>("");

  React.useEffect(() => {
    const handleMessage = (message: { type: string; data?: unknown }) => {
      if (message.type === "display_uri" && typeof message.data === "string") {
        setUri(message.data);
      }
    };

    connectors.forEach((connector) => {
      const emitter = (connector as any).emitter;
      if (emitter) {
        emitter.on("message", handleMessage);
      }
    });

    return () => {
      connectors.forEach((connector) => {
        const emitter = (connector as any).emitter;
        if (emitter) {
          emitter.off("message", handleMessage);
        }
      });
    };
  }, [connectors]);

  return (
    <div className="flex flex-col items-end gap-2">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <BrutalistButton onClick={openConnectModal} variant="primary">
                      Connect Wallet
                    </BrutalistButton>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <BrutalistButton onClick={openChainModal} variant="primary">
                      Wrong network
                    </BrutalistButton>
                  );
                }

                return (
                  <div className="flex gap-3">
                    <BrutalistButton
                      onClick={openChainModal}
                      variant="white"
                      className="flex items-center gap-2"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 24, height: 24 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </BrutalistButton>

                    <BrutalistButton onClick={openAccountModal} variant="secondary">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </BrutalistButton>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>

      {uri && (
        <div className="mt-2 w-full max-w-[300px] text-xs font-mono break-all bg-[var(--color-brutal-white)] p-2 brutal-border brutal-shadow cursor-pointer hover:bg-[var(--color-brutal-accent)] transition-colors" onClick={() => {
          navigator.clipboard.writeText(uri);
          alert("WalletConnect URI copied to clipboard!");
        }}>
          <strong>Click to copy URI:</strong><br/>
          {uri}
        </div>
      )}
    </div>
  );
}
