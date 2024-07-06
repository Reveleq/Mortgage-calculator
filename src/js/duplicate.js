document.addEventListener("DOMContentLoaded", () => {
  const get = (id) => {
    return document.querySelector(id);
  };

  const repayment = get("#repayment-radio");
  const interest = get("#interest-radio");

  get("#monto").addEventListener("mouseover", () => {
    get("#monto").style.border = "1px solid hsl(61, 70%, 52%)";
    get("#input-uno").style.backgroundColor = "hsl(61, 70%, 52%)";
  });

  get("#monto").addEventListener("mouseout", () => {
    get("#monto").style.border = "1px solid black";
    get("#input-uno").style.backgroundColor = "hsl(203, 41%, 72%)";
  });

  get("#plazo").addEventListener("mouseover", () => {
    get("#plazo").style.border = "1px solid hsl(61, 70%, 52%)";
    get("#input-dos").style.backgroundColor = "hsl(61, 70%, 52%)";
  });

  get("#plazo").addEventListener("mouseout", () => {
    get("#plazo").style.border = "1px solid black";
    get("#input-dos").style.backgroundColor = "hsl(203, 41%, 72%)";
  });

  get("#tasa").addEventListener("mouseover", () => {
    get("#tasa").style.border = "1px solid hsl(61, 70%, 52%)";
    get("#input-tres").style.backgroundColor = "hsl(61, 70%, 52%)";
  });

  get("#tasa").addEventListener("mouseout", () => {
    get("#tasa").style.border = "1px solid black";
    get("#input-tres").style.backgroundColor = "hsl(203, 41%, 72%)";
  });

  repayment.addEventListener("click", () => {
    if (repayment.checked) {
      get("#radio-uno").classList.add("fondo-con-puntos");
      get("#radio-dos").classList.remove("fondo-con-puntos");
      get("#radio-uno").style.border = "1px solid hsl(61, 70%, 52%)";
      get("#radio-dos").style.border = "1px solid hsl(202, 55%, 16%)";
      interest.checked = false;
    }
  });

  interest.addEventListener("click", () => {
    if (interest.checked) {
      get("#radio-dos").classList.add("fondo-con-puntos");
      get("#radio-uno").classList.remove("fondo-con-puntos");
      get("#radio-dos").style.border = "1px solid hsl(61, 70%, 52%)";
      get("#radio-uno").style.border = "1px solid hsl(202, 55%, 16%)";
      repayment.checked = false;
    }
  });

  get("#form").addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = parseFloat(get("#monto").value);
    const plazo = parseInt(get("#plazo").value);
    const tasa = parseFloat(get("#tasa").value) / 100;

    let valid = true;

    if (!repayment.checked && !interest.checked) {
      get("#small-radio").innerText = "Debe elegir una opción";
      valid = false;
    } else {
      get("#small-radio").innerText = "";
    }

    if (isNaN(monto) || monto <= 0) {
      get("#small-monto").innerText = "Debe ingresar un monto válido";
      get("#input-uno").classList.add("item-uno-alert");
      valid = false;
    } else {
      get("#small-monto").innerText = "";
      get("#input-uno").classList.remove("item-uno-alert");
    }

    if (isNaN(plazo) || plazo <= 0) {
      get("#small-plazo").innerText = "Debe ingresar un plazo válido";
      get("#input-dos").classList.add("item-uno-alert");
      valid = false;
    } else {
      get("#small-plazo").innerText = "";
      get("#input-dos").classList.remove("item-uno-alert");
    }

    if (isNaN(tasa) || tasa <= 0) {
      get("#small-tasa").innerText = "Debe ingresar una tasa";
      get("#input-tres").classList.add("item-uno-alert");
      valid = false;
    } else {
      get("#small-tasa").innerText = "";
      get("#input-tres").classList.remove("item-tres-alert");
    }

    if (!valid) {
      return;
    }

    get(".footer-empty").style.display = "none";
    get("footer").style.backgroundColor = "hsl(200, 40%, 22%)";
    get(".footer-full").style.display = "flex";

    const numeroPagos = plazo * 12;
    const tasaInteresMensual = tasa / 12;

    const pagoMensual = (
      (monto *
        (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, numeroPagos))) /
      (Math.pow(1 + tasaInteresMensual, numeroPagos) - 1)
    ).toFixed(2);
    const totalPagado = (pagoMensual * numeroPagos).toFixed(2);
    const interesesTotales = (totalPagado - monto).toFixed(2);
    const formatNumber = (num) =>
      parseFloat(num).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    if (repayment.checked) {
      get("#resultado").innerText = "£" + formatNumber(pagoMensual);
      get("#total").innerText = "£" + formatNumber(totalPagado);
      get("#titulo-resultado").innerText = "Your monthly repayments";
    } else if (interest.checked) {
      get("#resultado").innerText = "£" + formatNumber(interesesTotales);
      get("#total").innerText = "£" + formatNumber(totalPagado);
      get("#titulo-resultado").innerText = "total interest payable";
    }
  });
});
get("#clear").addEventListener("click", () => {
  get(".footer-empty").style.display = "flex";
  get("footer").style.backgroundColor = "hsl(202, 55%, 16%)";
  get(".footer-full").style.display = "none";

  get("#radio-uno").classList.remove("fondo-con-puntos");
  get("#radio-uno").style.border = "1px solid hsl(202, 55%, 16%)";
  get("#radio-dos").classList.remove("fondo-con-puntos");
  get("#radio-dos").style.border = "1px solid hsl(202, 55%, 16%)";
  repayment.checked = false;
  interest.checked = false;
  var inputs = document.querySelectorAll("input");

  inputs.forEach(function (input) {
    input.value = "";
  });
});
