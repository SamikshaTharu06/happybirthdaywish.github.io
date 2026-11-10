
const $ = (s) => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
const showScreen = (id) => {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  document.body.classList.toggle('night-mode', id === 'ending');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Edit these messages whenever you want to make the story more personal.
const wishes = [
  'The beginning of a beautiful journey. The world became brighter with you in it.',
  'Two years of tiny steps, little discoveries, and endless possibilities.',
  'A little star growing brighter every single day.',
  'Four years of giggles, wonder, and a heart full of dreams.',
  'A little girl with a world full of imagination.',
  'Six years of learning, playing, and making lovely memories.',
  'Seven looks beautiful on you. Keep that sunshine smile.',
  'Eight years of becoming your own little superhero.',
  'A new year, new dreams, and so many stories waiting for you.',
  'Ten years of growing, glowing, and making the world more colorful.',
  'Eleven: a little wiser, a little braver, and still wonderfully you.',
  'Twelve years of finding your sparkle and letting it shine.',
  'Thirteen: growing into someone with her own beautiful dreams.',
  'Fourteen years of strength, kindness, and lovely little moments.',
  'Fifteen: standing at the edge of so many exciting adventures.',
  'Year 16... This is where my story with you, Sami, begins. After you completed your secondary-level school, during those beautiful holidays, I came into your life. Honestly, that became the best holiday time of my life. ❤️',
  'More memories, more smiles, and more reasons to be thankful that I met you.',
  'Another beautiful year, and I feel lucky to have someone like you in my life.',
  'And here you are, 19, Sami! My favorite person, my happiness, and someone I want to see smiling forever. Happy Birthday, my love! ❤️'
];
const balloonColors = ['#ff7198','#9d8bff','#ffc45e','#68c9c0','#ff8c69','#8bb8ff','#e98bc9','#a5cf79','#ffadca','#b89aff','#f2a45f','#77c5e8','#ed7892','#a9a0ed','#f2c36b','#ff82a8','#80cbb2','#c18ae8','#ff668a'];
let currentYear = 0;
let balloonTimer;
let balloonBusy = false;

function launchBalloon() {
  if (currentYear >= wishes.length) {
    $('#balloonWrap').classList.add('hidden');
    $('#balloonMessage').classList.remove('visible');
    $('#yearCounter').textContent = '19 / 19';
    $('#yearProgress').style.width = '100%';
    $('.section-footnote').textContent = '19 years of your beautiful life... and I hope I get to be part of many more chapters. ❤️';
    $('#toGiftFromYears').classList.remove('hidden');
    return;
  }
  balloonBusy = true;
  const n = currentYear + 1;
  const balloon = $('#balloon');
  $('#balloonYear').textContent = `Year ${n}`;
  balloon.style.setProperty('--balloon-color', balloonColors[currentYear]);
  balloon.style.setProperty('--float-duration', `${7 + (currentYear % 3)}s`);
  $('#balloonText').textContent = wishes[currentYear];
  $('#yearCounter').textContent = `${String(n).padStart(2,'0')} / 19`;
  $('#yearProgress').style.width = `${n / 19 * 100}%`;
  $('#balloonMessage').classList.add('visible');
  $('#balloonWrap').classList.remove('hidden');
  $('#balloonWrap').classList.remove('float-up');
  void $('#balloonWrap').offsetWidth;
  $('#balloonWrap').classList.add('float-up');
  const duration = 7600 + (currentYear % 3) * 350;
  balloonTimer = setTimeout(() => {
    $('#balloonMessage').classList.remove('visible');
    $('#balloonWrap').classList.remove('float-up');
    currentYear++;
    balloonBusy = false;
    setTimeout(launchBalloon, 500);
  }, duration);
}

$('#beginBtn').addEventListener('click', () => {
  showScreen('years');
  currentYear = 0;
  setTimeout(launchBalloon, 600);
  startMusic();
});
$('#toGiftFromYears').addEventListener('click', () => showScreen('gift'));

$('#openGift').addEventListener('click', () => {
  $('#giftBox').classList.add('opened');
  $('#openGift').classList.add('hidden');
  $('#choiceArea').classList.remove('hidden');
});
function showReaction(html, kind) {
  $('#choiceArea').classList.add('hidden');
  const reaction = $('#reaction');
  reaction.className = `reaction ${kind}`;
  reaction.innerHTML = html;
}
$('#chooseMe').addEventListener('click', () => {
  showReaction(`<div class="reaction-emoji">💗</div><h3>THANK YOU FOR CHOOSING ME!</h3><p>Congratulations! You just got yourself a boyfriend who promises to keep loving you, supporting you, annoying you, and making you smile.</p><p>And I promise I'll try my best to be the best boyfriend for you. I love you! ❤️</p><button class="primary-btn" id="happyEnd">Forever together ❤️</button>`, 'happy-reaction');
  heartBurst();
  $('#happyEnd').addEventListener('click', () => showScreen('ending'));
});
$('#chooseOther').addEventListener('click', () => {
  showReaction(`<div class="reaction-emoji crying-face">🥺</div><h3>WAIT... WHAT?! 😭</h3><p>YOU CHOSE SOMETHING ELSE INSTEAD OF ME?</p><p class="cry-line">Okay... I'll just sit here and cry. 😭💔</p><div class="tears">💧 💧 💧</div><button class="primary-btn" id="chooseAgain">Okay fine, I choose you ❤️</button>`, 'sad-reaction');
  setTimeout(() => $('.crying-face')?.classList.add('crying'), 2400);
  $('#chooseAgain').addEventListener('click', () => {
    showReaction(`<div class="reaction-emoji">🥹💗</div><h3>YOU CHOSE ME!</h3><p>My tears have officially turned into happy tears. I love you! ❤️</p><button class="primary-btn" id="happyEnd2">Forever together ❤️</button>`, 'happy-reaction');
    heartBurst();
    $('#happyEnd2').addEventListener('click', () => showScreen('ending'));
  });
});

function heartBurst() {
  for (let i=0;i<24;i++) {
    const h=document.createElement('span'); h.className='burst-heart'; h.textContent=['♥','♡','✦'][i%3];
    h.style.left=`${10+Math.random()*80}%`; h.style.setProperty('--drift',`${(Math.random()-.5)*180}px`); h.style.animationDelay=`${Math.random()*.5}s`;
    document.body.appendChild(h); setTimeout(()=>h.remove(),2600);
  }
}
$('#replayBtn').addEventListener('click', () => { clearTimeout(balloonTimer); currentYear=0; $('#toGiftFromYears').classList.add('hidden'); $('#balloonWrap').classList.remove('hidden'); $('#reaction').className='reaction hidden'; $('#openGift').classList.remove('hidden'); $('#choiceArea').classList.add('hidden'); $('#giftBox').classList.remove('opened'); showScreen('welcome'); });

// Decorative falling petals. Reduced-motion users get a static garden instead.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const petals = $('#petals');
  for (let i=0;i<18;i++) { const p=document.createElement('i'); p.className='petal'; p.style.left=`${Math.random()*100}%`; p.style.animationDelay=`${Math.random()*14}s`; p.style.animationDuration=`${10+Math.random()*12}s`; petals.appendChild(p); }
}

// Add a local audio file at public/music/romantic.mp3 to enable background music.
const music = $('#bgMusic');
music.src = 'assets/music/romantic.mp3';
async function startMusic() { try { await music.play(); $('#musicToggle span').textContent='Music on'; $('#musicToggle').classList.add('playing'); } catch { $('#musicToggle span').textContent='Add music'; } }
$('#musicToggle').addEventListener('click', async () => {
  if (music.paused) await startMusic(); else { music.pause(); $('#musicToggle span').textContent='Music off'; $('#musicToggle').classList.remove('playing'); }
});
