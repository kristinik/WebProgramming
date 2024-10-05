import { chain } from "./chain.js";

const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const findButton = document.getElementById("search-btn");
const cancelFindButton = document.getElementById("cancel-search-btn");
const findInput = document.getElementById("search-input");
const modalEdit = document.querySelector(".js-edit");
const modalAdd = document.querySelector(".js-add");
const formEdit = document.querySelector(".js-edit-form");
const formAdd = document.querySelector(".js-add-form");
const addButton = document.querySelector(".add-card");

const chainsawsContainer = document.getElementById("chainsaws-list");
const resultParagraph = document.querySelector('.result');

// Шаблон для кожної картки
const itemTemplate = ({ id, title, duration, imdbReviews }) => `
<li id="${id}" class="chainsaw">
  <div class="chainsaw-body">
    <h3 class="chainsaw-title">${title}</h3>
    <p class="chainsaw-time">Power: ${duration}</p>
    <p class="chainsaw-reviews">Revolutions: ${imdbReviews}</p>
  </div>
  <button type="button" class="edit"></button>
</li>`;

// Початковий масив бензопил
let currentChainsaws = [...chain];
let filteredChainsaws = [...currentChainsaws]; // Масив для знайдених об'єктів

// Рендеринг списку елементів
const renderItemsList = (items) => {
    chainsawsContainer.innerHTML = "";
    items.forEach(addItemToPage);
};

// Додавання картки до сторінки
const addItemToPage = ({ id, title, duration, imdbReviews }) => {
    chainsawsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, title, duration, imdbReviews })
    );
};

renderItemsList(currentChainsaws);

// Пошук
findButton.addEventListener("click", () => {
    const query = findInput.value.toLowerCase().trim();
    if (query) {
        filteredChainsaws = currentChainsaws.filter(
            (chainsaw) => chainsaw.title.toLowerCase().includes(query)
        );
        renderItemsList(filteredChainsaws);
    } else {
        filteredChainsaws = [...currentChainsaws];
        renderItemsList(filteredChainsaws);
    }
});

// Скасування пошуку
cancelFindButton.addEventListener("click", () => {
    findInput.value = "";
    filteredChainsaws = [...currentChainsaws];
    renderItemsList(filteredChainsaws);
});

// Сортування
let isSorted = false;
let beforeSortArray = [...filteredChainsaws];

sortButton.addEventListener("click", () => {
    if (isSorted) {
        renderItemsList(beforeSortArray);
        isSorted = false;
    } else {
        const sortedChainsaws = [...filteredChainsaws].sort((a, b) => a.imdbReviews - b.imdbReviews);
        renderItemsList(sortedChainsaws);
        isSorted = true;
        beforeSortArray = [...filteredChainsaws];
    }
});

// Підрахунок
countButton.addEventListener("click", () => {
    const total = filteredChainsaws.reduce((acc, { duration }) => acc + duration, 0);
    resultParagraph.textContent = total; // Тільки число без додаткового тексту
});

// Редагування
let parentId = 0;
chainsawsContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("edit")) {
        return;
    }
    parentId = event.target.closest("li").id;
    modalEdit.classList.add("show-modal");
});

modalEdit.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        modalEdit.classList.remove("show-modal");
        formEdit.reset();
    }
});

formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = formEdit.querySelector(".chainsaw-name-input").value;
    const newDuration = Number(formEdit.querySelector(".duration-input").value);
    const newReviews = formEdit.querySelector(".review-input").value;

    currentChainsaws.forEach((chainsaw) => {
        if (chainsaw.id == parentId) {
            chainsaw.title = newName;
            chainsaw.duration = newDuration;
            chainsaw.imdbReviews = newReviews;
        }
    });

    modalEdit.classList.remove("show-modal");
    formEdit.reset();
    renderItemsList(filteredChainsaws);
});

// Додавання нової картки
const newCard = ({ id, name, duration, reviews }) => {
    currentChainsaws.push({ id, title: name, duration, imdbReviews: reviews });
    filteredChainsaws = [...currentChainsaws]; // Оновлюємо масив після додавання нової картки
    renderItemsList(filteredChainsaws);
};

// Відкриття модального вікна для додавання
addButton.addEventListener("click", () => {
    modalAdd.classList.add("show-modal");
});

// Закриття модального вікна для додавання
modalAdd.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        modalAdd.classList.remove("show-modal");
        formAdd.reset();
    }
});

// Уникнення дублікатів
let nextId = currentChainsaws.length + 1;

formAdd.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = formAdd.querySelector(".chainsaw-name-input").value.trim();
    const newDuration = Number(formAdd.querySelector(".duration-input").value);
    const newReviews = formAdd.querySelector(".review-input").value;

    // Додати перевірку на існування
    if (newName && !currentChainsaws.some(chainsaw => chainsaw.title.toLowerCase() === newName.toLowerCase())) {
        newCard({ id: nextId, name: newName, duration: newDuration, reviews: newReviews });
        nextId += 1;
        modalAdd.classList.remove("show-modal");
        formAdd.reset();
    } else {
        alert("Картка з такою назвою вже існує або назва пуста!");
    }
});



