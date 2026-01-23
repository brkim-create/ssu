"use client";

import { useState } from "react";
import CommonHeader from "../../_components/CommonHeader";
import StudentDetailModal, { StudentData } from "../../_components/modals/StudentDetailModal";
import { ChevronRight } from "lucide-react";

// mockData imports from shared
import { studentList, currentSemester, courses } from "@shared/mockData/data/professor";

// 현재 학기 과목
const currentCourses = courses.filter((c) => c.semester === currentSemester);

/**
 * Student Management Page
 *
 * URL: /professor/students
 * App.tsx 390~415라인 (StudentScreen) 기반 마이그레이션
 *
 * 학생 클릭 시 StudentDetailModal 컴포넌트로 상세 정보 표시
 */
export default function ProfessorStudentsPage() {
  const [selectedCourse, setSelectedCourse] = useState(currentCourses[0]);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  // 학생 클릭 핸들러
  const handleStudentClick = (student: StudentData) => {
    setSelectedStudent(student);
    setShowStudentDetailModal(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowStudentDetailModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="pb-4">
      {/* 공통 헤더 */}
      <CommonHeader title="학생 관리" subtitle="수강생 역량 현황 및 지도">
        {/* 과목 선택 드롭다운 */}
        <div className="mt-4">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const newCourse = currentCourses.find((c) => c.id === Number(e.target.value)) || currentCourses[0];
              setSelectedCourse(newCourse);
            }}
            className="w-full p-3 bg-white/20 text-white rounded-xl border-2 border-white/30 font-medium backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer"
          >
            {currentCourses.map((course) => (
              <option key={course.id} value={course.id} className="bg-gray-800 text-white">
                {course.name} ({course.semester}학기) | {course.students}명 수강
              </option>
            ))}
          </select>
        </div>
      </CommonHeader>

      {/* 학생 목록 */}
      <div className="mx-4 mt-4 space-y-3">
        {studentList.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => handleStudentClick(student)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-xs text-gray-500">
                  {student.studentId} | {student.dept}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["S", "T", "A", "R"] as const).map((comp) => {
                const score = student[comp] as number;
                return (
                  <div
                    key={comp}
                    className={`text-center p-2 rounded-lg ${score < 70 ? "bg-red-50" : "bg-gray-50"}`}
                  >
                    <p className="text-xs text-gray-600 mb-1">{comp}</p>
                    <p className={`font-bold ${score < 70 ? "text-red-600" : "text-gray-800"}`}>{score}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 학생 상세 모달 (분리된 컴포넌트) */}
      <StudentDetailModal
        isOpen={showStudentDetailModal}
        onClose={handleCloseModal}
        studentData={selectedStudent}
      />
    </div>
  );
}
