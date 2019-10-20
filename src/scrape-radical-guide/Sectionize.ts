export type sectionedArea = {
  header: HTMLHeadingElement;
  subsections: sectionedArea[];
};

export const sectionizeByHeaderIndex = () => (root: HTMLElement) => {
  const headerses: HTMLElement[][] = [1, 2, 3, 4, 5, 6].map((i: number) => Array.from(root.querySelectorAll(`h${i}`)));
  console.error(headerses);
};

export const sectionizeBySectionNest = () => {
  return;
};
