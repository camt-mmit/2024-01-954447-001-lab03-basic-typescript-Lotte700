
document.addEventListener('DOMContentLoaded', () => {
    const inputsConponents = [
      ...document.querySelectorAll<HTMLInputElement>('input[type="number"].app-elem-input'),
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
  
      const output = document.querySelector<HTMLOutputElement>(
        'output.app-elem-result',
      );
      if(output!== null){
      output.value = `${result}`;
      }
      else{
        console.error('output.app-elem-result not found')
      }
    };
    inputsConponents.forEach((inputsConponents) => {
      inputsConponents.addEventListener('change', computResult);
    });
  
    computResult();
  });
  