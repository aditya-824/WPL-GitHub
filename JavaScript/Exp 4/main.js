document.addEventListener('DOMContentLoaded', function () {
    function showMessage(container, text, type) {
        container.textContent = text;
        container.className = 'js-message ' + type;
    }

    function beneficiaryForm() {
        const form = document.querySelector('.beneficiary-form-container form');
        if (!form) {
            return;
        }

        const cardInput = document.getElementById('card');

        const helperText = document.createElement('p');
        helperText.className = 'form-helper';
        helperText.textContent = 'Card format: 3 digits followed by 2 letters (example: 123AB).';
        cardInput.insertAdjacentElement('afterend', helperText);

        const messageBox = document.createElement('p');
        messageBox.className = 'js-message';
        form.appendChild(messageBox);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const cardNumber = cardInput.value.trim().toUpperCase();
            const cardPattern = /^\d{3}[A-Z]{2}$/;
            if (!cardPattern.test(cardNumber)) {
                showMessage(messageBox, 'Invalid card number format. Use 123AB.', 'error');
                cardInput.focus();
                return;
            }

            showMessage(messageBox, 'Beneficiary form submitted');
            form.reset();
        });
    }

    function distributionTable() {
        const table = document.querySelector('.distribution-table');
        if (!table) {
            return;
        }

        const container = document.querySelector('.distribution-table-container');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        const filterInput = document.createElement('input');
        filterInput.type = 'search';
        filterInput.className = 'table-filter';
        filterInput.placeholder = 'Filter by name, card number or item';
        container.insertBefore(filterInput, table);

        filterInput.addEventListener('input', function () {
            const query = filterInput.value.trim().toLowerCase();
            rows.forEach(function (row) {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });

        let totalQuantity = 0;
        rows.forEach(function (row) {
            const quantityCell = row.cells[4];
            const quantity = parseFloat(quantityCell.textContent);
            if (!Number.isNaN(quantity)) {
                totalQuantity += quantity;
            }
        });

        const summary = document.createElement('p');
        summary.className = 'table-summary';
        summary.textContent = 'Total distributed quantity listed: ' + totalQuantity + ' kg';
        table.insertAdjacentElement('afterend', summary);
    }

    beneficiaryForm();
    distributionTable();
});
