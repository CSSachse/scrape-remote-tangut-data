"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var GUID;
(function (GUID) {
    let counter = 0;
    GUID.getGuid = () => {
        counter += 1;
        return `${counter}`;
    };
})(GUID = exports.GUID || (exports.GUID = {}));
//# sourceMappingURL=UUID.js.map