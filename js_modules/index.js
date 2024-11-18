import { createTreeCard, createPriceCount } from './createModules.js';

const treesContainer = document.getElementById('tree_container');
let artificialTrees = JSON.parse(localStorage.getItem('artificialTrees')) || [];
let currentTrees = [...artificialTrees];

const findInput = document.getElementById('find_input');
const findButton = document.getElementById('find_button');
const resetButton = document.getElementById('reset_button');
const sortDecrease = document.getElementById('sort_by_decrease_of_price');
const sortIncrease = document.getElementById('sort_by_increase_of_price');
const priceCountElement = document.getElementById('priceCount');

const submitBtn = document.getElementById('submit_btn');
const manufacturerInput = document.getElementById('manufacturer_desc_input');
const heightInput = document.getElementById('height_desc_input');
const priceInput = document.getElementById('price_desc_input');
const materialInput = document.getElementById('material_desc_input');

const modal = document.getElementById("errorModal");
const closeModalBtn = document.querySelector(".close");
const modalMessage = document.getElementById("modalMessage");

// Відображення даних. Оце той рендеринг, запитає в тебе це. Це виводить усі дерева на екран з localStorage
function displayTrees(trees) {
    currentTrees = trees;
    treesContainer.innerHTML = '';
    
    if (trees.length === 0) {
        treesContainer.innerHTML = '<p class="warnMessage">На жаль, дерева з такою висотою немає.</p>'; 
        const totalPrice = 0;
        priceCountElement.innerHTML = createPriceCount(totalPrice);
        return;
    }

    trees.forEach(tree => {
        treesContainer.innerHTML += createTreeCard(tree);
    });

    const totalPrice = calculateTotalPrice(trees);
    priceCountElement.innerHTML = createPriceCount(totalPrice);
}

// Функція для підрахунку загальної ціни
function calculateTotalPrice(trees) {
    return trees.reduce((totalValue, tree) => totalValue + parseFloat(tree.price), 0);
}

// Пошук
findButton.addEventListener('click', () => {
    const foundTree = artificialTrees.filter(tree => tree.manufacturer_name.toLowerCase().includes(findInput.value.trim().toLowerCase()));
    displayTrees(foundTree);
});

// Скидання пошуку
resetButton.addEventListener('click', () => {
    findInput.value = '';
    displayTrees(artificialTrees);
});

// Сортування за спаданням
sortDecrease.addEventListener('click', () =>{
    const sortedTree = [...currentTrees].sort((a, b) => b.price - a.price);
    displayTrees(sortedTree);
});

// Сортування за зростанням
sortIncrease.addEventListener('click', () =>{
    const sortedTree = [...currentTrees].sort((a, b) => a.price - b.price);
    displayTrees(sortedTree);
});

// Функція для створення нового дерева та збереження у локальному сховищі
function addNewTree() {
    let lastId = artificialTrees.length ? artificialTrees[artificialTrees.length - 1].id : 0;
    lastId++;

    let newTree = {
        id: lastId,
        manufacturer_name: manufacturerInput.value,
        height_cm: heightInput.value,
        price: parseFloat(priceInput.value),
        material: materialInput.value
    };

    artificialTrees.push(newTree);
    localStorage.setItem('artificialTrees', JSON.stringify(artificialTrees));
}

//Модальне вікно
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

//створення нового дерева
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        !manufacturerInput.value.trim() || //тут .value зчитує значення з input. Іванюк це часто питає
        !heightInput.value.trim() ||
        !priceInput.value.trim() ||
        !materialInput.value.trim()
    ) {
        showModal("All fields must be filled out!");
    } else if (isNaN(heightInput.value) || isNaN(priceInput.value)) {
        showModal("Height and Price must be valid numbers!");
    } else {
        addNewTree();
        displayTrees(artificialTrees);
        manufacturerInput.value = '';
        heightInput.value = '';
        priceInput.value = '';
        materialInput.value = '';
    }
});

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Перехід на сторінку редагування
window.goToEditPage = function(treeId) {
    window.location.href = `edit.html?id=${treeId}`;
}

// Відображення дерев
displayTrees(artificialTrees);
