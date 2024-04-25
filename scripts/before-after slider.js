"use strict";

const slider = document.querySelector(".before-after-slider");
const before = document.querySelector(".before-img");
const beforeImage = document.querySelector(".slider-img");
const resizer = document.querySelector(".resizer");

let isActive = false;

document.addEventListener("DOMContentLoaded", () => {
  let width = slider.offsetWidth
    ? slider.offsetWidth
    : document.forms["image-convertor-form"].offsetWidth;
  beforeImage.style.width = width + "px";
});

window.addEventListener("resize", () => {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + "px";
});

resizer.addEventListener("mousedown", () => {
  isActive = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("mouseup", () => {
  isActive = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mouseleave", () => {
  isActive = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mousemove", (evt) => {
  if (!isActive) return;
  let x = evt.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(evt);
});

resizer.addEventListener("touchstart", () => {
  isActive = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("touchend", () => {
  isActive = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("touchcancel", () => {
  isActive = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("touchmove", (evt) => {
  if (!isActive) return;
  let x;

  for (let i = 0; i < evt.changedTouches.length; i++) {
    x = evt.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(evt);
});

function slideIt(x) {
  let transform = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = transform + "px";
  resizer.style.left = transform - 0 + "px";
}

function pauseEvent(evt) {
  if (evt.stopPropagation) evt.stopPropagation();
  if (evt.preventDefault) evt.preventDefault();
  evt.cancelBubble = true;
  FocusEvent.returnValue = false;
  return false;
}
