(function() {
    let budgetAlert = document.querySelector(".budget-alert")
    let expensisAlert = document.querySelector(".expensis-alert")
    let budgetForm = document.getElementById('budget-form');
    let expensisForm = document.getElementById('expensis-form');
    let budgetAmmount = document.getElementById('budget-ammount');
    let expensisAmmount = document.getElementById('expensis-ammount');
    let balanceAmmount = document.getElementById('balance-ammount');
    let budgetInput = document.getElementById('budget-input');
    let expensisTitleInput = document.getElementById('expensis-title-input');
    let expensisAmmountInput = document.getElementById('expensis-ammoun-input');
    let calculateButton = document.getElementById('calculate-button');
    let expensisButton = document.getElementById('expensis-button');
    let parent = document.querySelector('.hello')
    let expensisDetails = document.querySelector('.expensis-details')
    let itemID = 0;
    let itemArr = [];


    calculateButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (budgetInput.value <= 0) {
            budgetAlert.classList.add("d-block");

            setTimeout(function() {
                budgetAlert.classList.remove("d-block");
            }, 4000)
        } else {
            budgetAmmount.innerText = budgetInput.value;
            showBalance();
            budgetInput.value = '';

        }
    });

    expensisButton.addEventListener('click', (e) => {
        e.preventDefault();
        let expensisValue = expensisTitleInput.value;
        let expensisAnmmount = expensisAmmountInput.value;

        if (expensisValue === '' || expensisAnmmount === '' || expensisAmmount < 0) {
            expensisAlert.classList.add('d-block');
            setTimeout(function() {
                expensisAlert.classList.remove("d-block");
            }, 4000);
        } else {
            let ammount = parseInt(expensisAnmmount);
            expensisTitleInput.value = '';
            expensisAmmountInput.value = '';

            let expense = {
                id: itemID,
                title: expensisValue,
                ammount: ammount,
            }
            itemID++;
            itemArr.push(expense);
            addExpensis(expense);
            showBalance();

        };
    })


    parent.addEventListener('click', function(event) {
        if (event.target.classList.contains('delate')) {
            event.target.parentElement.parentElement.parentElement.removeChild();
            showBalance()
        }
    });

    function showBalance() {
        let expensis = showExpensis();
        let total = parseInt(budgetAmmount.innerText - expensis);
        balanceAmmount.innerText = total;

        if (total < 0) {
            balanceAmmount.style.color = "red";
        } else if (total > 0) {
            balanceAmmount.style.color = "green";

        } else if (total === 0) {
            balanceAmmount.style.color = "black";
        }

    }

    function showExpensis() {
        let totAmm = 0;
        if (itemArr.length > 0) {
            itemArr.forEach(item => {
                totAmm += item.ammount;
            })
        }
        expensisAmmount.textContent = totAmm;
        return totAmm;
    }

    function addExpensis(expensis) {
        let div = document.createElement("div");
        div.classList.add('col-12');
        div.classList.add('mb-2');
        div.innerHTML = `
            <div class="expensis-details ">
                <div class="row ">

                    <div class="col-5 expen-title ">
                        <h4>${expensis.title}<span class="expensis-title "></span></h4>
                    </div>
                    <div class="col-5 text-center ">
                        <h5 class="expensis-ammount ">${expensis.ammount}</h5>
                    </div>
                    <div class="col-2 text-center ">
                        <a href="# " class="edit" data-id="${expensis.id}">Edit</a>
                        <a href="# " class="delate" data-id="${expensis.id}">Del</a>
                    </div>
                </div>
            </div>
        `;

        parent.appendChild(div)
    }




})()