// 🌗 Theme Toggle Logic
const themeSwitcher = document.getElementById("themeSwitcher");
const themeLabel = document.getElementById("themeLabel");
const body = document.body;

// Default theme state (no localStorage)
let currentTheme = "dark";

function setTheme(theme) {
    if (theme === "light") {
        body.classList.remove("dark");
        body.classList.add("light");
        themeSwitcher.checked = true;
        themeLabel.textContent = "☀️ Light Mode";
        currentTheme = "light";
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        themeSwitcher.checked = false;
        themeLabel.textContent = "🌙 Dark Mode";
        currentTheme = "dark";
    }
}

themeSwitcher.addEventListener("change", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

// 🎮 Button Functionality
const outputBox = document.getElementById("output");
const buttons = document.querySelectorAll(".menu button");
let scrollTimeout;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        clearTimeout(scrollTimeout);
        const toolName = button.innerText.trim().toLowerCase();
        outputBox.innerHTML = '<div class="loading"></div> Loading...';

        // Scroll to output
        outputBox.scrollIntoView({ behavior: "smooth" });

        // Auto-scroll back to menu after 8s if no new click
        scrollTimeout = setTimeout(() => {
            document.querySelector(".menu").scrollIntoView({ behavior: "smooth" });
            document.querySelector(".menu").classList.add("bounce-menu");
            setTimeout(() => {
                document.querySelector(".menu").classList.remove("bounce-menu");
            }, 1000);
        }, 8000);

        // Load selected tool
        setTimeout(() => {
            switch (toolName) {
                case "bmi calculator": runBMIModal(); break;
                case "tip calculator": runTipModal(); break;
                case "fizzbuzz": runFizzBuzz(); break;
                case "reverse a number": runReverseModal(); break;
                case "days converter": runDaysModal(); break;
                case "number guessing game": runNumberGuessing(); break;
                case "student grade calculator": runGradeModal(); break;
                case "rock, paper, scissors": runRPSModal(); break;
                case "atm cash dispenser": runATMModal(); break;
                case "login system": runLoginModal(); break;
                default: outputBox.innerHTML = "Unknown tool.";
            }
        }, 400);
    });
});

// 🪟 Modal Support
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalSubmit = document.getElementById("modalSubmit");
const modalClose = document.getElementById("modalClose");

function openModal(title, html, onSubmit) {
    modalTitle.textContent = title;
    modalContent.innerHTML = html;
    modalOverlay.classList.remove("hidden");

    const handler = () => {
        onSubmit();
        closeModal();
        modalSubmit.removeEventListener("click", handler);
    };
    modalSubmit.addEventListener("click", handler);
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);

// Close modal when clicking outside
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// 🧮 BMI Calculator
function runBMIModal() {
    openModal("BMI Calculator", `
        <input type="number" id="weight" placeholder="Weight in kg" step="0.1">
        <input type="number" id="height" placeholder="Height in meters" step="0.01">
    `, () => {
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            outputBox.innerHTML = "⚠️ Please enter valid weight and height.";
            return;
        }
        const bmi = weight / (height * height);
        let category =
            bmi < 18.5 ? "Underweight" :
            bmi < 25 ? "Normal" :
            bmi < 30 ? "Overweight" : "Obese";

        outputBox.innerHTML = `
            🧮 <strong>Your BMI:</strong> ${bmi.toFixed(2)}<br>
            📊 <strong>Category:</strong> ${category}
        `;
    });
}

// 💰 Tip Calculator
function runTipModal() {
    openModal("Tip Calculator", `
        <input type="number" id="bill" placeholder="Bill amount" step="0.01">
        <input type="number" id="tip" placeholder="Tip %" step="0.1">
    `, () => {
        const bill = parseFloat(document.getElementById("bill").value);
        const tip = parseFloat(document.getElementById("tip").value);
        if (isNaN(bill) || isNaN(tip) || bill <= 0 || tip < 0) {
            outputBox.innerHTML = "⚠️ Please enter valid inputs.";
            return;
        }
        const tipAmt = (bill * tip) / 100;
        const total = bill + tipAmt;
        outputBox.innerHTML = `💰 Tip: ₹${tipAmt.toFixed(2)}<br>Total: ₹${total.toFixed(2)}`;
    });
}

