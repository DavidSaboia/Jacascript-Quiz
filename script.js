// INICIAL DATA

let currentQuestion = 0;

let correcAnswers = 0;

showQuestion();

// EVENTS

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// FUNCTIONS

function showQuestion() {

    if(questions[currentQuestion]) {

        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        // Prevents the display of the scores area, if it is showing.
        document.querySelector('.scoreArea').style.display = 'none';

        // Show questions.
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        // Show options.
        let optionsHtml = '';
        for(let i in q.options) {

            optionsHtml += `<div data-op="${i}" class="option"><span>${[parseInt(i)+1]}</span>${q.options[i]}</div>`;

        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {

            item.addEventListener('click', optionClickEvent);

        });

    } else {
        
        // No more questions.
        finishQuiz();

    }
}

function optionClickEvent(e) {

    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {

        correcAnswers++;

    } 

    currentQuestion++;
    showQuestion();

}

function finishQuiz() {

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

    // Progress bar in 100%.
    document.querySelector('.progress--bar').style.width = '100%';

    let points = Math.floor((correcAnswers / questions.length) * 100);

    document.querySelector('.scorePct').innerHTML = `I got ${points}%`;

    document.querySelector('.scoreText2').innerHTML = `You answered ${questions.length} questions e got ${correcAnswers} right.`

    if(points < 30) {

        document.querySelector('.scoreText1').innerHTML = 'Not good.';

        document.querySelector('.scorePct').style.color = '#FF0000';

    } else if(points >= 30 && points < 70) {

        document.querySelector('.scoreText1').innerHTML = 'Good.';

        document.querySelector('.scorePct').style.color = '#FFFF00';

    }

}

function resetEvent() {

    correcAnswers = 0;
    currentQuestion = 0;
    showQuestion();

}