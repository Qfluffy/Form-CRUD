import type { Metadata } from "next";
import GameExplorer  from "../components/GameExplorer";
import { games } from "../data/gamesdata";

export const metadata: Metadata = {
  title: "Game - รายการเกมที่ตั้งใจจะเล่น",
};

export default function GamesPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">🎮 Game</h1>
        <p className="text-gray-500 text-sm mt-1">
          บันทึกและจัดการรายการเกมที่วางแผนจะเล่น
        </p>
      </header>

      <GameExplorer initialGames={games} />
    </main>
  );
}