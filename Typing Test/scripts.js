const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time= document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let n_mistakes = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = ["The quick brown fox jumps high",
  "A journey of thousand miles begins",
  "Dream big, work hard, stay focused",
  "Happiness blooms where kindness is planted",
  "Every cloud has a silver lining",
  "Actions speak louder than any words",
  "Patience and persistence conquer all challenges",
  "Life is short, cherish every moment",
  "Success is the result of preparation",
  "Learning never exhausts the active mind"];

  const randomIndex = Math.floor(Math.random()*paragraph.length);
  typingText.innerHTML='';
  for(const char of paragraph[randomIndex]){
    typingText.innerHTML += `<span>${char}</span>`;
    typingText.querySelectorAll('span')[0].classList.add('active');
    
    document.addEventListener('keydown',(e) => {
        input.focus();
    });
    typingText.addEventListener("click",()=>{
        input.focus();
    })
  }
};

// handle user input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            n_mistakes++;
            char[charIndex].classList.add('incorrect');
            
        }
        charIndex++;
        if(charIndex < char.length){
            char[charIndex].classList.add('active');
        }
        else{
            clearInterval(timer);
            calculateFinalWPM();
        }
        mistakes.innerText = n_mistakes;
        cpm.innerText = charIndex - n_mistakes;
    }
    else{

    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - n_mistakes)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex = 0;
    n_mistakes = 0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}
function calculateFinalWPM() {
    let wpmVal = Math.round(((charIndex - n_mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm.innerText = wpmVal; 
}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();