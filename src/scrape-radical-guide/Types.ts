export type SupportedSchema = RadicalSupergroup | RadicalGroup | Radical | StrokeCountGrouping | Character;

export type Guid<Name extends string> = {
  type: Name;
  uuid: string;
};

export type Schema<Name extends SchemaName> = {
  guid: Guid<Name>;
};

export type SchemaName = 'radical-supergroup' | 'radical-group' | 'radical' | 'stroke-count-grouping' | 'character';

// List of schemas allowed for our scraped data
export interface RadicalSupergroup extends Schema<'radical-supergroup'> {
  name: string;
  index: number;
  subgroups: Guid<'radical-group'>[];
}

export interface RadicalGroup extends Schema<'radical-group'> {
  index: number;
  radicals: Guid<'radical'>[];
}

export interface Radical extends Schema<'radical'> {
  radical: string;
  strokeCountGrouping: Guid<'stroke-count-grouping'>;
}

export interface StrokeCountGrouping extends Schema<'stroke-count-grouping'> {
  label: string | undefined;
  sublabel: string;
  characters: Guid<'character'>[];
}

export interface Character {
  characterMojikyo: string;
  characterFont: string;
  // characterUnicode: string;
  romanization: string;
  decimalIndex: string;
  romanIndex: string;
  characterId: string;
}

// Enforces that each value has the right guid
type PlausibleSchemaContext = {
  [Name in SchemaName]: Schema<Name>[];
};

export interface SchemaContext extends PlausibleSchemaContext {
  'radical-supergroup': RadicalSupergroup[];
  'radical-group': RadicalGroup[];
  'radical': Radical[];
  'stroke-count-grouping': StrokeCountGrouping[];
  // 'character': Character[];
}
