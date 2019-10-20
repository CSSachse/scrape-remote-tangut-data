// import { Browser, launch, Page } from 'puppeteer';
// import { uuidv4 } from '../utils/UUID';
// import { sectionizeByHeaderIndex } from './Sectionize';
// import { Guid, SchemaContext, SchemaName } from './Types';

// export const getData = async (): Promise<void> => {
//   const browser: Browser = await launch({ headless: false });
//   const page: Page = await browser.newPage();
//   await page.goto('http://www.babelstone.co.uk/Tangut/XHZD_Index.html');
//   const externalContext: SchemaContext = {
//     'radical-supergroup': [],
//     'radical-group': [],
//     'radical': [],
//     'stroke-count-grouping': [],
//     'character': [],
//   };
//   const externalContextPush = <S extends SchemaName>(value: Dearray<Exclude<SchemaContext[S], Guid<S>>>, type: S) => {
//     const uuid = uuidv4();
//     const guid: Guid<S> = { uuid, type };
//     const localTable: SchemaContext[S] = externalContext[type];
//     const newRow: Dearray<SchemaContext[S]> = { guid, ...value };
//     localTable.push(newRow);
//   };

//   const sectionize = sectionizeByHeaderIndex();

//   await page.exposeFunction('externalContextPush', externalContextPush);
//   // await page.exposeFunction('sectionize', sectionize);

//   await page.evaluate(() => {
//     ((root: HTMLElement) => {
//       const headerses: HTMLElement[][] = [1, 2, 3, 4, 5, 6].map((i: number) => Array.from(root.querySelectorAll(`h${i}`)));
//       console.error(headerses);
//     })(document.body);
//   });

//   await page.evaluateHandle(() => {
//     Array
//       .from(document.querySelectorAll('a.TangutRadicals'))
//       .forEach((n: Element) => {
//         externalContextPush(n.textContent || '', 'radical');
//       });

//     Array
//       .from(document.querySelectorAll('tr'))
//       .forEach((el) => {
//         externalContextPush(
//           {
//             characterMojikyo: el.children[0].innerHTML,
//             characterFont: el.children[0].children[0],
//           },
//           'character');
//       });

//     sectionize(document.body);
//   });
//   // console.error(externalContext);
//   // await browser.close();
// };
