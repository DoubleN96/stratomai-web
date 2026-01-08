import { chromium } from 'playwright';

const COOLIFY_EMAIL = 'Stratoma.ai@gmail.com';
const COOLIFY_PASSWORD = 'Cashflow7+';
const PROJECT_URL = 'https://coolify.stratomai.com/project/kogwwoc0skgwow88ko0ooccc/environment/dgo8scgossc8woocskco4wk0/application/kk40c0wos8sw48cok8cok4wo/deployment';

const ENV_VARS = {
  EMAIL_HOST: 'mail.stratomai.com',
  EMAIL_PORT: '587',
  EMAIL_SECURE: 'false',
  EMAIL_USER: 'info@stratomai.com',
  EMAIL_PASS: 'Moneyroll7+',
  EMAIL_FROM: 'info@stratomai.com',
  EMAIL_TO: 'stratoma.ai@gmail.com'
};

(async () => {
  const browser = await chromium.launch({
    headless: true,   // Sin interfaz gráfica
    slowMo: 100       // Pequeña pausa entre acciones
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    console.log('🌐 Navegando a Coolify...');
    await page.goto('https://coolify.stratomai.com/login');
    await page.waitForLoadState('networkidle');

    // Screenshot del login
    await page.screenshot({ path: '/tmp/coolify-1-login.png' });
    console.log('📸 Screenshot: login page');

    // Login
    console.log('🔐 Iniciando sesión...');
    await page.fill('input[type="email"], input[name="email"]', COOLIFY_EMAIL);
    await page.fill('input[type="password"], input[name="password"]', COOLIFY_PASSWORD);
    await page.screenshot({ path: '/tmp/coolify-2-credentials-filled.png' });

    await page.click('button[type="submit"], button:has-text("Login")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/tmp/coolify-3-logged-in.png' });
    console.log('✅ Login exitoso');

    // Navegar a la página del proyecto
    console.log('📂 Navegando al proyecto...');
    await page.goto(PROJECT_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/coolify-4-project-page.png' });

    // Buscar sección de Environment Variables
    console.log('🔍 Buscando Environment Variables...');

    // Intentar diferentes formas de encontrar el link/botón
    const possibleSelectors = [
      'text=Environment Variables',
      'text=Environment',
      'text=Variables',
      'a:has-text("Environment")',
      'button:has-text("Environment")',
      '[href*="environment"]'
    ];

    let clicked = false;
    for (const selector of possibleSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`🎯 Encontrado: ${selector}`);
          await element.click();
          clicked = true;
          break;
        }
      } catch (e) {
        // Continuar con el siguiente selector
      }
    }

    if (clicked) {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/tmp/coolify-5-env-vars-page.png' });
      console.log('📋 En página de Environment Variables');

      // Verificar variables existentes
      const pageContent = await page.content();
      console.log('\n📊 Verificando variables existentes:');

      for (const [key, value] of Object.entries(ENV_VARS)) {
        const exists = pageContent.includes(key);
        console.log(`${exists ? '✅' : '❌'} ${key}`);
      }

      // Buscar botón para añadir nueva variable
      console.log('\n➕ Buscando botón para añadir variables...');
      const addButtonSelectors = [
        'button:has-text("Add")',
        'button:has-text("New")',
        'button:has-text("+")',
        'text=Add Variable',
        'text=New Variable'
      ];

      let addButton = null;
      for (const selector of addButtonSelectors) {
        try {
          addButton = await page.$(selector);
          if (addButton) {
            console.log(`🎯 Encontrado botón: ${selector}`);
            break;
          }
        } catch (e) {
          // Continuar
        }
      }

      if (addButton) {
        console.log('\n🔧 Añadiendo variables...');
        for (const [key, value] of Object.entries(ENV_VARS)) {
          console.log(`  Añadiendo ${key}...`);

          // Click en añadir
          await addButton.click();
          await page.waitForTimeout(1000);

          // Llenar campos (los selectores pueden variar)
          const keyInput = await page.$('input[name="key"], input[placeholder*="key" i], input[placeholder*="name" i]');
          const valueInput = await page.$('input[name="value"], textarea[name="value"], input[placeholder*="value" i]');

          if (keyInput && valueInput) {
            await keyInput.fill(key);
            await valueInput.fill(value);

            // Buscar botón de guardar
            const saveButton = await page.$('button:has-text("Save"), button:has-text("Add"), button[type="submit"]');
            if (saveButton) {
              await saveButton.click();
              await page.waitForTimeout(1000);
              console.log(`  ✅ ${key} añadido`);
            }
          }
        }

        await page.screenshot({ path: '/tmp/coolify-6-vars-added.png' });
        console.log('\n✅ Variables añadidas');

        // Buscar botón de Redeploy
        console.log('\n🚀 Buscando botón de Redeploy...');
        const redeploySelectors = [
          'button:has-text("Redeploy")',
          'button:has-text("Deploy")',
          'button:has-text("Restart")',
          'text=Redeploy'
        ];

        for (const selector of redeploySelectors) {
          try {
            const button = await page.$(selector);
            if (button) {
              console.log(`🎯 Encontrado: ${selector}`);
              await button.click();
              console.log('🚀 Redeploy iniciado');
              await page.waitForTimeout(2000);
              break;
            }
          } catch (e) {
            // Continuar
          }
        }

        await page.screenshot({ path: '/tmp/coolify-7-redeployed.png' });
        console.log('✅ Proceso completado');

      } else {
        console.log('⚠️  No se encontró botón para añadir variables');
        console.log('📸 Revisa los screenshots para ver la interfaz');
      }

    } else {
      console.log('⚠️  No se encontró la sección de Environment Variables');
      console.log('📸 Revisa /tmp/coolify-4-project-page.png');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/coolify-error.png' });
  } finally {
    console.log('\n📸 Screenshots guardados en /tmp/coolify-*.png');
    console.log('⏳ Esperando 5 segundos antes de cerrar...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();
