"use client";

import React from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { COUNTER_ABI, COUNTER_CONTRACT_ADDRESS } from "../config/contracts";
import { BrutalistButton } from "./BrutalistButton";
import { TransactionStatus } from "./TransactionStatus";

export function CounterCard() {
  const { data: counterValue, refetch } = useReadContract({
    address: COUNTER_CONTRACT_ADDRESS,
    abi: COUNTER_ABI,
    functionName: "getCounter",
  });

  const { data: hash, writeContract, error: writeError, isPending: isWritePending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  React.useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  const handleIncrement = () => {
    if (!COUNTER_CONTRACT_ADDRESS || COUNTER_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      alert("Contract address not set in environment variables. Please deploy and update .env.local");
      return;
    }
    writeContract({
      address: COUNTER_CONTRACT_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "increment",
    });
  };

  const handleDecrement = () => {
    if (!COUNTER_CONTRACT_ADDRESS || COUNTER_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      alert("Contract address not set in environment variables. Please deploy and update .env.local");
      return;
    }
    writeContract({
      address: COUNTER_CONTRACT_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "decrement",
    });
  };

  const isPending = isWritePending || isConfirming;

  return (
    <div className="brutal-card p-8 bg-[var(--color-brutal-white)] text-center flex flex-col items-center max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold uppercase mb-6 tracking-widest">
        Current Value
      </h2>
      
      <div className="text-8xl font-black mb-10 brutal-text-shadow bg-[var(--color-brutal-accent)] w-full py-12 brutal-border brutal-shadow">
        {counterValue !== undefined ? counterValue.toString() : "..."}
      </div>

      <div className="flex justify-between w-full gap-4">
        <BrutalistButton
          onClick={handleDecrement}
          disabled={isPending || (counterValue !== undefined && counterValue === 0n)}
          variant="secondary"
          className="flex-1 text-2xl"
        >
          - 1
        </BrutalistButton>
        <BrutalistButton
          onClick={handleIncrement}
          disabled={isPending}
          variant="primary"
          className="flex-1 text-2xl"
        >
          + 1
        </BrutalistButton>
      </div>

      <TransactionStatus 
        hash={hash}
        isPending={isWritePending || isConfirming}
        isConfirmed={isConfirmed}
        error={writeError ? writeError.message.split("\n")[0] : undefined}
      />
    </div>
  );
}
