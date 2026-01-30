"use client";

import { useState } from "react";
import CommonHeader from "../../_components/CommonHeader";
import CourseSelector from "../../_components/CourseSelector";
import StudentDetailModal, { StudentData } from "../../_components/modals/StudentDetailModal";
import { ChevronRight } from "lucide-react";

// mockData imports from shared
import { studentList, currentSemester, courses } from "@shared/mockData/data/professor";

// 현재 학기 과목
const currentCourses = courses.filter((c) => c.semester === currentSemester);

// 과목별 학생 필터링 함수
const getStudentsByCourse = (courseId: number) =>
  studentList.filter((s) => s.courseIds?.includes(courseId));

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

  // 선택된 과목의 수강생 목록
  const filteredStudentList = getStudentsByCourse(selectedCourse.id);
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
        <CourseSelector
          courses={currentCourses}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
        />
      </CommonHeader>

      {/* 학생 목록 */}
      <div className="mx-4 mt-4 space-y-3">
        {filteredStudentList.map((student) => (
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
