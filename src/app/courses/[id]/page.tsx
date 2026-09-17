import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses } from "../../data/coursesdata";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);
  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <article className="bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
        <p className="text-gray-700 mb-2">รหัสวิชา: {course.code}</p>
        <p className="text-gray-700 mb-2">หน่วยกิต: {course.credit}</p>
        <p className="text-gray-700 mb-2">ผู้สอน: {course.instructor}</p>
      </article>
    </main>
  );
}