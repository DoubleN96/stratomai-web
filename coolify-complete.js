import { chromium } from 'playwright';

const PROJECT_URL = 'https://coolify.stratomai.com/project/kogwwoc0skgwwow88ko0ooccc/environment/dgo8scgossc8woocskco4wk0';

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
    await page.waitForTimeout(2000);
    console.log('✅ Login exitoso\n');

    // Navegar al proyecto
    console.log('📂 Navegando al proyecto...');
    await page.goto(PROJECT_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/project-resources.png' });
    console.log('✅ En proyecto\n');

    // Hacer clic en la aplicación stratomai.com
    console.log('🔍 Buscando aplicación stratomai.com...');
    const appLinks = await page.$$('a');

    for (const link of appLinks) {
      try {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        if ((href && href.includes('application')) || (text && text.includes('stratomai.com'))) {
          console.log('✅ Haciendo clic en aplicación...');
          await link.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {}
    }

    await page.screenshot({ path: '/tmp/application-page.png' });
    console.log('✅ En aplicación\n');

    // Buscar Environment tab
    console.log('🔧 Buscando Environment...');
    const allLinks = await page.$$('a');
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      if ((href && href.includes('environment')) || (text && text.includes('Environment'))) {
        await link.click();
        await page.waitForTimeout(2000);
        break;
      }
    }

    await page.screenshot({ path: '/tmp/env-vars-page.png' });

    // Verificar si ya existen variables
    let pageContent = await page.content();
    console.log('\n📊 Estado de variables:');
    for (const key of Object.keys(ENV_VARS)) {
      const exists = pageContent.includes(key);
      console.log(`${exists ? '✅ Existe' : '❌ Falta'}: ${key}`);
    }

    // Añadir variables usando inputs
    console.log('\n➕ Añadiendo variables...\n');

    for (const [key, value] of Object.entries(ENV_VARS)) {
      if (pageContent.includes(key)) {
        console.log(`  ⏭️  ${key} ya existe`);
        continue;
      }

      console.log(`  📝 Añadiendo ${key}...`);

      try {
        // Buscar inputs vacíos
        const allInputs = await page.$$('input[type="text"], input:not([type])');

        let keyInput = null;
        let valueInput = null;

        // Buscar el último par de inputs vacíos
        for (let i = allInputs.length - 2; i >= 0; i -= 2) {
          const val1 = await allInputs[i].inputValue();
          const val2 = await allInputs[i + 1].inputValue();

          if (!val1 && !val2) {
            keyInput = allInputs[i];
            valueInput = allInputs[i + 1];
            break;
          }
        }

        if (!keyInput || !valueInput) {
          // Plan B: buscar por placeholder
          for (const input of allInputs) {
            const placeholder = await input.getAttribute('placeholder');
            const val = await input.inputValue();

            if (!val && placeholder) {
              if (placeholder.toLowerCase().includes('key') || placeholder.toLowerCase().includes('name')) {
                keyInput = input;
              }
              if (placeholder.toLowerCase().includes('value')) {
                valueInput = input;
              }
            }

            if (keyInput && valueInput) break;
          }
        }

        if (keyInput && valueInput) {
          await keyInput.fill(key);
          await valueInput.fill(value);
          await page.keyboard.press('Tab');
          await page.waitForTimeout(1000);
          console.log(`  ✅ ${key}`);

          // Actualizar contenido
          pageContent = await page.content();
        } else {
          console.log(`  ⚠️  No se encontraron campos`);
        }

      } catch (e) {
        console.log(`  ❌ Error: ${e.message.substring(0, 50)}`);
      }
    }

    await page.screenshot({ path: '/tmp/vars-added-complete.png' });

    // Guardar cambios
    console.log('\n💾 Guardando cambios...');
    try {
      const saveBtn = await page.$('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
      if (saveBtn) {
        await saveBtn.click();
        await page.waitForTimeout(3000);
        console.log('✅ Guardado');
      }
    } catch (e) {
      console.log('ℹ️  No se requiere botón Save');
    }

    // Redeploy
    console.log('\n🚀 Buscando botón Redeploy...');
    try {
      const redeployBtn = await page.$('button:has-text("Redeploy"), button:has-text("Deploy"), button:has-text("Restart")');
      if (redeployBtn) {
        await redeployBtn.click();
        await page.waitForTimeout(2000);
        console.log('✅ Redeploy iniciado');
      } else {
        console.log('⚠️  No se encontró botón Redeploy');
      }
    } catch (e) {}

    await page.screenshot({ path: '/tmp/final-result.png' });

    console.log('\n✅ PROCESO COMPLETADO\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/error-final.png' });
  } finally {
    await browser.close();
  }
})();
