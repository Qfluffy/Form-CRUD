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
      <h2>{course.title}</h2> 
      <p>รหัสวิชา: {course.code}</p> 
      <p>{course.credits} หน่วยกิต</p> 
      <p className={course.isOpen ? "font-bold text-green-600" : "font-bold text-red-600"}> 
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"} 
      </p>

      <button 
        type="button" 
        aria-pressed={isFavorite} 
        onClick={() => onToggleFavorite(course.id)} 
        className={isFavorite ? "text-red-600" : ""}
      > 
        {isFavorite ? "❤️ อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"} 
      </button>
      
    </article> 
  ); 
}