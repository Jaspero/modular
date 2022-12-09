export function initializeCSSUtil() {
  const style = document.createElement('style');

  const mediaQueries = {
    's': '(min-width: 600px)',
    'm': '(min-width: 900px)',
    'l': '(min-width: 1200px)'
  };

  const ratios = [12, 6, 4, 3, 2.4, 2, 1.75, 1.5, 1.33, 1.2, 1.1, 1];

  style.innerHTML = `
    .modular-util-flex { display: flex; }
    .modular-util-flex-wrap { flex-wrap: wrap; }
    `;

  for (let i = 0; i < ratios.length; i++) {
    const ratio = ratios[i];
    style.innerHTML += `\n.modular-util-col-${i + 1} { width: calc(100% / ${ratio}); }`;
  }

  for (let i = 0; i < Object.keys(mediaQueries).length; i++) {
    const key = Object.keys(mediaQueries)[i];
    const query = Object.values(mediaQueries)[i];

    for (let j = 0; j < ratios.length; j++) {
      const ratio = ratios[j];
      style.innerHTML += `\n@media ${query} {.modular-util-col-${key}-${j + 1} { width: calc(100% / ${ratio}); }}`;
    }
  }


  document.head.appendChild(style);
}
