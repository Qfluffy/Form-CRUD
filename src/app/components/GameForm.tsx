"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Game, GameStatus } from "../types/game";

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string;
  status: GameStatus;
};

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "ยังไม่เริ่ม",
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: game.estimatedHours.toString(),
    status: game.status,
  };
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.title.trim() === "") {
      nextErrors.title = "กรุณาระบุชื่อเกม";
    }

    if (value.platform.trim() === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const hours = Number(value.estimatedHours);
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.estimatedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    return nextErrors;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm space-y-4 mb-6"
    >
      <h2 className="text-lg font-bold text-gray-800">
        {initialGame ? "แก้ไขข้อมูลเกม" : "เพิ่มเกมที่ตั้งใจจะเล่น"}
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          ชื่อเกม
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        />
        {errors.title && (
          <p id="title-error" className="text-xs text-rose-500 mt-1">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
          แพลตฟอร์ม
        </label>
        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          aria-invalid={!!errors.platform}
          aria-describedby={errors.platform ? "platform-error" : undefined}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
        >
          <option value="">-- กรุณาเลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="Xbox Series X/S">Xbox Series X/S</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>
        {errors.platform && (
          <p id="platform-error" className="text-xs text-rose-500 mt-1">
            {errors.platform}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700">
          จำนวนชั่วโมงที่คาดว่าจะใช้เล่น
        </label>
        <input
          id="estimatedHours"
          name="estimatedHours"
          type="number"
          inputMode="numeric"
          min="1"
          value={draft.estimatedHours}
          onChange={handleChange}
          aria-invalid={!!errors.estimatedHours}
          aria-describedby={errors.estimatedHours ? "hours-error" : undefined}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        />
        {errors.estimatedHours && (
          <p id="hours-error" className="text-xs text-rose-500 mt-1">
            {errors.estimatedHours}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          สถานะ
        </label>
        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
        >
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          บันทึก
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}