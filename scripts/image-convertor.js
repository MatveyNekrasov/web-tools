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

  const resultImage = await sendImageToConvert(fileValue, resultImageExtension);

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
  resultImageElement.src = URL.createObjectURL(resultImage);
  document.querySelector(".result").append(resultImageElement);
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
