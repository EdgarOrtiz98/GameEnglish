// Arreglo con las preguntas, respuestas y rutas de audio
const questions = [
    {
        sentence: "I have ______ been living here in Villahermosa since I borned.",
        options: ["always", "never", "often", "since"],
        correct: "always",
        audio: "audio/audio1.mp3"
    },
    {
        sentence: "We haven’t ______ Guillermo since 2022.",
        options: ["see", "saw", "seen", "seeing"],
        correct: "seen",
        audio: "audio/audio2.mp3"
    },
    {
        sentence: "Have you ______ Mike before?",
        options: ["meet", "meets", "met", "meeting"],
        correct: "met",
        audio: "audio/audio3.mp3"
    },
    {
        sentence: "They have ______ to Chilis every end of cycle since last year.",
        options: ["gone", "goes", "went", "going"],
        correct: "gone",
        audio: "audio/audio4.mp3"
    },
    {
        sentence: "He hasn’t ______ yet.",
        options: ["arrived", "arrive", "arriving", "arrival"],
        correct: "arrived",
        audio: "audio/audio5.mp3"
    },
    {
        sentence: "She has ______ left 5 minutes ago.",
        options: ["just", "yet", "already", "recently"],
        correct: "just",
        audio: "audio/audio6.mp3"
    },
    {
        sentence: "You haven’t ______ all your vegetables.",
        options: ["eating", "eat", "eaten", "ate"],
        correct: "eaten",
        audio: "audio/audio7.mp3"
    },
    {
        sentence: "Has she ______ any trouble with the project so far?",
        options: ["have", "had", "has", "having"],
        correct: "had",
        audio: "audio/audio8.mp3"
    },
    {
        sentence: "They haven’t ______ to any of our parties since they fought.",
        options: ["come", "comes", "came", "coming"],
        correct: "come",
        audio: "audio/audio9.mp3"
    },
    {
        sentence: "I haven’t ______ my homework yet.",
        options: ["do", "did", "doing", "done"],
        correct: "done",
        audio: "audio/audio10.mp3"
    },
    {
        sentence: "He has ______ brought bread last weekend.",
        options: ["already", "just", "yet", "still"],
        correct: "already",
        audio: "audio/audio11.mp3"
    },
    {
        sentence: "You have ______ the same for 5 years.",
        options: ["had", "has", "have", "having"],
        correct: "had",
        audio: "audio/audio12.mp3"
    },
    {
        sentence: "Haven’t we ______ done it?",
        options: ["already", "just", "yet", "soon"],
        correct: "already",
        audio: "audio/audio13.mp3"
    },
    {
        sentence: "Hasn’t he ______ yet?",
        options: ["arrived", "arrive", "arrives", "arriving"],
        correct: "arrived",
        audio: "audio/audio14.mp3"
    },
    {
        sentence: "Have I ______ the door?",
        options: ["lock", "locked", "locks", "locking"],
        correct: "locked",
        audio: "audio/audio15.mp3"
    }
];

let currentQuestionIndex = 0; // Índice de la pregunta actual
let score = 0; // Puntuación total
let attempts = 0; // Intentos por pregunta
let usedHint = false; // Indica si se usó la pista

const gameArea = document.getElementById('gameArea'); //El div donde aparecen las preguntas
const homepage = document.getElementById('home-page'); //div de inicio (donde aparece el boton de empezar y demas)
startButton.addEventListener('click', startGame); //añadir al boton para empezar la funcion de empezar el juego

//funcion para empezar el juego
function startGame() {
    homepage.style.display = 'none';
    gameArea.style.display = 'block';
}

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
    const scoreElement = document.getElementById("score");
    if (!scoreElement) {
        console.error("Elemento #score no encontrado.");
        return;
    }

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
        document.getElementById("feedback1").innerHTML = `Final score: <span id="score">${score}</span>`;
        document.getElementById("feedback1").style.color = "#007bff";
        document.getElementById("reset-btn").style.visibility = "visible";
        document.querySelector(".instructions-container").style.visibility = "hidden";
        document.body.style.marginTop = "0px";
        document.body.style.marginLeft = "200px";
        document.body.style.alignItems = "center";
    }
}

// Reinicia el juego recargando la página
// Reinicia el juego directamente al área de preguntas
function resetGame() {
    // Reiniciar variables
    currentQuestionIndex = 0;
    score = 0;
    attempts = 0;
    usedHint = false;

    // Actualizar elementos del DOM
    document.getElementById("feedback1").innerHTML = `Score: <span id="score">${score}</span>`;
    document.getElementById("feedback1").style.color = "inherit";
    document.getElementById("options").style.display = "flex";
    document.getElementById("hint-btn").style.display = "inline-block";
    document.getElementById("feedback").textContent = "";
    document.getElementById("reset-btn").style.visibility = "hidden";
    document.querySelector(".instructions-container").style.visibility = "visible";

    // Mostrar el área de juego y ocultar la página de inicio si está visible
    homepage.style.display = 'none';
    gameArea.style.display = 'block';

    // Cargar la primera pregunta
    loadQuestion();
}

// Inicializa el juego
window.onload = loadQuestion;