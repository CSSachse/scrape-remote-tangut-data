import { Browser, launch, Page } from 'puppeteer';
import { GUID } from '../utils/UUID';

export const getData = async (): Promise<void> => {
  const browser: Browser = await launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto('http://www.babelstone.co.uk/Tangut/XHZD_Index.html');
  await page.evaluate(async () => {
    const headers: HTMLHeadingElement[] = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    const findNextSiblingMatching = (el: Element | null, matcher: (el: Element) => boolean): Element | null => {
      if (el === null || matcher(el)) {
        return el;
      } else {
        return findNextSiblingMatching(el.nextElementSibling, matcher);
      }
    };

    let counter: number = 0;
    const getGuid = (): string => {
      counter += 1;
      return `${counter}`;
    };

    // tslint:disable: max-line-length
    const findAllNextSiblingMatchingButStopAt = (el: Element | null, matcher: (el: Element) => boolean, shouldStop: (el: Element) => boolean): (Element | null)[] => {
      if (el === null || shouldStop(el)) {
        return [null];
      } else if (matcher(el)) {
        return [el, ...findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop)];
      } else {
        return findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop);
      }
    };

    class RootPopulator {
      public constructor(public el: Element | null) { }
      public guid: string = getGuid();

      public childSupergroups: RadicalSupergroup[] = [];
      public populate = async () => {
        this.childSupergroups = Array.from(findNextSiblingMatching(
          headers.filter((element: HTMLHeadingElement) => {
            return element.textContent === 'Arrangement of Radicals';
          })[0],
          (elem) => elem.tagName === 'UL')!.querySelectorAll('a'))
          .map(a => a.href.split('#')[1])
          .map(t => document.querySelectorAll(`a[name="${t}"]`)[0].nextElementSibling!)
          .map(e => new RadicalSupergroup(e));
        await Promise.all(this.childSupergroups.map(supergroup => supergroup.populate));
      }

      public get data(): {} {
        return {};
      }

      public get childSupergroupGuids(): string[] {
        return this.childSupergroups.map(s => s.guid);
      }
    }

    class RadicalSupergroup {
      public constructor(public el: Element | null) {
        console.error(el);
      }
      public guid: string = getGuid();
      public get data(): {} { return {}; }

      public populate = async () => {
        return Promise.resolve();
      }
    }


    const root = new RootPopulator(null);
    await root.populate();
    console.error(JSON.stringify(root));

  });

  // await browser.close();
};

export abstract class BaseTing {
  public constructor(public el: Element | null) {
  }
  public guid: string = GUID.getGuid();
  public populate = async () => {
    return Promise.resolve();
  }

  public get data(): {} {
    return {};
  }
}
