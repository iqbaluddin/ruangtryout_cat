import Timer from "./Timer";
import {
  // BookOpen,
  LogOut,
} from "lucide-react";

const Header = ({
  duration,
  onEndExam,
  onTimeEnd,
  isExamStarted,
  isExamEnded,
}) => {
  return (
    <header className="bg-linear-to-r from-primary via-primary-dark to-primary-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex justify-between items-center overflow-hidden bg-white p-3 rounded-2xl shadow-lg w-16 h-16 ">
                <img src="/logo1.png" alt="" className="" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  Ruang Tryout
                </h1>
                <p className="text-xs md:text-sm text-white/80 hidden sm:block">
                  Tryout Computer Assisted Test (CAT)
                </p>
              </div>
            </div>
          </div>

          {/* Timer & End Exam - Hanya tampil jika ujian dimulai dan BELUM berakhir */}
          {isExamStarted && !isExamEnded && (
            <div className="flex items-center gap-3 md:gap-4">
              <Timer key={duration} duration={duration} onTimeEnd={onTimeEnd} />
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
