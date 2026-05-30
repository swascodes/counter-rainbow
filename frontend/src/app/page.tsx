import { CounterCard } from "../components/CounterCard";
import { WalletConnectButton } from "../components/WalletConnectButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center p-8 font-sans">
      <header className="w-full max-w-5xl flex justify-between items-center mb-16 brutal-border bg-[var(--color-brutal-white)] p-6 brutal-shadow">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            Web3 Counter
          </h1>
          <p className="font-bold text-lg bg-[var(--color-brutal-accent)] px-2 inline-block w-max mt-2 border-2 border-black">
            Powered by Mantle Sepolia
          </p>
        </div>
        <WalletConnectButton />
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <CounterCard />
      </main>

      <footer className="mt-16 w-full max-w-5xl text-center font-bold border-t-4 border-black pt-8">
        Built with Next.js 15, Wagmi, and Neo-Brutalism
      </footer>
    </div>
  );
}
