import Link from "next/link";
import type { Course } from "../types/course";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="bg-white border border-gray-200 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold text-blue-600 hover:underline">
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </h2>
      <p className="text-gray-600">รหัสวิชา: {course.code}</p>
      <p className="text-gray-600">หน่วยกิต: {course.credit}</p>
      <p className="text-gray-600">ผู้สอน: {course.instructor}</p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          ลบ
        </button>
      </div>
    </article>
  );
}