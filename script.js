
const questions = [
    {
        question: "1. What is plastic pollution?",
        options: [
            "Planting more trees",
            "Plastic waste harming the environment",
            "Saving water",
            "Using solar energy"
        ],
        answer: 1,
        explanation: "Plastic pollution happens when plastic waste harms our land, water and wildlife."
    },
    {
        question: "2. Which item can help reduce plastic waste?",
        options: [
            "Single-use plastic bag",
            "Disposable plastic cup",
            "Reusable cloth bag",
            "Plastic straw"
        ],
        answer: 2,
        explanation: "A reusable cloth bag helps reduce the need for single-use plastic bags."
    },
    {
        question: "3. How can plastic waste harm sea animals?",
        options: [
            "It gives them clean water",
            "They may swallow it or get trapped in it",
            "It helps them breathe",
            "It provides natural food"
        ],
        answer: 1,
        explanation: "Sea animals can swallow plastic or become trapped in discarded plastic waste."
    },
    {
        question: "4. What should we do with recyclable plastic?",
        options: [
            "Throw it into a river",
            "Burn it in the open",
            "Leave it on the road",
            "Separate it and send it for proper recycling"
        ],
        answer: 3,
        explanation: "Separate recyclable plastic and use the appropriate recycling collection system."
    },
    {
        question: "5. Which action is best for reducing plastic pollution?",
        options: [
            "Using a reusable water bottle",
            "Throwing wrappers outdoors",
            "Using more disposable items",
            "Burning plastic waste"
        ],
        answer: 0,
        explanation: "Reusable bottles reduce the need for disposable plastic bottles."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const quizBox = document.getElementById("quiz-box");

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See My Score →"
            : "Next Question →";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.className = "quiz-option";

        button.addEventListener("click", () => {
            if (answered) return;

            answered = true;

            const allOptions =
                optionsElement.querySelectorAll("button");

            allOptions.forEach((item, i) => {
                item.disabled = true;

                if (i === q.answer) {
                    item.classList.add("correct");
                }
            });

            if (index === q.answer) {
                score++;
                feedbackElement.textContent =
                    "✅ Correct! " + q.explanation;
            } else {
                button.classList.add("incorrect");
                feedbackElement.textContent =
                    "❌ Not quite. " + q.explanation;
            }

            nextButton.disabled = false;
        });

        optionsElement.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        quizBox.hidden = true;
        scoreElement.hidden = false;
        restartButton.hidden = false;

        scoreElement.textContent =
            "🎉 Your Score: " + score + " / " + questions.length;

        feedbackElement.textContent = "";
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    quizBox.hidden = false;
    scoreElement.hidden = true;
    restartButton.hidden = true;

    showQuestion();
});

showQuestion();
