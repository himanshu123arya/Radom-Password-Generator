// Password character sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthIndicator = document.getElementById('strength-indicator');

// Update length value display
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate password
function generatePassword() {
    let charset = '';
    if (lowercaseCheckbox.checked) charset += LOWERCASE;
    if (uppercaseCheckbox.checked) charset += UPPERCASE;
    if (numbersCheckbox.checked) charset += NUMBERS;
    if (symbolsCheckbox.checked) charset += SYMBOLS;

    const length = parseInt(lengthSlider.value);
    if (!charset) {
        passwordInput.value = '';
        strengthIndicator.textContent = '-';
        strengthIndicator.className = 'strength-indicator';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordInput.value = password;
    updateStrength(password);
}

generateBtn.addEventListener('click', generatePassword);

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    if (!passwordInput.value) return;
    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            copyBtn.innerHTML = '<i class="fa fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa fa-copy"></i>';
            }, 1200);
        });
});

// Password strength indicator
function updateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let strength = 'weak';
    if (score >= 4 && password.length >= 12) strength = 'strong';
    else if (score >= 3) strength = 'medium';

    strengthIndicator.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
    strengthIndicator.className = 'strength-indicator ' + strength;
}

// Initial password
generatePassword();
