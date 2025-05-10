import "./main.css";
import { playBarAnimation } from "./js/gsap.js";

document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("play");
  if (playBtn) {
    playBtn.addEventListener("click", playBarAnimation);
  }
});