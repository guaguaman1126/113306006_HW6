let answer = generateAnswer();
let attempts = 0;

function generateAnswer() {
    const digits = Array.from({ length: 10 }, (_, i) => i);
    const answerArray = [];
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * digits.length);
        answerArray.push(digits[index]);
        digits.splice(index, 1);
    }
    return answerArray.join('');
}

function checkAnswer() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!/^\d{4}$/.test(userInput)) {
        alert("請輸入四位數字！");
        return;
    }

    if (new Set(userInput).size !== 4) {
        alert("數字不能重複！");
        return;
    }

    attempts++;
    const result = compareAnswer(userInput, answer);
    const log = document.getElementById("result-log");
    log.innerHTML += `<p>${userInput} => ${result}</p>`;

    if (result === "4A0B") {
        alert(`恭喜答對！總共嘗試次數：${attempts}`);
        resetGame();
    }

    document.getElementById("user-input").value = "";
}

function compareAnswer(input, answer) {
    let A = 0, B = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === answer[i]) {
            A++;
        } else if (answer.includes(input[i])) {
            B++;
        }
    }
    return `${A}A${B}B`;
}

function resetGame() {
    answer = generateAnswer();
    attempts = 0;
    document.getElementById("result-log").innerHTML = "";
}
