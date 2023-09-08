export default function getErrorList(errorData) {
  const errorList = document.createElement('ul');
  errorList.classList.add(
    'list-group',
    'position-absolute',
    'bottom-0',
    'end-0',
  );
  errorList.style.transitionProperty = 'opacity';
  errorList.style.transitionDuration = '0.3s';

  for (const error of errorData) {
    const errorItem = document.createElement('li');
    errorItem.classList.add('list-group-item', 'list-group-item-danger', 'display-4', 'text-center');
    errorItem.textContent = error.message;
    errorList.append(errorItem);
  }
  return errorList;
}
