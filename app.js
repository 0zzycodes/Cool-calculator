const getHistory = () => {
  return document.querySelector("#history-value").innerText;
};
const printHistory = (num) => {
  document.querySelector("#history-value").innerText = num;
};
const getOutput = () => {
  return document.querySelector("#output-value").innerText;
};
const printOutput = (num) => {
  if (num == "") {
    document.querySelector("#output-value").innerText = num;
  } else {
    document.querySelector("#output-value").innerText = getFormattedNumber(num);
  }
};
const getFormattedNumber = (num) => {
  if (num == "-") {
    return "";
  }
  const n = Number(num);
  const value = n.toLocaleString("en");
  return value;
};
const reverseNumberFormat = (num) => {
  return Number(num.replace(/,/g, ""));
};
const operator = document.querySelectorAll(".operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
const number = document.querySelectorAll(".number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}

if (localStorage.getItem("dark_mode")) {
  document.querySelector(".ball").style.transform = "translateX(20px)";
} else {
  document.querySelector(".ball").style.transform = "translateX(0px)";
}
const toggler = document.querySelector(".toggler");
toggler.addEventListener("click", () => {
  if (localStorage.getItem("dark_mode")) {
    console.log("set false");
    localStorage.removeItem("dark_mode");
    localStorage.setItem("dark_mode", false);
    document.querySelector(".ball").style.transform = "translateX(20px)";
    document.querySelector("#calculator").classList.remove("dark");
  } else {
    console.log("set true");
    localStorage.removeItem("dark_mode");
    localStorage.setItem("dark_mode", true);
    document.querySelector(".ball").style.transform = "translateX(0px)";
    document.querySelector("#calculator").classList.add("dark");
  }
});
