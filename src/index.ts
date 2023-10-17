function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Test';

  return element;
}

document.body.appendChild(component());
