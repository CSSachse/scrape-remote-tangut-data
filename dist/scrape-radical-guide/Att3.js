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
        // tslint:disable: max-line-length
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
        class RootPopulator {
            constructor(el) {
                this.el = el;
                this.guid = getGuid();
                this.childSupergroups = [];
                this.populate = async () => {
                    this.childSupergroups = Array.from(findNextSiblingMatching(headers.filter((element) => {
                        return element.textContent === 'Arrangement of Radicals';
                    })[0], (elem) => elem.tagName === 'UL').querySelectorAll('a'))
                        .map(a => a.href.split('#')[1])
                        .map(t => document.querySelectorAll(`a[name="${t}"]`)[0].nextElementSibling)
                        .map(e => new RadicalSupergroup(e));
                    await Promise.all(this.childSupergroups.map(supergroup => supergroup.populate));
                };
            }
            get data() {
                return {};
            }
            get childSupergroupGuids() {
                return this.childSupergroups.map(s => s.guid);
            }
        }
        class RadicalSupergroup {
            constructor(el) {
                this.el = el;
                this.guid = getGuid();
                this.populate = async () => {
                    return Promise.resolve();
                };
                console.error(el);
            }
            get data() { return {}; }
        }
        const root = new RootPopulator(null);
        await root.populate();
        console.error(JSON.stringify(root));
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