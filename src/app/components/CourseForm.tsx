"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Course } from "../types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }
  return {
    code: course.code,
    name: course.name,
    credit: course.credit.toString(),
    instructor: course.instructor,
  };
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    if (value.instructor.trim() === "") {
      nextErrors.instructor = "โปรดระบุชื่อผู้สอน";
    }

    return nextErrors;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
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
    <form onSubmit={handleSubmit} noValidate className="border p-4 rounded-lg bg-gray-50 flex flex-col gap-3">
      <h3 className="font-bold text-lg">
        {initialCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}
      </h3>

      <div>
        <label htmlFor="code" className="block text-sm font-medium">รหัสวิชา</label>
        <input
          id="code"
          name="code"
          type="text"
          value={draft.code}
          onChange={handleChange}
          aria-invalid={!!errors.code}
          aria-describedby={errors.code ? "code-error" : undefined}
          className="border border-gray-300 rounded p-1.5 w-full mt-1"
        />
        {errors.code ? <p id="code-error" className="text-red-500 text-sm mt-1">{errors.code}</p> : null}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">ชื่อวิชา</label>
        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="border border-gray-300 rounded p-1.5 w-full mt-1"
        />
        {errors.name ? <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="credit" className="block text-sm font-medium">หน่วยกิต</label>
        <input
          id="credit"
          name="credit"
          type="number"
          inputMode="numeric"
          min="1"
          max="6"
          value={draft.credit}
          onChange={handleChange}
          aria-invalid={!!errors.credit}
          aria-describedby={errors.credit ? "credit-error" : undefined}
          className="border border-gray-300 rounded p-1.5 w-full mt-1"
        />
        {errors.credit ? <p id="credit-error" className="text-red-500 text-sm mt-1">{errors.credit}</p> : null}
      </div>

      <div>
        <label htmlFor="instructor" className="block text-sm font-medium">ผู้สอน</label>
        <input
          id="instructor"
          name="instructor"
          type="text"
          value={draft.instructor}
          onChange={handleChange}
          aria-invalid={!!errors.instructor}
          aria-describedby={errors.instructor ? "instructor-error" : undefined}
          className="border border-gray-300 rounded p-1.5 w-full mt-1"
        />
        {errors.instructor ? <p id="instructor-error" className="text-red-500 text-sm mt-1">{errors.instructor}</p> : null}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          บันทึก
        </button>
        {initialCourse ? (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}