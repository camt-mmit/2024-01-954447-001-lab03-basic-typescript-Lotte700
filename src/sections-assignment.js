import {assignComponent as assignInputsComponent} from './inputs-ass.js';

function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

export function assignComponent(element) {
  const template = element.querySelector('template.app-tmpl-section');
  const container = template.parentElement;


  const updateSections = () => {
    const sections = [...container.querySelectorAll('.app-cmp-section')];
    sections.forEach((section, index) => {
      const sectionNumberElement = section.parentNode.querySelector('.app-section-title-no');
      if (sectionNumberElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      }

      const cmdRemoveSection = section.querySelector('.app-cmd-remove-section');
      if (cmdRemoveSection) {
        cmdRemoveSection.disabled = sections.length === 1;
      }
    });
  };


  //ส่วนที่ code Rerun/Update function ต่างๆ ตลอด
  const addComponent = () => {
    const sectionComponent = createComponent(template);
    container.append(sectionComponent);
    assignInputsComponent(sectionComponent);

    // Add remove button event listener for the new section
    const removeButton = sectionComponent.querySelector('.app-cmd-remove-section');
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        removeSection(sectionComponent);
        updateSections();
      });
    }
    updateSections();
  };

  const removeSection = (sectionComponent) => {
    sectionComponent.remove();
    //remove an element from the DOM.
  };

  element.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      addComponent();
    }
  });


  addComponent();
  updateSectionNumbers();

}



