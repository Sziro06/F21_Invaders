//.js filer som jeg har importet
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import { score } from "./EnemyController.js";

// Under her er det variabeler
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let runde = 1;
var easyButton = document.getElementById("easyButton");
var normalButton = document.getElementById("normalButton");
var hardButton = document.getElementById("hardButton");
var highScores = JSON.parse(localStorage.getItem('highScores')) || [0, 0, 0, 0, 0, 0, 0, 0];
console.log(highScores);

canvas.width = 700;
canvas.height = 525;

const background = new Image();
background.src = "grafisken/fyrstikkalleen.png";

const playerBulletController = new BulletController(canvas, 2, "grafisken/stein.png",true);
const enemyBulletController = new BulletController(canvas, 4, "grafisken/visma.png", false);
const enemyController = new EnemyController(
    canvas, 
    enemyBulletController,
    playerBulletController
    );
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

//funksjoner nede her
easyButton.addEventListener("click", function() {
  setGameMode("easy");
  const playerBulletController = new BulletController(canvas, 6, "grafisken/stein.png",true);
});

normalButton.addEventListener("click", function() {
  setGameMode("normal");
  const playerBulletController = new BulletController(canvas, 4, "grafisken/stein.png",true);
});

hardButton.addEventListener("click", function() {
  setGameMode("hard");
  const playerBulletController = new BulletController(canvas, 2, "grafisken/stein.png",true);
});

function setGameMode(mode) {
    // Gjør endringer i spillets logikk og visning basert på valgt modus
    if (mode === "easy") {
      
    } else if (mode === "normal") {
      
    } else if (mode === "hard") {
      
    }
  
    // Skjul menyen og vis spillets innhold
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
  }

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver(){
    if(isGameOver) {
        let text = didWin ? "DU VANT" : "DU TAPTE";
        let textOffset = didWin ? 3.5 : 5;
        ctx.fillStyle = "black";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver(){
    if (isGameOver) {
        highScores = updateHighScores(score, highScores);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores(highScores);
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }
    if(enemyController.collideWith(player)) {
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        runde += 1;
        enemyController.defaultXVelocity = runde;
        enemyController.defaultYVelocity = runde;
        enemyController.forceRight();
        enemyController.moveDownTimer = 0;
        if(runde === 2){
            enemyController.createBoss(enemyController.enemyMap2,56, 83, 10)
            background.src = "grafisken/kantina.png";
        }
        else if(runde === 3){
            enemyController.createEnemies(enemyController.enemyMap1,34, 42)
            background.src = "grafisken/fyrstikkalleen.png";
        } else if(runde === 4){
            enemyController.createBoss(enemyController.enemyMap3,94,92, 20)
            background.src = "grafisken/basketballBane.png";
             
        }
        }
    if(enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true; 
        document.getElementById("menu").style.display = "none";
    }
}

function updateHighScores(score, highScores) {
    highScores.push(score);
    highScores.sort(function(a, b) {
      return b - a;
    });
    highScores = highScores.slice(0, 8);
    return highScores;
}

function displayHighScores(highScores) {
    var highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';

    highScores.forEach(function(score, index) {
        var scoreElement = document.createElement('div');
        scoreElement.textContent = 'Score ' + (index + 1) + ': ' + score;
        highScoresList.appendChild(scoreElement);
    });
}


//eksportet variabel.
export {runde};

//innebygd JavaScript funksjon. Koden kan endre hastigheten til spille.
setInterval(game, 900 / 60)

