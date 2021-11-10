const cpfInput = document.getElementById('cpf_input');
const validationText = document.getElementById('validation');

cpfInput.addEventListener('input', handleInput);

function handleInput(e) {
    const target = e.target;

    removeNotNumbers(target);

    handleLength(target);

    showValidation(target);
}

function removeNotNumbers(target) {
    const value = target.value;
    const valueInt = parseInt(value);

    if (Number.isNaN(valueInt)) {
        target.value = value.slice(0, value.length - 1);
    } else {
        target.value = valueInt;
    }
}

function handleLength(target) {
    const value = target.value;

    if (value.length > 11) {
        target.value = value.slice(0, value.length - 1);
    };

    return value.length === 11;
}

function validate(cpf) {
    let firstNumber, secondNumber;
    let newCpf = cpf.slice(0, cpf.length - 2);

    // Fiding the first number
    let sum = 0;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(newCpf.charAt(i - 1)) * i;
    }
    let rest = sum % 11;
    firstNumber = rest === 10 ? 0 : rest;
    newCpf += firstNumber;

    // Fiding the second number
    sum = 0;
    for (let i = 0; i <= 9; i++) {
        sum += parseInt(newCpf.charAt(i)) * i;
    }
    rest = sum % 11;
    secondNumber = rest === 10 ? 0 : rest;
    newCpf += secondNumber;

    return newCpf === cpf ? true : false;
}

function showValidation(target) {
    if (handleLength(target)) {
        const valid = validate(target.value);

        if (valid) {
            validationText.innerText = "CPF is valid";
            validationText.classList.add('valid');
        } else {
            validationText.innerText = "CPF is not valid";
            validationText.classList.remove('valid');
        }
    } else {
        validationText.innerText = "";
    }
}