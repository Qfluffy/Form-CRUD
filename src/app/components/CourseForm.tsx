"use client";

// 1  import ทั้งหมด 
import { ChangeEvent, FormEvent, useState } from "react";
import { Course } from "../types/course";
// 2  type ของ Props และ type ของข้อมูลในฟอร์ม 
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

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
    // 3  State ของฟอร์มและ State ของข้อความแจ้งเตือน 
    const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
    const [errors, setErrors] = useState<FormErrors>({});

    // 4  ฟังก์ชันตรวจสอบความถูกต้อง 
    type FormErrors = Partial<Record<keyof CourseDraft, string>>;

    function validate(value: CourseDraft): FormErrors {
        const nextErrors: FormErrors = {};

        if (value.code.trim() === "") {
            nextErrors.code = "กรุณาระบุรหัสวิชา";
        }

        // เติม: เมธอดที่ตัดช่องว่างหัวท้ายของข้อความออก 
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

    // 5  ฟังก์ชัน handle สำหรับเหตุการณ์ต่าง ๆ 
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setDraft((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // console.log(draft);

        const nextErrors = validate(draft);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        onSave(draft);
        setDraft(emptyDraft);
        setErrors({});
    }

    // 6  return ส่วนแสดงผล 
    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="code">รหัสวิชา</label>
            <input
                id="code"
                name="code"
                type="text"
                value={draft.code}
                onChange={handleChange}
                // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ 
                aria-invalid={!!errors.code}
                aria-describedby={errors.code ? "code-error" : undefined}
            />
            {errors.code ? <p id="code-error">{errors.code}</p> : null}

            <label htmlFor="name">ชื่อวิชา</label>
        // เติม: ชื่อฟิลด์ใน CourseDraft ที่ช่องนี้รับผิดชอบ
            <input
                id="name"
                name="name"
                type="text"
                value={draft.name}
                onChange={handleChange}
                // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ 
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? <p id="name-error">{errors.name}</p> : null}

            <label htmlFor="credit">หน่วยกิต</label>
            <input
                id="credit"
                name="credit"
                type="number"
                inputMode="numeric"
                min="1"
                max="6"
                value={draft.credit}
                onChange={handleChange}
                // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ 
                aria-invalid={!!errors.credit}
                aria-describedby={errors.credit ? "credit-error" : undefined}
            />
            {errors.credit ? <p id="credit-error">{errors.credit}</p> : null}

            <label htmlFor="instructor">ผู้สอน</label>
            <input
                id="instructor"
                name="instructor"
                type="text"
                value={draft.instructor}
                onChange={handleChange}
                // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ 
                aria-invalid={!!errors.instructor}
                aria-describedby={errors.instructor ? "instructor-error" : undefined}
            />
            {errors.instructor ? <p id="instructor-error">{errors.instructor}</p> : null}

            {/* <button type="submit">บันทึก</button> */}
            <button type="submit">บันทึก</button>
            {initialCourse ? (
                <button type="button" onClick={onCancel}>ยกเลิก</button>
            ) : null}
        </form>
    );
}