// 🎯 FizzBuzz
function runFizzBuzz() {
    let result = "";
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result += "FizzBuzz ";
        } else if (i % 3 === 0) {
            result += "Fizz ";
        } else if (i % 5 === 0) {
            result += "Buzz ";
        } else {
            result += i + " ";
        }
    }
    outputBox.innerHTML = `🎯 FizzBuzz Output:<br><div style="max-height: 200px; overflow-y: auto; margin-top: 10px;">${result}</div>`;
}

// 🔄 Reverse a Number
function runReverseModal() {
    openModal("Reverse a Number", `
        <input type="number" id="reverseInput" placeholder="Enter a number">
    `, () => {
        const num = document.getElementById("reverseInput").value;
        if (!num || isNaN(num)) {
            outputBox.innerHTML = "⚠️ Please enter a valid number.";
            return;
        }
        const reversed = num.split("").reverse().join("");
        outputBox.innerHTML = `🔄 <strong>Original:</strong> ${num}<br><strong>Reversed:</strong> ${reversed}`;
    });
}

// 📅 Days Converter
function runDaysModal() {
    openModal("Days Converter", `
        <input type="number" id="days" placeholder="Enter number of days">
    `, () => {
        const days = parseInt(document.getElementById("days").value);
        if (isNaN(days) || days < 0) {
            outputBox.innerHTML = "⚠️ Please enter a valid number of days.";
            return;
        }
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;
        
        outputBox.innerHTML = `
            📅 <strong>${days} days equals:</strong><br>
            📆 ${years} years, ${months} months, ${remainingDays} days<br>
            🗓️ ${Math.floor(days / 7)} weeks and ${days % 7} days
        `;
    });
}

// 🎲 Number Guessing Game
let gameNumber = Math.floor(Math.random() * 100) + 1;
let gameAttempts = 0;

function runNumberGuessing() {
    gameNumber = Math.floor(Math.random() * 100) + 1;
    gameAttempts = 0;
    
    outputBox.innerHTML = `
        🎲 <strong>Number Guessing Game</strong><br>
        I'm thinking of a number between 1 and 100!<br>
        <input type="number" id="guessInput" placeholder="Enter your guess" min="1" max="100">
        <button onclick="makeGuess()" style="margin-top: 10px; padding: 5px 10px;">Guess!</button>
        <div id="guessResult" style="margin-top: 10px;"></div>
    `;
}

function makeGuess() {
    const guess = parseInt(document.getElementById("guessInput").value);
    const result = document.getElementById("guessResult");
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.innerHTML = "⚠️ Please enter a number between 1 and 100.";
        return;
    }
    
    gameAttempts++;
    
    if (guess === gameNumber) {
        result.innerHTML = `🎉 Congratulations! You guessed ${gameNumber} correctly in ${gameAttempts} attempts!`;
    } else if (guess < gameNumber) {
        result.innerHTML = `📈 Too low! Try again. (Attempt ${gameAttempts})`;
    } else {
        result.innerHTML = `📉 Too high! Try again. (Attempt ${gameAttempts})`;
    }
    
    document.getElementById("guessInput").value = "";
}

// 📊 Student Grade Calculator
function runGradeModal() {
    openModal("Student Grade Calculator", `
        <input type="number" id="subject1" placeholder="Subject 1 marks" min="0" max="100">
        <input type="number" id="subject2" placeholder="Subject 2 marks" min="0" max="100">
        <input type="number" id="subject3" placeholder="Subject 3 marks" min="0" max="100">
        <input type="number" id="subject4" placeholder="Subject 4 marks" min="0" max="100">
        <input type="number" id="subject5" placeholder="Subject 5 marks" min="0" max="100">
    `, () => {
        const marks = [
            parseFloat(document.getElementById("subject1").value),
            parseFloat(document.getElementById("subject2").value),
            parseFloat(document.getElementById("subject3").value),
            parseFloat(document.getElementById("subject4").value),
            parseFloat(document.getElementById("subject5").value)
        ];
        
        if (marks.some(mark => isNaN(mark) || mark < 0 || mark > 100)) {
            outputBox.innerHTML = "⚠️ Please enter valid marks (0-100) for all subjects.";
            return;
        }
        
        const total = marks.reduce((sum, mark) => sum + mark, 0);
        const average = total / marks.length;
        const grade = 
            average >= 90 ? "A+" :
            average >= 80 ? "A" :
            average >= 70 ? "B+" :
            average >= 60 ? "B" :
            average >= 50 ? "C" :
            average >= 40 ? "D" : "F";
        
        outputBox.innerHTML = `
            📊 <strong>Grade Report:</strong><br>
            📝 Total Marks: ${total}/500<br>
            📈 Average: ${average.toFixed(2)}%<br>
            🏆 Grade: ${grade}
        `;
    });
}

