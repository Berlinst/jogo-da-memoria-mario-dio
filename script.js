var btn = document.getElementById('start')

var hh = 0;
var mm = 0;
var ss = 0;
var tempo = 1000;
var cron;

function start() {
    cron = setInterval(() => { timer(); }, tempo);
}

function timer() {
    ss++; 

    if (ss == 60) { 
        ss = 0; 
        mm++; 

        if (mm == 60) { 
            mm = 0;
            hh++;
        }
    }

    var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    
    document.getElementById('counter').innerText = format;

    return format;
}

const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false
let score = 0
let gameOver = false

function flipCard(){
    if(lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')
    if (!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
        return
    }
    secondCard = this

    checkForMath()
}

function checkForMath(){
    if (firstCard.dataset.card ===  secondCard.dataset.card){
        disableCards()
        score++;
        isGameOver();
        return
    }

    unflipCards()
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1000)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

function isGameOver() {
    if(score === 6) {
        const win = document.getElementById("win")
        const info = document.getElementById("info")
        const button = document.createElement('button')
        info.appendChild(button)
        win.innerHTML = "Parabéns, você conseguiu!"
        button.innerHTML = "Recomeçar"
        win.classList.add("win")
        button.classList.add("btn")
        button.addEventListener('click', reload)
        info.removeChild(btn)

        clearInterval(cron);
         
        function reload(){
            document.location.reload(true)
        }

    }
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});