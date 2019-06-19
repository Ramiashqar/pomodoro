// DOM elements
const timeDOM = document.querySelector("#time"),
  sessionsDOM = document.getElementById("sessions"),
  startBtn = document.querySelector("#start"),
  center = document.getElementById("center"),
  left = document.getElementById("left"),
  right = document.getElementById("right"),
  header = document.getElementById("header"),
  sessionsCount = document.querySelector(".u-read-only"),
  modalOverlay = document.querySelector(".modal--overlay"),
  modal1 = document.querySelector(".modal-1"),
  modalBtn1 = document.querySelector("#btn1"),
  modalHint1 = document.querySelector("#hint1"),
  minus1 = document.querySelector("#minus1"),
  plus1 = document.querySelector("#plus1"),
  shortBreakDOM = document.getElementById("shortBreak"),
  modal2 = document.querySelector(".modal-2"),
  modalBtn2 = document.querySelector("#btn2"),
  modalHint2 = document.querySelector("#hint2"),
  minus2 = document.querySelector("#minus2"),
  plus2 = document.querySelector("#plus2"),
  longBreakDOM = document.getElementById("longBreak"),
  modal3 = document.querySelector(".modal-3"),
  modalBtn3 = document.querySelector("#btn3"),
  modalHint3 = document.querySelector("#hint3"),
  minus3 = document.querySelector("#minus3"),
  plus3 = document.querySelector("#plus3"),
  modalT = document.querySelector(".modal-t"),
  modalBtnT = document.querySelector("#btnT"),
  modalHintT = document.querySelector("#hintT"),
  minusT = document.querySelector("#minusT"),
  plusT = document.querySelector("#plusT"),
  breakDOM = document.querySelector(".break"),
  breakBtn = document.querySelector("#breakBtn"),
  startBreakBtn = document.querySelector("#startBreakBtn"),
  shortHeader = document.querySelector(".short--header"),
  longHeader = document.querySelector(".long--header"),
  alarm = document.querySelector("#alarm"),
  navIcon = document.querySelector(".nav-icon");
// read values from local storage
localRead();
// Variables
let minutes = Number(String(timeDOM.textContent).slice(0, 3)),
// let minutes = 0.1, // Testing
  startMinutes = minutes,
  seconds = minutes * 60, // Convert the whole time to seconds
  sessions = Number(sessionsDOM.textContent),
  doneSession = 0,
  modalValue1 = document.querySelector("#value1"),
  modalValue2 = document.querySelector("#value2"),
  modalValue3 = document.querySelector("#value3"),
  modalValueT = document.querySelector("#valueT"),
  breakTimeShort = document.querySelector("#breakTimeShort"),
  breakTimeLong = document.querySelector("#breakTimeLong"),
  sBreakTime,
  sBreakTimeOriginal,
  breakSec;

// Change DOM order for screens > 900px
const parentEl = center.parentNode;
if (window.innerWidth > 899) {
  parentEl.insertBefore(left, center);
}
// Insert sessions circles
sessionsPassed(sessions);

// Create Reset button
const reset = document.createElement("a");

// Timer setTimeout
const timer = () => {
  setTimeout(myTimer, 1000);
};

