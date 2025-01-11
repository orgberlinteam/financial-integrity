function calculateResult() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);

    let total = 0;
    for (const [key, value] of formData.entries()) {
        total += parseInt(value, 10);
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Your score is: ${total}`;
}
