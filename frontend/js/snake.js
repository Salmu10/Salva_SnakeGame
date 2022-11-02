// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const wallSound = new Audio('music/wall.mp3');

// Score 
let score = 0;

let top_score = 0;
let top_scores = [];
let ranking_list = "";
ranking_ordered = "";

// Snake speed
let speed = 0; //5

let snake_color = "green";
let food_type = "apple";
let board_color = "#70DFD8";
let game_level = "1";

let high_score = 0;
let user_highscore = 0;
let player_name = "";

let last_time = 0;
let snakeArr = [{x: 11, y: 11}];
let food = {x: 6, y: 7};
let wallArr = [{x: -1, y: -1}];
let walls = false;

document.querySelector("#settings").addEventListener("click", settings);
document.querySelector("#done").addEventListener("click", reiniciar);
document.querySelector("#home").addEventListener("click", redirect_home);

function settings() {
    document.querySelector("#page").classList.remove("visible");
    document.querySelector("#custom_settings").classList.add("visible");
    check_player();
}

function redirect_home() {
    window.location.href = './index.html';
}

function iniciar() {
    // Start game
    document.querySelector("#page").classList.add("visible");
    custom_settings();
    main();
    document.addEventListener("keydown", change_direction);
    check_player();
    // Main logic starts here
    musicSound.play();

    // Make the game over page not visible
    document.querySelector("#gameOver").classList.remove("visible");
}

document.querySelectorAll(".reiniciar").forEach(function(elemento) {
    elemento.addEventListener("click", reiniciar);
});

function reiniciar() {  
    document.location.reload();
}

function custom_settings() {
    snake_color = localStorage.getItem("snake");
    if (snake_color == null) {
        localStorage.setItem('snake', "green");
        snake_color = localStorage.getItem("snake");
    } else {
        snake_color = localStorage.getItem("snake");
    }

    food_type = localStorage.getItem("food");
    if (food_type == null) {
        localStorage.setItem('food', "apple");
        food_type = localStorage.getItem("food");
    } else {
        food_type = localStorage.getItem("food");
    }

    board_color = localStorage.getItem("board");
    if (board_color == null) {
        localStorage.setItem('board', "#70DFD8");
        board_color = localStorage.getItem("board");
    } else {
        board_color = localStorage.getItem("board");
    }

    game_level = localStorage.getItem("level");
    if (game_level == null) {
        localStorage.setItem('level', "1");
        game_level = localStorage.getItem("level");
        if (game_level == "1") {
            speed = 5;
            walls = false;
        } else if (game_level == "2") {
            speed = 8;
            console.log(speed);
            walls = true;
            wallArr = [{x: 4, y: 4}, {x: 15, y: 15}, {x: 15, y: 4}, {x: 4, y: 15}];
        } else if (game_level == "3") {
            speed = 12;
            walls = true;
            wallArr = [{x: 4, y: 4}, {x: 15, y: 15}, {x: 15, y: 4}, {x: 4, y: 15}, {x: 9, y: 9}];
        }
    } else {
        game_level = localStorage.getItem("level");
        if (game_level == "1") {
            speed = 5;
            walls = false;
        } else if (game_level == "2") {
            speed = 8;
            walls = true;
            wallArr = [{x: 4, y: 4}, {x: 15, y: 15}, {x: 15, y: 4}, {x: 4, y: 15}];
        } else if (game_level == "3") {
            speed = 12;
            walls = true;
            wallArr = [{x: 4, y: 4}, {x: 15, y: 15}, {x: 15, y: 4}, {x: 4, y: 15}, {x: 9, y: 9}];
        }
    }
}

// Game Functions
function main(current_time) {
    window.requestAnimationFrame(main);
    if((current_time - last_time)/1000 < 1/speed){
        return;
    }
    last_time = current_time;
    gameEngine();
}

