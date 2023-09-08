export default function getLoadingSpinner() {
  const spinnerContainer = document.createElement('div');
  spinnerContainer.classList.add(
    'position-absolute',
    'top-50',
    'start-50',
    'translate-middle',
  );
  const spinnerBlock = document.createElement('div');
  spinnerBlock.classList.add('spinner-border');
  spinnerBlock.style.width = '5rem';
  spinnerBlock.style.height = '5rem';
  spinnerContainer.append(spinnerBlock);

  return spinnerContainer;
}
