"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const UUID_1 = require("../utils/UUID");
exports.getData = async () => {
    const browser = await puppeteer_1.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.babelstone.co.uk/Tangut/XHZD_Index.html');
    await page.evaluate(async () => {
        const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const findNextSiblingMatching = (el, matcher) => {
            if (el === null || matcher(el)) {
                return el;
            }
            else {
                return findNextSiblingMatching(el.nextElementSibling, matcher);
            }
        };
        let counter = 0;
        const getGuid = () => {
            counter += 1;
            return `${counter}`;
        };
        // tslint:disable-next-line:max-line-length
        const findAllNextSiblingMatchingButStopAt = (el, matcher, shouldStop) => {
            if (el === null || shouldStop(el)) {
                return [null];
            }
            else if (matcher(el)) {
                return [el, ...findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop)];
            }
            else {
                return findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop);
            }
        };
        class ExtractorNode {
            constructor(el) {
                this.el = el;
                this.guid = getGuid();
                this.children = [];
            }
            get childGuids() {
                return this.children.filter(s => s).map(s => s.guid);
            }
        }
        class RootPopulator extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    this.children = Array.from(findNextSiblingMatching(headers.filter((element) => {
                        return element.textContent === 'Arrangement of Radicals';
                    })[0], (elem) => elem.tagName === 'UL').querySelectorAll('a'))
                        .map(x => x.href.split('#')[1])
                        .map(x => document.querySelectorAll(`a[name="${x}"]`)[0].nextElementSibling)
                        .map(x => new RadicalSupergroup(x));
                    this.children.forEach(child => child.populate());
                    // Promise.all(this.children.map(supergroup => supergroup.populate));  // TODO: figure out why this doesn't work
                };
            }
            get data() {
                return undefined;
            }
        }
        class RadicalSupergroup extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    this.children = Array.from(findAllNextSiblingMatchingButStopAt(this.el.nextElementSibling, z => z.tagName === 'H4', z => z.tagName === 'H3')
                        .filter(x => x)
                        .map(x => new RadicalGroup(x)));
                    this.children.forEach(child => child.populate());
                };
            }
            get data() { return this.el.textContent; }
        }
        class RadicalGroup extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    this.children = Array.from(findNextSiblingMatching(this.el, z => z.tagName === 'TABLE')
                        .querySelectorAll('a'))
                        .filter(x => x)
                        .map(x => new Radical(x));
                    this.children.forEach(child => child.populate());
                };
            }
            get data() { return this.el.textContent; }
        }
        class Radical extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    const aname = this.el.href.split('#')[1];
                    const header = document.querySelectorAll(`a[name="${aname}"]`)[0].nextElementSibling;
                    const groupings = findAllNextSiblingMatchingButStopAt(header.nextElementSibling, (z) => z.tagName === 'H4', z => z.tagName === 'H3')
                        .filter(z => z);
                    if (groupings.length === 0) {
                        this.children = [new StrokeCountGroupings(header)];
                    }
                    else {
                        this.children = Array.from(groupings.map(x => new StrokeCountGroupings(x)));
                    }
                    this.children.forEach(child => child.populate());
                };
            }
            get data() { return this.el.textContent; }
        }
        class StrokeCountGroupings extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    this.children = Array.from(findNextSiblingMatching(this.el, z => z.tagName === 'TABLE')
                        .querySelectorAll('tr'))
                        .map(x => new Character(x));
                    this.children.forEach(child => child.populate());
                };
            }
            get data() { return this.el.textContent; }
        }
        class Character extends ExtractorNode {
            constructor() {
                super(...arguments);
                this.populate = async () => {
                    return Promise.resolve();
                };
            }
            get data() {
                const featurized = Array.from(this.el.querySelectorAll('td, th'));
                return {
                    characterMojikyo: featurized[0].textContent,
                    characterFont: featurized[0].className,
                    romanization: featurized[2].textContent,
                    decimalIndex: featurized[3].textContent,
                    romanIndex: featurized[4].textContent,
                    characterId: featurized[5].textContent,
                };
            }
        }
        const root = new RootPopulator(null);
        await root.populate();
        console.error(root); // JSON.stringify(root));
    });
    // await browser.close();
};
class BaseTing {
    constructor(el) {
        this.el = el;
        this.guid = UUID_1.GUID.getGuid();
        this.populate = async () => {
            return Promise.resolve();
        };
    }
    get data() {
        return {};
    }
}
exports.BaseTing = BaseTing;
//# sourceMappingURL=Att3.js.map