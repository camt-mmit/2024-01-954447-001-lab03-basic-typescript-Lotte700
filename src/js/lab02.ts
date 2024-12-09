import { assignComponent } from './sections-assignment.js';

// กำหนดประเภทของ element เป็น HTMLElement หรือ null
const element = document.querySelector<HTMLElement>('.app-cmp-main');

// ตรวจสอบว่า element ไม่เป็น null ก่อนที่จะเรียกใช้ assignComponent
if (element) {
  assignComponent(element);
} else {
  console.error('Element not found!');
}
