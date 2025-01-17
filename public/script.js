const QUESTIONS = [
  {
    prompt: "Do you know your GROSS annual income/household income?",
    options: [
      "Yes",
      "I look at my income statement regularly and understand the different elements. I just don't know it by heart.",
      "No",
    ],
  },
  {
    prompt: "Do you know your monthly fixed costs?",
    options: ["Yes", "I keep a budget plan and can easily find out", "No"],
  },
  {
    prompt:
      "Do you know your average monthly variable costs (e.g., groceries, leisure, shopping, dining out)?",
    options: [
      "Yes, I track them in detail",
      "I have a rough idea",
      "No, I don't track them",
    ],
  },
  {
    prompt:
      "Do you have money set aside for emergencies (e.g. car breaks down, washing machine needs replacing, etc.)?",
    options: [
      "Yes, more than 1000€",
      "I try to plan for a buffer and put the money aside",
      "No",
    ],
  },
  {
    prompt: "Do you have a financial vision you're working towards?",
    options: ["Yes, I wrote them down", "Yes, I have them in my head", "No"],
  },
  {
    prompt: "Do you have financial goals?",
    options: ["Yes, I wrote them down", "Yes, I have them in my head", "No"],
  },
  {
    prompt: "Do you have a current will?",
    options: ["Yes", "Not yet, but I'm considering it.", "No"],
  },
  {
    prompt:
      "How much do you owe on leases, rentals, car loans, credit cards, or other debts (this does not include investments such as apartment or home loans)?",
    options: [
      "No debts",
      "Debts are less than 10% of my income",
      "Debts are more than 10% of my income",
    ],
  },
  {
    prompt: "How much do you save per month?",
    options: [
      "10% or more before taxes",
      "between 5-10% before taxes",
      "Almost no savings",
    ],
  },
  {
    prompt:
      "Do you review your bank statements regularly to track your spending?",
    options: [
      "Yes, monthly or more often",
      "Occasionally, when I need to",
      "No, I don't review them",
    ],
  },
  {
    prompt: "Do you set a monthly budget for discretionary spending?",
    options: [
      "Yes, and I usually stick to it",
      "Yes, but I often exceed it",
      "No, I don't budget for discretionary spending",
    ],
  },
  {
    prompt:
      "Do you have investments outside of a savings account (e.g., ETFs, stocks, real estate)?",
    options: [
      "Yes, I actively invest",
      "I am planning to start investing soon",
      "No, I don't invest",
    ],
  },
  {
    prompt:
      "Do you have financial protection, such as insurance (e.g., liability, home, car)?",
    options: [
      "Yes, I have all the necessary insurances",
      "I have some but not all",
      "No, I don’t have insurance",
    ],
  },

  {
    prompt: "Do you understand the concept of compound interest?",
    options: [
      "Yes, and I use it in my financial planning",
      "I have a basic understanding",
      "No, I don’t understand it",
    ],
  },

  {
    prompt: "Are you familiar with your credit score and how to improve it?",
    options: [
      "Yes, I check it regularly and understand how it works",
      "I know it exists but don’t track it",
      "No, I don’t know my credit score",
    ],
  },

  {
    prompt:
      "Do you regularly educate yourself about personal finance (e.g., books, courses, articles)?",
    options: [
      "Yes, I actively learn and apply new knowledge",
      "Occasionally, when I come across something relevant",
      "No, I don’t prioritize financial education",
    ],
  },

  {
    prompt:
      "Do you plan for future expenses like holidays, major purchases, or events?",
    options: [
      "Yes, I save in advance for planned expenses",
      "Sometimes, but not consistently",
      "No, I don’t plan for future expenses",
    ],
  },

  {
    prompt: "Do you regularly review and update your financial plans?",
    options: [
      "Yes, at least annually",
      "Occasionally, when major changes happen",
      "No, I don’t have a financial plan",
    ],
  },

  {
    prompt: "Do you involve your family/partner in financial decisions?",
    options: [
      "Yes, we make decisions together",
      "Sometimes, depending on the situation",
      "No, I handle financial decisions on my own",
    ],
  },
];
const OPTION_WEIGHTS = [3, 1, 0];

function calculateResult(e) {
  const quizForm = document.getElementById("quizForm");
  const formData = new FormData(quizForm);

  let total = 0;
  for (const [key, value] of formData.entries()) {
    total += parseInt(value, 10);
  }

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Your score is: ${total}`;
  showResult();
}

function populateQuestions() {
  const quizForm = document.getElementById("quizForm");
  const button = document.getElementById("submit-button").cloneNode(true);
  button.removeAttribute("style");

  for (const [i, q] of Object.entries(QUESTIONS)) {
    const iNum = parseInt(i);
    const questionTemplate = document
      .getElementById("question-template")
      .cloneNode(true);
    questionTemplate.removeAttribute("id");
    questionTemplate.removeAttribute("style");
    const labels = questionTemplate.querySelectorAll("label");
    const inputs = questionTemplate.querySelectorAll("input");

    labels[0].textContent = `${iNum + 1}. ${q.prompt}`;
    for (const [j, v] of Object.entries(q.options)) {
      const jNum = parseInt(j);
      inputs[jNum].value = OPTION_WEIGHTS[jNum];
      inputs[jNum].name = `1${iNum + 1}`;
      // jNum+1 because we 4 labels (the question label and the 3 option labels)
      labels[jNum + 1].appendChild(document.createTextNode(v));
    }

    quizForm.appendChild(questionTemplate);
  }
  document.getElementById("question-template").remove();
  document.getElementById("submit-button").remove();

  quizForm.appendChild(button);
}

function listenToConsentButton() {
  const USER_CONSENTED_KEY = "user_consented"
  const USER_CONSENTED_VALUE = "1"
  document.getElementById("consent-btn").addEventListener("click", () => {
    const banner = document.getElementById("consent-banner");
    banner.classList.add("hidden");

    localStorage.setItem(USER_CONSENTED_KEY, USER_CONSENTED_VALUE);
  });
  const hasBeenConsented = localStorage.getItem(USER_CONSENTED_KEY);
  const consentBanner = document.getElementById("consent-banner");
  if (hasBeenConsented === USER_CONSENTED_VALUE) {
    document.getElementById("consent-banner").remove();
  } else {
    consentBanner.classList.remove("invisible");
  }
}

function listenToQuizSubmission() {
  document.getElementById("submit-button").addEventListener("click", (e) => {
    // checkFormValidity(e)
    e.preventDefault();
    const quizForm = document.getElementById("quizForm");
    if (!quizForm.checkValidity()) {
      showError();
      quizForm.reportValidity();
      return;
    }

    calculateResult();
  });
}

function showError() {
  toggleErrorWithResult(true);
}

function showResult() {
  toggleErrorWithResult(false);
}

function toggleErrorWithResult(showError) {
  const errorMessage = document.getElementById("error-message");
  const resultView = document.getElementById("result");

  if (showError) {
    errorMessage.classList.remove("hidden");
    errorMessage.classList.remove("invisible");
    resultView.classList.add("hidden");

    // Hide the error message after 3 seconds
    setTimeout(() => {
      errorMessage.classList.add("invisible");
    }, 3000);
  } else {
    errorMessage.classList.add("hidden");
    resultView.classList.remove("hidden");
  }
}

window.onload = function () {
  populateQuestions();
  listenToQuizSubmission();
  listenToConsentButton();
};
