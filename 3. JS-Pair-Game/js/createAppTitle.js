export default function createAppTitle(title) {
  const appTitle = document.createElement('h1');
  appTitle.classList.add('mb-4');
  appTitle.innerHTML = title;
  return appTitle;
}