// Collide with himself or with the wall
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x > 18 || snake[0].x <=0 || snake[0].y > 18 || snake[0].y <=0){
        return true;
    }

    for (row in wallArr) {
        for (let i = 0; i < wallArr.length; i++) {
            if(snakeArr[0].y === wallArr[i].y && snakeArr[0].x === wallArr[i].x){
                return true;
            }
        }
    }
    
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        wallSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        document.querySelector("#gameOver").classList.add("visible");
        gameOverSound.play();
        snakeArr = [{x: 11, y: 11}];
        score = 0;
        localStorage.setItem('HighScore', user_highscore_value);
        save();
    }
    
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if (player_name == null) {
            if(score > high_score_value){
                high_score_value = score;
                localStorage.setItem("highscore", JSON.stringify(high_score_value));
                document.getElementById('high_score').innerHTML = "Highscore: " + high_score_value;
            }
        } else {
            if(score > user_highscore_value){
                user_highscore_value = score;
            }
        }
        document.getElementById('score').innerHTML = "Score: " + score;
        generate_food(snakeArr);
    }
    
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // Part 2: Display the snake and Food
    board.innerHTML = "";
    board.style.backgroundColor = board_color.toString();

    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.backgroundColor = snake_color.toString();
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.backgroundImage = "url(./img/" + food_type.toString() + ".png)";
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    if (walls == true) {
        wallArr.forEach((e)=>{
            wallElement = document.createElement('div');
            wallElement.style.backgroundColor = 'red';
            wallElement.style.gridRowStart = e.y;
            wallElement.style.gridColumnStart = e.x;
            wallElement.classList.add('wall');
            board.appendChild(wallElement);
        });
    }
}

function generate_food(snake) {
    let a = 1;
    let b = 17;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    for (row in snake) {
        for (let i = 0; i < snakeArr.length; i++) {
            const has_eaten = food.x === snake[i].x && food.y === snake[i].y;
            if(has_eaten) {
                generate_food();
            }
        }
    }

    for (row in wallArr) {
        for (let i = 0; i < wallArr.length; i++) {
            const has_eaten = food.x === wallArr[i].x && food.y === wallArr[i].y;
            if(has_eaten) {
                generate_food();
            }
        }
    }
}

function check_player() {

    player_name = localStorage.getItem('user_loged');

    if (player_name == null) {
        document.querySelector("#player").innerHTML = "Player: anonymous";
        document.querySelector("#player-name").innerHTML = "Player: anonymous";
        
        high_score = localStorage.getItem("highscore");
        if(high_score === null){
            high_score_value = 0;
            localStorage.setItem("highscore", JSON.stringify(high_score_value))
        }
        else{
            high_score_value = JSON.parse(high_score);
            document.getElementById('high_score').innerHTML = "HighScore: " + high_score_value;
        }
    } else {
        document.querySelector("#img_user").src = "https://avatars.dicebear.com/api/pixel-art/" + JSON.parse(player_name) + ".svg";
        document.querySelector("#player").innerHTML = JSON.parse(player_name);
        document.querySelector("#player-name").innerHTML = "Player: " + JSON.parse(player_name);

        user_highscore = localStorage.getItem("HighScore");
        user_highscore_value = JSON.parse(user_highscore);
        document.getElementById('high_score').innerHTML = "HighScore: " + user_highscore_value;
    }
}

function change_direction(event) {
    moveSound.play();
    const left_key = 37;
    const right_key = 39;
    const up_key = 38;
    const down_key = 40;

    const key_pressed = event.keyCode;
    const going_up = inputDir.y === -1;
    const going_down = inputDir.y === 1;
    const going_right = inputDir.x === 1;
    const going_left = inputDir.x === -1;

    if (key_pressed === left_key && !going_right) {
      inputDir.x = -1;
      inputDir.y = 0;
    }
    if (key_pressed === up_key && !going_down) {
        inputDir.x = 0;
        inputDir.y = -1;
    }
    if (key_pressed === right_key && !going_left) {
      inputDir.x = 1;
      inputDir.y = 0;
    }
    if (key_pressed === down_key && !going_up) {
      inputDir.x = 0;
      inputDir.y = 1;
    }
}

window.requestAnimationFrame(iniciar);

async function save(){
    let user = localStorage.getItem('user_loged');
    let user_score = localStorage.getItem('HighScore');
    if(localStorage.getItem('HighScore')){
        const update_score = await fetch("http://localhost:3000/api/user/", {
            method: 'PUT',
            body: JSON.stringify({ user, user_score }),
            headers:{ 'Content-type': 'application/json; charset=UTF-8' }
        })
        const res_json = await update_score.json();
        console.log(res_json);
    } else { 
        console.log('Error');
    }
}

async function get_score_board() {
    const board = document.getElementById('listranking');
    const res = await fetch("http://localhost:3000/api/scores/");
    const res_json = await res.json();
    if (res_json) {
        let string_players = "";
        res_json.forEach((player, i) => {
            string_players += `<li>${i + 1}.${player.username}: ${player.score}</li>`
        });
        board.innerHTML = string_players;
    }
}

get_score_board();