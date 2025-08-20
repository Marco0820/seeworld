import { Page, expect } from '@playwright/test';

export class CrepalTestHelper {
  constructor(private page: Page) {}

  /**
   * 等待页面加载完成
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * 截图并保存
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * 检查页面基本元素
   */
  async checkBasicPageElements() {
    // 检查页面标题存在
    await expect(this.page).toHaveTitle(/.+/);
    
    // 检查没有明显的错误信息
    const errorElements = this.page.locator('text=/error|错误|failed|失败/i');
    const errorCount = await errorElements.count();
    if (errorCount > 0) {
      console.warn(`Found ${errorCount} potential error elements on page`);
    }
  }

  /**
   * 检查响应式设计
   */
  async checkResponsiveDesign() {
    // 桌面视图
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.waitForPageLoad();
    await this.takeScreenshot('desktop-view');

    // 平板视图
    await this.page.setViewportSize({ width: 768, height: 1024 });
    await this.waitForPageLoad();
    await this.takeScreenshot('tablet-view');

    // 手机视图
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.waitForPageLoad();
    await this.takeScreenshot('mobile-view');

    // 恢复桌面视图
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * 检查链接有效性
   */
  async checkLinks() {
    const links = await this.page.locator('a[href]').all();
    const results = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        results.push({
          href,
          text: text?.trim(),
          isExternal: !href.startsWith('/') && !href.includes('crepal.ai')
        });
      }
    }

    return results;
  }

  /**
   * 检查表单元素
   */
  async checkFormElements() {
    const forms = await this.page.locator('form').all();
    const inputs = await this.page.locator('input, textarea, select').all();
    const buttons = await this.page.locator('button, input[type="submit"]').all();

    return {
      formsCount: forms.length,
      inputsCount: inputs.length,
      buttonsCount: buttons.length
    };
  }

  /**
   * 检查图片加载
   */
  async checkImages() {
    const images = await this.page.locator('img').all();
    const results = [];

    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalHeight !== 0);
      
      results.push({
        src,
        alt,
        isLoaded
      });
    }

    return results;
  }

  /**
   * 模拟用户交互
   */
  async simulateUserInteraction() {
    // 滚动页面
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await this.page.waitForTimeout(1000);

    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);

    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.waitForTimeout(1000);
  }

  /**
   * 检查性能指标
   */
  async checkPerformance() {
    const performanceMetrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        responseTime: navigation.responseEnd - navigation.requestStart,
        totalTime: navigation.loadEventEnd - (navigation as any).navigationStart
      };
    });

    return performanceMetrics;
  }
}

