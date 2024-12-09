function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

export function assignComponent(element) {
  const template = element.querySelector('template.app-tmpl-input');
  const container = template.parentElement;

  const updateInputComponents = () => {
    [...container.querySelectorAll('.app-cmp-input')].forEach(
      (component, index, inputComponents) => {
        [...component.querySelectorAll('.app-elem-title-no')].forEach(
          (titleNo) => (titleNo.textContent = `${index + 1}`),
        );

        [...component.querySelectorAll('.app-cmd-remove-input')].forEach(
          (cmdRemoveInput) =>
            (cmdRemoveInput.disabled = inputComponents.length === 1),
        );
      },
    );
  };

  const calculateResult = () => {
    const result = [...container.querySelectorAll('.app-cmp-input')]
      .map((component) =>
        component.querySelector('input[type="number"].app-elem-input'),
      )
      .reduce((result, element) => result + element.valueAsNumber, 0);

    [...element.querySelectorAll('output.app-elem-result')].forEach(
      (output) => (output.value = `${result.toLocaleString()}`),
    );
  };

  const appendInputComponent = () => {
    const inputComponent = createComponent(template);

    inputComponent.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-input')) {
        inputComponent.remove();
        updateInputComponents();
        calculateResult();
      }
    });

    container.append(inputComponent);
    updateInputComponents();
    calculateResult();
  };

  element.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-input')) {
      appendInputComponent();
    }
  });

  container.addEventListener('change', (ev) => {
    if (ev.target?.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });

  appendInputComponent();
}
