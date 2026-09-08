import { expect, test } from '@playwright/test'

test('records a condition and shows it in the list', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Forecasts' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Current conditions' })).toBeVisible()

  // Unique summary so the assertion targets this run's row specifically.
  const summary = `E2E ${Date.now()}`
  await page.getByPlaceholder('Temperature (°C)').fill('17')
  await page.getByPlaceholder('Summary').fill(summary)
  await page.getByRole('button', { name: 'Record' }).click()

  await expect(page.getByRole('cell', { name: summary })).toBeVisible()
})
