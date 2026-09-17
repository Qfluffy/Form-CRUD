import { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "g-001",
    title: "Elden Ring",
    platform: "PC",
    estimatedHours: 80,
    status: "กำลังเล่น",
  },
  {
    id: "g-002",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 100,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g-003",
    title: "God of War Ragnarök",
    platform: "PlayStation 5",
    estimatedHours: 40,
    status: "เล่นจบแล้ว",
  },
  {
    id: "g-004",
    title: "Cyberpunk 2077",
    platform: "PC",
    estimatedHours: 60,
    status: "เล่นจบแล้ว",
  },
  {
    id: "g-005",
    title: "Hollow Knight",
    platform: "Nintendo Switch",
    estimatedHours: 35,
    status: "กำลังเล่น",
  },
];