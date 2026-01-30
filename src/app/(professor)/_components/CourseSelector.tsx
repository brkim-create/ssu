"use client";

import type { Course } from "@shared/mockData/types/course";

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: Course;
  onCourseChange: (course: Course) => void;
}

/**
 * CourseSelector - 과목 선택 드롭다운
 *
 * CommonHeader 내부에서 사용되는 과목 선택 컴포넌트
 * professor/page.tsx, professor/course/page.tsx, professor/students/page.tsx에서 공통 사용
 */
export default function CourseSelector({
  courses,
  selectedCourse,
  onCourseChange,
}: CourseSelectorProps) {
  return (
    <div className="mt-4">
      <select
        value={selectedCourse.id}
        onChange={(e) => {
          const newCourse = courses.find((c) => c.id === Number(e.target.value));
          if (newCourse) {
            onCourseChange(newCourse);
          }
        }}
        className="w-full p-3 bg-white/20 text-white rounded-xl border-2 border-white/30 font-medium backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer"
      >
        {courses.map((course) => (
          <option key={course.id} value={course.id} className="bg-gray-800 text-white">
            {course.name} ({course.semester}학기) | {course.students}명 수강
          </option>
        ))}
      </select>
    </div>
  );
}