// ✂️ Rock, Paper, Scissors
function runRPSModal() {
    outputBox.innerHTML = `
        ✂️ <strong>Rock, Paper, Scissors</strong><br>
        Choose your weapon:<br>
        <button onclick="playRPS('rock')" style="margin: 5px; padding: 10px;">🪨 Rock</button>
        <button onclick="playRPS('paper')" style="margin: 5px; padding: 10px;">📄 Paper</button>
        <button onclick="playRPS('scissors')" style="margin: 5px; padding: 10px;">✂️ Scissors</button>
        <div id="rpsResult" style="margin-top: 15px;"></div>
    `;
}

function playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = document.getElementById("rpsResult");
    
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    
    let outcome;
    if (playerChoice === computerChoice) {
        outcome = "🤝 It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        outcome = "🎉 You win!";
    } else {
        outcome = "🤖 Computer wins!";
    }
    
    result.innerHTML = `
        <strong>You:</strong> ${emojis[playerChoice]} ${playerChoice}<br>
        <strong>Computer:</strong> ${emojis[computerChoice]} ${computerChoice}<br>
        <strong>Result:</strong> ${outcome}
    `;
}

// 🏧 ATM Cash Dispenser
let atmBalance = 10000;

function runATMModal() {
    openModal("ATM Cash Dispenser", `
        <p><strong>💰 Current Balance: ₹${atmBalance}</strong></p>
        <input type="number" id="atmAmount" placeholder="Enter amount to withdraw" min="100" step="100">
        <p style="font-size: 12px; color: #666;">Minimum: ₹100, Multiple of 100</p>
    `, () => {
        const amount = parseInt(document.getElementById("atmAmount").value);
        
        if (isNaN(amount) || amount <= 0) {
            outputBox.innerHTML = "⚠️ Please enter a valid amount.";
            return;
        }
        
        if (amount % 100 !== 0) {
            outputBox.innerHTML = "⚠️ Amount must be a multiple of 100.";
            return;
        }
        
        if (amount > atmBalance) {
            outputBox.innerHTML = "⚠️ Insufficient balance.";
            return;
        }
        
        atmBalance -= amount;
        
        // Calculate denominations
        const notes = { 500: 0, 200: 0, 100: 0 };
        let remaining = amount;
        
        notes[500] = Math.floor(remaining / 500);
        remaining %= 500;
        notes[200] = Math.floor(remaining / 200);
        remaining %= 200;
        notes[100] = Math.floor(remaining / 100);
        
        outputBox.innerHTML = `
            🏧 <strong>Transaction Successful!</strong><br>
            💸 Withdrawn: ₹${amount}<br>
            💰 Remaining Balance: ₹${atmBalance}<br>
            📊 <strong>Notes Dispensed:</strong><br>
            ${notes[500] > 0 ? `₹500 × ${notes[500]}<br>` : ''}
            ${notes[200] > 0 ? `₹200 × ${notes[200]}<br>` : ''}
            ${notes[100] > 0 ? `₹100 × ${notes[100]}<br>` : ''}
        `;
    });
}

// 🔐 Login System
const users = {
    "admin": "password123",
    "user": "user123",
    "test": "test123"
};

function runLoginModal() {
    openModal("Login System", `
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <p style="font-size: 12px; color: #666;">
            Demo accounts:<br>
            admin/password123<br>
            user/user123<br>
            test/test123
        </p>
    `, () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        if (!username || !password) {
            outputBox.innerHTML = "⚠️ Please enter both username and password.";
            return;
        }
        
        if (users[username] && users[username] === password) {
            outputBox.innerHTML = `
                ✅ <strong>Login Successful!</strong><br>
                👤 Welcome, ${username}!<br>
                🕒 Login time: ${new Date().toLocaleString()}
            `;
        } else {
            outputBox.innerHTML = "❌ Invalid username or password.";
        }
    });
}

// Initialize theme on page load
setTheme(currentTheme);