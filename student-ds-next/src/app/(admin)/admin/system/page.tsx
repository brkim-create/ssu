"use client";

import { useState } from "react";
import { UserPlus, Ban, X } from "lucide-react";
import { usersData, bannedWords } from "@/data/mockData";
import AddUserModal from "./_components/AddUserModal";
import AddBannedWordModal from "./_components/AddBannedWordModal";

/**
 * System Management - Users Page
 *
 * URL: /admin/system
 * 사용자 관리 페이지 (시스템 관리 기본 서브메뉴)
 */
export default function SystemUsersPage() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddBannedWordModal, setShowAddBannedWordModal] = useState(false);
  const [newBannedWord, setNewBannedWord] = useState("");
  const [bannedWordsList, setBannedWordsList] = useState(bannedWords);

  const handleAddBannedWord = () => {
    if (newBannedWord.trim()) {
      setBannedWordsList([...bannedWordsList, newBannedWord.trim()]);
      setNewBannedWord("");
      setShowAddBannedWordModal(false);
    }
  };

  const handleRemoveBannedWord = (index: number) => {
    setBannedWordsList(bannedWordsList.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-900">사용자 관리</h2>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm"
        >
          <UserPlus className="w-3 h-3" /> 새 관리자
        </button>
      </div>

      {/* 사용자 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">이름</th>
              <th className="text-left p-3">부서</th>
              <th className="text-left p-3">권한</th>
              <th className="text-center p-3">상태</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.dept}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      u.role === "슈퍼관리자"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 금칙어 설정 */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-sm">금칙어 설정</h3>
          </div>
          <button
            onClick={() => setShowAddBannedWordModal(true)}
            className="text-xs text-pink-500"
          >
            + 추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {bannedWordsList.map((w, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs flex items-center gap-1"
            >
              {w}
              <button onClick={() => handleRemoveBannedWord(i)}>
                <X className="w-3 h-3 hover:text-red-800" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
      <AddBannedWordModal
        isOpen={showAddBannedWordModal}
        onClose={() => setShowAddBannedWordModal(false)}
        value={newBannedWord}
        onChange={setNewBannedWord}
        onSubmit={handleAddBannedWord}
      />
    </div>
  );
}
