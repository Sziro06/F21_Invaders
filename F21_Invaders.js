import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
// import Enemy from "./Enemy.js";
// import Bullet from "./Bullet.js";
import MovingDirection from "./MovingDirection.js";


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let runde = 1;

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
    if (isGameOver){
        return;
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
    }
}

export {runde};

//innebygd JavaScript funksjon
setInterval(game, 900 / 60)

