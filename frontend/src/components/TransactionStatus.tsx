"use client";

import React from "react";

interface TransactionStatusProps {
  hash?: string;
  isPending: boolean;
  isConfirmed: boolean;
  error?: string;
}

export function TransactionStatus({
  hash,
  isPending,
  isConfirmed,
  error,
}: TransactionStatusProps) {
  if (!isPending && !isConfirmed && !error) return null;

  return (
    <div className="w-full mt-6">
      {isPending && (
        <div className="font-bold bg-[var(--color-brutal-accent)] px-4 py-2 brutal-border text-center">
          Transaction pending...
        </div>
      )}

      {isConfirmed && (
        <div className="font-bold bg-green-400 px-4 py-2 brutal-border text-center">
          Transaction confirmed!
        </div>
      )}

      {error && (
        <div className="font-bold bg-red-400 px-4 py-2 brutal-border break-words text-sm text-center">
          Error: {error}
        </div>
      )}

      {hash && (
        <div className="text-center mt-4">
          <a
            href={`https://explorer.sepolia.mantle.xyz/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="font-bold underline text-sm hover:text-[var(--color-brutal-primary)]"
          >
            View on Explorer
          </a>
        </div>
      )}
    </div>
  );
}
