const loremForm = document.forms["lorem-form"];
const loremFormSubmitButton = loremForm.querySelector(".submit-button");
const loremStringCountElement = loremForm.elements["lorem-string-count"];
const loremContainer = document.querySelector(".lorem__result");

async function getLoremText(stringCount) {
  try {
    const response = await fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://dev.web-tools.fun/api/lorem?length=${stringCount}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
}

async function handleLoremFormSubmit(evt) {
  evt.preventDefault();

  const generatedText = await getLoremText(loremStringCountElement.value);
  const formatedText = generatedText.split("\n\n");
  console.log(formatedText);
  loremContainer.textContent = generatedText;
}

loremForm.addEventListener("submit", handleLoremFormSubmit);