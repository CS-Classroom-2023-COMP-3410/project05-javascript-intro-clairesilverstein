// ========== Global Variables & Initial Setup ==========
const clockElement = document.getElementById("clock");
const timeFormatToggle = document.getElementById("timeFormatToggle");
const colorPicker = document.getElementById("colorPicker");
const fontSizeInput = document.getElementById("fontSizeSelect");

const alarmTimeInput = document.getElementById("alarmTime");
const addAlarmBtn = document.getElementById("addAlarmBtn");
const alarmList = document.getElementById("alarmList");

// We'll use this array to store alarm times in 24-hour format
let alarms = [];

// Preferences object to store user settings
let preferences = {
  is24HourFormat: false,
  clockColor: "#000000",
  fontSize: 50,
  alarms: []
};

// Track the last minute checked to avoid repeated alerts in the same minute
let lastTriggeredMinute = "";

// ========== Load Preferences from localStorage ==========
function loadPreferences() {
  const savedPrefs = localStorage.getItem("clockPreferences");
  if (savedPrefs) {
    preferences = JSON.parse(savedPrefs);
  }

  // Apply loaded preferences
  timeFormatToggle.checked = preferences.is24HourFormat;
  colorPicker.value = preferences.clockColor;
  fontSizeInput.value = preferences.fontSize;
  alarms = preferences.alarms || [];

  // Apply styling
  clockElement.style.color = preferences.clockColor;
  clockElement.style.fontSize = preferences.fontSize + "px";

  // Render existing alarms
  renderAlarmList();
}

// ========== Save Preferences to localStorage ==========
function savePreferences() {
  preferences.is24HourFormat = timeFormatToggle.checked;
  preferences.clockColor = colorPicker.value;
  preferences.fontSize = parseInt(fontSizeInput.value, 10);
  preferences.alarms = alarms;

  localStorage.setItem("clockPreferences", JSON.stringify(preferences));
}

// ========== Format Time Function ==========
function formatTime(date, is24HourFormat) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let session = "";

  if (!is24HourFormat) {
    // 12-hour format
    session = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
  }

  // Format each component with leading zero if needed
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  if (is24HourFormat) {
    return `${hh}:${mm}:${ss}`;
  } else {
    return `${hh}:${mm}:${ss} ${session}`;
  }
}

// ========== Play a Beep with Web Audio API ==========
function playBeep(duration = 1000, frequency = 440, volume = 1) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency; // in hertz (440 is A4)
  oscillator.type = "sine";               // type of wave
  gainNode.gain.value = volume;           // volume (0 to 1)

  oscillator.start();

  // Stop the beep after `duration` ms
  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, duration);
}

// ========== Update Clock Every Second ==========
function updateClock() {
  const now = new Date();
  clockElement.textContent = formatTime(now, timeFormatToggle.checked);

  checkAlarms(now);
}

// ========== Check Alarms ==========
function checkAlarms(currentDate) {
  const currentHour = currentDate.getHours().toString().padStart(2, "0");
  const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMinute}`;

  // Only check if we've moved to a new minute
  if (currentTime !== lastTriggeredMinute) {
    // Check if any alarm matches the current time
    if (alarms.includes(currentTime)) {
      // Play a 1-second beep at 440 Hz
      playBeep();
      // Also show an alert, but you can remove this if you only want sound
      alert("Alarm ringing for " + currentTime);
    }
    // Update last triggered minute
    lastTriggeredMinute = currentTime;
  }
}

// ========== Alarm List Rendering ==========
function renderAlarmList() {
  alarmList.innerHTML = ""; // Clear list

  alarms.forEach((alarm) => {
    const li = document.createElement("li");
    li.textContent = alarm;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "removeAlarm";
    removeBtn.addEventListener("click", () => {
      removeAlarm(alarm);
    });

    li.appendChild(removeBtn);
    alarmList.appendChild(li);
  });
}

// ========== Add Alarm Function ==========
function addAlarm() {
  const alarmValue = alarmTimeInput.value; // "HH:MM" in 24-hour format
  if (!alarmValue) return;

  if (!alarms.includes(alarmValue)) {
    alarms.push(alarmValue);
    savePreferences();
    renderAlarmList();
  } else {
    alert("This alarm is already set.");
  }

  alarmTimeInput.value = "";
}

// ========== Remove Alarm Function ==========
function removeAlarm(alarm) {
  alarms = alarms.filter((item) => item !== alarm);
  savePreferences();
  renderAlarmList();
}

// ========== Event Listeners ==========

// Toggle between 12-hour and 24-hour
timeFormatToggle.addEventListener("change", () => {
  savePreferences();
  // Immediately update clock display to reflect the toggle
  updateClock();
});

// Color picker
colorPicker.addEventListener("input", () => {
  clockElement.style.color = colorPicker.value;
  savePreferences();
});

// Font size
fontSizeInput.addEventListener("input", () => {
  const size = parseInt(fontSizeInput.value, 10);
  if (!isNaN(size)) {
    clockElement.style.fontSize = size + "px";
    savePreferences();
  }
});

// Add alarm button
addAlarmBtn.addEventListener("click", addAlarm);

// ========== Initialize ==========
loadPreferences();    // Load any saved preferences
updateClock();        // Update clock immediately
setInterval(updateClock, 1000); // Update the clock every second
