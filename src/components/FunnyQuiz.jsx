import React, { useState } from "react";
import "../FunnyQuiz.css";

const quizData = [
  {
    question: "بلوز ذا أولوية بحياتك؟",
    options: [
      { label: "نعم نعم", correct: true },
      { label: "أكيد لا", correct: false, evasive: true, fixedSpot: true }
    ],
    wrongText: "🤨 هممم.. الزر شكله ما يبيك تضغطي عليه 😂"
  },
  {
    question: "هل راح تقللي تفاعلك في بلوز؟",
    options: [
      { label: "لا", correct: true },
      { label: "يمكن شوي", correct: false, evasive: true, fixedSpot: true }
    ],
    wrongText: "بلوز بيزعل 😢"
  },
  {
    question: "أعجبك جو الحفلة اليوم؟",
    options: [
      { label: "يس إيفت", correct: true },
      { label: "مو مرّة", correct: false }
    ],
    wrongText: "لازم نعوضك المرة الجاية 💔"
  },
  {
    question: "تقييمك لبلوز بعد اليوم؟",
    options: [
      { label: "100/10", correct: true },
      { label: "6/10", correct: false }
    ],
    wrongText: "6؟ وش هذا التقييم؟! 😤"
  },
  {
    question: "زيزي، بتكملين معانا لسنين؟",
    options: [
      { label: "أكيد بلوز دايمًا", correct: true },
      { label: "بنشوف...", correct: false, evasive: true }
    ],
    wrongText: "الزر مو راضي يثبت! زيزي لازم تبقي 🥺"
  }
];

export default function FunnyQuiz({ onClose = () => {} }) {
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [evasivePositions, setEvasivePositions] = useState({});
  const [showHearts, setShowHearts] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const allAnswered = answers.every(answer => answer === "correct");

  React.useEffect(() => {
    if (allAnswered && answers.length === quizData.length) {
      setTimeout(() => {
        setQuizCompleted(true);
      }, 1000);
    }
  }, [answers, allAnswered]);

  const handleClick = (qIdx, optionIdx, correct, evasive = false) => {
    if (correct) {
      const newAnswers = [...answers];
      newAnswers[qIdx] = "correct";
      setAnswers(newAnswers);

      if (qIdx === 2 && optionIdx === 0) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 2000);
      }
    } else if (!evasive) {
      const newAnswers = [...answers];
      newAnswers[qIdx] = "wrong";
      setAnswers(newAnswers);
    }
  };

  const handleMouseEnter = (qIdx, optIdx) => {
    const key = `${qIdx}-${optIdx}`;
    const option = quizData[qIdx].options[optIdx];
    if (option.evasive) {
      const offset = option.fixedSpot ? 20 : 50;
      const translateX = Math.random() * offset * 2 - offset;
      const translateY = Math.random() * offset * 2 - offset;
      setEvasivePositions((prev) => ({
        ...prev,
        [key]: {
          transition: "transform 0.3s ease",
          transform: `translate(${translateX}px, ${translateY}px)`
        }
      }));
    }
  };

  const resetQuiz = () => {
    setAnswers(Array(quizData.length).fill(null));
    setEvasivePositions({});
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  if (!showQuiz) {
    return (
      <div className="quiz-welcome">
        <h1 className="quiz-welcome-title">بلوز كويز - تحدي الصداقة</h1>
        <div className="quiz-welcome-message">
          <p>!اختبري صداقتك مع زيزي وبلوز</p>
        </div>
        <button className="quiz-start-button" onClick={() => setShowQuiz(true)}>
          <span role="img" aria-label="game">🎮</span> !وقت الكويز
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-completed">
        <h1 className="quiz-completed-title">بلوز كويز - تحدي الصداقة</h1>
        <h2 className="quiz-completed-subtitle">
          <span role="img" aria-label="party">🎉</span> !أحسنتي
        </h2>
        <div className="quiz-completed-birthday">
          <p>
            <span role="img" aria-label="cake">🎂</span> !عيد ميلاد سعيد زيزي
          </p>
          <p>!نحبك كثير ونشكرك على كل شيء</p>
        </div>
        <button className="quiz-restart-button" onClick={resetQuiz}>
          إعادة الكويز
        </button>
      </div>
    );
  }

  return (
    <section className="quiz-section">
      <div className="quiz-close" onClick={onClose}>×</div>
      <h2 className="quiz-title">💙 فقرة الكويز البلوزي 💙</h2>
      {quizData.map((q, qIdx) => (
        <div className="quiz-card" key={qIdx}>
          <p className="quiz-question">{q.question}</p>
          <div className="quiz-options">
            {q.options.map((opt, optIdx) => {
              const key = `${qIdx}-${optIdx}`;
              return (
                <button
                  key={optIdx}
                  className={`quiz-button ${opt.evasive ? "evasive" : ""} ${
                    answers[qIdx] === "correct" && opt.correct ? "correct" : ""
                  }`}
                  onClick={() => handleClick(qIdx, optIdx, opt.correct, opt.evasive)}
                  onMouseEnter={() => handleMouseEnter(qIdx, optIdx)}
                  style={opt.evasive && evasivePositions[key] ? evasivePositions[key] : {}}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {answers[qIdx] === "wrong" && <p className="wrong-text">{q.wrongText}</p>}
        </div>
      ))}

      {showHearts && (
        <div className="heart-container">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="flying-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: `${20 + Math.random() * 20}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