// FUNCTIONS
// local storage read
function localRead() {
  if (localStorage.longBreak) {
    longBreakDOM.textContent = localStorage.longBreak;
  } else {
    longBreakDOM.textContent = "20 Minutes";
  }
  if (localStorage.shortBreak) {
    shortBreakDOM.textContent = localStorage.shortBreak;
  } else {
    shortBreakDOM.textContent = "5 Minutes";
  }
  if (localStorage.sessions) {
    sessionsDOM.textContent = localStorage.sessions;
  } else {
    sessionsDOM.textContent = "4";
  }
  if (localStorage.timer) {
    timeDOM.textContent = `${localStorage.timer} : 00`;
  } else {
    timeDOM.textContent = "25 : 00";
  }
}
// The actual timer function
function myTimer() {
  let timeLeft = seconds--;
  let toMinutes = parseInt(timeLeft / 60); // Convert back time to seconds
  if (toMinutes < 10) {
    toMinutes = `0${toMinutes}`;
  }
  let toSeconds = timeLeft % 60;
  if (toSeconds < 10) {
    toSeconds = `0${toSeconds}`;
  }
  if (timeLeft < 30) {
    timeDOM.classList.add("center__time--flash");
    timeDOM.classList.remove("center__time--running");
  }
  timeDOM.textContent = `${toMinutes}:${toSeconds}`;
  if (!Number(toSeconds) && Number(toSeconds) !== 0) {
    clearTimeout(timer);
    alarm.play();
    setTimeout(() => {
      alarm.pause();
      alarm.currentTime = 0;
    }, 5000);
    timeDOM.textContent = `${startMinutes} : 00`;
    startBtn.textContent = "Start";
    startBtn.classList.toggle("stop");
    timeDOM.classList.remove("center__time--flash");
    seconds = minutes * 60;
    doneSession++;
    if (doneSession < Number(sessionsDOM.textContent)) {
      startBreak("short");
    } else {
      startBreak("long");
    }
    colorSession(doneSession);
    DOMManipulation();
    return;
  }
  setTimeout(myTimer, 1000);
}
// Create sessions circles
function sessionsPassed(s) {
  for (let i = s; i > 0; ) {
    const sessionsDOM = document.createElement("i");
    sessionsDOM.textContent = " ";
    sessionsDOM.classList = "center__time--circle";
    center.appendChild(sessionsDOM);
    i--;
  }
}
// Color sessions circles
function colorSession(ds) {
  let allSessions = document.querySelectorAll(".center__time--circle");
  for (let i = ds; i < sessions + 1; ) {
    allSessions[i - 1].classList.add("center__time--circle--passed");
    sessionsCount.textContent = i;
    if (i === sessions) {
      doneSession = 0;
      allSessions.forEach(el => {
        setTimeout(() => {
          el.classList.remove("center__time--circle--passed");
          sessionsCount.textContent = 0;
        }, 2000);
      });
    }
    i = sessions + 1;
  }
  if (doneSession > 0) {
    reset.textContent = "Reset";
    reset.classList = "reset";
    center.appendChild(reset);
  }
}
// Hide elements when pressing start
function DOMManipulation() {
  left.classList.toggle("u-hide");
  right.classList.toggle("u-hide");
  header.classList.toggle("u-hide");
  document.querySelector(".footer").classList.toggle("u-hide");
}
// Show break content based on its type
function startBreak(breakType) {
  modalOverlay.classList.add("u-show");
  breakDOM.classList.add("u-show");
  if (breakType === "short") {
    longHeader.classList.add("u-force-hide");
    breakTimeLong.classList.add("u-force-hide");
    breakTimeShort.textContent = `${String(shortBreakDOM.textContent).slice(
      0,
      2
    )} : 00`;
  } else {
    shortHeader.classList.add("u-force-hide");
    breakTimeShort.classList.add("u-force-hide");
  }
}
// Open modal
function modalOpen(m, mv, DOMel) {
  toggleModal(m);
  mv.focus();
  mv.placeholder = DOMel.textContent;
  mv.value = "";
}
// Open/Close modal
function toggleModal(m) {
  modalOverlay.classList.toggle("u-show");
  m.classList.toggle("u-show");
}
// Shake info when wrong value is used
function shakeWrong(m, h) {
  m.focus();
  h.classList.add("modal__labels--wrong");
  setTimeout(() => {
    h.classList.remove("modal__labels--wrong");
  }, 500);
}
// when modal has value create circles and close or open modal-1
function modalHasValue(s) {
  sessions = s;
  sessionsDOM.textContent = s;
  sessionsCount.textContent = 0;
  document.querySelectorAll(".center__time--circle").forEach(el => {
    el.remove();
  });
  doneSession = 0;
  sessionsPassed(sessions);
  modalHint1.classList.remove("modal__labels--wrong");
  toggleModal(modal1);
}
// modal2 and 3 open and close
function typeOfBreak() {
  if (!shortHeader.classList.contains("u-force-hide")) {
    sBreakTime = Number(String(breakTimeShort.textContent).slice(0, 2));
    sBreakTimeOriginal = sBreakTime;
    breakSec = sBreakTime * 60;
  } else if (shortHeader.classList.contains("u-force-hide")) {
    sBreakTime = Number(String(breakTimeLong.textContent).slice(0, 2));
    sBreakTimeOriginal = sBreakTime;
    breakSec = sBreakTime * 60;
  }
}
// Break timer function
function breakTimer() {
  let timeToBreak = breakSec--;
  let breakMinutes = parseInt(timeToBreak / 60); // Convert back time to seconds
  if (breakMinutes < 10) {
    breakMinutes = `0${breakMinutes}`;
  }
  let breakSeconds = timeToBreak % 60;
  if (breakSeconds < 10) {
    breakSeconds = `0${breakSeconds}`;
  }
  if (!shortHeader.classList.contains("u-force-hide")) {
    breakTimeShort.textContent = `${breakMinutes}:${breakSeconds}`;
  } else if (shortHeader.classList.contains("u-force-hide")) {
    breakTimeLong.textContent = `${breakMinutes}:${breakSeconds}`;
  }

  if (!Number(breakSeconds) && Number(breakSeconds) !== 0) {
    clearTimeout(bTimer);
    if (!shortHeader.classList.contains("u-force-hide")) {
      breakTimeShort.textContent = `${String(shortBreakDOM.textContent).slice(
        0,
        2
      )} : 00`;
    } else if (shortHeader.classList.contains("u-force-hide")) {
      breakTimeLong.textContent = `${String(longBreakDOM.textContent).slice(
        0,
        2
      )} : 00`;
    }
    startBtn.textContent = "Start";
    breakBtn.click();
    breakSec = sBreakTime * 60;
    return;
  }
  setTimeout(breakTimer, 1000);
}

