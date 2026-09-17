import { courses } from "../data/coursesdata";
import CourseExplorer from "../components/CourseExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main>
      <CourseExplorer initialCourses={courses} />
    </main>
  );
}