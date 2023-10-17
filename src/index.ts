function component() {
  const element = document.createElement('div');

  element.innerHTML = "test s";

  return element;
}

document.body.appendChild(component());
