document.addEventListener("DOMContentLoaded", () => {
    const budgetInput = document.getElementById("budgetInput");
    const personsInput = document.getElementById("personsInput");
    const totalCostElement = document.getElementById("totalCost");
    const chosenList = document.getElementById("chosenList");
    const choiceList = document.getElementById("choiceList");
    const budgetMessage = document.getElementById("budgetMessage");

    const nightsAndFoodSection = document.getElementById("nightsAndFood");
    const nightsInput = document.getElementById("nightsInput");
    const foodOption = document.getElementById("foodOption");
    const addNightsAndFood = document.getElementById("addNightsAndFood");

    let totalCost = 0;
    let budget = 0;
    let persons = 0;


    const choiceOptions1 = [
        { name: "Beautiful Beach", price: 200 },
        { name: "Mountain Escape", price: 250 },
        { name: "City Lights", price: 180 },
        { name: "Monuments", price: 130 },
        { name: "Lake Parks", price: 150 },
        { name: "Country Sides", price: 220 },
        { name: "Winter Sport Areas", price: 320 },
        { name: "Wonder lands", price: 120 },
        { name: "Bloomy worlds", price: 220 },
    ];

    const choiceOptions2 = [
        { name: "Travel by Air", multiplier: 1.2 },
        { name: "Travel by Rented Car", multiplier: 1 },
        { name: "Travel by Bus", multiplier: 0.7 },
    ];

    const choiceOptions3 = [
        { name: "5 Star Hotel", price: 50 },
        { name: "4 Star Hotel", price: 40 },
        { name: "Normal Hotel", price: 35 },
        { name: "Flat", price: 60 },
    ];

    let currentStep = 1;
    let lastChoicePrice = 0;

    function loadChoices(options) {
        choiceList.innerHTML = "";
        options.forEach(option => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.textContent = option.name;
            const badge = document.createElement("span");
            badge.classList.add("badge", "bg-primary", "rounded-pill");
            badge.textContent = option.price ? `$${option.price}` : `${option.multiplier}x`;
            li.appendChild(badge);
            li.addEventListener("click", () => chooseOption(option));
            choiceList.appendChild(li);
        });
    }

    function chooseOption(option) {
        let cost = 0;

        if (currentStep === 1) {
            cost = option.price * persons;
            lastChoicePrice = option.price;
        } else if (currentStep === 2) {
            cost = lastChoicePrice * option.multiplier * persons;
        } else if (currentStep === 3) {
            nightsAndFoodSection.style.display = "block";
            nightsAndFoodSection.dataset.price = option.price;
            return;
        }

        addToTotal(option.name, cost);
    }

    function addToTotal(name, cost) {
        totalCost += cost;
        totalCostElement.textContent = totalCost;

        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = name + ` - $${cost}`;
        chosenList.appendChild(li);

        if (totalCost > budget) {
            budgetMessage.style.display = "block";
        } else {
            budgetMessage.style.display = "none";
        }

        currentStep++;
        if (currentStep === 2) loadChoices(choiceOptions2);
        else if (currentStep === 3) loadChoices(choiceOptions3);
        else choiceList.innerHTML = "";
    }

    addNightsAndFood.addEventListener("click", () => {
        const nights = parseInt(nightsInput.value) || 0;
        const includeFood = foodOption.value === "yes";
        const pricePerNight = parseInt(nightsAndFoodSection.dataset.price) || 0;

        let cost = pricePerNight * nights * persons;
        if (includeFood) cost += 80 * nights * persons;

        addToTotal(`Stay (${nights} nights) with food: ${includeFood ? "Yes" : "No"}`, cost);
        nightsAndFoodSection.style.display = "none";
    });

    budgetInput.addEventListener("change", () => {
        budget = parseFloat(budgetInput.value) || 0;
    });

    personsInput.addEventListener("change", () => {
        persons = parseInt(personsInput.value) || 1;
        loadChoices(choiceOptions1);
    });
});
