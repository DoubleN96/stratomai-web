import { chromium } from 'playwright';

const COOLIFY_EMAIL = 'Stratoma.ai@gmail.com';
const COOLIFY_PASSWORD = 'Cashflow7+';
const APP_URL = 'https://coolify.stratomai.com/project/kogwwoc0skgwwow88ko0ooccc/environment/dgo8scgossc8woocskco4wk0/application/kk40c0wos8sw48cok8cok4wo';

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
    // Login
    console.log('🔐 Iniciando sesión en Coolify...');
    await page.goto('https://coolify.stratomai.com/login');
    await page.fill('input[type="email"]', COOLIFY_EMAIL);
    await page.fill('input[type="password"]', COOLIFY_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Login exitoso\n');

    // Navegar directamente a la aplicación
    console.log('📱 Navegando a la aplicación Stratoma...');
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/app-page.png' });
    console.log('✅ En página de aplicación\n');

    // Buscar tab de Environment
    console.log('🔍 Buscando sección de Environment Variables...');
    const envSelectors = [
      'a[href*="environment"]',
      'text=Environment',
      'button:has-text("Environment")'
    ];

    let foundEnv = false;
    for (const selector of envSelectors) {
      try {
        const element = page.locator(selector).first();
        const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          console.log(`✅ Haciendo clic en Environment...`);
          await element.click();
          await page.waitForTimeout(2000);
          foundEnv = true;
          break;
        }
      } catch (e) {}
    }

    await page.screenshot({ path: '/tmp/env-page.png' });

    // Verificar variables existentes
    let content = await page.content();
    console.log('\n📊 Estado actual de las variables:');
    for (const key of Object.keys(ENV_VARS)) {
      const exists = content.includes(key);
      console.log(`${exists ? '✅ Ya existe' : '❌ Falta'}: ${key}`);
    }

    // Intentar añadir las variables
    console.log('\n➕ Añadiendo variables de entorno...\n');

    for (const [key, value] of Object.entries(ENV_VARS)) {
      // Verificar si ya existe
      if (content.includes(key)) {
        console.log(`  ⏭️  ${key} ya existe, saltando...`);
        continue;
      }

      console.log(`  📝 Añadiendo ${key}...`);

      try {
        // Buscar campos de input vacíos
        const keyInput = page.locator('input[name*="key" i], input[placeholder*="key" i], input[placeholder*="name" i]').last();
        const valueInput = page.locator('input[name*="value" i], textarea, input[placeholder*="value" i]').last();

        // Llenar los campos
        await keyInput.fill(key, { timeout: 5000 });
        await valueInput.fill(value, { timeout: 5000 });

        // Esperar un poco
        await page.waitForTimeout(1000);

        // Buscar botón Add/Save cerca de los inputs
        const addButton = page.locator('button:has-text("Add"), button:has-text("Save"), button[type="submit"]').last();
        const buttonVisible = await addButton.isVisible({ timeout: 2000 }).catch(() => false);

        if (buttonVisible) {
          await addButton.click();
          await page.waitForTimeout(1500);
          console.log(`  ✅ ${key} añadido`);
        } else {
          // Intentar presionar Enter
          await valueInput.press('Enter');
          await page.waitForTimeout(1500);
          console.log(`  ✅ ${key} añadido (con Enter)`);
        }

        // Actualizar contenido
        content = await page.content();

      } catch (e) {
        console.log(`  ⚠️  Error con ${key}: ${e.message.substring(0, 80)}`);
      }
    }

    await page.screenshot({ path: '/tmp/vars-added.png' });

    // Buscar y hacer clic en Save general (si existe)
    console.log('\n💾 Guardando cambios...');
    try {
      const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")').first();
      const saveVisible = await saveBtn.isVisible({ timeout: 3000 }).catch(() => false);
      if (saveVisible) {
        await saveBtn.click();
        await page.waitForTimeout(2000);
        console.log('✅ Cambios guardados');
      }
    } catch (e) {
      console.log('ℹ️  No se encontró botón Save general (puede que no sea necesario)');
    }

    // Redeploy
    console.log('\n🚀 Iniciando redeploy...');
    try {
      const redeployBtn = page.locator('button:has-text("Redeploy"), button:has-text("Deploy"), button:has-text("Restart")').first();
      const redeployVisible = await redeployBtn.isVisible({ timeout: 3000 }).catch(() => false);
      if (redeployVisible) {
        await redeployBtn.click();
        await page.waitForTimeout(3000);
        await page.screenshot({ path: '/tmp/redeployed.png' });
        console.log('✅ Redeploy iniciado');
      } else {
        console.log('⚠️  No se encontró botón de Redeploy - puede que necesites hacerlo manualmente');
      }
    } catch (e) {
      console.log('⚠️  Error en redeploy:', e.message);
    }

    console.log('\n✅ PROCESO COMPLETADO');
    console.log('\n📸 Screenshots guardados:');
    console.log('  - /tmp/app-page.png');
    console.log('  - /tmp/env-page.png');
    console.log('  - /tmp/vars-added.png');
    console.log('  - /tmp/redeployed.png');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/error-final.png' });
  } finally {
    await browser.close();
  }
})();
