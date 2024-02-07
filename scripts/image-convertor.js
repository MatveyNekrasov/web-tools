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

  const resultImage = /* await */ sendImageToConvert(
    formData,
    resultImageExtension
  );

  createResultContainer(
    document.querySelector(".tools__image-convertor__section"),
    `Изображение в формате ${resultImageExtension}`,
    ""
  );

  const oldResult = document.querySelector(".result-img");
  if (oldResult) {
    oldResult.remove();
  }

  const resultImageElement = document.createElement("img");
  resultImageElement.classList.add(".result-img");
  /* resultImageElement.src = URL.createObjectURL(resultImage); */
  document.querySelector(".result").append(resultImageElement);

  createSlider(
    fileValue,
    fileValue,
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
