import { courses } from "../../data/coursesdata";

type CoursePageProps = {
    params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
    const { id } = await params;
    // เติม: เมธอดของ Array ที่คืนสมาชิกตัวแรกที่ผ่านเงื่อนไข 
    const course = courses.find((item) => item.id === id);

    if (!course) {
        notFound();
    }

    return <h1>{course?.name}</h1>;
} 