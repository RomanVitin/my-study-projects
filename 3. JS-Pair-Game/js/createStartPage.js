export default function createStartPage() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const label = document.createElement('label');

  label.setAttribute('for', 'startInput');
  input.setAttribute('id', 'startInput');

  form.classList.add('mb-3', 'd-flex', 'flex-column', 'align-items-center');
  input.classList.add('mb-4', 'form-control-lg');
  button.classList.add('btn', 'btn-info', 'btn-lg');
  label.classList.add('form-label');

  form.append(label);
  form.append(input);
  form.append(button);
  input.type = 'number';
  input.min = '2';
  input.max = '10';

  label.textContent = 'Выбор сложности - введите четное число от 2 до 10:';
  button.textContent = 'Начать игру!';
  button.disabled = true;

  input.addEventListener('input', (e) => {
    e.preventDefault();
    button.disabled = !input.value.length;
    button.disabled = input.value % 2 !== 0;
  });

  return { form, input };
}
