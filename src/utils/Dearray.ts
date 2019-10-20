// tslint:disable-next-line: no-any
type Dearray<T extends Array<any>> = T extends (infer U)[] ? U : never;
