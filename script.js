const DEMO_PIN = "1234";

let transferType = "";
let selectedBank = "";
let currentBalance = 83450;

/* BANK LISTS */

const localBanks = [
  "HSBC",
  "Hong Leong Bank",
  "Other"
];

const internationalBanks = [
  "Bank of the Philippine Islands (BPI)",
  "BDO Unibank",
  "UnionBank",
  "Bank Mandiri",
  "BRI",
  "BNI",
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Other"
];

const wallets = [
  "GCash",
  "GoPay",
  "Alipay",
  "Maya",
  "Western Union",
  "Other"
];

/* DEMO TRANSACTIONS */

let transactions = [
{
receiver:"Michael Johnson",
bank:"HSBC",
amount:"12500.00",
type:"Sent",
date:"12 May 2026, 09:15 AM"
},
{
receiver:"Sarah Williams",
bank:"Hong Leong Bank",
amount:"8200.00",
type:"Received",
date:"10 May 2026, 03:42 PM"
},
{
receiver:"David Brown",
bank:"BDO Unibank",
amount:"15750.00",
type:"Sent",
date:"08 May 2026, 11:25 AM"
},
{
receiver:"Emma Davis",
bank:"GCash",
amount:"5400.00",
type:"Received",
date:"05 May 2026, 08:10 PM"
},
{
receiver:"James Wilson",
bank:"Bank Mandiri",
amount:"22000.00",
type:"Sent",
date:"03 May 2026, 01:35 PM"
},
{
receiver:"Olivia Taylor",
bank:"Vietcombank",
amount:"11800.00",
type:"Received",
date:"29 Apr 2026, 10:05 AM"
},
{
receiver:"Daniel Martinez",
bank:"UnionBank",
amount:"9800.00",
type:"Sent",
date:"25 Apr 2026, 04:55 PM"
},
{
receiver:"Sophia Anderson",
bank:"Maya",
amount:"6300.00",
type:"Received",
date:"22 Apr 2026, 09:30 AM"
},
{
receiver:"William Thomas",
bank:"BRI",
amount:"18500.00",
type:"Sent",
date:"18 Apr 2026, 07:45 PM"
},
{
receiver:"Charlotte Moore",
bank:"Alipay",
amount:"7200.00",
type:"Received",
date:"14 Apr 2026, 02:20 PM"
},
{
receiver:"Benjamin White",
bank:"BPI",
amount:"14100.00",
type:"Sent",
date:"10 Apr 2026, 11:00 AM"
},
{
receiver:"Amelia Harris",
bank:"Western Union",
amount:"8900.00",
type:"Received",
date:"07 Apr 2026, 05:15 PM"
},
{
receiver:"Lucas Martin",
bank:"VietinBank",
amount:"26500.00",
type:"Sent",
date:"03 Apr 2026, 12:40 PM"
},
{
receiver:"Mia Thompson",
bank:"BIDV",
amount:"9600.00",
type:"Received",
date:"30 Mar 2026, 08:25 AM"
},
{
receiver:"Alexander Garcia",
bank:"BNI",
amount:"31000.00",
type:"Sent",
date:"26 Mar 2026, 06:50 PM"
}
];

/* LOGIN */

function login(){

const pin =
document.getElementById("pin").value;

if(pin !== DEMO_PIN){

document.getElementById("loginError")
.innerHTML = "Invalid PIN";

return;
}

document.getElementById("loginScreen")
.style.display = "none";

document.getElementById("bankApp")
.style.display = "block";
}

/* PAGE CONTROL */

function showStep(id){

document
.querySelectorAll(".step")
.forEach(step=>{
step.classList.remove("active");
});

document
.getElementById(id)
.classList.add("active");
}

/* HISTORY */

function openHistoryPage(){

updateTransactionHistory();

showStep("historyPage");
}

/* TRANSFER TYPE */

function selectTransfer(type){

transferType = type;

let list = [];

if(type === "Local Bank"){
list = localBanks;
}

if(type === "International Bank"){
list = internationalBanks;
}

if(type === "Other Wallet"){
list = wallets;
}

const select =
document.getElementById("bankName");

select.innerHTML = "";

list.forEach(item=>{

let option =
document.createElement("option");

option.value = item;
option.textContent = item;

select.appendChild(option);
});

select.onchange = function(){

document.getElementById("customBank")
.style.display =
this.value === "Other"
? "block"
: "none";
};

showStep("step2");
}

/* DETAILS */

function goToDetails(){

selectedBank =
document.getElementById("bankName").value;

if(selectedBank === "Other"){

selectedBank =
document.getElementById("customBank").value;
}

showStep("step3");
}

/* REVIEW */

