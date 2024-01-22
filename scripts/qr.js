"use strict";

const createQrCodeForm = document.forms["qr-form__text"];
const readQrCodeForm = document.forms["qr-form__file"];

createQrCodeForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const textValue = createQrCodeForm.elements["qr-form__text-data"].value;
  const formData = new FormData();
  formData.append("text", textValue);

  const responseURL = await sendDataToQr("text", formData);

  createResultContainer(
    document.querySelector(".tools__qr__section"),
    "Сгенерированный QR-код",
    ""
  );

  const oldResult = document.querySelector(".result-img");
  if (oldResult) {
    oldResult.remove();
  }

  const resultImageElement = document.createElement("img");
  resultImageElement.classList.add(".result-img");
  resultImageElement.src = responseURL;
  document.querySelector(".result").append(resultImageElement);
});

readQrCodeForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  const fileValue = readQrCodeForm.elements["qr-form__file-input"].files[0];
  formData.append("file", fileValue);

  const responseData = await sendDataToQr("file", formData);

  createResultContainer(
    document.querySelector(".tools__qr__section"),
    "Информация, закодированная выбранным QR-кодом",
    responseData
  );
});

async function sendDataToQr(dataType, data) {
  try {
    if (dataType === "text") {
      const response = await fetch(`${BASE_URL}/api/qr/textGenerate`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.text();
    } else if (dataType === "file") {
      const response = await fetch(`${BASE_URL}/api/qr/fileGenerate`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.text();
    }
  } catch (err) {
    console.log(err);
  }
}
