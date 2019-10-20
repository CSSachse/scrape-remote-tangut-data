"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionizeByHeaderIndex = () => (root) => {
    const headerses = [1, 2, 3, 4, 5, 6].map((i) => Array.from(root.querySelectorAll(`h${i}`)));
    console.error(headerses);
};
exports.sectionizeBySectionNest = () => {
    return;
};
//# sourceMappingURL=Sectionize.js.map