function reviewTransfer(){

let amount =
parseFloat(
document.getElementById("amount").value
);

if(!amount || amount <= 0){

alert("Enter valid amount");
return;
}

let fee =
(amount / 100) * 5;

let total =
amount + fee;

if(total > currentBalance){

alert("Insufficient Balance");
return;
}

document.getElementById("reviewBox")
.innerHTML = `

<b>Transfer Type:</b> ${transferType}<br>
<b>Bank / Wallet:</b> ${selectedBank}<br><br>

<b>Amount:</b> $${amount.toFixed(2)}<br>
<b>Transfer Fee:</b> $${fee.toFixed(2)}<br>
<b>Total Deduction:</b> $${total.toFixed(2)}

`;

showStep("step4");
}

/* PROCESSING */

function startTransfer(){

showStep("step5");

setTimeout(() => {

completeTransfer();

},15000);
}

/* COMPLETE */

function completeTransfer(){

let senderName =
document.getElementById("senderName").value;

let senderAccount =
document.getElementById("senderAccount").value;

let receiverName =
document.getElementById("receiverName").value;

let receiverAccount =
document.getElementById("receiverAccount").value;

let amount =
parseFloat(
document.getElementById("amount").value
);

let country =
document.getElementById("country").value;

let currency =
document.getElementById("currency").value;

let purpose =
document.getElementById("purpose").value;

let fee =
(amount / 100) * 5;

let total =
amount + fee;

currentBalance =
currentBalance - total;

document.getElementById("balance")
.innerHTML =
"$" +
currentBalance.toLocaleString() +
" USD";

let txid =
"GUB" +
Math.floor(
100000000 +
Math.random()*900000000
);

let date =
new Date().toLocaleString();

/* SAVE HISTORY */

transactions.unshift({
receiver:receiverName,
bank:selectedBank,
amount:amount.toFixed(2),
type:"Sent",
date:date
});

/* RECEIPT */

document.getElementById("receipt")
.innerHTML = `

<div style="text-align:center">

<div style="font-size:60px">🏦</div>

<h1>GLOBAL UNION BANK</h1>

<p style="color:#64748b">
Official Transfer Receipt
</p>

<p style="font-size:12px;color:#64748b">

This receipt has been generated electronically by Global Union Bank.

</p>

</div>

<hr><br>

<b>Transaction ID:</b>
${txid}<br>

<b>Date & Time:</b>
${date}<br><br>

<h3>Sender Details</h3>

<b>Name:</b>
${senderName}<br>

<b>Account Number:</b>
${senderAccount}<br><br>

<h3>Receiver Details</h3>

<b>Name:</b>
${receiverName}<br>

<b>Account Number:</b>
${receiverAccount}<br><br>

<h3>Transfer Information</h3>

<b>Transfer Type:</b>
${transferType}<br>

<b>Bank / Wallet:</b>
${selectedBank}<br>

<b>Country:</b>
${country}<br>

<b>Currency:</b>
${currency}<br>

<b>Amount:</b>
$${amount.toFixed(2)}<br>

<b>Transfer Fee:</b>
$${fee.toFixed(2)}<br>

<b>Total Deducted:</b>
$${total.toFixed(2)}<br>

<b>Purpose:</b>
${purpose}<br><br>

<div style="
background:#ecfdf5;
border:2px solid #22c55e;
padding:15px;
border-radius:15px;
text-align:center;
font-weight:bold;
color:#15803d;
">

✓ TRANSACTION SUCCESSFUL

</div>

<br>

<div class="paid-stamp">
PAID ✓
</div>

<br>

<div style="
text-align:center;
font-size:12px;
color:#64748b;
">

Generated by Global Union Bank<br>
Official Banking Transaction Record

</div>

`;

showStep("step6");
}

/* HISTORY LIST */

function updateTransactionHistory(){

const container =
document.getElementById("transactionHistory");

container.innerHTML = "";

transactions.forEach((tx,index)=>{

const sign =
tx.type === "Received"
? "+"
: "-";

const color =
tx.type === "Received"
? "green"
: "#dc2626";

container.innerHTML += `

<div class="history-item"
onclick="openTransaction(${index})">

<div class="history-title">
${tx.receiver}
</div>

<div>${tx.bank}</div>

<div class="history-date">
${tx.date}
</div>

<div style="
font-weight:bold;
color:${color};
">

${sign}$${tx.amount}
(${tx.type})

</div>

</div>

`;
});
}

/* DETAILS PAGE */

function openTransaction(index){

const tx =
transactions[index];

document.getElementById(
"transactionDetailContent"
).innerHTML = `

<h3>${tx.receiver}</h3>

<hr><br>

<b>Bank:</b>
${tx.bank}<br>

<b>Type:</b>
${tx.type}<br>

<b>Amount:</b>
$${tx.amount}<br>

<b>Date:</b>
${tx.date}<br>

`;

showStep("transactionDetail");
  }
