const userInput = document.getElementById("number");

const convertBtn = document.getElementById("convert-btn");

const result = document.getElementById("output");

const convertfunc = (num) => {
  let msg = "";
  let iserr = false;
  if(!num){
    msg="Please enter a valid number";
    iserr = true;
  }
  else if(num<1){
    msg = "Please enter a number greater than or equal to 1";
   iserr = true;
  }
  else if(num>=4000){
    msg = "Please enter a number less than or equal to 3999";
    iserr = true;
  }
  else{
    const roman = [
      ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
    ];
    while(num>0){
      for(let i=0;i<roman.length;i++){
        if(num>=roman[i][1]){
          msg+= roman[i][0];
          num -= roman[i][1];
          break;
        }
      }
    }
  }
   output.innerText="";
   output.classList.remove('err');
  if(iserr===true){
      output.classList.add('err');
  }
  output.innerText = msg;
  result.classList.remove("hidden");
 
}

convertBtn.addEventListener("click",()=>{
  convertfunc(userInput.value);
})

userInput.addEventListener("keydown",(event)=>{
  if(event.key==="Enter") {convertfunc(userInput.value);
  }
})