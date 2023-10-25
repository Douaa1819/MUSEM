const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    const header = question.querySelector('.entete-question');
    const answer = question.querySelector('.reponse');
    const toggleIcon = question.querySelector('.icone');

    header.addEventListener('click', () => {
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggleIcon.textContent = '+';
        } else {
            answer.style.display = 'block';
            toggleIcon.textContent = '-';
        }
    });
});