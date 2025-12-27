export type SchemaOrgType = 'Organization' | 'Product' | 'Service' | 'BreadcrumbList' | 'HowTo' | 'WebSite';

export interface SchemaOrgProps {
  type: SchemaOrgType;
  data: Record<string, unknown>;
}

export const generateSchema = (props: SchemaOrgProps): string => {
  return JSON.stringify(props.data, null, 2);
};

export const combineSchemas = (schemas: Record<string, unknown>[]): string => {
  return JSON.stringify(schemas, null, 2);
};

const schemaCache = new Map<string, Record<string, unknown>>();

export const getSchema = (key: string, generator: () => Record<string, unknown>) => {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, generator());
  }
  return schemaCache.get(key);
};
