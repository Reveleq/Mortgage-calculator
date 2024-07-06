const amount = document.querySelector("#amount");
const team = document.querySelector("#team");
const rate = document.querySelector("#rate");
const type = document.querySelector("#type");
const submit = document.querySelector(".calculator__left-submit");
const clear = document.querySelector(".calculator__left-btn");
const fieds = document.querySelectorAll(".calculator__left-form-field");
const repayment = document.querySelector("#repayment");
const interest = document.querySelector("#interest");
const defaultRightSide = document.querySelector(
  ".calculator__right-common-box"
);
const resultRightSide = document.querySelector(".calculator__right-result-box");
const repaymentParagraph = document.querySelector(
  ".calculator__right-card-repayments"
);
const repayParagraph = document.querySelector(".calculator__right-card-repay");
const checkNumber = () => {
  if (!Number(amount) || !Number(team) || !Number(rate)) {
    window.alert("Don't use letters!");
    clearAll();
  } else {
    formula();
  }
};
const formula = () => {
  let typeData = "";
  let monthlyPayment = 0;
  let totalRepayment = 0;
  const amountData = parseFloat(amount.value);
  const termData = parseInt(team.value);
  const rateData = parseFloat(rate.value) / 100;
  console.log(amount.value, amountData);
  console.log(team.value, termData);
  console.log(rate.value, rateData);
  if (repayment.checked) {
    const repayment_ = repayment.value;
    typeData = repayment_;
  } else if (interest.checked) {
    const interest_ = interest.value;
    typeData = interest_;
  }
  const rate_ = rateData / 12;
  const term_ = termData * 12;
  if (typeData === "repayment") {
    monthlyPayment = (
      (amountData * (rate_ * Math.pow(1 + rate_, term_))) /
      (Math.pow(1 + rate_, term_) - 1)
    ).toFixed(2);
    totalRepayment = (monthlyPayment * term_).toFixed(2);
  } else if ((typeData = "interest")) {
    monthlyPayment = (
      (amountData * (rate_ * Math.pow(1 + rate_, term_))) /
      (Math.pow(1 + rate_, term_) - 1)
    ).toFixed(2);
    const totalRepayment_ = (monthlyPayment * term_).toFixed(2);
    totalRepayment = (totalRepayment_ - amountData).toFixed(2);
  }
  if (monthlyPayment && totalRepayment) {
    defaultRightSide.style.display = "none";
    resultRightSide.style.display = "flex";
    repayParagraph.textContent = totalRepayment;
    repaymentParagraph.textContent = Math.floor(monthlyPayment);
  }
};
const clearAll = () => {
  amount.value = "";
  const amounterror = document.querySelector(".error-amount");
  amounterror.style.display = "none";
  team.value = "";
  const teamerror = document.querySelector(".error-team");
  teamerror.style.display = "none";
  rate.value = "";
  const rateerror = document.querySelector(".error-rate");
  rateerror.style.display = "none";
  repayment.checked = false;
  interest.checked = false;
  const typeerror = document.querySelector(".error-type");
  typeerror.style.display = "none";
  defaultRightSide.style.display = "flex";
  resultRightSide.style.display = "none";
  repayParagraph.textContent = "";
  repaymentParagraph.textContent = "";
};
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!amount.value) {
    const amounterror = document.querySelector(".error-amount");
    amounterror.style.display = "block";
  }
  if (!team.value) {
    const teamerror = document.querySelector(".error-team");
    teamerror.style.display = "block";
  }
  if (!rate.value) {
    const rateerror = document.querySelector(".error-rate");
    rateerror.style.display = "block";
  }
  if (!repayment.checked && !interest.checked) {
    console.log(repayment.checked, interest.checked);
    const typeerror = document.querySelector(".error-type");
    typeerror.style.display = "block";
  }
  if (
    amount.value &&
    team.value &&
    rate.value &&
    (repayment.checked || interest.checked)
  ) {
    const amounterror = document.querySelector(".error-amount");
    amounterror.style.display = "none";
    const teamerror = document.querySelector(".error-team");
    teamerror.style.display = "none";
    const rateerror = document.querySelector(".error-rate");
    rateerror.style.display = "none";
    const typeerror = document.querySelector(".error-type");
    typeerror.style.display = "none";
    formula();
  }
});

clear.addEventListener("click", (e) => {
  e.preventDefault();
  clearAll();
});
