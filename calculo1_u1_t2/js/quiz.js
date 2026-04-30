// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál es la definición correcta de función?",
        options: [
            "Un conjunto de pares ordenados donde cada x tiene un único y",
            "Cualquier relación entre dos variables",
            "Una ecuación con variables",
            "Una tabla de valores"
        ],
        answer: "Un conjunto de pares ordenados donde cada x tiene un único y"
    },
    {
        question: "¿Qué representa el dominio de una función?",
        options: [
            "Los valores que puede tomar x",
            "Los valores que puede tomar y",
            "El punto más alto de la gráfica",
            "El punto más bajo de la gráfica"
        ],
        answer: "Los valores que puede tomar x"
    },
    {
        question: "¿Cuál es el dominio de f(x) = √(9-x²)?",
        options: ["[-3, 3]", "(-∞, ∞)", "[0, 3]", "(-3, 3)"],
        answer: "[-3, 3]"
    },
    {
        question: "¿Qué característica tiene una función par?",
        options: [
            "f(-x) = f(x)",
            "f(-x) = -f(x)",
            "f(x) = -f(x)",
            "f(x) = 0"
        ],
        answer: "f(-x) = f(x)"
    },
    {
        question: "¿Cuál de las siguientes funciones es impar?",
        options: ["f(x) = x³", "f(x) = x²", "f(x) = |x|", "f(x) = x² + 1"],
        answer: "f(x) = x³"
    },
    {
        question: "¿Qué es la prueba de la recta vertical?",
        options: [
            "Un método para determinar si una gráfica es función",
            "Una forma de graficar funciones",
            "Un tipo de coordenada",
            "Una ecuación lineal"
        ],
        answer: "Un método para determinar si una gráfica es función"
    },
    {
        question: "¿Cuál es el rango de f(x) = x²?",
        options: ["[0, ∞)", "(-∞, ∞)", "(-∞, 0]", "[1, ∞)"],
        answer: "[0, ∞)"
    },
    {
        question: "¿En qué intervalo es creciente la función f(x) = x²?",
        options: ["[0, ∞)", "(-∞, 0]", "(-∞, ∞)", "[-1, 1]"],
        answer: "[0, ∞)"
    },
    {
        question: "¿Qué función tiene dominio (-∞, ∞) y rango [0, ∞)?",
        options: ["f(x) = x²", "f(x) = √x", "f(x) = 1/x", "f(x) = sin(x)"],
        answer: "f(x) = x²"
    },
    {
        question: "¿Cuál es la característica principal del dominio de f(x) = 1/x?",
        options: [
            "No puede incluir x = 0",
            "Solo valores positivos",
            "Solo valores negativos",
            "Todos los números reales"
        ],
        answer: "No puede incluir x = 0"
    }
];

const quizContainer = document.getElementById('quiz-container');
if(quizContainer) {
    quizData.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'mb-6';
        questionEl.innerHTML = `<p class="font-semibold mb-2">${index + 1}. ${q.question}</p>`;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2';
        
        q.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option p-3 border-2 border-slate-200 rounded-lg cursor-pointer';
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => {
                questionEl.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                optionEl.classList.add('selected');
            });
            optionsContainer.appendChild(optionEl);
        });
        
        questionEl.appendChild(optionsContainer);
        quizContainer.appendChild(questionEl);
    });
}

const submitQuizBtn = document.getElementById('submit-quiz-btn');
if(submitQuizBtn){
    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        const questions = quizContainer.querySelectorAll('.mb-6');
        const feedbacks = [
            'Correcto: Una función es un conjunto de pares ordenados donde cada x tiene un único y.',
            'Correcto: El dominio representa todos los valores que puede tomar la variable independiente x.',
            'Correcto: El dominio es [-3, 3] porque el radicando 9-x² debe ser mayor o igual a cero.',
            'Correcto: Una función par cumple la condición f(-x) = f(x) para todo x en su dominio.',
            'Correcto: f(x) = x³ es impar porque f(-x) = -x³ = -f(x).',
            'Correcto: La prueba de la recta vertical determina si una gráfica es función.',
            'Correcto: El rango de x² es [0, ∞) porque un cuadrado siempre es no negativo.',
            'Correcto: x² es creciente en [0, ∞) y decreciente en (-∞, 0].',
            'Correcto: x² tiene dominio (-∞, ∞) y rango [0, ∞).',
            'Correcto: 1/x no está definida en x = 0, por lo que no puede incluir este valor.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Una función es un conjunto de pares ordenados donde cada x tiene un único y.',
            'Incorrecto. El dominio representa los valores que puede tomar x.',
            'Incorrecto. El dominio es [-3, 3] porque 9-x² ≥ 0.',
            'Incorrecto. Una función par cumple f(-x) = f(x).',
            'Incorrecto. f(x) = x³ es impar porque f(-x) = -f(x).',
            'Incorrecto. La prueba de la recta vertical determina si una gráfica es función.',
            'Incorrecto. El rango de x² es [0, ∞) porque x² ≥ 0.',
            'Incorrecto. x² es creciente en [0, ∞) y decreciente en (-∞, 0].',
            'Incorrecto. x² tiene dominio (-∞, ∞) y rango [0, ∞).',
            'Incorrecto. 1/x no está definida en x = 0.'
        ];
        questions.forEach((q, index) => {
            const selectedOption = q.querySelector('.quiz-option.selected');
            let feedbackDiv = q.querySelector('.quiz-feedback');
            if (!feedbackDiv) {
                feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'quiz-feedback mt-2 text-sm';
                q.appendChild(feedbackDiv);
            }
            if (selectedOption && selectedOption.textContent === quizData[index].answer) {
                score++;
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'>✔️ ${feedbacks[index]}</span>`;
            } else {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ ${wrongFeedbacks[index]}</span>`;
            }
        });
        const resultEl = document.getElementById('quiz-result');
        resultEl.textContent = `Tu puntuación es: ${score} de ${quizData.length}.`;
        if (score / quizData.length >= 0.7) {
            resultEl.className = 'mt-4 text-lg font-bold text-green-700';
        } else {
            resultEl.className = 'mt-4 text-lg font-bold text-red-700';
        }
    });
}