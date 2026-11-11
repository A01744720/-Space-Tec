// SPACE TEC — estrellas, reloj y audio de cuenta regresiva.
const targetDate = new Date("2026-11-30T23:59:59-07:00").getTime();
const $ = (id) => document.getElementById(id);
const pad = (n, size=2) => String(n).padStart(size, "0");
let audioEnabled = false;
let audioContext = null;
let lastSpokenSecond = null;
let launched = false;

function updateCountdown(){
  const now = Date.now();
  const distance = targetDate - now;
  if(distance <= 0){
    $("days").textContent = "000";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";
    $("countdown-status").textContent = "¡LANZAMIENTO COMPLETADO!";
    if(!launched){ launched = true; if(audioEnabled) playLaunch(); }
    return;
  }
  const totalSeconds = Math.floor(distance/1000);
  const days = Math.floor(totalSeconds/86400);
  const hours = Math.floor((totalSeconds%86400)/3600);
  const minutes = Math.floor((totalSeconds%3600)/60);
  const seconds = totalSeconds%60;
  $("days").textContent = pad(days,3);
  $("hours").textContent = pad(hours);
  $("minutes").textContent = pad(minutes);
  $("seconds").textContent = pad(seconds);
  $("countdown-status").textContent = totalSeconds <= 10 ? "SECUENCIA DE LANZAMIENTO" : "SISTEMAS EN ESPERA";
  if(audioEnabled && totalSeconds <= 10 && totalSeconds >= 1 && lastSpokenSecond !== totalSeconds){
    lastSpokenSecond = totalSeconds;
    playBeep(totalSeconds <= 3 ? 880 : 620, totalSeconds <= 3 ? .22 : .12);
  }
}
function ensureAudio(){
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if(!AudioCtx) return false;
  if(!audioContext) audioContext = new AudioCtx();
  if(audioContext.state === "suspended") audioContext.resume();
  return true;
}
function tone(frequency, start, duration, type="sine", volume=.08){
  if(!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start+.015);
  gain.gain.exponentialRampToValueAtTime(.0001, start+duration);
  oscillator.connect(gain); gain.connect(audioContext.destination);
  oscillator.start(start); oscillator.stop(start+duration+.03);
}
function playBeep(freq, duration){
  if(!audioContext) return;
  tone(freq, audioContext.currentTime, duration, "sine", .07);
}
function playLaunch(){
  if(!audioContext) return;
  const t = audioContext.currentTime;
  tone(523,t,.25,"triangle",.07);
  tone(659,t+.18,.28,"triangle",.07);
  tone(784,t+.38,.35,"triangle",.08);
  tone(1046,t+.65,.8,"sawtooth",.035);
}
$("sound-toggle").addEventListener("click", async () => {
  if(!audioEnabled){
    const ok = ensureAudio();
    if(!ok){ $("sound-label").textContent = "AUDIO NO DISPONIBLE"; return; }
    audioEnabled = true;
    $("sound-toggle").setAttribute("aria-pressed","true");
    $("sound-label").textContent = "SONIDO ACTIVADO";
    playBeep(660,.12);
  }else{
    audioEnabled = false;
    $("sound-toggle").setAttribute("aria-pressed","false");
    $("sound-label").textContent = "ACTIVAR SONIDO";
  }
});
updateCountdown();
setInterval(updateCountdown,250);

// Fondo de estrellas ligero, adaptable y sin dependencias.
const canvas = $("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resizeStars(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
  canvas.style.width = innerWidth+"px"; canvas.style.height = innerHeight+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  stars = Array.from({length:Math.min(150,Math.floor(innerWidth*innerHeight/8500))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.25+.25,a:Math.random()*.55+.15,
    speed:Math.random()*.003+.001
  }));
}
function drawStars(time=0){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    const alpha=s.a*(.72+.28*Math.sin(time*s.speed*1000+s.x));
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(232,220,190,${alpha})`;ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener("resize",resizeStars);
resizeStars();requestAnimationFrame(drawStars);
