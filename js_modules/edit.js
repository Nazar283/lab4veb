const urlParams = new URLSearchParams(window.location.search);
const treeId = parseInt(urlParams.get('id'), 10);

let artificialTrees = JSON.parse(localStorage.getItem('artificialTrees')) || [];
const manufacturerInput = document.getElementById('manufacturer_edit_input');
const heightInput = document.getElementById('height_edit_input');
const priceInput = document.getElementById('price_edit_input');
const materialInput = document.getElementById('material_edit_input');

// Шукає дерево по id, яке хочемо відредагувати
const treeToEdit = artificialTrees.find(tree => tree.id === treeId);
if (treeToEdit) {
    populateEditForm(treeToEdit);
} else {
    alert('Tree not found!');
}

// Зчитування оновлениї даних для дерева
function populateEditForm(tree) {
    manufacturerInput.value = tree.manufacturer_name;
    heightInput.value = tree.height_cm;
    priceInput.value = tree.price;
    materialInput.value = tree.material;
}

// Збереження змін після редагування
document.getElementById('editTreeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (
        !manufacturerInput.value.trim() ||
        !heightInput.value.trim() ||
        !priceInput.value.trim() ||
        !materialInput.value.trim()
    ) {
        alert("All fields must be filled out!");
    } else {
        const updatedTree = {
            id: treeId,
            manufacturer_name: manufacturerInput.value,
            height_cm: parseFloat(heightInput.value),
            price: parseFloat(priceInput.value),
            material: materialInput.value,
        };

        const index = artificialTrees.findIndex(tree => tree.id === treeId);
        if (index !== -1) {
            artificialTrees[index] = updatedTree;
            localStorage.setItem('artificialTrees', JSON.stringify(artificialTrees));
            alert('Changes saved!');
            window.location.href = 'index.html';
        } else {
            alert("Tree not found in the array.");
        }
    }
});
