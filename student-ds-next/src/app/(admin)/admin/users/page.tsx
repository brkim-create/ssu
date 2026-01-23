"use client";

import { useState } from "react";
import { UserPlus, Ban, X } from "lucide-react";

// mockData imports
import { usersData, bannedWords } from "@/data/mockData";

/**
 * Admin Users Page
 *
 * URL: /admin/users
 * admin-ds-ui App.tsx UsersScreen
 */
export default function AdminUsersPage() {
  const [bannedWordsList, setBannedWordsList] = useState(bannedWords);
  const [showAddBannedWordModal, setShowAddBannedWordModal] = useState(false);
  const [newBannedWord, setNewBannedWord] = useState("");

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
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <UserPlus className="w-3 h-3" /> 새 관리자
        </button>
      </div>

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
                      u.role === "\uC288\uD37C\uAD00\uB9AC\uC790"
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

      {showAddBannedWordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="font-bold mb-4">금칙어 추가</h3>
            <input
              type="text"
              value={newBannedWord}
              onChange={(e) => setNewBannedWord(e.target.value)}
              placeholder="금칙어 입력"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowAddBannedWordModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                취소
              </button>
              <button
                onClick={handleAddBannedWord}
                className="px-4 py-2 bg-pink-500 text-white rounded"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
