import { Save } from "lucide-react";

const ResumePrompt = ({ savedExamData, onResume, onNewExam, formatTime }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Lanjutkan Ujian?</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Anda memiliki ujian yang belum selesai dari sesi sebelumnya.
          </p>
        </div>

        {savedExamData && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Soal Terjawab</span>
                <p className="font-semibold text-gray-800">
                  {Object.keys(savedExamData.answers || {}).length} /{" "}
                  {savedExamData.totalQuestions || 50}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Ditandai Ragu</span>
                <p className="font-semibold text-gray-800">
                  {(savedExamData.flaggedQuestions || []).length}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Waktu</span>
                <p className="font-semibold text-gray-800">
                  {formatTime(savedExamData.timeSpent || 0)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onResume}
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors duration-200"
          >
            Lanjutkan
          </button>
          <button
            onClick={onNewExam}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
          >
            Mulai Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePrompt;
