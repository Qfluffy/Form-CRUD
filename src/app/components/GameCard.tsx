import Link from "next/link";
import { Game } from "../types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  const statusColor = {
    "ยังไม่เริ่ม": "bg-gray-100 text-gray-700",
    "กำลังเล่น": "bg-blue-100 text-blue-700",
    "เล่นจบแล้ว": "bg-green-100 text-green-700",
  }[game.status];

  return (
    <article className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
            <Link href={`/games/${game.id}`}>{game.title}</Link>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">แพลตฟอร์ม: {game.platform}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor}`}>
          {game.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        คาดว่าจะใช้เวลา: <span className="font-semibold text-gray-800">{game.estimatedHours}</span> ชั่วโมง
      </p>

      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onEdit}
          className="text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded font-medium transition-colors cursor-pointer"
        >
          แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded font-medium transition-colors cursor-pointer"
        >
          ลบ
        </button>
      </div>
    </article>
  );
}