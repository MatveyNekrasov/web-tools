"use strict";

const hoverClassName = "drop-hover";
const dropZones = document.querySelectorAll(".drop-container");

if (dropZones) {
  dropZones.forEach((dropZone) => {
    dropZone.addEventListener("dragenter", (evt) => {
      evt.preventDefault();
      dropZone.classList.add(hoverClassName);
    });

    dropZone.addEventListener("dragover", (evt) => {
      evt.preventDefault();
      dropZone.classList.add(hoverClassName);
    });

    dropZone.addEventListener("dragleave", (evt) => {
      evt.preventDefault();
      dropZone.classList.remove(hoverClassName);
    });

    dropZone.addEventListener("drop", (evt) => {
      evt.preventDefault();
      dropZone.classList.remove(hoverClassName);

      const file = Array.from(evt.dataTransfer.files);

      if (file && file[0].type.startsWith("image")) {
        dropZone.querySelector("input[type=file]").files =
          evt.dataTransfer.files;

        dropZone.querySelector(
          ".file-input-label"
        ).textContent = `Выбран файл ${file[0].name}`;
      }
    });
  });
}