// EVENTS

// Start Button Click
startBtn.addEventListener("click", () => {
  if (!startBtn.classList.contains("stop")) {
    timer();
    startBtn.textContent = "Stop";
    startBtn.classList.toggle("stop");
    DOMManipulation();
    timeDOM.classList.toggle("center__time--running");
  } else {
    seconds = -1;
    setTimeout(() => {
      alarm.pause();
      alarm.currentTime = 0;
    }, 777);
    if (doneSession === 0) {
      setTimeout(() => {
        doneSession = 0;
        sessionsCount.textContent = doneSession;
        document
          .querySelectorAll(".center__time--circle")[0]
          .classList.remove("center__time--circle--passed");
        reset.remove();
      }, 600);
    } else {
      doneSession--;
      sessionsCount.textContent = doneSession;
    }
  }
  localStorage.setItem("sessions", sessionsDOM.textContent);
  localStorage.setItem("shortBreak", shortBreakDOM.textContent);
  localStorage.setItem("longBreak", longBreakDOM.textContent);
  localStorage.setItem("timer", startMinutes);
});
// Start Button Hover
startBtn.addEventListener(
  "mouseover",
  () => {
    timeDOM.classList.add("center__time--flash");
  },
  false
);
// Start button un-hover
startBtn.addEventListener(
  "mouseleave",
  () => {
    setTimeout(() => {
      timeDOM.classList.remove("center__time--flash");
    }, 100);
  },
  false
);
//reset button click
reset.addEventListener("click", () => {
  sessions = Number(sessionsDOM.textContent);
  sessionsDOM.textContent = sessions;
  sessionsCount.textContent = 0;
  document.querySelectorAll(".center__time--circle").forEach(el => {
    el.remove();
  });
  doneSession = 0;
  sessionsPassed(sessions);
  startBtn.classList.remove("reset__dim");
  reset.remove();
});
// reset button hover
reset.addEventListener(
  "mouseover",
  () => {
    startBtn.classList.add("reset__dim");
  },
  false
);
//reset button un-hover
reset.addEventListener(
  "mouseleave",
  () => {
    startBtn.classList.remove("reset__dim");
  },
  false
);
// SideEl DOM
sessionsDOM.addEventListener("click", () => {
  modalOpen(modal1, modalValue1, sessionsDOM);
});
shortBreakDOM.addEventListener("click", () => {
  modalOpen(modal2, modalValue2, shortBreakDOM);
});
longBreakDOM.addEventListener("click", () => {
  modalOpen(modal3, modalValue3, longBreakDOM);
});
timeDOM.addEventListener("click", () => {
  if (!startBtn.classList.contains("stop")) {
    modalOpen(modalT, modalValueT, timeDOM);
  } else {
    return;
  }
});
modalOverlay.addEventListener("click", () => {
  if (modal1.classList.contains("u-show")) {
    toggleModal(modal1);
  } else if (modal2.classList.contains("u-show")) {
    toggleModal(modal2);
  } else if (modal3.classList.contains("u-show")) {
    toggleModal(modal3);
  } else if (modalT.classList.contains("u-show")) {
    toggleModal(modalT);
  }
});
modalBtn1.addEventListener("click", () => {
  if (Number(modalValue1.value) < 3 || Number(modalValue1.value) > 8) {
    shakeWrong(modalValue1, modalHint1);
    if (modalValue1.value === "" && modalValue1.placeholder !== NaN) {
      let s = Number(modalValue1.placeholder);
      modalHasValue(s);
    }
  } else {
    let s = Number(modalValue1.value);
    modalHasValue(s);
  }
});
modalBtn2.addEventListener("click", () => {
  let mins = Number(String(modalValue2.placeholder).slice(0, 2));
  if (Number(modalValue2.value) < 5 || Number(modalValue2.value) > 20) {
    shakeWrong(modalValue2, modalHint2);
    modalValue2.value = mins;
    if (modalValue2.value === "" && modalValue2.placeholder !== NaN) {
      modalValue2.value = mins;
    }
  } else {
    shortBreakDOM.textContent = `${modalValue2.value} Minutes`;
    toggleModal(modal2);
  }
});
modalBtn3.addEventListener("click", () => {
  let minsL = Number(String(modalValue3.placeholder).slice(0, 3));
  if (Number(modalValue3.value) < 5 || Number(modalValue3.value) > 99) {
    shakeWrong(modalValue3, modalHint3);
    modalValue3.value = minsL;
    if (modalValue3.value === "" && modalValue3.placeholder !== NaN) {
      modalValue3.value = minsL;
    }
  } else {
    longBreakDOM.textContent = `${modalValue3.value} Minutes`;
    toggleModal(modal3);
  }
});
modalBtnT.addEventListener("click", () => {
  let minsT = Number(String(modalValueT.placeholder).slice(0, 3));
  if (Number(modalValueT.value) < 5 || Number(modalValueT.value) > 100) {
    shakeWrong(modalValueT, modalHintT);
    modalValueT.value = minsT;
    if (modalValueT.value === "" && modalValueT.placeholder !== NaN) {
      modalValueT.value = minsT;
    }
  } else {
    minutes = modalValueT.value;
    startMinutes = minutes;
    seconds = minutes * 60;
    timeDOM.textContent = `${modalValueT.value} : 00`;
    let s = Number(sessionsDOM.textContent);
    modalHasValue(s);
    toggleModal(modalT);
    toggleModal(modal1);
  }
});
modalValue1.addEventListener("keydown", e => {
  if (Number(e.key) < 3 || Number(e.key) > 8) {
    shakeWrong(modalValue1, modalHint1);
  }
});
modalValue2.addEventListener("keydown", e => {
  if (Number(e.key) < 5 || Number(e.key) > 20) {
    shakeWrong(modalValue2, modalHint2);
  }
});
modalValue3.addEventListener("keydown", e => {
  if (Number(e.key) < 5 || Number(e.key) > 999) {
    shakeWrong(modalValue3, modalHint3);
  }
});
modalValueT.addEventListener("keydown", e => {
  if (Number(e.key) < 5 || Number(e.key) > 100) {
    shakeWrong(modalValueT, modalHintT);
  }
});
minus1.addEventListener("click", () => {
  let s = Number(modalValue1.placeholder) - 1;
  if (s < 3 || s > 8) {
    shakeWrong(modalValue1, modalHint1);
  } else {
    modalValue1.value = modalValue1.placeholder = s;
  }
});
minus2.addEventListener("click", () => {
  let sb = Number(String(modalValue2.placeholder).slice(0, 2)) - 1;
  if (sb < 5 || sb > 20) {
    shakeWrong(modalValue2, modalHint2);
  } else {
    modalValue2.value = modalValue2.placeholder = sb;
  }
});
minus3.addEventListener("click", () => {
  let lb0 = Number(String(modalValue3.placeholder).slice(0, 3));
  let lb = Math.ceil(lb0 / 5) * 5 - 5;
  if (lb < 5 || lb > 99) {
    shakeWrong(modalValue3, modalHint3);
  } else {
    modalValue3.value = modalValue3.placeholder = lb;
  }
});
minusT.addEventListener("click", () => {
  let lbt0 = Number(String(modalValueT.placeholder).slice(0, 3));
  let lbt = Math.ceil(lbt0 / 5) * 5 - 5;
  if (lbt < 5 || lbt > 100) {
    shakeWrong(modalValueT, modalHintT);
  } else {
    modalValueT.value = modalValueT.placeholder = lbt;
  }
});
plus1.addEventListener("click", () => {
  let s = Number(modalValue1.placeholder) + 1;
  if (s < 3 || s > 8) {
    shakeWrong(modalValue1, modalHint1);
  } else {
    modalValue1.value = modalValue1.placeholder = s;
  }
});
plus2.addEventListener("click", () => {
  let sb = Number(String(modalValue2.placeholder).slice(0, 2)) + 1;
  if (sb < 5 || sb > 20) {
    shakeWrong(modalValue2, modalHint2);
  } else {
    modalValue2.value = modalValue2.placeholder = sb;
  }
});
plus3.addEventListener("click", () => {
  let lb0 = Number(String(modalValue3.placeholder).slice(0, 3));
  let lb = Math.ceil(lb0 / 5) * 5 + 5;
  if (lb < 5 || lb > 99) {
    shakeWrong(modalValue3, modalHint3);
  } else {
    modalValue3.value = modalValue3.placeholder = lb;
  }
});
plusT.addEventListener("click", () => {
  let lbt0 = Number(String(modalValueT.placeholder).slice(0, 3));
  let lbt = Math.ceil(lbt0 / 5) * 5 + 5;
  if (lbt < 5 || lbt > 100) {
    shakeWrong(modalValueT, modalHintT);
  } else {
    modalValueT.value = modalValueT.placeholder = lbt;
  }
});

