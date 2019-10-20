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
    // tslint:disable-next-line:max-line-length
    const findAllNextSiblingMatchingButStopAt = (el: Element | null, matcher: (el: Element) => boolean, shouldStop: (el: Element) => boolean): (Element | null)[] => {
      if (el === null || shouldStop(el)) {
        return [null];
      } else if (matcher(el)) {
        return [el, ...findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop)];
      } else {
        return findAllNextSiblingMatchingButStopAt(el.nextElementSibling, matcher, shouldStop);
      }
    };

    abstract class ExtractorNode<ChildType extends ExtractorNode<any, any> | undefined, DataType> {
      public constructor(public el: Element | null) { }
      public guid: string = getGuid();
      public children: ChildType[] = [];
      public get childGuids(): string[] {
        return this.children.filter(s => s).map(s => s!.guid);
      }

      public abstract get data(): DataType;
      public abstract populate: () => Promise<any>;
    }

    class RootPopulator extends ExtractorNode<RadicalSupergroup, undefined> {
      public populate = async () => {
        this.children = Array.from(findNextSiblingMatching(
          headers.filter((element: HTMLHeadingElement) => {
            return element.textContent === 'Arrangement of Radicals';
          })[0],
          (elem) => elem.tagName === 'UL')!.querySelectorAll('a'))
          .map(x => x.href.split('#')[1])
          .map(x => document.querySelectorAll(`a[name="${x}"]`)[0].nextElementSibling!)
          .map(x => new RadicalSupergroup(x));
        this.children.forEach(child => child.populate());
        // Promise.all(this.children.map(supergroup => supergroup.populate));  // TODO: figure out why this doesn't work
      }

      public get data(): undefined {
        return undefined;
      }
    }

    class RadicalSupergroup extends ExtractorNode<RadicalGroup, string> {
      public populate = async () => {
        this.children = Array.from(
          findAllNextSiblingMatchingButStopAt(this.el!.nextElementSibling, z => z.tagName === 'H4', z => z.tagName === 'H3')
          .filter(x => x)
          .map(x => new RadicalGroup(x!))
        );
        this.children.forEach(child => child.populate());
      }
      public get data(): string { return this.el!.textContent!; }
    }

    class RadicalGroup extends ExtractorNode<Radical, string> {
      public populate = async () => {
        this.children = Array.from(
          findNextSiblingMatching(this.el, z => z.tagName === 'TABLE')!
            .querySelectorAll('a'))
            .filter(x => x)
            .map(x => new Radical(x));
        this.children.forEach(child => child.populate());
      }
      public get data(): string { return this.el!.textContent!; }
    }

    class Radical extends ExtractorNode<StrokeCountGroupings, string> {
      public populate = async () => {
        const aname: string = (this.el! as HTMLAnchorElement).href!.split('#')[1];
        const header = document.querySelectorAll(`a[name="${aname}"]`)[0].nextElementSibling!;
        const groupings = findAllNextSiblingMatchingButStopAt(header.nextElementSibling, (z) => z.tagName === 'H4', z => z.tagName === 'H3')
              .filter(z => z);
        if (groupings.length === 0) {
          this.children = [new StrokeCountGroupings(header)];
        } else {
          this.children = Array.from(groupings.map(x => new StrokeCountGroupings(x)));
        }
        this.children.forEach(child => child.populate());
      }
      public get data(): string { return this.el!.textContent!; }
    }

    class StrokeCountGroupings extends ExtractorNode<Character, string> {
      public populate = async () => {
        this.children = Array.from(
          findNextSiblingMatching(this.el!, z => z.tagName === 'TABLE')!
          .querySelectorAll('tr'))
          .map(x => new Character(x));
        this.children.forEach(child => child.populate());
      }
      public get data(): string { return this.el!.textContent!; }
    }

    class Character extends ExtractorNode<undefined, {}> {
      public populate = async () => {
        return Promise.resolve();
      }
      public get data(): {} {
        const featurized: HTMLElement[] = Array.from(this.el!.querySelectorAll('td, th'));
        return {
          characterMojikyo: featurized[0].textContent!,
          characterFont: featurized[0].className!,
          romanization: featurized[2].textContent!,
          decimalIndex: featurized[3].textContent!,
          romanIndex: featurized[4].textContent!,
          characterId: featurized[5].textContent!,
        };
      }
    }

    const root = new RootPopulator(null);
    await root.populate();
    console.error(root); // JSON.stringify(root));

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
