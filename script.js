// Arreglo con las preguntas, respuestas y rutas de audio
const questions = [
    // {
    //     sentence: "I have ______ a book.",
    //     options: ["read", "written", "sang", "danced"],
    //     correct: "written",
    //     audio: "audio/audio1.wav"
    // },
    // {
    //     sentence: "She has ______ her homework.",
    //     options: ["run", "drawn", "cooked", "done"],
    //     correct: "done",
    //     audio: "audio/question2.mp3"
    // },
    {
        sentence: "They have ______ the marathon.",
        options: ["eaten", "slept", "completed", "watched"],
        correct: "completed",
        audio: "audio/question3.mp3"
    }
];

let currentQuestionIndex = 0; // Índice de la pregunta actual
let score = 0; // Puntuación total
let attempts = 0; // Intentos por pregunta
let usedHint = false; // Indica si se usó la pista

// Muestra la pregunta actual
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("sentence").textContent = question.sentence;
    const buttons = document.querySelectorAll(".option");
    const audioElement = document.getElementById("audio");

    // Asignar opciones a botones
    buttons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.setAttribute("data-correct", question.options[index] === question.correct);
    });

    // Configurar el audio
    audioElement.src = question.audio;

    // Reiniciar intentos y pista usada
    document.getElementById("feedback").textContent = "";
    attempts = 0;
    usedHint = false;
}

// Verifica si la respuesta seleccionada es correcta
function checkAnswer(button) {
    const isCorrect = button.getAttribute("data-correct") === "true";

    if (isCorrect) {
        // Calcular puntos según intentos y si usó pista
        let points = 0;
        if (usedHint) {
            points = 0.5; // Máximo si usó pista
        } else if (attempts === 0) {
            points = 2;
        } else if (attempts === 1) {
            points = 1;
        } else if (attempts === 2) {
            points = 0.5;
        }

        score += points;
        document.getElementById("score").textContent = score;

        document.getElementById("feedback").textContent = `Correct! +${points} points`;
        document.getElementById("feedback").style.color = "#28a745";

        // Avanzar a la siguiente pregunta después de un momento
        setTimeout(() => {
            nextQuestion();
        }, 1000);
    } else {
        attempts++;
        document.getElementById("feedback").textContent = "Incorrect, please try again";
        document.getElementById("feedback").style.color = "#dc3545";
    }
}

// Reproduce el audio de la pista
function playAudio() {
    const audioElement = document.getElementById("audio");
    audioElement.play();
    usedHint = true; // Marcar que usó la pista
}

// Carga la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Juego terminado
        document.getElementById("sentence").textContent = "Thank you for playing";
        document.querySelector(".options").style.display = "none";
        document.getElementById("hint-btn").style.display = "none";
        document.getElementById("feedback").textContent = "";
        document.getElementById("feedback1").textContent = `Final score: ${score}`;
        document.getElementById("feedback1").style.color = "#007bff";
        document.getElementById("reset-btn").style.visibility = "visible";
    }
}

// Reinicia el juego recargando la página
function resetGame() {
    location.reload();
}

// Inicializa el juego
window.onload = loadQuestion;