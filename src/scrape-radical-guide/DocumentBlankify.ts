const blankify = (node: Node | HTMLElement) => {
  // Base case(s)
  if (!node.hasChildNodes()) {
    if (node.nodeName === '#text') {
      if (node.textContent && node.textContent.trim() === '') { return; }
      // Measure size of text node
      const range = document.createRange();
      range.selectNode(node);
      const rect = range.getBoundingClientRect();
      range.detach();

      // Fill up new element to same dimensions
      const replacementNode = document.createElement('span');
      replacementNode.style.width = `${rect.width}px`;
      replacementNode.style.height = `${rect.height}px`;
      replacementNode.style.backgroundColor = '#F3F3F3';
      replacementNode.style.display = 'inline-block';
      replacementNode.style.verticalAlign = 'text-bottom';
      replacementNode.title = node.textContent || '';

      // Swap them out
      node.parentNode!.replaceChild(replacementNode, node);
    }
  } else {
    Array.from(node.childNodes).forEach((child: Node) => {
      blankify!(child);
    });
  }
};
