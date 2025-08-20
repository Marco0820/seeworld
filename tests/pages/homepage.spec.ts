import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 首页测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
    await page.goto('/');
    await helper.waitForPageLoad();
  });

  test('首页基本加载测试', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/crepal/i);
    
    // 检查基本页面元素
    await helper.checkBasicPageElements();
    
    // 截图记录
    await helper.takeScreenshot('homepage-loaded');
  });

  test('导航栏功能测试', async ({ page }) => {
    // 检查导航栏是否存在
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();

    // 检查Logo
    const logo = page.locator('img[alt*="logo" i], img[alt*="crepal" i], a[href="/"]').first();
    if (await logo.count() > 0) {
      await expect(logo).toBeVisible();
    }

    // 检查主要导航链接
    const navLinks = await page.locator('nav a, header a').all();
    console.log(`找到 ${navLinks.length} 个导航链接`);

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`导航链接: ${text?.trim()} -> ${href}`);
    }
  });

  test('主要内容区域测试', async ({ page }) => {
    // 检查主要标题
    const mainHeading = page.locator('h1, .hero h2, .main-title').first();
    if (await mainHeading.count() > 0) {
      await expect(mainHeading).toBeVisible();
      const headingText = await mainHeading.textContent();
      console.log(`主标题: ${headingText?.trim()}`);
    }

    // 检查主要描述文本
    const description = page.locator('p, .description, .subtitle').first();
    if (await description.count() > 0) {
      await expect(description).toBeVisible();
    }

    // 检查主要行动按钮
    const ctaButtons = page.locator('button, a[class*="button"], a[class*="btn"]');
    const buttonCount = await ctaButtons.count();
    console.log(`找到 ${buttonCount} 个行动按钮`);

    if (buttonCount > 0) {
      await expect(ctaButtons.first()).toBeVisible();
    }
  });

  test('响应式设计测试', async ({ page }) => {
    await helper.checkResponsiveDesign();
  });

  test('链接有效性测试', async ({ page }) => {
    const links = await helper.checkLinks();
    console.log(`检查到 ${links.length} 个链接`);
    
    // 测试内部链接
    const internalLinks = links.filter(link => !link.isExternal);
    for (const link of internalLinks.slice(0, 5)) { // 限制测试前5个内部链接
      if (link.href && link.href !== '#') {
        console.log(`测试内部链接: ${link.href}`);
        const response = await page.request.get(link.href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('图片加载测试', async ({ page }) => {
    const images = await helper.checkImages();
    console.log(`检查到 ${images.length} 个图片`);
    
    const failedImages = images.filter(img => !img.isLoaded);
    if (failedImages.length > 0) {
      console.warn(`${failedImages.length} 个图片加载失败:`, failedImages);
    }
    
    expect(failedImages.length).toBeLessThan(images.length * 0.2); // 允许最多20%的图片加载失败
  });

  test('性能测试', async ({ page }) => {
    const metrics = await helper.checkPerformance();
    console.log('性能指标:', metrics);
    
    // 页面加载时间应该小于5秒
    expect(metrics.totalTime).toBeLessThan(5000);
    
    // DOM内容加载时间应该小于3秒
    expect(metrics.domContentLoaded).toBeLessThan(3000);
  });

  test('用户交互模拟测试', async ({ page }) => {
    await helper.simulateUserInteraction();
    
    // 检查滚动后页面是否正常
    await helper.checkBasicPageElements();
    
    // 尝试点击第一个可点击元素
    const clickableElements = page.locator('button, a, [onclick], [role="button"]');
    if (await clickableElements.count() > 0) {
      const firstClickable = clickableElements.first();
      await firstClickable.scrollIntoViewIfNeeded();
      await firstClickable.click();
      await page.waitForTimeout(2000);
    }
  });
});

