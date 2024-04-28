document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    showQuestion();
});

document.getElementById('leave-button').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('question-container').style.display = 'none';
});

document.getElementById('author-button').addEventListener('click', function() {
    swal("Autor:", "Miguel Miranda Marrero", "info");
});

document.getElementById('instagram-button').addEventListener('click', function() {
    window.open('https://www.instagram.com/migueelmirandaa/', '_blank');
});

document.getElementById('github-button').addEventListener('click', function() {
    window.open('https://github.com/LockserOficial', '_blank');
});

document.getElementById('discord-button').addEventListener('click', function() {
    window.open('https://discord.gg/locksershop ', '_blank');
});

let questions = [];

fetch('../Shared/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

let currentQuestionIndex = 0;

function showQuestion() {
    const questionContainer = document.getElementById('question');
    const answerOptions = document.getElementById('answer-options');

    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;
    answerOptions.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.textContent = answer;
        answerElement.classList.add('answer');
        answerElement.addEventListener('click', () => {
            if (index === currentQuestion.correctAnswer) {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    swal("¡Buen trabajo!", "¡Has terminado el cuestionario!", "success");
                }
            } else {
                swal("¡Oops!", "Respuesta incorrecta, intenta de nuevo.", "error");
                currentQuestionIndex = 0; // Return
                showQuestion();
            }
        });

        answerOptions.appendChild(answerElement);
    });
}

showQuestion();