export default function getEmptyTitle(title) {
  const titleEmpty = document.createElement('h1');
  titleEmpty.classList.add('text-center');
  titleEmpty.textContent = title;

  return titleEmpty;
}
