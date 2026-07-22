import { useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Flag,
  Clock,
  Save,
  RotateCcw,
  FileText,
} from "lucide-react";
import { saveExamData, clearExamData } from "../utils/storage";

const ReviewModal = ({
  isOpen,
  onClose,
  questions,
  answers,
  flaggedQuestions,
  currentQuestion,
  onQuestionSelect,
  timeSpent,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(currentQuestion);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  if (!isOpen) return null;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers || {}).length;
  const flaggedCount = (flaggedQuestions || []).length;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSaveProgress = () => {
    const dataToSave = {
      answers: answers,
      flaggedQuestions: flaggedQuestions,
      currentQuestion: currentQuestion,
      timeSpent: timeSpent,
      totalQuestions: totalQuestions,
      isExamStarted: true,
    };

    const success = saveExamData(dataToSave);
    if (success) {
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    }
  };

  const handleClearProgress = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus semua progres ujian? Data yang tersimpan akan hilang.",
      )
    ) {
      clearExamData();
      alert("Data ujian berhasil dihapus.");
    }
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    onQuestionSelect(index);
    onClose();
  };

  const getQuestionStatus = (index) => {
    if (flaggedQuestions.includes(index)) return "flagged";
    if (answers[index] !== undefined && answers[index] !== null)
      return "answered";
    return "unanswered";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "flagged":
        return "bg-yellow-400 text-white";
      default:
        return "bg-gray-300 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="w-3 h-3" />;
      case "flagged":
        return <Flag className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "answered":
        return "Terjawab";
      case "flagged":
        return "Ragu-ragu";
      default:
        return "Belum Dijawab";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">
              Review & Simpan Ujian
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {totalQuestions}
              </p>
              <p className="text-sm text-blue-600">Total Soal</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">
                {answeredCount}
              </p>
              <p className="text-sm text-green-600">Terjawab</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">
                {flaggedCount}
              </p>
              <p className="text-sm text-yellow-600">Ragu-ragu</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <p className="text-2xl font-bold text-purple-700">
                  {formatTime(timeSpent)}
                </p>
              </div>
              <p className="text-sm text-purple-600">Waktu</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progres Pengerjaan</span>
              <span>{Math.round((answeredCount / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Daftar Soal</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(index)}
                    className={`
                      w-full aspect-square rounded-lg font-semibold text-sm
                      flex items-center justify-center gap-1
                      transition-all duration-200 hover:scale-105
                      ${getStatusColor(status)}
                      ${selectedQuestion === index ? "ring-2 ring-primary ring-offset-2" : ""}
                    `}
                  >
                    {getStatusIcon(status)}
                    {q.number}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Terjawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-gray-600">Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-gray-600">Belum Dijawab</span>
              </div>
            </div>
          </div>

          {/* Preview Selected Question */}
          {questions[selectedQuestion] && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Soal {questions[selectedQuestion].number}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(getQuestionStatus(selectedQuestion))}`}
                >
                  {getStatusLabel(getQuestionStatus(selectedQuestion))}
                </span>
                {flaggedQuestions.includes(selectedQuestion) && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    ⚑ Ragu
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-800 mb-2">
                {questions[selectedQuestion].question}
              </p>
              {answers[selectedQuestion] !== undefined && (
                <div className="text-sm text-green-600">
                  <span className="font-medium">Jawaban:</span>{" "}
                  {String.fromCharCode(65 + answers[selectedQuestion])}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveProgress}
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Simpan Progres
            </button>
            <button
              onClick={handleClearProgress}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Hapus Progres
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
            >
              Tutup
            </button>
          </div>

          {showSavedMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fadeIn">
              ✅ Progres ujian berhasil disimpan!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
