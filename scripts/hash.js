"use strict";
const BASE_URL = "https://dev.web-tools.fun";

const textToHashForm = document.forms["hash-form__text"];
const fileToHashForm = document.forms["hash-form__file"];

textToHashForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const textValue = textToHashForm.elements["hash-form__text-data"].value;
  const hashExtension = textToHashForm.elements["hash-extensions-text"].value;

  const hashObject = await sendDataForHashing("text", textValue, hashExtension);
  const hash = hashObject.hashText;

  createResultContainer(
    document.querySelector(".tools__hash__section"),
    "Результат расчета хеша",
    hash
  );
});

fileToHashForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData(fileToHashForm);
  /* const fileValue = formData.get("hash-form__file-input"); */
  const hashExtension = fileToHashForm.elements["hash-extensions-file"].value;

  const hashObject = await sendDataForHashing("file", formData, hashExtension);
  const hash = hashObject.hashFile;

  createResultContainer(
    document.querySelector(".tools__hash__section"),
    "Результат расчета хеша",
    hash
  );
});

async function sendDataForHashing(dataType, data, hashExtension) {
  try {
    if (dataType === "text") {
      const response = await fetch(
        `${BASE_URL}/api/generate?text=${data}&extension=${hashExtension}`
      );

      /* const response = await fetch("./hash.json"); */

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } else if (dataType === "file") {
      const response = await fetch(
        `${BASE_URL}/api/generate?extension=${hashExtension}`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    }
  } catch (err) {
    console.log(err);
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
