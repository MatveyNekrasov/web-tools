"use strict";

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
