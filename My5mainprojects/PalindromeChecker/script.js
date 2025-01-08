const userInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
function containsOnlyNumbersAndLetters(input) {
  return /^[a-zA-Z0-9]+$/.test(input);
}
const checkPalindrome = input => {
  if(input === ""){
    alert("Please input a value");
    return;
  }
  result.replaceChildren();
  let original="";
  for(let i = 0;i<input.length;i++){
    if(containsOnlyNumbersAndLetters(input[i])) original+=input[i];
  }
  let reverse = "";
  for(let j = input.length-1;j>=0;j--){
    if(containsOnlyNumbersAndLetters(input[j])) reverse+=input[j];
  }
  original = original.toLowerCase();
  reverse = reverse.toLowerCase();
  
  const message = `${input} ${original===reverse?"is":"is not"} a palindrome`;

  const tag = document.createElement('p');
  tag.className = "user-input";
  tag.innerHTML = message;
  result.appendChild(tag);

  result.classList.remove("hidden");
  
};
checkBtn.addEventListener('click',() => {
  checkPalindrome(userInput.value);
  userInput.value = "";
});

userInput.addEventListener('keydown',e => {
   if (e.key === 'Enter') {
    checkPalindrome(userInput.value);
    userInput.value = '';
  }
});

