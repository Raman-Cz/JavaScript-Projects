let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const inputValue = document.getElementById('cash');
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const displayCashDrawer = document.getElementById("display-cash-drawer");


const checkPurchase = (value, price) => {
    if (!value || isNaN(value)) {
      alert("Please enter a valid amount.");
      return;
    }
  
    value = parseFloat(value);
    let totalCash = cashInDrawer();
    if (value < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
    if(value === price){
      changeDue.innerHTML = `<div>No change due - customer paid with exact cash</div>`;
      return;
    }
  
    let change = Math.round((value - price) * 100); // Work in cents
    let newcid = cid.map(([name, amount]) => [name, 0]); // Initialize new cash drawer
    for (let i = cid.length - 1; i >= 0; i--) {
      let denomValue = getDenominationValue(cid[i][0]); // Get denomination in cents
      let denomAvailable = Math.floor(cid[i][1] * 100 / denomValue);
      let denomNeeded = Math.floor(change / denomValue);
      let denomToGive = Math.min(denomAvailable, denomNeeded);
  
      newcid[i][1] = denomToGive * denomValue / 100; // Convert back to dollars
      cid[i][1] -= denomToGive * denomValue / 100;
      change -= denomToGive * denomValue;
    }
  
    if (change > 0) {
      changeDue.innerHTML = `<div>Status: INSUFFICIENT_FUNDS</div>`;
      return;
    }
  
    
    let message = "Status: OPEN ";
    if(cashInDrawer() === 0){
       message = "Status: CLOSED ";
    }
    for(let i=8;i>=0;i--){
      if(newcid[i][1]>0) message+= newcid[i][0] + ": $"+newcid[i][1]+" ";
    }
    changeDue.innerHTML = `<div>${message}</div>`;

    display();
  
  };
  
  const getDenominationValue = (name) => {
    const values = {
      "PENNY": 1,
      "NICKEL": 5,
      "DIME": 10,
      "QUARTER": 25,
      "ONE": 100,
      "FIVE": 500,
      "TEN": 1000,
      "TWENTY": 2000,
      "ONE HUNDRED": 10000
    };
    return values[name];
  };

const cashInDrawer = () => {
  let sum = 0;
  for(let i=0;i<cid.length;i++){
    sum += cid[i][1];
  }

  return sum;
}

purchaseBtn.addEventListener('click',() => checkPurchase(inputValue.value,price));

const display = () =>{
displayCashDrawer.innerHTML = "";
for(let i=0;i<cid.length;i++){
  displayCashDrawer.innerHTML += `<div id="display-drawer"><p>${cid[i][0]}</p>
                                        <p>$${cid[i][1]}</p>
                                  </div>`;
}
};

display();





