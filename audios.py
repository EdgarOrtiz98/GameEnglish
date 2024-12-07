from gtts import gTTS
import os

# Lista de preguntas y respuestas correctas
questions = [
    {
        "sentence": "I have always been living here in Villahermosa since I borned.",
        "correct": "always",
        "audio": "audio/audio1.mp3"
    },
    {
        "sentence": "We haven’t seen Guillermo since 2022.",
        "correct": "seen",
        "audio": "audio/audio2.mp3"
    },
    {
        "sentence": "Have you met Mike before?",
        "correct": "met",
        "audio": "audio/audio3.mp3"
    },
    {
        "sentence": "They have gone to Chilis every end of cycle since last year.",
        "correct": "gone",
        "audio": "audio/audio4.mp3"
    },
    {
        "sentence": "He hasn’t arrived yet.",
        "correct": "arrived",
        "audio": "audio/audio5.mp3"
    },
    {
        "sentence": "She has just left 5 minutes ago.",
        "correct": "just",
        "audio": "audio/audio6.mp3"
    },
    {
        "sentence": "You haven’t eaten all your vegetables.",
        "correct": "eaten",
        "audio": "audio/audio7.mp3"
    },
    {
        "sentence": "Has she had any trouble with the project so far?",
        "correct": "had",
        "audio": "audio/audio8.mp3"
    },
    {
        "sentence": "They haven’t come to any of our parties since they fought.",
        "correct": "come",
        "audio": "audio/audio9.mp3"
    },
    {
        "sentence": "I haven’t done my homework yet.",
        "correct": "done",
        "audio": "audio/audio10.mp3"
    },
    {
        "sentence": "He has already brought bread last weekend.",
        "correct": "already",
        "audio": "audio/audio11.mp3"
    },
    {
        "sentence": "You have had the same for 5 years.",
        "correct": "had",
        "audio": "audio/audio12.mp3"
    },
    {
        "sentence": "Haven’t we already done it?",
        "correct": "already",
        "audio": "audio/audio13.mp3"
    },
    {
        "sentence": "Hasn’t he arrived yet?",
        "correct": "arrived",
        "audio": "audio/audio14.mp3"
    },
    {
        "sentence": "Have I locked the door?",
        "correct": "locked",
        "audio": "audio/audio15.mp3"
    }
]

# Crear la carpeta de audio si no existe
if not os.path.exists("audio"):
    os.makedirs("audio")

# Función para convertir texto a voz y guardar el archivo
def create_audio(question, audio_file):
    # Crear el texto completo para convertir a voz
    text = question["sentence"]
    
    # Crear un objeto gTTS
    tts = gTTS(text, lang='en')
    
    # Guardar el archivo de audio
    tts.save(audio_file)
    print(f"Audio guardado en: {audio_file}")

# Crear archivos de audio para todas las preguntas
for i, q in enumerate(questions):
    create_audio(q, q["audio"])