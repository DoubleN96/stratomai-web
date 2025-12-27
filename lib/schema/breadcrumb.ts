export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const homeBreadcrumbSchema = createBreadcrumbSchema([
  {
    name: 'Home',
    url: 'https://stratomai.com',
  },
]);

export const productsBreadcrumbSchema = createBreadcrumbSchema([
  {
    name: 'Home',
    url: 'https://stratomai.com',
  },
  {
    name: 'Products',
    url: 'https://stratomai.com/#products',
  },
]);

export const processBreadcrumbSchema = createBreadcrumbSchema([
  {
    name: 'Home',
    url: 'https://stratomai.com',
  },
  {
    name: 'Process',
    url: 'https://stratomai.com/#process',
  },
]);

export const contactBreadcrumbSchema = createBreadcrumbSchema([
  {
    name: 'Home',
    url: 'https://stratomai.com',
  },
  {
    name: 'Contact',
    url: 'https://stratomai.com/#contact',
  },
]);
