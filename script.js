const display = document.getElementById("display");
let rawValue = "0";

function formatDisplay(val) {
    // Format angka dengan titik (locale Indonesia)
    const parts = val.split(/([+\-*/()])/g); // pisahkan operator dan angka
    return parts
        .map(part => {
            if (!/[+\-*/()]/.test(part)) {
                if (part === "") return "";
                const number = Number(part);
                if (!isNaN(number)) {
                    return new Intl.NumberFormat("id-ID").format(number);
                }
            }
            return part;
        })
        .join("");
}

function updateDisplay() {
    display.innerText = formatDisplay(rawValue);
}

function append(value) {
    if (rawValue === "0" && value !== ".") {
        rawValue = value;
    } else {
        rawValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    rawValue = "0";
    updateDisplay();
}

function toggleSign() {
    try {
        const result = eval(rawValue);
        rawValue = (-result).toString();
        updateDisplay();
    } catch {
        display.innerText = "Error";
    }
}

function backspace() {
    rawValue = rawValue.slice(0, -1);
    if (rawValue === "" || rawValue === "-") rawValue = "0";
    updateDisplay();
}

function calculate() {
    try {
        const result = eval(rawValue.replace(/×/g, "*").replace(/÷/g, "/"));
        rawValue = result.toString();
        updateDisplay();
    } catch {
        display.innerText = "Error";
    }
}
