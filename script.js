const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');
const tempBar = document.getElementById('tempBar');
const statusText = document.getElementById('statusText');

// Celsius change calculation
celsiusInput.addEventListener('input', () => {
    const c = parseFloat(celsiusInput.value);
    if (!isNaN(c)) {
        fahrenheitInput.value = ((c * 9/5) + 32).toFixed(2);
        kelvinInput.value = (c + 273.15).toFixed(2);
        updateVisuals(c);
    } else {
        clearInputsExcept(celsiusInput);
    }
});

// Fahrenheit change calculation
fahrenheitInput.addEventListener('input', () => {
    const f = parseFloat(fahrenheitInput.value);
    if (!isNaN(f)) {
        const c = (f - 32) * 5/9;
        celsiusInput.value = c.toFixed(2);
        kelvinInput.value = (c + 273.15).toFixed(2);
        updateVisuals(c);
    } else {
        clearInputsExcept(fahrenheitInput);
    }
});

// Kelvin change calculation
kelvinInput.addEventListener('input', () => {
    const k = parseFloat(kelvinInput.value);
    if (!isNaN(k)) {
        const c = k - 273.15;
        celsiusInput.value = c.toFixed(2);
        fahrenheitInput.value = ((c * 9/5) + 32).toFixed(2);
        updateVisuals(c);
    } else {
        clearInputsExcept(kelvinInput);
    }
});

// Quick Preset values function
function setTemperature(celsius) {
    celsiusInput.value = celsius;
    celsiusInput.dispatchEvent(new Event('input'));
}

// Reset all inputs
function resetForm() {
    celsiusInput.value = '';
    fahrenheitInput.value = '';
    kelvinInput.value = '';
    tempBar.style.width = '0%';
    statusText.innerText = 'তাপমাত্রা ইনপুট করুন';
}

// Clear when field is empty
function clearInputsExcept(activeInput) {
    if (activeInput !== celsiusInput) celsiusInput.value = '';
    if (activeInput !== fahrenheitInput) fahrenheitInput.value = '';
    if (activeInput !== kelvinInput) kelvinInput.value = '';
    tempBar.style.width = '0%';
    statusText.innerText = 'তাপমাত্রা ইনপুট করুন';
}

// Update progress bar & status dynamic text
function updateVisuals(celsius) {
    let percentage = Math.min(Math.max((celsius / 100) * 100, 5), 100);
    tempBar.style.width = percentage + '%';

    if (celsius <= 0) {
        statusText.innerText = '🥶 খুব ঠান্ডা / হিমাঙ্ক (Freezing Point)';
    } else if (celsius > 0 && celsius <= 20) {
        statusText.innerText = '❄️ সহনীয় ঠান্ডা (Cool)';
    } else if (celsius > 20 && celsius <= 35) {
        statusText.innerText = '🌤️ সাধারণ তাপমাত্রা (Normal)';
    } else if (celsius > 35 && celsius <= 50) {
        statusText.innerText = '☀️ বেশ গরম (Warm/Hot)';
    } else {
        statusText.innerText = '🔥 অত্যন্ত গরম / স্ফুটনাঙ্ক (Boiling Point)';
    }
}