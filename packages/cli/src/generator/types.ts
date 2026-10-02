export type GeneratorPlatform = 'svelte5' | 'flutter';

export type GeneratorArchetype =
  | 'datatable'
  | 'dashboard'
  | 'paywall'
  | 'checkout'
  | 'settings'
  | 'auth_otp';

export interface FieldDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'enum';
  label?: string;
  enumValues?: string[];
}

export interface GeneratorOptions {
  platform: GeneratorPlatform;
  archetype: GeneratorArchetype;
  entityName: string; // e.g. Customer, Subscription, Payment, Invoice
  theme?: string; // e.g. ethereal-sand, zinc, midnight
  fields?: FieldDefinition[];
  title?: string;
  description?: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
  description: string;
}

export interface GeneratorResult {
  entityName: string;
  platform: GeneratorPlatform;
  archetype: GeneratorArchetype;
  files: GeneratedFile[];
}
