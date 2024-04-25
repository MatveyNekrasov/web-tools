"use strict";

const BASE_URL = "http://dev.web-tools.fun";

document.addEventListener("click", (evt) => {
  if (evt.target && !evt.target.closest(".tools__button")) {
    return;
  }

  const elTabBtn = evt.target.closest(".tools__button");
  showTab(elTabBtn);
});

function showTab(elTabBtn) {
  const main = document.querySelector(".main");

  if (elTabBtn.classList.contains("is-active")) {
    return;
  }

  const targetId = elTabBtn.dataset.toolbuttonId;
  const elToolsTab = main.querySelector(
    `.tools-tab[data-tool-id="${targetId}"]`
  );

  if (elToolsTab) {
    const elTabBtnActive = main.querySelector(".is-active");
    elTabBtnActive.classList.remove("is-active");

    const elToolsTabShow = main.querySelector(".tools-tab-show");
    elToolsTabShow.classList.remove("tools-tab-show");

    elTabBtn.classList.add("is-active");
    elToolsTab.classList.add("tools-tab-show");
  }
}

function createResultContainer(parentElement, containerSubtitleText, data) {
  const oldContainerSubtitle = parentElement.querySelector(".result-subtitle");
  const oldResultContainer = parentElement.querySelector(".result");

  if (oldResultContainer || oldContainerSubtitle) {
    oldContainerSubtitle.textContent = containerSubtitleText;
    oldResultContainer.textContent = data;
    return;
  }

  const containerSubtitle = document.createElement("h3");
  containerSubtitle.classList.add("result-subtitle");
  containerSubtitle.textContent = containerSubtitleText;

  const resultContrainer = document.createElement("div");
  resultContrainer.classList.add("result");
  resultContrainer.textContent = data;

  parentElement.append(containerSubtitle, resultContrainer);
}

const fileInputs = document.querySelectorAll("input[type=file]");

fileInputs.forEach((fileInput) => {
  fileInput.addEventListener("change", (evt) => {
    if (evt.target.files[0]) {
      evt.target.previousElementSibling.textContent = `Выбран файл ${evt.target.files[0].name}`;
    }
  });
});
