export const updateFavicon = (logo: string) => {
  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.href = logo + '?v=' + Date.now();
};
