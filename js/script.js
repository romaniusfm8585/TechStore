console.log("JavaScript підключено");

// 1. Масив даних товарів
const products = [
    {
        name: "Ноутбук",
        description: "Для навчання та роботи.",
        price: 35000,
        available: true,
        image: "images/laptop.webp"
    },
    {
        name: "Монітор",
        description: "27-дюймовий IPS-монітор.",
        price: 9500,
        available: true,
        image: "images/monitor.webp"
    },
    {
        name: "Клавіатура",
        description: "Механічна клавіатура.",
        price: 2500,
        available: true
    },
    {
        name: "Миша",
        description: "Бездротова миша.",
        price: 1300,
        available: true
    },
    {
        name: "SSD",
        description: "NVMe SSD на 1 ТБ.",
        price: 3200,
        available: true
    },
    {
        name: "Навушники",
        description: "Гарнітура з мікрофоном.",
        price: 2100,
        available: false
    }
];

const productList = document.querySelector("#catalog");

// 2. Створення лічильника товарів у кошику
let cartCount = 0;
const cartStatus = document.createElement("p");
cartStatus.id = "cart-status";
cartStatus.style.fontWeight = "bold";
cartStatus.style.marginBottom = "16px";
cartStatus.textContent = "Товарів у кошику: 0";
productList.before(cartStatus);

// 3. Функція для рендерингу карток товарів
function renderProducts(items) {
    productList.innerHTML = "";
    
    for (const product of items) {
        const card = document.createElement("article");
        card.classList.add("product-card");

        let imageHtml = product.image 
            ? `<img class="product-image" src="${product.image}" alt="${product.name}">` 
            : "";

        card.innerHTML = `
            ${imageHtml}
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price.toLocaleString()} грн</p>
            <div class="card-actions">
                <a class="btn btn-secondary" href="#">Детальніше</a>
                <button class="btn btn-primary buy-button" type="button">До кошика</button>
            </div>
        `;

        const button = card.querySelector(".buy-button");

        // Перевірка наявності товару
        if (!product.available) {
            button.disabled = true;
            button.textContent = "Немає в наявності";
            button.classList.remove("btn-primary");
        } else {
            button.addEventListener("click", () => {
                cartCount++;
                cartStatus.textContent = `Товарів у кошику: ${cartCount}`;
            });
        }

        productList.append(card);
    }
}

// Виклик функції відображення
renderProducts(products);

// 4. Клієнтська валідація форми
const form = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;

        // Перевірка поля "Ім'я" (мінімум 2 символи)
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Введіть щонайменше 2 символи";
            nameInput.classList.add("input-error");
            isValid = false;
        } else {
            nameError.textContent = "";
            nameInput.classList.remove("input-error");
        }

        // Перевірка поля "Email" (наявність символу '@')
        if (!emailInput.value.includes("@")) {
            emailError.textContent = "Введіть коректний email";
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
            isValid = false;
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
            emailInput.classList.remove("input-error");
        }

        // Якщо все успішно
        if (isValid) {
            console.log("Форма успішно перевірена");
            alert("Повідомлення успішно надіслано!");
            form.reset();
        }
    });
}