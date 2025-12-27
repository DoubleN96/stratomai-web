/* eslint-disable @typescript-eslint/no-explicit-any */
// Schema validation utility
// Usage: node --loader tsx scripts/validate-schema.ts

import { organizationSchema, websiteSchema } from '../lib/schema/organization';
import { ureaGranularSchema, ureaPrilledSchema } from '../lib/schema/product';
import { tradingServiceSchema } from '../lib/schema/service';
import { tradingProcessSchema } from '../lib/schema/howto';
import { homeBreadcrumbSchema } from '../lib/schema/breadcrumb';

type SchemaObject = Record<string, any>;

const validateSchema = (schema: SchemaObject, schemaName: string): boolean => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required properties
  if (!schema['@context']) {
    errors.push(`${schemaName}: Missing @context`);
  }

  if (!schema['@type']) {
    errors.push(`${schemaName}: Missing @type`);
  }

  // Validate URLs are absolute
  const checkUrls = (obj: any, path: string = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === 'string') {
        // Check for URL fields
        if (
          (key === 'url' || key === 'contentUrl' || key === 'embedUrl' || key === '@id') &&
          value.startsWith('http')
        ) {
          if (!value.startsWith('https://')) {
            warnings.push(`${schemaName}.${currentPath}: URL should use HTTPS`);
          }
          if (value.includes('localhost') || value.includes('127.0.0.1')) {
            errors.push(`${schemaName}.${currentPath}: URL contains localhost`);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object') {
              checkUrls(item, `${currentPath}[${index}]`);
            }
          });
        } else {
          checkUrls(value, currentPath);
        }
      }
    }
  };

  checkUrls(schema);

  // Validate JSON structure
  try {
    JSON.parse(JSON.stringify(schema));
  } catch (error) {
    errors.push(`${schemaName}: Invalid JSON structure - ${error}`);
  }

  // Check for duplicate @id values
  const ids = new Set<string>();
  const findIds = (obj: any) => {
    if (typeof obj === 'object' && obj !== null) {
      if (obj['@id']) {
        if (ids.has(obj['@id'])) {
          warnings.push(`${schemaName}: Duplicate @id found: ${obj['@id']}`);
        }
        ids.add(obj['@id']);
      }

      Object.values(obj).forEach((value) => {
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => findIds(item));
          } else {
            findIds(value);
          }
        }
      });
    }
  };

  findIds(schema);

  // Report results
  if (errors.length > 0) {
    console.error(`\n❌ ${schemaName} - VALIDATION FAILED:`);
    errors.forEach((error) => console.error(`  - ${error}`));
    return false;
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️  ${schemaName} - Warnings:`);
    warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  console.log(`\n✅ ${schemaName} - PASSED`);
  return true;
};

const validateAllSchemas = () => {
  console.log('='.repeat(60));
  console.log('Schema.org Validation Report');
  console.log('='.repeat(60));

  const schemas = [
    { schema: organizationSchema, name: 'Organization Schema' },
    { schema: websiteSchema, name: 'WebSite Schema' },
    { schema: ureaGranularSchema, name: 'Urea Granular Product Schema' },
    { schema: ureaPrilledSchema, name: 'Urea Prilled Product Schema' },
    { schema: tradingServiceSchema, name: 'Trading Service Schema' },
    { schema: tradingProcessSchema, name: 'Trading Process HowTo Schema' },
    { schema: homeBreadcrumbSchema, name: 'Home Breadcrumb Schema' },
  ];

  const results = schemas.map(({ schema, name }) => validateSchema(schema, name));

  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log('='.repeat(60));

  const passed = results.filter((r) => r).length;
  const failed = results.filter((r) => !r).length;

  console.log(`Total Schemas: ${schemas.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed === 0) {
    console.log('\n✅ All schemas validated successfully!');
  } else {
    console.log('\n❌ Some schemas failed validation. Please review errors above.');
    process.exit(1);
  }
};

validateAllSchemas();
