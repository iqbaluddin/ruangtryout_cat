import { useReducer, useEffect, useRef } from "react";
import { Clock, AlertTriangle } from "lucide-react";

// Reducer untuk timer
const timerReducer = (state, action) => {
  switch (action.type) {
    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
        showWarning: state.timeLeft <= 61 && state.timeLeft > 1,
      };
    case "RESET":
      return {
        timeLeft: action.payload,
        showWarning: false,
      };
    default:
      return state;
  }
};

const Timer = ({ duration = 7200, onTimeEnd }) => {
  const [state, dispatch] = useReducer(timerReducer, {
    timeLeft: duration,
    showWarning: false,
  });

  const timerRef = useRef(null);
  const isTimeEndCalledRef = useRef(false);
  const onTimeEndRef = useRef(onTimeEnd);

  // Update ref callback
  useEffect(() => {
    onTimeEndRef.current = onTimeEnd;
  }, [onTimeEnd]);

  // Reset timer saat duration berubah
  useEffect(() => {
    dispatch({ type: "RESET", payload: duration });
    isTimeEndCalledRef.current = false;
  }, [duration]);

  // Setup interval timer
  useEffect(() => {
    // Hapus interval lama
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Buat interval baru
    timerRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []); // Empty dependency - hanya berjalan sekali

  // Effect untuk menangani waktu habis
  useEffect(() => {
    if (state.timeLeft <= 0 && !isTimeEndCalledRef.current) {
      isTimeEndCalledRef.current = true;
      if (onTimeEndRef.current) {
        onTimeEndRef.current();
      }
      // Hentikan interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [state.timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    const { timeLeft } = state;
    if (timeLeft < 60) return "text-red-600 animate-pulse";
    if (timeLeft < 300) return "text-red-600";
    if (timeLeft < 600) return "text-yellow-600";
    return "text-white";
  };

  return (
    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm relative">
      {state.showWarning && state.timeLeft > 0 && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap animate-bounce">
          ⚠️ Waktu hampir habis!
        </div>
      )}
      <Clock
        className={`w-5 h-5 ${state.timeLeft < 60 ? "text-red-500" : "text-white"}`}
      />
      <span className={`font-mono font-bold text-lg ${getTimerColor()}`}>
        {formatTime(state.timeLeft)}
      </span>
      {state.timeLeft < 60 && state.timeLeft > 0 && (
        <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
      )}
    </div>
  );
};

export default Timer;
