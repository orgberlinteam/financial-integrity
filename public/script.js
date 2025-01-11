const QUESTIONS = [
    {
        "prompt": "Do you know your GROSS annual income/household income?",
        "options": [
            "Yes",
            "I look at my income statement regularly and understand the different elements. I just don't know it by heart.",
            "No"
        ]
    },
    {
        "prompt": "Do you know your monthly fixed costs?",
        "options": [
            "Yes",
            "I keep a budget plan and can easily find out",
            "No"
        ]
    },
    {
        "prompt": "Do you know how much you spend per month on coffee, drinks, groceries?",
        "options": [
            "Yes",
            "I keep a budget plan and can easily find out",
            "No"
        ]
    },
    {
        "prompt": "Do you have money set aside for emergencies (e.g. car breaks down, washing machine needs replacing, etc.)?",
        "options": [
            "Yes, more than 1000€",
            "I try to plan for a buffer and put the money aside",
            "No"
        ]
    },
    {
        "prompt": "Do you have a financial vision you're working towards?",
        "options": [
            "Yes, I wrote them down",
            "Yes, I have them in my head",
            "No"
        ]
    },
    {
        "prompt": "Do you have financial goals?",
        "options": [
            "Yes, I wrote them down",
            "Yes, I have them in my head",
            "No"
        ]
    },
    {
        "prompt": "Do you have a current will?",
        "options": [
            "Yes",
            "Not yet, but I'm considering it.",
            "No"
        ]
    },
    {
        "prompt": "How much do you owe on leases, rentals, car loans, credit cards, or other debts (this does not include investments such as apartment or home loans)?",
        "options": [
            "No debts",
            "Debts are less than 10% of my income",
            "Debts are more than 10% of my income"
        ]
    },
    {
        "prompt": "How much do you save per month?",
        "options": [
            "10% or more before taxes",
            "between 5-10% before taxes",
            "Almost no savings"
        ]
    },
    {
        "prompt": "Which belief applies to you?",
        "options": [
            "I believe that what you do with money shows who you are",
            "I think money is a good thing",
            "I think money is a bad thing"
        ]
    },
]
const OPTION_WEIGHTS = [3, 1, 0]

function calculateResult(e) {
    e.preventDefault();

    const quizForm = document.getElementById('quizForm');
    const formData = new FormData(quizForm);

    let total = 0;
    for (const [key, value] of formData.entries()) {
        total += parseInt(value, 10);
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Your score is: ${total}`;
}

function populateQuestions() {
    const quizForm = document.getElementById("quizForm")
    const button = document.getElementById("button-template").cloneNode(true)
    button.removeAttribute("style")

    for (const [i, q] of Object.entries(QUESTIONS)) {
        const iNum = parseInt(i)
        const questionTemplate = document.getElementById("question-template").cloneNode(true)
        questionTemplate.removeAttribute("id")
        questionTemplate.removeAttribute("style")
        const labels = questionTemplate.querySelectorAll("label");
        const inputs = questionTemplate.querySelectorAll("input")

        labels[0].textContent = `${iNum+1}. ${q.prompt}`
        for (const [j, v] of Object.entries(q.options)) {
            const jNum = parseInt(j)
            inputs[jNum].value = OPTION_WEIGHTS[jNum]
            inputs[jNum].name = `1${iNum+1}`
            // jNum+1 because we 4 labels (the question label and the 3 option labels)
            labels[jNum+1].appendChild(document.createTextNode(v))
        }

        quizForm.appendChild(questionTemplate)
    }
    quizForm.appendChild(button)

    document.getElementById("button-template").remove()
    document.getElementById("question-template").remove()
}

window.onload = function() {
    populateQuestions()
    document.getElementById("quizForm").addEventListener('submit', (e) =>  calculateResult(e))
}
