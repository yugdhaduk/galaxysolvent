const netKgInput = document.getElementById("netKg");
const bagsInput = document.getElementById("bags");
const totalNetKgInput = document.getElementById("totalNetKg");
const customBagsInput = document.getElementById("customBags");

const bhatiResult = document.getElementById("bhatiResult");
const totalAddBag = document.getElementById("totalAddBag");
const totalWithdrawBag = document.getElementById("totalWithdrawBag");
const remainingResult = document.getElementById("remainingResult");
const customResults = document.getElementById("customResults");

let bhati = 0;
let currentKg = 0;

function calculate() {
  const netKg = parseFloat(netKgInput.value);
  const bags = parseFloat(bagsInput.value);
  const totalNetKg = parseFloat(totalNetKgInput.value);

  if (!isNaN(netKg) && !isNaN(bags) && bags !== 0) {
    bhati = netKg / bags;
    bhatiResult.textContent = `Kg Per Bag: ${bhati.toFixed(6)}`;
    currentKg = netKg;

    if (!isNaN(totalNetKg)) {
      const remaining = totalNetKg - netKg;
      remainingResult.textContent = `Remaining Kg: ${remaining.toFixed(2)}`;
      const bagCount = remaining / bhati;

      if (bagCount > 0) {
        totalAddBag.textContent = `Add Bags: ${bagCount.toFixed(2)}`;
        totalWithdrawBag.textContent = `Withdraw Bags: 0`;
        generateCustomBagList(Math.floor(bagCount));
      } else {
        totalWithdrawBag.textContent = `Withdraw Bags: ${Math.abs(bagCount).toFixed(2)}`;
        totalAddBag.textContent = `Add Bags: 0`;
        generateCustomBagList(Math.floor(bagCount));
      }
    } else {
      remainingResult.textContent = `Remaining Kg: --`;
      totalAddBag.textContent = `Add Bags: --`;
      totalWithdrawBag.textContent = `Withdraw Bags: --`;
    }
  } else {
    bhatiResult.textContent = `Kg Per Bag: --`;
    remainingResult.textContent = `Remaining Kg: --`;
    totalAddBag.textContent = `Add Bags: --`;
    totalWithdrawBag.textContent = `Withdraw Bags: --`;
    customResults.innerHTML = "--";
  }
}

function generateCustomBagList(mainBagCount) {
  const list = [mainBagCount - 1, mainBagCount, mainBagCount + 1];
  customBagsInput.value = list.join(", ");
  updateCustomBags();
}

function updateCustomBags() {
  const input = customBagsInput.value;
  const counts = input
    .split(",")
    .map(x => parseFloat(x.trim()))
    .filter(x => !isNaN(x));

  const resultsHTML = counts.map(bagCount => {
    const total = currentKg + (bagCount * bhati);
    const mode = bagCount > 0 ? "Add" : "Withdraw";
    const emoji = bagCount === 0 ? "➖" : mode === "Add" ? "🟢" : "🔴";
    return `<div>${emoji} ${mode} ${Math.abs(bagCount)} Bag→ New Total: ${total.toFixed(2)} Kg</div>`;
  }).join("");

  customResults.innerHTML = resultsHTML || "<div>Enter valid bag counts</div>";
}

netKgInput.addEventListener("input", calculate);
bagsInput.addEventListener("input", calculate);
totalNetKgInput.addEventListener("input", calculate);
customBagsInput.addEventListener("input", updateCustomBags);
