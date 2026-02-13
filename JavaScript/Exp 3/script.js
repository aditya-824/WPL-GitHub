document.addEventListener('DOMContentLoaded', function () {
    const shopName = "Ration Shop";
    const address = "Fort, Mumbai, 400001";
    const dealerName = "John Doe";
    const contact = "1234567890";

    const beneficiaries = [];
    const distribution = [];
    let stock = {
        rice: 500,
        wheat: 300,
        sugar: 200
    };

    const form = document.getElementById('beneficiaryForm');
    const tableBody = document.querySelector('#beneficiaryTable tbody');
    const eligibilityResult = document.getElementById('eligibilityResult');
    const searchBtn = document.getElementById('searchBtn');
    const searchCardNumber = document.getElementById('searchCardNumber');
    const searchResult = document.getElementById('searchResult');
    const searchError = document.getElementById('searchError');
    const resetBtn = document.getElementById('resetBtn');

    function updateShopInfo() {
        if (document.getElementById('shopName')) {
            document.getElementById('shopName').innerHTML = shopName;
        }
        if (document.getElementById('address')) {
            document.getElementById('address').innerHTML = address;
        }
        if (document.getElementById('dealerName')) {
            document.getElementById('dealerName').innerHTML = dealerName;
        }
        if (document.getElementById('contact')) {
            document.getElementById('contact').innerHTML = contact;
        }
    }

    function generateTable() {
        tableBody.innerHTML = '';
        beneficiaries.forEach(b => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${b.name}</td>
                <td>${b.cardNumber}</td>
                <td>${b.familyMembers}</td>
                <td>${b.category}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function findBeneficiaryByCard(cardNumber) {
        return beneficiaries.find(b => b.cardNumber === cardNumber);
    }

    function updateStock(rice, wheat, sugar) {
        stock.rice = stock.rice - rice;
        stock.wheat = stock.wheat - wheat;
        stock.sugar = stock.sugar - sugar;
    }

    function updateStockDisplay() {
        document.getElementById('stockRice').textContent = stock.rice;
        document.getElementById('stockWheat').textContent = stock.wheat;
        document.getElementById('stockSugar').textContent = stock.sugar;

        const lowStockAlert = document.getElementById('lowStockAlert');
        let alertMsg = '';
        if (stock.rice < 20) {
            alertMsg += 'Low Stock Alert: Rice below 20 kg.<br>';
        }
        if (stock.wheat < 20) {
            alertMsg += 'Low Stock Alert: Wheat below 20 kg.<br>';
        }
        if (stock.sugar < 20) {
            alertMsg += 'Low Stock Alert: Sugar below 20 kg.<br>';
        }
        lowStockAlert.innerHTML = alertMsg;
    }

        function generateDistributionReport() { // task 9
            const reportTableBody = document.querySelector('#distributionReportTable tbody');
            reportTableBody.innerHTML = '';
            distribution.forEach(d => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${d.name}</td>
                <td>${d.cardNumber}</td>
                <td>${d.familyMembers}</td>
                <td>${d.category}</td>
                <td>${d.rice}</td>
                <td>${d.wheat}</td>
                <td>${d.sugar}</td>
                <td>${d.date}</td>
            `;
                reportTableBody.appendChild(row);
            });
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const cardNumber = document.getElementById('cardNumber').value;
            const familyMembers = Number(document.getElementById('familyMembers').value);
            const category = document.getElementById('category').value;

            const cardNumberError = document.getElementById('cardNumberError');
            if (cardNumber.length !== 10 || isNaN(cardNumber)) {
                cardNumberError.textContent = 'Ration card no. must be exactly 10 digits.';
                return;
            } else {
                cardNumberError.textContent = '';
            }

            let ricePerMember = category === 'APL' ? 5 : 8;
            let totalRice = familyMembers * ricePerMember;
            let totalWheat = 10;
            let totalSugar = 4;

            eligibilityResult.textContent = `Total rice eligibility: ${totalRice} kg`;

            updateStock(totalRice, totalWheat, totalSugar);
            updateStockDisplay();

            beneficiaries.push({ name, cardNumber, familyMembers, category });

            const now = new Date();
            const dateStr = now.toLocaleDateString();
            distribution.push({ name, cardNumber, familyMembers, category, rice: totalRice, wheat: totalWheat, sugar: totalSugar, date: dateStr });
            generateTable();
            generateDistributionReport();

            form.reset();
        });

        if (searchBtn) {
            searchBtn.addEventListener('click', function () {
                const cardNumber = searchCardNumber.value.trim();
                searchError.textContent = '';
                searchResult.textContent = '';
                if (cardNumber.length !== 10 || isNaN(cardNumber)) {
                    searchError.textContent = 'Ration card no. must be 10 digits.';
                    return;
                }
                const beneficiary = findBeneficiaryByCard(cardNumber);
                if (beneficiary) {
                    searchResult.innerHTML = `<strong>Name:</strong> ${beneficiary.name}<br>
                    <strong>Ration Card Number:</strong> ${beneficiary.cardNumber}<br>
                    <strong>Family Members:</strong> ${beneficiary.familyMembers}<br>
                    <strong>Category:</strong> ${beneficiary.category}`;
                } else {
                    searchResult.textContent = 'No beneficiary found.';
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                beneficiaries.length = 0;
                distribution.length = 0;
                stock.rice = 500;
                stock.wheat = 300;
                stock.sugar = 200;
                eligibilityResult.textContent = '';
                document.getElementById('cardNumberError').textContent = '';
                document.getElementById('searchError').textContent = '';
                document.getElementById('searchResult').textContent = '';
                form.reset();
                generateTable();
                generateDistributionReport();
                updateStockDisplay();
            });
        }

        updateShopInfo();
        updateStockDisplay();
        generateTable();
        generateDistributionReport();
    });
