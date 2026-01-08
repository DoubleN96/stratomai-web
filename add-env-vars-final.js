import { chromium } from 'playwright';

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
    console.log('🔐 Login...');
    await page.goto('https://coolify.stratomai.com/login');
    await page.fill('input[type="email"]', 'Stratoma.ai@gmail.com');
    await page.fill('input[type="password"]', 'Cashflow7+');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/1-dashboard.png' });
    console.log('✅ Logged in\n');

    // Hacer clic en proyecto Stratoma
    console.log('📂 Abriendo proyecto Stratoma...');
    await page.click('text=Stratoma');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/2-project.png' });
    console.log('✅ En proyecto Stratoma\n');

    // Buscar la aplicación stratomai
    console.log('🔍 Buscando aplicación stratomai.com...');
    const appCard = page.locator('text=/stratomai\\.com/i').first();
    await appCard.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/3-app.png' });
    console.log('✅ En aplicación\n');

    // Buscar y hacer clic en Environment o Configuration
    console.log('🔧 Buscando Environment Variables...');
    const tabs = ['Environment', 'Configuration', 'Secrets', 'Variables'];

    for (const tabName of tabs) {
      try {
        const tab = page.locator(`text=${tabName}`).first();
        const visible = await tab.isVisible({ timeout: 2000 }).catch(() => false);
        if (visible) {
          console.log(`✅ Haciendo clic en ${tabName}...`);
          await tab.click();
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {}
    }

    await page.screenshot({ path: '/tmp/4-env-section.png' });
    console.log('✅ En sección de variables\n');

    // Añadir variables
    console.log('➕ Añadiendo variables...\n');

    for (const [key, value] of Object.entries(ENV_VARS)) {
      console.log(`  📝 ${key}...`);

      try {
        // Buscar todos los inputs en la página
        const inputs = await page.$$('input');

        // Encontrar el último par de inputs (key/value vacíos)
        let keyField = null;
        let valueField = null;

        for (let i = inputs.length - 1; i >= 0; i--) {
          const inputValue = await inputs[i].inputValue();
          const placeholder = await inputs[i].getAttribute('placeholder');

          if (!inputValue && placeholder && placeholder.toLowerCase().includes('key')) {
            keyField = inputs[i];
          }
          if (!inputValue && placeholder && placeholder.toLowerCase().includes('value')) {
            valueField = inputs[i];
          }

          if (keyField && valueField) break;
        }

        if (keyField && valueField) {
          await keyField.fill(key);
          await valueField.fill(value);
          await page.keyboard.press('Tab');
          await page.waitForTimeout(800);
          console.log(`  ✅ ${key} añadido`);
        } else {
          console.log(`  ⚠️  No se encontraron campos para ${key}`);
        }

      } catch (e) {
        console.log(`  ❌ Error: ${e.message.substring(0, 60)}`);
      }
    }

    await page.screenshot({ path: '/tmp/5-vars-filled.png' });

    // Guardar
    console.log('\n💾 Guardando...');
    const saveButtons = await page.$$('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
    if (saveButtons.length > 0) {
      await saveButtons[0].click();
      await page.waitForTimeout(3000);
      console.log('✅ Guardado');
    }

    await page.screenshot({ path: '/tmp/6-saved.png' });

    // Redeploy
    console.log('\n🚀 Redeployando...');
    const redeployButtons = await page.$$('button:has-text("Redeploy"), button:has-text("Deploy")');
    if (redeployButtons.length > 0) {
      await redeployButtons[0].click();
      await page.waitForTimeout(2000);
      console.log('✅ Redeploy iniciado');
    } else {
      console.log('⚠️  Redeploy manual necesario');
    }

    await page.screenshot({ path: '/tmp/7-final.png' });

    console.log('\n✅ COMPLETADO');
    console.log('📸 Revisa screenshots en /tmp/*.png\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/error.png' });
  } finally {
    await browser.close();
  }
})();
