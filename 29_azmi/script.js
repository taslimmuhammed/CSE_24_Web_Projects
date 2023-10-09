document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin"],
            correctAnswer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Venus"],
            correctAnswer: "Mars"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe"],
            correctAnswer: "Blue Whale"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe"],
            correctAnswer: "Au"
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
            correctAnswer: "Carbon Dioxide"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
            correctAnswer: "Mount Everest"
        },
        {
            question: "Which gas makes up the majority of Earth's atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
            correctAnswer: "Nitrogen"
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Skin"],
            correctAnswer: "Skin"
        },
        {
            question: "Which element is represented by the symbol 'H' on the periodic table?",
            options: ["Hydrogen", "Helium", "Oxygen"],
            correctAnswer: "Hydrogen"
        },
        {
            question: "What is the capital of Japan?",
            options: ["Tokyo", "Kyoto", "Osaka"],
            correctAnswer: "Tokyo"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const nextButton = document.querySelector(".cs29-next-button");
    const feedback = document.querySelector(".cs29-feedback");
    const resultContainer = document.querySelector(".cs29-result");
    const scoreDisplay = document.querySelector(".cs29-score");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        document.querySelector(".cs29-question").textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
        const optionsContainer = document.querySelector(".cs29-options");
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(function (option) {
            const label = document.createElement("label");
            label.classList.add("cs29-option");
            label.innerHTML = `<input type="radio" name="q${currentQuestionIndex}" value="${option}"> ${option}`;
            optionsContainer.appendChild(label);
        });
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name='q${currentQuestionIndex}']:checked`);
        if (selectedOption) {
            if (selectedOption.value === questions[currentQuestionIndex].correctAnswer) {
                score++;
            }
        }
    }

    nextButton.addEventListener("click", function () {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            feedback.textContent = "";
            nextButton.disabled = true;
        } else {
            resultContainer.style.display = "block";
            scoreDisplay.textContent = `${score} / ${questions.length}`;
            nextButton.style.display = "none";
        }
    });

    document.addEventListener("change", function (event) {
        if (event.target.type === "radio") {
            nextButton.disabled = false;
        }
    });

    loadQuestion();
});
