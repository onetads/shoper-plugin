const applyStyles = (element: HTMLElement, styles: Record<string, string>) => {
  for (const key in styles) {
    const value = styles[key];

    element.style.setProperty(key, value, 'important');
  }
};

export default applyStyles;
