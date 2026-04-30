// Simulador Gráfico Interactivo de Funciones
let canvas, ctx;
let currentFunction = 'x^2';
let showVerticalLine = false;
let completedChallenges = new Set();

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('function-canvas');
    ctx = canvas.getContext('2d');
    
    // Configurar el canvas
    setupCanvas();
    
    // Graficar la función inicial
    plotFunction();
    
    // Event listeners para los inputs
    document.getElementById('function-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            plotFunction();
        }
    });
    
    // Event listeners para los rangos
    ['x-min', 'x-max', 'y-min', 'y-max'].forEach(id => {
        document.getElementById(id).addEventListener('change', plotFunction);
    });
});

function setupCanvas() {
    // Configurar el tamaño del canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function plotFunction() {
    const functionInput = document.getElementById('function-input').value;
    if (!functionInput) return;
    
    currentFunction = functionInput;
    document.getElementById('function-display').textContent = `f(x) = ${functionInput}`;
    
    drawGraph();
    analyzeFunction();
}

function drawGraph() {
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar ejes
    drawAxes(xMin, xMax, yMin, yMax);
    
    // Dibujar la función
    drawFunction(xMin, xMax, yMin, yMax);
    
    // Dibujar línea vertical si está activa
    if (showVerticalLine) {
        drawVerticalLine();
    }
}

function drawAxes(xMin, xMax, yMin, yMax) {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // Eje X
    const yZero = height - ((0 - yMin) / (yMax - yMin)) * height;
    ctx.beginPath();
    ctx.moveTo(0, yZero);
    ctx.lineTo(width, yZero);
    ctx.stroke();
    
    // Eje Y
    const xZero = ((0 - xMin) / (xMax - xMin)) * width;
    ctx.beginPath();
    ctx.moveTo(xZero, 0);
    ctx.lineTo(xZero, height);
    ctx.stroke();
    
    // Etiquetas de los ejes
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Etiquetas del eje X
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x !== 0) {
            const xPos = ((x - xMin) / (xMax - xMin)) * width;
            ctx.fillText(x.toString(), xPos, yZero + 20);
        }
    }
    
    // Etiquetas del eje Y
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y !== 0) {
            const yPos = height - ((y - yMin) / (yMax - yMin)) * height;
            ctx.fillText(y.toString(), xZero - 10, yPos + 5);
        }
    }
}

function drawFunction(xMin, xMax, yMin, yMax) {
    const width = canvas.width;
    const height = canvas.height;
    const step = (xMax - xMin) / width;
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    let firstPoint = true;
    
    for (let pixelX = 0; pixelX <= width; pixelX++) {
        const x = xMin + pixelX * step;
        
        try {
            const y = evaluateFunction(currentFunction, x);
            
            if (!isNaN(y) && isFinite(y)) {
                const pixelY = height - ((y - yMin) / (yMax - yMin)) * height;
                
                if (pixelY >= 0 && pixelY <= height) {
                    if (firstPoint) {
                        ctx.moveTo(pixelX, pixelY);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(pixelX, pixelY);
                    }
                } else {
                    firstPoint = true;
                }
            } else {
                firstPoint = true;
            }
        } catch (e) {
            firstPoint = true;
        }
    }
    
    ctx.stroke();
}

function evaluateFunction(func, x) {
    // Reemplazar funciones matemáticas comunes
    let expression = func
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/log/g, 'Math.log')
        .replace(/ln/g, 'Math.log')
        .replace(/e/g, 'Math.E')
        .replace(/pi/g, 'Math.PI');
    
    // Evaluar la expresión
    try {
        return eval(expression);
    } catch (e) {
        throw new Error('Función inválida');
    }
}

function analyzeFunction() {
    // Análisis básico de la función
    const domain = analyzeDomain();
    const range = analyzeRange();
    const symmetry = analyzeSymmetry();
    const growth = analyzeGrowth();
    
    // Actualizar los resultados
    document.getElementById('domain-result').textContent = domain;
    document.getElementById('range-result').textContent = range;
    document.getElementById('symmetry-result').textContent = symmetry;
    document.getElementById('growth-result').textContent = growth.growth;
    document.getElementById('decay-result').textContent = growth.decay;
}

function analyzeDomain() {
    // Análisis simple del dominio
    if (currentFunction.includes('sqrt') || currentFunction.includes('1/')) {
        if (currentFunction.includes('sqrt')) {
            // Para raíces cuadradas, el dominio es donde el radicando >= 0
            return '[0, ∞)';
        } else if (currentFunction.includes('1/')) {
            // Para funciones racionales, el dominio es R excepto donde el denominador = 0
            return 'R - {puntos de discontinuidad}';
        }
    }
    return '(-∞, ∞)';
}

function analyzeRange() {
    // Análisis simple del rango
    if (currentFunction === 'x^2' || currentFunction.includes('sqrt')) {
        return '[0, ∞)';
    } else if (currentFunction === 'x^3') {
        return '(-∞, ∞)';
    } else if (currentFunction === '1/x') {
        return 'R - {0}';
    } else if (currentFunction.includes('sin') || currentFunction.includes('cos')) {
        return '[-1, 1]';
    }
    return '(-∞, ∞)';
}

