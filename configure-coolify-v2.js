import { chromium } from 'playwright';

const COOLIFY_EMAIL = 'Stratoma.ai@gmail.com';
const COOLIFY_PASSWORD = 'Cashflow7+';

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
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    console.log('🌐 Navegando a Coolify...');
    await page.goto('https://coolify.stratomai.com/login');
    await page.waitForLoadState('networkidle');

    // Login
    console.log('🔐 Iniciando sesión...');
    await page.fill('input[type="email"]', COOLIFY_EMAIL);
    await page.fill('input[type="password"]', COOLIFY_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/step1-logged-in.png' });
    console.log('✅ Login exitoso');

    // Buscar y hacer clic en la aplicación stratomai
    console.log('🔍 Buscando aplicación stratomai...');
    await page.waitForTimeout(2000);

    // Hacer clic en el link que contiene "stratomai.com"
    const appLink = await page.locator('text=https://stratomai.com').first();
    if (appLink) {
      console.log('📱 Haciendo clic en la aplicación...');
      await appLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/tmp/step2-app-page.png' });
      console.log('✅ En página de la aplicación');
    }

    // Buscar tab/sección de Environment o Configuration
    console.log('🔍 Buscando Environment Variables...');
    const envTabs = [
      'text=Environment',
      'text=Configuration',
      'text=Secrets',
      'a:has-text("Environment")',
      'button:has-text("Environment")'
    ];

    for (const selector of envTabs) {
      try {
        const tab = await page.locator(selector).first();
        const isVisible = await tab.isVisible().catch(() => false);
        if (isVisible) {
          console.log(`🎯 Encontrado tab: ${selector}`);
          await tab.click();
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {
        // Continuar
      }
    }

    await page.screenshot({ path: '/tmp/step3-env-section.png' });

    // Verificar si las variables ya existen
    const content = await page.content();
    console.log('\n📊 Variables existentes:');
    const existingVars = {};
    for (const key of Object.keys(ENV_VARS)) {
      const exists = content.includes(key);
      existingVars[key] = exists;
      console.log(`${exists ? '✅' : '❌'} ${key}`);
    }

    // Buscar el campo o formulario para añadir variables
    console.log('\n➕ Buscando formulario para añadir variables...');

    // Buscar inputs que parezcan ser para key/value
    const keyInputs = await page.locator('input[name*="key" i], input[placeholder*="key" i], input[placeholder*="name" i]').all();
    const valueInputs = await page.locator('input[name*="value" i], textarea[name*="value" i], input[placeholder*="value" i]').all();

    console.log(`🔍 Encontrados ${keyInputs.length} campos de key y ${valueInputs.length} campos de value`);

    if (keyInputs.length > 0 && valueInputs.length > 0) {
      console.log('📝 Usando formulario inline para añadir variables...');

      let varIndex = 0;
      for (const [key, value] of Object.entries(ENV_VARS)) {
        if (!existingVars[key]) {
          console.log(`  ➕ Añadiendo ${key}...`);

          try {
            // Usar el par de inputs correspondiente
            if (keyInputs[varIndex] && valueInputs[varIndex]) {
              await keyInputs[varIndex].fill(key);
              await valueInputs[varIndex].fill(value);

              // Presionar Tab o Enter para confirmar
              await valueInputs[varIndex].press('Tab');
              await page.waitForTimeout(500);

              console.log(`  ✅ ${key} añadido`);
              varIndex++;
            }
          } catch (e) {
            console.log(`  ⚠️  Error añadiendo ${key}: ${e.message}`);
          }
        }
      }

      await page.screenshot({ path: '/tmp/step4-vars-filled.png' });

      // Buscar botón de Save/Submit
      console.log('\n💾 Buscando botón de guardar...');
      const saveButtons = [
        'button:has-text("Save")',
        'button:has-text("Submit")',
        'button:has-text("Update")',
        'button[type="submit"]'
      ];

      for (const selector of saveButtons) {
        try {
          const button = await page.locator(selector).first();
          const isVisible = await button.isVisible().catch(() => false);
          if (isVisible) {
            console.log(`💾 Guardando con: ${selector}`);
            await button.click();
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/tmp/step5-saved.png' });
            console.log('✅ Variables guardadas');
            break;
          }
        } catch (e) {
          // Continuar
        }
      }

      // Buscar botón de Redeploy
      console.log('\n🚀 Buscando botón de Redeploy...');
      const redeployButtons = [
        'button:has-text("Redeploy")',
        'button:has-text("Deploy")',
        'button:has-text("Restart")'
      ];

      for (const selector of redeployButtons) {
        try {
          const button = await page.locator(selector).first();
          const isVisible = await button.isVisible().catch(() => false);
          if (isVisible) {
            console.log(`🚀 Redeployando con: ${selector}`);
            await button.click();
            await page.waitForTimeout(2000);
            await page.screenshot({ path: '/tmp/step6-redeployed.png' });
            console.log('✅ Redeploy iniciado');
            break;
          }
        } catch (e) {
          // Continuar
        }
      }

    } else {
      console.log('⚠️  No se encontraron campos de formulario para variables');
    }

    console.log('\n✅ Proceso completado');
    console.log('📸 Revisa los screenshots en /tmp/step*.png');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/error.png' });
  } finally {
    await page.waitForTimeout(2000);
    await browser.close();
  }
})();
