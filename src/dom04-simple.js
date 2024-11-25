// Function to create a new component from the template
function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const template = document.querySelector('.app-tmpl-input'); // Select the template
  const container = document.querySelector('.app-cmd-input-list'); // Container to hold inputs

  // Function to compute the result (sum of all input values)
  const computResult = () => {
    const inputComponents = [
      ...document.querySelectorAll('input[type="number"].app-elem-input'),
    ];

    const result = inputComponents.reduce(
      (result, inputComponent) => result + inputComponent.valueAsNumber,
      0,
    );

    const output = document.querySelector('.app-elem-result');
    output.textContent = `${result}`; // Update the result output
  };

  // Function to update the numbers of input components
  const updateComponent = () => {
    const inputComponents = [...container.querySelectorAll('.app-cmd-input')];
    inputComponents.forEach((inputComponent, index) => {
      // Update the number of the input component
      const title = inputComponent.querySelector('.app-elem-input-title-no');
      title.textContent = `${index + 1}`;
    });
  };

  // Function to add a new input component
  const addComponent = () => {
    const inputComponent = createComponent(template); // Create a new component from template
    const title = inputComponent.querySelector('.app-elem-input-title-no');

    // Set the number for the new input component
    title.textContent = container.querySelectorAll('.app-cmd-input').length + 1;

    // Add the new component to the container
    container.append(inputComponent);

    // Add an event listener to the input to compute the result when changed
    inputComponent
      .querySelector('input')
      .addEventListener('input', computResult);

    // Add event listener to remove button
    inputComponent.addEventListener('click', (ev) => {
      if (ev.target.matches('.app-cmd-remove-input')) {
        inputComponent.remove(); // Remove the input component
        computResult(); // Recalculate the result
        updateComponent(); // Update the numbering of remaining input components
      }
    });

    computResult(); // Compute the result immediately after adding
    updateComponent(); // Update component numbers immediately
  };

  // When the "Add Input" button is clicked, add a new input component
  document
    .querySelector('.app-cmd-add-input')
    .addEventListener('click', addComponent);

  // Add the first input component when the page loads
  addComponent();
});
