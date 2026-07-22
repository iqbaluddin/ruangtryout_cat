import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import QuestionCard from "../components/QuestionCard";
import ResultModal from "../components/ResultModal";
import LandingPage from "./LandingPage";
import { questions } from "../data/questions";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  FlagOff,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const ExamPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [examResults, setExamResults] = useState(null);

  // const DURATION = 420; // 2 jam
  // const DURATION = 1200; // 2 jam
  const DURATION = 7200; // 2 jam
  const questionsPerPage = 20;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const totalQuestions = questions.length;

  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isExamFinishedRef = useRef(false);
  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Timer hanya berjalan jika ujian dimulai dan belum berakhir
  useEffect(() => {
    if (!isExamStarted || isExamEnded) {
      // Jika ujian sudah berakhir, hentikan timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now();

    timerIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTimeSpent(elapsed);
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isExamStarted, isExamEnded]);

  const handleStartExam = () => {
    setIsExamStarted(true);
    startTimeRef.current = Date.now();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isExamEnded || !isExamStarted) return;
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [currentQuestion]: answerIndex,
      };
      answersRef.current = newAnswers;
      return newAnswers;
    });
  };

  const handleFlagQuestion = () => {
    if (isExamEnded || !isExamStarted) return;
    setFlaggedQuestions((prev) => {
      if (prev.includes(currentQuestion)) {
        return prev.filter((idx) => idx !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
  };

  const handleQuestionSelect = (index) => {
    if (isExamEnded || !isExamStarted) return;
    setCurrentQuestion(index);
    const page = Math.floor(index / questionsPerPage);
    setCurrentPage(page);
  };

  const handlePageChange = (newPage) => {
    if (isExamEnded || !isExamStarted) return;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setCurrentQuestion(newPage * questionsPerPage);
    }
  };

  const handlePrevious = () => {
    if (isExamEnded || !isExamStarted) return;
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isExamEnded || !isExamStarted) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const calculateResults = (currentAnswers) => {
    const answersToUse = currentAnswers || answersRef.current || answers;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const details = [];

    questions.forEach((q, index) => {
      const userAnswer = answersToUse[index];
      const isAnswered = userAnswer !== undefined && userAnswer !== null;
      const isCorrect = isAnswered && userAnswer === q.correctAnswer;

      if (isCorrect) correct++;
      else if (isAnswered) wrong++;
      else unanswered++;

      details.push({
        number: q.number,
        isAnswered: isAnswered,
        isCorrect: isCorrect,
        userAnswer: isAnswered ? String.fromCharCode(65 + userAnswer) : null,
        correctAnswer: String.fromCharCode(65 + q.correctAnswer),
      });
    });

    const score = correct;
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    const isPassed = scorePercentage >= 70;

    return {
      totalQuestions,
      correctAnswers: correct,
      wrongAnswers: wrong,
      unansweredQuestions: unanswered,
      scorePercentage,
      isPassed,
      passingScore: 70,
      details,
    };
  };

  const finishExam = () => {
    if (isExamFinishedRef.current) return;
    isExamFinishedRef.current = true;

    // **HENTIKAN TIMER SECARA PASTI**
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const currentAnswers = answersRef.current;

    if (startTimeRef.current) {
      const finalTimeSpent = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTimeSpent(finalTimeSpent);
    }

    const results = calculateResults(currentAnswers);
    setExamResults(results);

    setIsExamEnded(true);

    setTimeout(() => {
      setShowResults(true);
    }, 100);
  };

  const handleEndExam = async () => {
    if (isExamEnded || isExamFinishedRef.current || !isExamStarted) return;

    const result = await Swal.fire({
      title: "Akhiri Ujian?",
      html: `
      <p>Apakah Anda yakin ingin mengakhiri ujian?</p>
      <br/>
      <p><strong>Jumlah soal yang sudah dijawab:</strong> ${
        Object.keys(answersRef.current).length
      } dari ${totalQuestions} soal</p>
      <p style="color:#d33;">Soal yang belum dijawab akan dianggap salah.</p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Akhiri",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (result.isConfirmed) {
      finishExam();
    }
  };

  const handleTimeEnd = () => {
    if (!isExamEnded && !isExamFinishedRef.current && isExamStarted) {
      finishExam();
      setTimeout(() => {
        Swal.fire({
          title: "Waktu Habis!",
          text: "Waktu ujian telah habis.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }, 200);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleViewResults = () => {
    if (examResults) {
      setShowResults(true);
    } else {
      const currentAnswers = answersRef.current;
      const results = calculateResults(currentAnswers);
      setExamResults(results);
      setShowResults(true);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const isFlagged = flaggedQuestions.includes(currentQuestion);

  if (!isExamStarted) {
    return <LandingPage onStartExam={handleStartExam} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        duration={DURATION}
        onEndExam={handleEndExam}
        onTimeEnd={handleTimeEnd}
        isExamStarted={isExamStarted}
        isExamEnded={isExamEnded} // Kirim status ke Header
      />

      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3">
            <Sidebar
              questions={questions}
              currentQuestion={currentQuestion}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={handleQuestionSelect}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              isExamEnded={isExamEnded}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {isExamEnded ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Ujian Telah Berakhir
                  </h2>
                  <p className="text-gray-600">
                    Anda telah menyelesaikan ujian. Klik tombol "Lihat Hasil"
                    untuk melihat nilai Anda.
                  </p>
                  <button
                    onClick={handleViewResults}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors duration-200"
                  >
                    Lihat Hasil Ujian
                  </button>
                </div>
              </div>
            ) : (
              <>
                <QuestionCard
                  question={currentQuestionData}
                  selectedAnswer={answers[currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-primary/50 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 font-medium"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Sebelumnya
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-primary/50 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 font-medium"
                    >
                      Berikutnya
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleFlagQuestion}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                        transition-all duration-200
                        ${
                          isFlagged
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-300"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }
                      `}
                    >
                      {isFlagged ? (
                        <>
                          <FlagOff className="w-5 h-5" />
                          Batalkan Ragu
                        </>
                      ) : (
                        <>
                          <Flag className="w-5 h-5" />
                          Ragu-ragu
                        </>
                      )}
                    </button>

                    <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">
                        {currentQuestion + 1} / {questions.length} Soal
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showResults && examResults && (
        <ResultModal
          isOpen={showResults}
          onClose={handleCloseResults}
          results={examResults}
          timeSpent={timeSpent}
        />
      )}
    </div>
  );
};

export default ExamPage;
