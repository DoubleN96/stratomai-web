import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Navegando a Coolify...');

    // Navegar a la URL de Coolify
    await page.goto('https://coolify.stratomai.com/project/kogwwoc0skgwwow88ko0ooccc/environment/dgo8scgossc8woocskco4wk0/application/kk40c0wos8sw48cok8cok4wo/deployment', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Esperar un poco para que cargue
    await page.waitForTimeout(2000);

    // Tomar screenshot de la página actual
    await page.screenshot({
      path: '/tmp/coolify-page.png',
      fullPage: true
    });
    console.log('📸 Screenshot guardado en /tmp/coolify-page.png');

    // Intentar buscar elementos relacionados con environment variables
    const pageContent = await page.content();

    // Buscar si hay un enlace o botón de Environment Variables
    const envVarLinks = await page.$$('text=/environment|variables|secrets/i');
    console.log(`\n🔍 Enlaces encontrados relacionados con variables: ${envVarLinks.length}`);

    // Buscar si las variables EMAIL_ están en el HTML
    const hasEmailVars = pageContent.includes('EMAIL_HOST') ||
                         pageContent.includes('EMAIL_PORT') ||
                         pageContent.includes('EMAIL_USER');

    console.log(`\n📧 Variables EMAIL_ encontradas en la página: ${hasEmailVars ? '✅ SÍ' : '❌ NO'}`);

    // Intentar hacer clic en Environment Variables si existe
    try {
      const envButton = await page.getByText(/environment variables|variables|secrets/i).first();
      if (envButton) {
        console.log('\n🖱️  Intentando acceder a Environment Variables...');
        await envButton.click();
        await page.waitForTimeout(2000);
        await page.screenshot({
          path: '/tmp/coolify-env-vars.png',
          fullPage: true
        });
        console.log('📸 Screenshot de variables guardado en /tmp/coolify-env-vars.png');

        // Verificar variables específicas
        const content = await page.content();
        const vars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_SECURE', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_TO'];
        console.log('\n📋 Verificando variables:');
        vars.forEach(v => {
          const found = content.includes(v);
          console.log(`${found ? '✅' : '❌'} ${v}`);
        });
      }
    } catch (e) {
      console.log('⚠️  No se pudo acceder a la sección de variables automáticamente');
    }

    console.log('\n✅ Verificación completa');

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Tomar screenshot del error
    await page.screenshot({
      path: '/tmp/coolify-error.png',
      fullPage: true
    });
    console.log('📸 Screenshot del error guardado en /tmp/coolify-error.png');
  } finally {
    await browser.close();
  }
})();
