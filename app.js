// Función para generar un número aleatorio entre 2 y 99
function generateRandomNumber() {
    return Math.floor(Math.random() * (99 - 2 + 1)) + 2;
}

// Función para crear una nueva carta y agregarla a la mano
function createCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('draggable');
    card.style.backgroundImage = 'card.png';
    document.querySelector('.hand').appendChild(card);
}

// Función para iniciar el juego y dar al jugador ocho cartas
function startGame() {
    const hand = document.querySelector('.hand');
    while (hand.firstChild) {
        hand.removeChild(hand.firstChild);
    }

    for (let i = 0; i < 8; i++) {
        const randomNumber = generateRandomNumber();
        createCard(randomNumber);
    }
    document.querySelector('.button.start').setAttribute('disabled', 'true');
}

// Función para jalar una carta si el jugador tiene menos de ocho cartas
function jalarCarta() {
    const cardsInHand = document.querySelectorAll('.hand .card');
    if (cardsInHand.length < 8) {
        const randomNumber = generateRandomNumber();
        createCard(randomNumber);
    } else {
        alert("Ya tienes ocho cartas en tu mano.");
    }
}

// Agrega un controlador de eventos al botón "Iniciar Juego"
document.querySelector('.button.start').addEventListener('click', startGame);

// Agrega un controlador de eventos al botón "Jalar Carta"
document.querySelector('.button.draw').addEventListener('click', jalarCarta);

// Hacer las cartas arrastrables
interact('.draggable')
    .draggable({
        onmove: function (event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '.board', // Restringir el movimiento al área del tablero
                endOnly: true, // Solo al soltar la carta se aplica la restricción
            }),
        ],
    });