document.querySelectorAll(".info").forEach(el => {
  setTimeout(() => {
    el.classList.add("u-force-hide");
  }, 10000);
});

// Break time
const bTimer = () => {
  setTimeout(breakTimer, 1000);
};
startBreakBtn.addEventListener("click", () => {
  typeOfBreak();
  bTimer();
  startBreakBtn.classList.add("u-fade-out");
  alarm.pause();
  alarm.currentTime = 0;
  setTimeout(() => {
    startBreakBtn.classList.add("u-force-hide");
    breakBtn.classList.add("u-expand");
  }, 1100);
});
// break button SKIP
breakBtn.addEventListener("click", () => {
  breakSec = -1;
  modalOverlay.classList.remove("u-show");
  breakDOM.classList.remove("u-show");
  startBreakBtn.classList.remove("u-fade-out");
  startBreakBtn.classList.remove("u-force-hide");
  breakBtn.classList.remove("u-expand");
  longHeader.classList.remove("u-force-hide");
  shortHeader.classList.remove("u-force-hide");
  breakTimeShort.classList.remove("u-force-hide");
  breakTimeLong.classList.remove("u-force-hide");
  alarm.pause();
  alarm.currentTime = 0;
  breakTimeLong.textContent = `${String(longBreakDOM.textContent).slice(
    0,
    2
  )} : 00`;
  breakTimeShort.textContent = `${String(shortBreakDOM.textContent).slice(
    0,
    2
  )} : 00`;
  setTimeout(() => {
    breakSec = sBreakTime * 60;
  }, 1000);
});
// Nav icon
navIcon.addEventListener("click", () => {
  navIcon.classList.toggle("rotate");
  setTimeout(() => {
    navIcon.classList.remove("rotate");
  }, 1100);
  left.classList.toggle("u-show");
  right.classList.toggle("u-show");
});
// KEYPRESS LISTENERS
import Keypress from "./keypress";
const keypressHandlers = new Keypress(
  modal1,
  modal2,
  modal3,
  modalT,
  modalBtn1,
  modalBtn2,
  modalBtn3,
  modalBtnT,
  modalOverlay,
  breakDOM,
  startBtn,
  breakBtn,
  startBreakBtn
);
