"use strict";

const imageConvertorForm = document.forms["image-convertor-form"];

imageConvertorForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData();

  const fileValue =
    imageConvertorForm.elements["image-convertor__file"].files[0];
  formData.append("file", fileValue);
  const resultImageExtension =
    imageConvertorForm.elements["image-convertor__file-extensions"].value;

  const resultImage = await sendImageToConvert(formData, resultImageExtension);

  const downloadButton = imageConvertorForm.querySelector(".download-button");

  if (downloadButton) {
    downloadButton.remove();
  }

  const newButton = document.createElement("button");
  newButton.classList.add("submit-button", "download-button");
  newButton.addEventListener("click", () => handleDownload(resultImage));
  newButton.textContent = "Скачать полученное изображение";
  imageConvertorForm.append(newButton);

  createSlider(
    fileValue,
    resultImage,
    document.querySelector(".before-after-slider")
  );
});

async function sendImageToConvert(data, resultImageExtension) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/img?extension=${resultImageExtension}`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.blob();
  } catch (err) {
    console.log(err);
  }
}

function createSlider(sourceImage, resultImage, containerElement) {
  const beforeImage = containerElement.querySelector(".before-img > img");
  const afterImage = containerElement.querySelector(".after-img > img");
  let beforeFileReader = new FileReader();
  let afterFileReader = new FileReader();
  beforeFileReader.onload = (evt) =>
    handleFileReaderLoad(evt, beforeImage, containerElement);
  afterFileReader.onload = (evt) =>
    handleFileReaderLoad(evt, afterImage, containerElement);
  beforeFileReader.readAsDataURL(sourceImage);
  afterFileReader.readAsDataURL(resultImage);
}

function handleFileReaderLoad(evt, imageElement, containerElement) {
  imageElement.src = evt.target.result;
  if (
    evt.target.readyState === 2 &&
    !containerElement.classList.contains("is-shown")
  ) {
    containerElement.classList.add("is-shown");
  }
}

function handleDownload(file) {
  const element = document.createElement("a");
  const url = URL.createObjectURL(file);
  element.setAttribute("href", url);
  element.setAttribute("download", file.name);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(url);
}
