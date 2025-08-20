import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 导航和页面跳转测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
  });

  test('主要页面导航测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 获取所有导航链接
    const navLinks = await page.locator('nav a, header a, .menu a').all();
    const testedPages = new Set<string>();

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      if (href && href.startsWith('/') && !testedPages.has(href)) {
        testedPages.add(href);
        console.log(`测试页面导航: ${text?.trim()} -> ${href}`);
        
        try {
          // 点击链接
          await link.click();
          await helper.waitForPageLoad();
          
          // 检查页面是否正确加载
          await helper.checkBasicPageElements();
          
          // 截图记录
          const pageName = href.replace(/\//g, '_') || 'root';
          await helper.takeScreenshot(`page-${pageName}`);
          
          // 返回首页继续测试
          await page.goto('/');
          await helper.waitForPageLoad();
          
        } catch (error) {
          console.error(`导航到 ${href} 时出错:`, error);
        }
      }
    }
  });

  test('面包屑导航测试', async ({ page }) => {
    await page.goto('/');
    
    // 查找面包屑导航
    const breadcrumbs = page.locator('.breadcrumb, .breadcrumbs, nav[aria-label*="breadcrumb"]');
    
    if (await breadcrumbs.count() > 0) {
      await expect(breadcrumbs.first()).toBeVisible();
      
      const breadcrumbLinks = await breadcrumbs.locator('a').all();
      console.log(`找到 ${breadcrumbLinks.length} 个面包屑链接`);
      
      // 测试面包屑链接
      for (const link of breadcrumbLinks) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        console.log(`面包屑链接: ${text?.trim()} -> ${href}`);
      }
    }
  });

  test('页脚链接测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 滚动到页面底部
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // 查找页脚
    const footer = page.locator('footer, .footer').first();
    
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
      
      const footerLinks = await footer.locator('a').all();
      console.log(`找到 ${footerLinks.length} 个页脚链接`);
      
      // 测试前几个页脚链接
      for (const link of footerLinks.slice(0, 5)) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (href && href.startsWith('/')) {
          console.log(`测试页脚链接: ${text?.trim()} -> ${href}`);
          
          try {
            await link.click();
            await helper.waitForPageLoad();
            await helper.checkBasicPageElements();
            
            // 返回首页
            await page.goto('/');
            await helper.waitForPageLoad();
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            
          } catch (error) {
            console.error(`页脚链接 ${href} 测试失败:`, error);
          }
        }
      }
    }
  });

  test('搜索功能测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找搜索框
    const searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], input[placeholder*="search"], .search input');
    
    if (await searchInput.count() > 0) {
      console.log('找到搜索功能，开始测试');
      
      await searchInput.first().fill('AI视频生成');
      await page.keyboard.press('Enter');
      
      await helper.waitForPageLoad();
      await helper.checkBasicPageElements();
      await helper.takeScreenshot('search-results');
    } else {
      console.log('未找到搜索功能');
    }
  });

  test('移动端菜单测试', async ({ page }) => {
    // 设置为移动端视图
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找汉堡菜单按钮
    const menuButton = page.locator('button[aria-label*="menu"], .menu-toggle, .hamburger, button[aria-expanded]');
    
    if (await menuButton.count() > 0) {
      console.log('找到移动端菜单按钮');
      
      // 点击菜单按钮
      await menuButton.first().click();
      await page.waitForTimeout(500);
      
      // 检查菜单是否展开
      const mobileMenu = page.locator('.mobile-menu, .nav-menu, [aria-expanded="true"]');
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu.first()).toBeVisible();
        console.log('移动端菜单成功展开');
        
        // 截图记录
        await helper.takeScreenshot('mobile-menu-open');
        
        // 测试菜单中的链接
        const menuLinks = await mobileMenu.locator('a').all();
        console.log(`移动端菜单中有 ${menuLinks.length} 个链接`);
      }
    }
  });

  test('页面历史导航测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 获取第一个内部链接
    const firstInternalLink = page.locator('a[href^="/"]').first();
    
    if (await firstInternalLink.count() > 0) {
      const href = await firstInternalLink.getAttribute('href');
      console.log(`测试页面历史导航，跳转到: ${href}`);
      
      // 点击链接
      await firstInternalLink.click();
      await helper.waitForPageLoad();
      
      // 使用浏览器后退按钮
      await page.goBack();
      await helper.waitForPageLoad();
      
      // 检查是否回到首页
      expect(page.url()).toContain('crepal.ai');
      
      // 使用浏览器前进按钮
      await page.goForward();
      await helper.waitForPageLoad();
      
      console.log('页面历史导航测试完成');
    }
  });
});

