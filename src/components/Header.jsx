import Timer from "./Timer";
import { BookOpen, LogOut, Save } from "lucide-react";

const Header = ({
  duration,
  onEndExam,
  onTimeEnd,
  isExamStarted,
  isExamEnded,
  onSave,
}) => {
  return (
    <header className="bg-linear-to-r from-primary via-primary-dark to-primary-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  CAT BKN
                </h1>
                <p className="text-xs md:text-sm text-white/80 hidden sm:block">
                  Computer Assisted Test
                </p>
              </div>
            </div>
          </div>

          {/* Timer & Actions */}
          {isExamStarted && !isExamEnded && (
            <div className="flex items-center gap-3 md:gap-4">
              <Timer key={duration} duration={duration} onTimeEnd={onTimeEnd} />
              <button
                onClick={onSave}
                className="flex items-center gap-1 md:gap-2 bg-blue-500 hover:bg-blue-600 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                title="Simpan progres dan review"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Simpan</span>
              </button>
              <button
                onClick={onEndExam}
                className="flex items-center gap-1 md:gap-2 bg-red-500 hover:bg-red-600 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Akhiri Ujian</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
