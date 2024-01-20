"use strict";

const imageToBase64Form = document.forms["base64-form__file"];
const base64ToImageForm = document.forms["base64-form__text"];

imageToBase64Form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  const fileValue =
    imageToBase64Form.elements["base64-form__file-input"].files[0];
  formData.append("file", fileValue);

  const base64Object = await sendDataForBase64("file", formData);
  const base64Value = base64Object.base64;

  createResultContainer(
    document.querySelector(".tools__base64__section"),
    "Изображение в формате Base64",
    base64Value
  );
});

base64ToImageForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const textValue = base64ToImageForm.elements["base64-form__text-data"].value;

  const responseBlob = await sendDataForBase64("text", textValue);

  const url = URL.createObjectURL(responseBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `image.png`;
  link.click();
  URL.revokeObjectURL(url);
});

async function sendDataForBase64(dataType, data) {
  try {
    if (dataType === "text") {
      const response = await fetch(
        `${BASE_URL}/api/base64/textGenerate?text=${data}`
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.blob();
    } else if (dataType === "file") {
      const response = await fetch(`${BASE_URL}/api/base64/fileGenerate`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
}
