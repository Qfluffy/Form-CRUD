"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../types/course";
import CourseCard from "./CoursesCard";
import { courses } from "../data/coursesdata";
import CourseForm, { CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
    initialCourses: Course[];
};

function handleCreate(draft: CourseDraft) {
    // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID 
    const newCourse: Course = {
        id: crypto.randomUUID(),
        code: draft.code.trim(),
        name: draft.name.trim(),
        credit: Number(draft.credit),
        instructor: draft.instructor.trim(),
    };

    setCourses([...courses, newCourse]);
}

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [editingId, setEditingId] = useState<string | null>(null);

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    function handleCreate(draft: CourseDraft) {
        // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID 
        const newCourse: Course = {
            id: crypto.randomUUID(),
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
        };

        setCourses([...courses, newCourse]);
    }

    function handleDelete(id: string) {
        // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข 
        setCourses(courses.filter((course) => course.id !== id));
    }

    function handleUpdate(id: string, draft: CourseDraft) {
        setCourses(
            courses.map((course) =>
                course.id === id
                    ? {
                        ...course,
                        code: draft.code.trim(),
                        name: draft.name.trim(),
                        credit: Number(draft.credit),
                        instructor: draft.instructor.trim(),
                    }
                    : course
            )
        );

        setEditingId(null);
    }

    function handleSave(draft: CourseDraft) {
        if (editingId === null) {
            handleCreate(draft);
            return;
        }

        handleUpdate(editingId, draft);
    }

    const editingCourse = courses.find((course) => course.id === editingId);

    const searchText = keyword.trim().toLowerCase();
    //เก็บการค้นหาไว้ในตัวแปรใหม่
    const visibleCourses = courses.filter(
        (course) =>
            //ค้นหาชื่อวิชา "หรือ" รหัสวิชา
            course.name.toLowerCase().includes(searchText) ||
            course.code.includes(searchText)
    );


    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    function handleToggleFavorite(id: number) {
        setFavoriteIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((favoriteId) => favoriteId !== id)
                : [...prevIds, id]
        );
    }


    return (
        <div className="mx-auto max-w-2xl p-4">
            <input className="border border-gray-300 rounded-md p-2 w-full mb-4"

                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
            />

            {visibleCourses.length === 0 ? (
                <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section className="">
                    {visibleCourses.map((course) => (
                        <CourseCard 
                            key={course.code}
                            course={course}
                            // isFavorite={favoriteIds.includes(course.id)}
                            // onToggleFavorite={handleToggleFavorite} />
                            onEdit={() => setEditingId(course.id)}
                            onDelete={() => handleDelete(course.id)} 
                        />    
                    ))}
                </section>
            )}

            <CourseForm
                key={editingId ?? "new"}
                initialCourse={editingCourse}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
            />
        </div>
    );
}
