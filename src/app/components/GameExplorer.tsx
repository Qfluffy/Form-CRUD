"use client";

import { useState, type ChangeEvent } from "react";
import { Game } from "../types/game";
import GameCard from "./GameCard";
import GameForm, { GameDraft } from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform,
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status,
    };
    setGames([...games, newGame]);
  }

  function handleDelete(id: string) {
    setGames(games.filter((game) => game.id !== id));
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames(
      games.map((game) =>
        game.id === id
          ? {
              ...game,
              title: draft.title.trim(),
              platform: draft.platform,
              estimatedHours: Number(draft.estimatedHours),
              status: draft.status,
            }
          : game
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const editingCourse = games.find((game) => game.id === editingId);

  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchText) ||
      game.platform.toLowerCase().includes(searchText)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      {/* คอลัมน์ฝั่งซ้าย: ฟอร์มเพิ่ม/แก้ไขเกม (กว้าง 5 จาก 12 ส่วน) */}
      <section className="md:col-span-5 md:sticky md:top-20">
        <GameForm
          key={editingId ?? "new"}
          initialGame={editingCourse}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      {/* คอลัมน์ฝั่งขวา: ค้นหาและรายการเกมทั้งหมด (กว้าง 7 จาก 12 ส่วน) */}
      <section className="md:col-span-7 space-y-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <input
            type="search"
            aria-label="ค้นหาเกม"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อเกมหรือแพลตฟอร์ม..."
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {visibleGames.length === 0 ? (
          <div className="bg-white border border-gray-200 p-8 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-500">ไม่พบเกมที่ตรงกับเงื่อนไข</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={() => setEditingId(game.id)}
                onDelete={() => handleDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}