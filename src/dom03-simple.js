function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

// เมื่อโหลด DOM เสร็จแล้ว
document.addEventListener('DOMContentLoaded', () => {
  const template = document.querySelector('.app-tmpl-input'); // เลือก template
  const container = document.querySelector('.app-cmd-input-list'); // เลือก container ที่จะเพิ่ม input ลงไป

  const computResult = () => {
    const inputComponents = [
      ...document.querySelectorAll('input[type="number"].app-elem-input'),
    ];

    const result = inputComponents.reduce(
      (result, inputComponent) => result + inputComponent.valueAsNumber,
      0
    );

    const output = document.querySelector('.app-elem-result');
    output.textContent = `${result}`; // อัปเดตผลลัพธ์
  };

  const addComponent = () => {
    const inputComponent = createComponent(template); // สร้าง component จาก template
    const title = inputComponent.querySelector('.app-elem-input-title-no');

    // กำหนดหมายเลขของ input
    title.textContent = container.querySelectorAll('.app-cmd-input').length + 1;

    // เพิ่ม input component ลงใน container
    container.append(inputComponent);

    // เพิ่ม event listener ให้ input เพื่อคำนวณผลลัพธ์
    inputComponent.querySelector('input').addEventListener('input', computResult);

    computResult(); // คำนวณผลลัพธ์ทันที
  };

  // เมื่อคลิกปุ่ม "Add Input" จะเพิ่ม input component ใหม่
  document.querySelector('.app-cmd-add-input').addEventListener('click', addComponent);

  // เพิ่ม input component แรกเมื่อโหลดหน้าเว็บ
  
});
