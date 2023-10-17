function component() {
  const element = document.createElement('div');

  element.innerHTML = 'test';

  return element;
}

document.body.appendChild(component());
