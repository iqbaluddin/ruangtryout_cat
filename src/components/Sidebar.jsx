import {
  ChevronLeft,
  ChevronRight,
  // User,
  CheckCircle,
  AlertCircle,
  Circle,
  Lock,
} from "lucide-react";

const Sidebar = ({
  questions,
  currentQuestion,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onPageChange,
  currentPage,
  totalPages,
  isExamEnded = false,
}) => {
  const getQuestionStatus = (index) => {
    if (isExamEnded) return "locked";
    if (currentQuestion === index) return "active";
    if (flaggedQuestions.includes(index)) return "flagged";
    if (answers[index] !== undefined && answers[index] !== null)
      return "answered";
    return "unanswered";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white hover:bg-green-600";
      case "flagged":
        return "bg-yellow-400 text-white hover:bg-yellow-500";
      case "active":
        return "bg-primary text-white hover:bg-primary-dark";
      case "locked":
        return "bg-gray-400 text-white cursor-not-allowed";
      default:
        return "bg-gray-300 text-gray-600 hover:bg-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="w-3 h-3" />;
      case "flagged":
        return <AlertCircle className="w-3 h-3" />;
      case "active":
        return <Circle className="w-3 h-3 fill-white" />;
      case "locked":
        return <Lock className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };

  const startIndex = currentPage * 20;
  const endIndex = Math.min(startIndex + 20, questions.length);
  const pageQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 h-full flex flex-col">
      {/* Profile Card */}
      <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-5 mb-4">
        <h2 className="font-semibold text-gray-800 truncate">
          Tryout Sekolah Rakyat
        </h2>

        {/* <p className="text-sm text-gray-600 leading-relaxed">
          Selamat datang di halaman tryout berbasis{" "}
          <span className="font-medium">Computer Assisted Test (CAT)</span>.
          Bacalah petunjuk pengerjaan dengan saksama sebelum memulai ujian.
        </p> */}
      </div>

      {/* Question Status Legend */}
      <div className="grid grid-cols-2 gap-1.5 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Dijawab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-gray-600">Ragu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-gray-600">Belum</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-gray-600">Aktif</span>
        </div>
      </div>

      {/* Question Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-5 gap-2">
          {pageQuestions.map((q, idx) => {
            const globalIndex = startIndex + idx;
            const status = getQuestionStatus(globalIndex);
            return (
              <button
                key={q.id}
                onClick={() => !isExamEnded && onQuestionSelect(globalIndex)}
                disabled={isExamEnded}
                className={`
                  w-full aspect-square rounded-lg font-semibold text-sm
                  flex items-center justify-center gap-1
                  transition-all duration-200 hover:scale-105
                  ${getStatusColor(status)}
                  ${isExamEnded ? "opacity-60" : ""}
                `}
              >
                {getStatusIcon(status)}
                {q.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isExamEnded}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium text-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <span className="text-sm text-gray-600 font-medium">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || isExamEnded}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium text-gray-700"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