function analyzeSymmetry() {
    try {
        const testPoints = [1, 2, 3];
        let isEven = true;
        let isOdd = true;
        
        for (let x of testPoints) {
            const fx = evaluateFunction(currentFunction, x);
            const fMinusX = evaluateFunction(currentFunction, -x);
            
            if (Math.abs(fx - fMinusX) > 0.001) {
                isEven = false;
            }
            if (Math.abs(fx + fMinusX) > 0.001) {
                isOdd = false;
            }
        }
        
        if (isEven) return 'Par';
        if (isOdd) return 'Impar';
        return 'Ninguna';
    } catch (e) {
        return 'No se puede determinar';
    }
}

function analyzeGrowth() {
    // Análisis simple de crecimiento/decrecimiento
    const result = {
        growth: 'No se puede determinar',
        decay: 'No se puede determinar'
    };
    
    if (currentFunction === 'x^2') {
        result.growth = '[0, ∞)';
        result.decay = '(-∞, 0]';
    } else if (currentFunction === 'x^3') {
        result.growth = '(-∞, ∞)';
        result.decay = 'Ninguno';
    } else if (currentFunction === '1/x') {
        result.growth = '(-∞, 0)';
        result.decay = '(0, ∞)';
    }
    
    return result;
}

function setFunction(func) {
    document.getElementById('function-input').value = func;
    plotFunction();
}

function toggleVerticalLine() {
    showVerticalLine = !showVerticalLine;
    drawGraph();
}

function drawVerticalLine() {
    const width = canvas.width;
    const height = canvas.height;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Dibujar varias líneas verticales para la prueba
    for (let i = 0; i < 5; i++) {
        const x = xMin + (xMax - xMin) * (i + 1) / 6;
        const pixelX = ((x - xMin) / (xMax - xMin)) * width;
        
        ctx.beginPath();
        ctx.moveTo(pixelX, 0);
        ctx.lineTo(pixelX, height);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
}

function findExtremes() {
    // Análisis simple de extremos
    let extremes = [];
    
    if (currentFunction === 'x^2') {
        extremes = [{x: 0, y: 0, type: 'Mínimo'}];
    } else if (currentFunction === '-x^2') {
        extremes = [{x: 0, y: 0, type: 'Máximo'}];
    } else if (currentFunction === 'x^3 - 3*x') {
        extremes = [
            {x: -1, y: 2, type: 'Máximo'},
            {x: 1, y: -2, type: 'Mínimo'}
        ];
    }
    
    if (extremes.length > 0) {
        drawExtremes(extremes);
        showExtremeInfo(extremes);
    } else {
        alert('No se encontraron extremos para esta función');
    }
}

function drawExtremes(extremes) {
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#dc2626';
    
    extremes.forEach(extreme => {
        const pixelX = ((extreme.x - xMin) / (xMax - xMin)) * width;
        const pixelY = height - ((extreme.y - yMin) / (yMax - yMin)) * height;
        
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function showExtremeInfo(extremes) {
    let info = 'Extremos encontrados:\n';
    extremes.forEach(extreme => {
        info += `${extreme.type}: (${extreme.x}, ${extreme.y})\n`;
    });
    
    // Mostrar información en el panel de resultados
    const resultsDiv = document.getElementById('analysis-results');
    const extremeInfo = document.createElement('div');
    extremeInfo.className = 'mt-3 p-2 bg-red-50 rounded text-sm';
    extremeInfo.innerHTML = `<strong>Extremos:</strong> ${extremes.map(e => `${e.type}: (${e.x}, ${e.y})`).join(', ')}`;
    
    // Eliminar información anterior de extremos
    const oldInfo = resultsDiv.querySelector('.bg-red-50');
    if (oldInfo) {
        oldInfo.remove();
    }
    
    resultsDiv.appendChild(extremeInfo);
}

function startChallenge(challengeNumber) {
    let message = '';
    let answerFunction = '';
    
    switch(challengeNumber) {
        case 1:
            message = 'Desafío 1: Encuentra el dominio y rango de f(x) = √(9-x²)\n\nDominio: [-3, 3]\nRango: [0, 3]\n\nUsa el simulador para graficar esta función y verificar tu respuesta.';
            answerFunction = 'sqrt(9-x^2)';
            break;
        case 2:
            message = 'Desafío 2: Determina si f(x) = x³ - 3x es par, impar o ninguna\n\nRespuesta: Es una función impar porque f(-x) = -f(x)\n\nUsa la herramienta de análisis para verificar.';
            answerFunction = 'x^3-3*x';
            break;
        case 3:
            message = 'Desafío 3: Modela el área de un rectángulo con perímetro 20\n\nÁrea = x(10-x)\nDominio: [0, 10]\nMáximo en x = 5, Área máxima = 25\n\nGrafica esta función para encontrar el máximo.';
            answerFunction = 'x*(10-x)';
            break;
    }
    
    // Mostrar el mensaje
    alert(message);
    
    // Configurar la función en el simulador
    setFunction(answerFunction);
    
    // Marcar el desafío como completado
    completedChallenges.add(challengeNumber);
    updateProgress();
}

function updateProgress() {
    const score = completedChallenges.size;
    const total = 3;
    const percentage = (score / total) * 100;
    
    document.getElementById('progress-score').textContent = `${score}/${total}`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    
    // Mostrar mensaje de felicitación si completó todos
    if (score === total) {
        setTimeout(() => {
            alert('🎉 ¡Felicidades! Has completado todos los desafíos. ¡Sigue practicando!');
        }, 500);
    }
}
