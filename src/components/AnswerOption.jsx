const AnswerOption = ({ label, text, isSelected, onSelect }) => {
  const letters = ["A", "B", "C", "D", "E"];

  return (
    <div
      onClick={onSelect}
      className={`
        flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200 hover:shadow-md
        ${
          isSelected
            ? "border-primary bg-blue-50 shadow-md"
            : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50"
        }
      `}
    >
      <div
        className={`
        shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
        ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}
      `}
      >
        {letters[label]}
      </div>
      <p
        className={`text-gray-800 leading-relaxed ${isSelected ? "font-medium" : ""}`}
      >
        {text}
      </p>
    </div>
  );
};

export default AnswerOption;
