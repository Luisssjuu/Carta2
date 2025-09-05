
document.getElementById("btn1").addEventListener("click", () => {
  createTeAmoRain();
  showOverlay("overlay1");
});
document.getElementById("btn2").addEventListener("click", () => showOverlay("overlay2"));
document.getElementById("btn3").addEventListener("click", () => showOverlay("overlay3"));
document.getElementById("btn4").addEventListener("click", () => {
  showOverlay("overlay4");
  setTimeout(openMail, 300); 
});

function showOverlay(id){
  closeOverlays();
  document.getElementById(id).classList.add("active");
}

function closeOverlays(){
  document.querySelectorAll(".overlay").forEach(o => o.classList.remove("active"));
  document.getElementById("envelope")?.classList.remove("open");
  document.getElementById("floatingHearts")?.classList.remove("show");
}


function createTeAmoRain() {
  const container = document.getElementById("rainContainer");
  container.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const span = document.createElement("span");
    span.textContent = "Te amo";
    span.style.animationDelay = Math.random() * 5 + "s";
    span.style.color = Math.random() > 0.5 ? "#ff4d6d" : "#ffb3c1";
    container.appendChild(span);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  spawnHearts();
  buildMosaicHeart();
});

function spawnHearts(){
  const bg = document.getElementById("heartsBg");
  for(let i=0;i<20;i++){
    const h=document.createElement("div");
    h.className="heart";
    h.style.left=Math.random()*100+"vw";
    h.style.top=Math.random()*100+"vh";
    h.style.animationDuration=5+Math.random()*5+"s";
    bg.appendChild(h);
  }
}


function buildMosaicHeart(){
  const grid = document.getElementById('mosaicHeart');
  if(!grid || grid.dataset.built) return;
  const cols = 26, rows = 20;
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const x = (c/(cols-1))*2.8 - 1.4;
      const y = (1 - r/(rows-1))*3.0 - 1.6;
      const val = Math.pow(x*x + y*y - 1, 3) - x*x*y*y*y;
      if(val <= 0){
        const s = document.createElement('span');
        s.className = 'mini-heart';
        s.textContent = '❤';
        grid.appendChild(s);
      } else {
        grid.appendChild(document.createElement('span'));
      }
    }
  }
  grid.dataset.built = "1";
}


const $envelope = document.getElementById('envelope');
const $hearts   = document.getElementById('floatingHearts');
const $openBtn  = document.getElementById('mailOpen');
const $resetBtn = document.getElementById('mailReset');

function openMail(){
  if(!$envelope) return;
  $envelope.classList.add('open');

  
  if($hearts){
     $hearts.classList.remove('show');
     void $hearts.offsetWidth;  
     setTimeout(() => $hearts.classList.add('show'), 400); 
  }
}

function resetMail(){
  if(!$envelope) return;
  $envelope.classList.remove('open');
  if($hearts){
    $hearts.classList.remove('show');
  }
}


$openBtn?.addEventListener('click', openMail);
$resetBtn?.addEventListener('click', resetMail);


window.closeOverlays = closeOverlays;


const bgMusic = document.getElementById("bgMusic");

function startMusicOnce(){
  if(bgMusic.paused){
    bgMusic.play().catch(err => console.log("Autoplay bloqueado:", err));
  }
  
  document.removeEventListener("click", startMusicOnce);
}


document.addEventListener("click", startMusicOnce);
