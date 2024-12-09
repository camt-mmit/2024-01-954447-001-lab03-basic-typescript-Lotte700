import { assignComponent as assignInputsComponent } from './inputs-ass.js';

function createComponent(template: HTMLTemplateElement): HTMLElement {
  // แปลง content ของ template เป็น DocumentFragment ซึ่งรองรับ firstElementChild
  const content = template.content as DocumentFragment;

  // ตรวจสอบว่า firstElementChild ไม่เป็น null
  const firstChild = content.cloneNode(true).firstElementChild;

  if (!firstChild) {
    throw new Error('The template does not have a valid first child element.');
  }

  // แปลง firstChild เป็น HTMLElement
  return firstChild as HTMLElement;
}





export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector('template.app-tmpl-section') as HTMLTemplateElement;
  if (!template) {
    console.error('Template not found');
    return;
  }

  const container = template.parentElement as HTMLElement;
  if (!container) {
    console.error('Container element not found');
    return;
  }

  const updateSections = (): void => {
    const sections = [...container.querySelectorAll('.app-cmp-section')] as HTMLElement[];
    sections.forEach((section, index) => {
      const sectionNumberElement = section.parentNode?.querySelector('.app-section-title-no') as HTMLElement;
      if (sectionNumberElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      }

      const cmdRemoveSection = section.querySelector('.app-cmd-remove-section') as HTMLButtonElement;
      if (cmdRemoveSection) {
        cmdRemoveSection.disabled = sections.length === 1;
      }
    });
  };

  const addComponent = (): void => {
    const sectionComponent = createComponent(template);
    container.append(sectionComponent);
    assignInputsComponent(sectionComponent);

    // Add remove button event listener for the new section
    const removeButton = sectionComponent.querySelector('.app-cmd-remove-section') as HTMLButtonElement;
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        removeSection(sectionComponent);
        updateSections();
      });
    }
    updateSections();
  };

  const removeSection = (sectionComponent: HTMLElement): void => {
    sectionComponent.remove();
    // remove an element from the DOM.
  };

  element.addEventListener('click', (ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    if (target.matches('.app-cmd-add-section')) {
      addComponent();
    }
  });

  addComponent();
  updateSections();
}
