const taxi = document.getElementById("taxi");
const hat = document.getElementById("hat");

let hatX = window.innerWidth;
let taxiX = window.innerWidth / 2 - 48;
let taxiY = window.innerHeight * 0.6;

const speed = 8;

// タップ位置へ移動
document.getElementById("game").addEventListener("pointerdown", (e) => {

  const gameRect = document
    .getElementById("game")
    .getBoundingClientRect();

  taxiX = e.clientX - gameRect.left - 48;
  taxiY = e.clientY - gameRect.top - 48;

  // 画面外防止
  taxiX = Math.max(0, Math.min(taxiX, gameRect.width - 96));
  taxiY = Math.max(0, Math.min(taxiY, gameRect.height - 96));

  updateTaxi();
});
// タクシー更新
function updateTaxi() {
  taxi.style.left = taxiX + "px";
  taxi.style.top = taxiY + "px";
}

// 帽子更新
function updateHat() {
  hatX -= speed;

  // 画面外へ行ったら戻す
  if (hatX < -100) {
    hatX = window.innerWidth + Math.random() * 200;
  }

  hat.style.left = hatX + "px";
}

// 当たり判定
function checkCollision() {

  const taxiRect = taxi.getBoundingClientRect();
  const hatRect = hat.getBoundingClientRect();

  if (
    taxiRect.left < hatRect.right &&
    taxiRect.right > hatRect.left &&
    taxiRect.top < hatRect.bottom &&
    taxiRect.bottom > hatRect.top
  ) {
    console.log("帽子に当たった！");
  }
}

// ゲームループ
function gameLoop() {

  updateHat();
  checkCollision();

  requestAnimationFrame(gameLoop);
}

gameLoop();


  updateTaxi();
});
