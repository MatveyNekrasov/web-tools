"use strict";

const textToHashForm = document.forms["hash-form__text"];
const fileToHashForm = document.forms["hash-form__file"];

textToHashForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const textValue = textToHashForm.elements["hash-form__text-data"].value;
  const hashExtension = textToHashForm.elements["hash-extensions-text"].value;

  const hashObject = await sendDataForHashing("text", textValue, hashExtension);
  const hash = hashObject.hashText;

  createResultContainer(
    document.querySelector(".hash-form__text-tab"),
    "Результат расчета хеша",
    hash
  );
});

fileToHashForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  const fileValue = fileToHashForm.elements["hash-form__file-input"].files[0];
  formData.append("file", fileValue);
  const hashExtension = fileToHashForm.elements["hash-extensions-file"].value;

  const hashObject = await sendDataForHashing("file", formData, hashExtension);
  const hash = hashObject.hashFile;

  createResultContainer(
    document.querySelector(".hash-form__file-tab"),
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
