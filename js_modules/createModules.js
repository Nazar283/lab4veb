export function createTreeCard(tree) {
    return `
        <div class="card_of_tree">
            <img src="img/crismas-Tree.jpg" alt="crismasTree" class="place_for_img">
            <h4>Виробник ${tree.manufacturer_name}</h4>
            <p>Height: ${tree.height_cm} cm</p>
            <p>Price: ${tree.price} UAH</p>
            <p>Material: ${tree.material}</p>
            <button class="edit-button" onclick="goToEditPage(${tree.id})">Edit</button>
        </div>
    `;
}

export function createPriceCount(price) {
    return `<p class="priceCount">Total value of Christmas trees on page: ${price} UAH</p>`;
}