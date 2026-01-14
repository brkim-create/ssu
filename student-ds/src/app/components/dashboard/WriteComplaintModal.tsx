import React, { useRef, useState } from "react";
import {
  X,
  FileText,
  Upload,
  RotateCw,
  Trash,
  CircleHelp,
} from "lucide-react";
import { getIcon } from "../../../utils/iconMapper";

interface ComplaintCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  items: string[];
}

interface AttachedFile {
  id: string;
  file: File;
  preview: string;
  rotation: number;
}

interface WriteComplaintModalProps {
  isOpen: boolean;
  category: ComplaintCategory | null;
  onClose: () => void;
  onSubmit: (data: {
    category: ComplaintCategory;
    subCategory: string | null;
    title: string;
    content: string;
    files: AttachedFile[];
    isAnonymous: boolean;
    isPrivate: boolean;
    agreeNotification: boolean;
  }) => void;
}

export default function WriteComplaintModal({
  isOpen,
  category,
  onClose,
  onSubmit,
}: WriteComplaintModalProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [agreeNotification, setAgreeNotification] = useState(false);
  const [showFileInfo, setShowFileInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !category) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - attachedFiles.length);

    newFiles.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}은(는) 10MB를 초과할 수 없습니다.`);
        return;
      }

      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: event.target?.result as string,
            rotation: 0,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const rotateImage = (id: string) => {
    setAttachedFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f
      )
    );
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setAttachedFiles([]);
    setSelectedSubCategory(null);
    setIsAnonymous(false);
    setIsPrivate(true);
    setAgreeNotification(false);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit({
      category,
      subCategory: selectedSubCategory,
      title,
      content,
      files: attachedFiles,
      isAnonymous,
      isPrivate,
      agreeNotification,
    });
    handleClose();
    localStorage.removeItem("complaint_draft");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
        <div className="p-6 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {(() => {
                  const Icon = getIcon(category.icon);
                  return (
                    <Icon
                      className="w-5 h-5"
                      style={{ color: category.color }}
                    />
                  );
                })()}
              </div>
              <h3 className="font-bold text-lg">{category.name}</h3>
            </div>
            <button onClick={handleClose}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              세부 카테고리 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSubCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubCategory === item
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-4 pb-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 font-bold">
                  제목
                </label>
                <span className="text-sm font-medium text-gray-500 text-[12px]">
                  {title.length}/50
                </span>
              </div>
              <input
                type="text"
                placeholder="제목을 입력해주세요 (최대 50자)"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 text-[14px] font-bold">
                  내용
                </label>
                <span className="text-sm font-medium text-gray-500 text-[12px]">
                  {content.length}/100
                </span>
              </div>
              <textarea
                placeholder="민원 내용을 상세히 적어주세요 (최대 100자)"
                rows={6}
                maxLength={100}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 resize-none text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium text-gray-700 font-bold">
                    파일 첨부
                  </label>
                  <button
                    onClick={() => setShowFileInfo(!showFileInfo)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                  >
                    <CircleHelp className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm font-medium text-blue-600 text-[12px]">
                  {attachedFiles.length}/5
                </span>
              </div>

              {showFileInfo && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Upload className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-blue-900 space-y-1">
                      <p className="font-medium">첨부 파일 규격 안내</p>
                      <ul className="space-y-0.5 ml-1">
                        <li>• 최대 5개 파일</li>
                        <li>• 개당 10MB 이하</li>
                        <li>• JPG, PNG, PDF, DOCX</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-[6px] p-4 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={attachedFiles.length >= 5}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={attachedFiles.length >= 5}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">파일 추가</span>
                </button>
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachedFiles.map((fileItem) => (
                    <div
                      key={fileItem.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                        {fileItem.file.type.startsWith("image/") ? (
                          <img
                            src={fileItem.preview}
                            alt={fileItem.file.name}
                            style={{
                              transform: `rotate(${fileItem.rotation}deg)`,
                            }}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {fileItem.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(fileItem.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {fileItem.file.type.startsWith("image/") && (
                          <button
                            onClick={() => rotateImage(fileItem.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                            title="회전"
                          >
                            <RotateCw className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        <button
                          onClick={() => removeFile(fileItem.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="삭제"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                민원 옵션
              </h3>
              <label className="flex items-start gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0"
                />
                <span className="text-gray-700">
                  <span className="font-medium text-[14px]">
                    익명으로 민원
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    민원인 이름 숨김 (관리자는 식별 가능)
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeNotification}
                  onChange={(e) => setAgreeNotification(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0"
                />
                <span className="text-gray-700">
                  <span className="font-medium text-[14px]">
                    처리 알림 수신 동의
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Push, Email로 진행상황을 알려드립니다.
                  </span>
                </span>
              </label>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-800 font-medium text-sm block mb-0.5">
                    나만 보기
                  </span>
                  <span className="text-xs text-gray-500">
                    다른 학생들에게 보이지 않음 (기본값: 공개)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                    isPrivate ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isPrivate ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            접수하기
          </button>
        </div>
      </div>
    </div>
  );
}
