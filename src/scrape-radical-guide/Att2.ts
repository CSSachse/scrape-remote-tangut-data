import { Browser, launch, Page } from 'puppeteer';
import { Character } from './Types';

export const getData = async (): Promise<void> => {
  const browser: Browser = await launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto('http://www.babelstone.co.uk/Tangut/XHZD_Index.html');

  await page.evaluate(() => {
    // console.error(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    const headers: HTMLHeadingElement[] = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    const findNextSiblingMatching = (el: Element | null, matcher: (el: Element) => boolean): Element | null => {
      if (el === null || matcher(el)) {
        return el;
      } else {
        return findNextSiblingMatching(el.nextElementSibling, matcher);
      }
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

    const listOfRadicalSupergroupLinks = Array.from(findNextSiblingMatching(
      headers.filter((element: HTMLHeadingElement) => {
        return element.textContent === 'Arrangement of Radicals';
      })[0],
      (el) => el.tagName === 'UL')!.querySelectorAll('a'))
      .map(a => a.href.split('#')[1])
      .map(t => document.querySelectorAll(`a[name="${t}"]`)[0].nextElementSibling!);

    const listOfRadicalGroups = listOfRadicalSupergroupLinks.map(
      x => findAllNextSiblingMatchingButStopAt(x.nextElementSibling, z => z.tagName === 'H4', z => z.tagName === 'H3'));

    const listOfRadicals = listOfRadicalGroups.map(x => x
      .filter(y => !!y)
      .map(y => Array.from(
        findNextSiblingMatching(y, z => z.tagName === 'TABLE')!
          .querySelectorAll('a'))));

    const listOfStrokeCountGroupingOrCharactersHeaders = listOfRadicals
      .map(x1 => x1
        .map(x2 => x2
          .map(y => (y.href || '')
            .split('#')[1])
          .map(y => document.querySelectorAll(`a[name="${y}"]`)[0].nextElementSibling!)
        ));

    const listOfStrokeCountGroupings = listOfStrokeCountGroupingOrCharactersHeaders
      .map(x1 => x1
        .map(x2 => x2
          .map(y => {
            const groupings = findAllNextSiblingMatchingButStopAt(y.nextElementSibling, (z) => z.tagName === 'H4', z => z.tagName === 'H3')
              .filter(z => !!z);
            if (groupings.length === 0) { return [y]; }
            return groupings;
          })));

    const listOfRadicalDatas = listOfStrokeCountGroupings
      .map(x1 => x1
        .map(x2 => x2
          .map(x3 => x3
            .map(y => Array.from(findNextSiblingMatching(y, z => z.tagName === 'TABLE')!
              .querySelectorAll('tr'))
              .map((row: HTMLTableRowElement): Character => {
                const featurized: HTMLElement[] = Array.from(row.querySelectorAll('td, th'));
                return {
                  characterMojikyo: featurized[0].textContent!,
                  characterFont: featurized[0].className!,
                  romanization: featurized[2].textContent!,
                  decimalIndex: featurized[3].textContent!,
                  romanIndex: featurized[4].textContent!,
                  characterId: featurized[5].textContent!,
                };
              })
              .filter(z => z.characterMojikyo.length > 0)))
        ));

    console.error(listOfRadicalDatas);
    // await browser.close();
  });
};
