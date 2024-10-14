const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game properties
const boxSize = 20; // Size of each box
let snake = [{ x: 10, y: 10 }]; // Initial position of the snake
let direction = { x: 1, y: 0 }; // Initial direction (moving right)
let food = { x: Math.floor(Math.random() * (canvas.width / boxSize)), y: Math.floor(Math.random() * (canvas.height / boxSize)) }; // Initial food position
let score = 0;

// Function to reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    score = 0; // Reset score
    generateFood();
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
}

// Function to generate food at random positions
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize));
    food.y = Math.floor(Math.random() * (canvas.height / boxSize));
}

// Main draw function to update game state
function draw() {
    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add new head

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++; // Increment score
        generateFood(); // Generate new food
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    } else {
        // Remove the last part of the snake (tail)
        snake.pop();
    }

    // Check for wall collisions or self-collisions
    if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize || checkSelfCollision(head)) {
        alert(`Game Over! Your score: ${score}.`);
        resetGame(); // Restart the game
    }

    // Redraw the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
}

// Function to check if the snake collides with itself
function checkSelfCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Function to set up keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 }; // Move up
    } else if (event.key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 }; // Move down
    } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 }; // Move left
    } else if (event.key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 }; // Move right
    }
});

// Start the game loop
resetGame(); // Initialize game state
setInterval(draw, 300); // Run the game loop every 100 milliseconds
