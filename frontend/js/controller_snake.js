function change_snake_color() {
    localStorage.setItem('snake', document.getElementById('snake-colors').value);
}

function change_food_type() {
    localStorage.setItem('food', document.getElementById('food-types').value);
}

function change_board_color() {
    localStorage.setItem('board', document.getElementById('board-colors').value);
}

function change_level() {
    localStorage.setItem('level', document.getElementById('levels').value);
}