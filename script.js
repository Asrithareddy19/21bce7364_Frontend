document.getElementById('submitBtn').addEventListener('click', () => {
    const input = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');
    const filterOptions = document.getElementById('filterOptions');
    const filteredResponse = document.getElementById('filteredResponse');

    // Reset error and hide response area
    errorElement.textContent = '';
    dropdownContainer.style.display = 'none';
    responseContainer.style.display = 'none';

    try {
        const jsonData = JSON.parse(input);

        if (!Array.isArray(jsonData.data)) {
            throw new Error("JSON should contain a 'data' array.");
        }

        dropdownContainer.style.display = 'block';

        filterOptions.addEventListener('change', () => {
            const selectedOptions = Array.from(filterOptions.selectedOptions).map(option => option.value);
            let result = '';

            if (selectedOptions.includes('alphabets')) {
                const alphabets = jsonData.data.filter(item => /^[a-zA-Z]$/.test(item));
                result += `Alphabets: ${alphabets.join(', ')}<br>`;
            }

            if (selectedOptions.includes('numbers')) {
                const numbers = jsonData.data.filter(item => /^[0-9]$/.test(item));
                result += `Numbers: ${numbers.join(', ')}<br>`;
            }

            if (selectedOptions.includes('lowercase')) {
                const lowercase = jsonData.data.filter(item => /^[a-z]$/.test(item));
                const highestLowercase = lowercase.sort().pop();
                result += `Highest Lowercase Alphabet: ${highestLowercase || 'N/A'}<br>`;
            }

            filteredResponse.innerHTML = result;
            responseContainer.style.display = 'block';
        });

    } catch (e) {
        errorElement.textContent = 'Invalid JSON format or structure.';
    }
});
