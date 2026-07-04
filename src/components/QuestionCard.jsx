import AnswerOption from "./AnswerOption";

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  if (!question) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-primary font-semibold mb-3">
          <span className="bg-primary/10 px-3 py-1 rounded-lg text-sm">
            Soal {question.number}
          </span>
        </div>
        <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">
          {question.question}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            label={index}
            text={option}
            isSelected={selectedAnswer === index}
            onSelect={() => onAnswerSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
