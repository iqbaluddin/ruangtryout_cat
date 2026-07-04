import {
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Award,
  BarChart3,
} from "lucide-react";

const ResultModal = ({ isOpen, onClose, results, timeSpent }) => {
  if (!isOpen) return null;

  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions,
    scorePercentage,
    isPassed,
    passingScore = 70,
    details,
  } = results;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award
              className={`w-6 h-6 ${isPassed ? "text-green-500" : "text-red-500"}`}
            />
            <h2 className="text-xl font-bold text-gray-800">Hasil Ujian</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-800">
                    {scorePercentage}%
                  </p>
                  <p className="text-sm text-gray-500">Nilai Akhir</p>
                </div>
              </div>
              <div className="absolute -right-2 -top-2">
                {isPassed ? (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    LULUS
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    TIDAK LULUS
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Nilai Kelulusan: {passingScore}%
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-600">Total Soal</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {totalQuestions}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-green-600">Benar</p>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {correctAnswers}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <XCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm font-medium text-red-600">Salah</p>
              </div>
              <p className="text-2xl font-bold text-red-700">{wrongAnswers}</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-600">
                  Tidak Dijawab
                </p>
              </div>
              <p className="text-2xl font-bold text-yellow-700">
                {unansweredQuestions}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-purple-600" />
                <p className="text-sm font-medium text-purple-600">
                  Waktu Selesai
                </p>
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {formatTime(timeSpent)}
              </p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-3">
              Rincian Jawaban
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {details &&
                details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">
                        Soal {detail.number}
                      </span>
                      {detail.isCorrect ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" /> Benar
                        </span>
                      ) : detail.isAnswered ? (
                        <span className="flex items-center gap-1 text-red-600 text-sm">
                          <XCircle className="w-4 h-4" /> Salah
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 text-sm">
                          <AlertCircle className="w-4 h-4" /> Tidak Dijawab
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {detail.isAnswered
                        ? `Jawaban: ${detail.userAnswer}`
                        : "-"}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors duration-200"
            >
              Tutup
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
            >
              Cetak Hasil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
