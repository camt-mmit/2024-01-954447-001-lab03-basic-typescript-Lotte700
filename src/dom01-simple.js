document.addEventListener('DOMContentLoaded', () => {
  const inputsConponents = [
    ...document.querySelectorAll('input[type="number"].app-elem-input'),
  ];

  const computResult = () => {
    const result = inputsConponents.reduce(
      (result, inputsConponents) => result + inputsConponents.valueAsNumber,
      0,
    );
    console.debug(inputsConponents, result);
    //const result = inputsConponents.reduce((result, inputsConponents) => {
    //return result + inputsConponents.valueAsNumbers;
    //}, 0);

    const output = document.querySelector('output.app-elem-result');
    output.value = `${result}`;
  };

  inputsConponents.forEach((inputsConponents) => {
    inputsConponents.addEventListener('change', computResult);
  });

  computResult();
});
