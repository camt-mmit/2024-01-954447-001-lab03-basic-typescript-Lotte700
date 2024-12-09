function createComponent(template: HTMLTemplateElement): HTMLElement {
  return template.content.cloneNode(true).firstElementChild as HTMLElement;
}

export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector('template.app-tmpl-input') as HTMLTemplateElement;
  const container = template.parentElement as HTMLElement;

  const updateInputComponents = (): void => {
    const inputComponents = [...container.querySelectorAll('.app-cmp-input')] as HTMLElement[];
    inputComponents.forEach((component, index) => {
      const titleNo = component.querySelector('.app-elem-title-no') as HTMLElement;
      if (titleNo) {
        titleNo.textContent = `${index + 1}`;
      }

      const cmdRemoveInput = component.querySelector('.app-cmd-remove-input') as HTMLButtonElement;
      if (cmdRemoveInput) {
        cmdRemoveInput.disabled = inputComponents.length === 1;
      }
    });
  };

  const calculateResult = (): void => {
    const result = [...container.querySelectorAll('.app-cmp-input')] 
      .map((component) => {
        const inputElement = component.querySelector('input[type="number"].app-elem-input') as HTMLInputElement;
        return inputElement ? inputElement.valueAsNumber : 0;
      })
      .reduce((acc, value) => acc + value, 0);

    const outputElements = element.querySelectorAll('output.app-elem-result');
    outputElements.forEach((output) => {
      (output as HTMLOutputElement).value = `${result.toLocaleString()}`;
    });
  };

  const appendInputComponent = (): void => {
    const inputComponent = createComponent(template);
    container.append(inputComponent);

    inputComponent.addEventListener('click', (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      if (target.matches('.app-cmd-remove-input')) {
        inputComponent.remove();
        updateInputComponents();
        calculateResult();
      }
    });

    updateInputComponents();
    calculateResult();
  };

  element.addEventListener('click', (ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    if (target.matches('.app-cmd-add-input')) {
      appendInputComponent();
    }
  });

  container.addEventListener('change', (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    if (target.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });

  appendInputComponent();
}
