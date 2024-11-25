function createComponent() {
  const component = document.createElement('div');
  component.classList.add('app-cmp-input');

  const label = document.createElement('label');

  const title = document.createElement('b');
  title.classList.add('app-elem-input-title'); // แก้ไข class name

  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('value', '0');
  input.classList.add('app-elem-input');

  // เพิ่ม input ลงใน label และ label ลงใน component
  label.append(title);  // เพิ่ม title ลงใน label
  label.append(input);  // เพิ่ม input ลงใน label
  component.append(label);

  return component;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.app-cmd-input-list'); // แก้ไขการเลือก container

  const computResult = () => {
    const inputComponents = [
      ...document.querySelectorAll('input[type="number"].app-elem-input'),
    ];

    const result = inputComponents.reduce(
      (result, inputComponent) => result + inputComponent.valueAsNumber,
      0,
    );

    const output = document.querySelector('output.app-elem-result');
    output.textContent = `${result}`; // ใช้ textContent แทน value
  };

  const addComponent = () => {
    const inputComponent = createComponent();
    const title = inputComponent.querySelector('.app-elem-input-title');

    title.textContent = `Number ${container.querySelectorAll('.app-cmp-input').length + 1}`;

    container.append(inputComponent);
    inputComponent.querySelector('input').addEventListener('input', computResult);
    computResult(); // คำนวณผลลัพธ์เมื่อมีการเพิ่ม input ใหม่
  };

  document
    .querySelector('.app-cmd-add-input')
    .addEventListener('click', addComponent);

  addComponent(); // เริ่มต้นเมื่อโหลดหน้าเว็บ
});
