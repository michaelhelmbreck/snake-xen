const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game properties
const boxSize = 20; // Size of each box
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0; // Initialize score
let gameInterval;
let speed = 100; // Initial speed

function resetGame() {
    // Reset game variables
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0; // Reset score
    speed = 100; // Reset speed
    generateFood(); // Generate new food
    if (gameInterval) clearInterval(gameInterval); // Clear previous interval
    gameInterval = setInterval(draw, speed); // Start a new game interval
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`; // Reset score display
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize));
    food.y = Math.floor(Math.random() * (canvas.height / boxSize));
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add the new head

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++; // Increment score
        // Increase speed as score increases
        speed = Math.max(50, 100 - score * 5); // Speed up the game
        clearInterval(gameInterval); // Clear current interval
        gameInterval = setInterval(draw, speed); // Start a new game interval
        generateFood(); // Generate new food
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`; // Update score display
    } else {
        // Remove the tail
        snake.pop();
    }

    // Check for wall collisions
    if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize || collision(head)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}. Press OK to restart.`);
        resetGame(); // Restart the game
    }
}

function collision(head) {
    // Check if the head collides with any part of the snake
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Set up the keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
});

// Start the game
resetGame(); // Initialize and start the game
