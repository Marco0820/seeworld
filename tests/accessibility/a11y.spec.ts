import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 可访问性和用户体验测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
  });

  test('键盘导航测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试键盘导航 ===');
    
    // 使用Tab键遍历可聚焦元素
    const focusableElements = [];
    let currentElement = null;
    
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      try {
        currentElement = await page.locator(':focus').first();
        if (await currentElement.count() > 0) {
          const tagName = await currentElement.evaluate(el => el.tagName);
          const text = await currentElement.textContent();
          const ariaLabel = await currentElement.getAttribute('aria-label');
          
          focusableElements.push({
            tagName,
            text: text?.trim().substring(0, 50),
            ariaLabel
          });
          
          console.log(`焦点元素 ${i + 1}: ${tagName} - "${text?.trim().substring(0, 30)}" - aria-label: ${ariaLabel}`);
        }
      } catch (error) {
        console.log(`无法获取焦点元素 ${i + 1}`);
      }
    }
    
    console.log(`总共找到 ${focusableElements.length} 个可聚焦元素`);
    await helper.takeScreenshot('keyboard-navigation');
  });

  test('ARIA标签和语义化测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试ARIA标签和语义化 ===');
    
    // 检查主要地标
    const landmarks = [
      { selector: 'main, [role="main"]', name: '主内容区域' },
      { selector: 'nav, [role="navigation"]', name: '导航区域' },
      { selector: 'header, [role="banner"]', name: '页头' },
      { selector: 'footer, [role="contentinfo"]', name: '页脚' },
      { selector: 'aside, [role="complementary"]', name: '侧边栏' }
    ];
    
    for (const landmark of landmarks) {
      const elements = await page.locator(landmark.selector).count();
      console.log(`${landmark.name}: ${elements} 个`);
    }
    
    // 检查标题层级
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    console.log(`标题元素总数: ${headings.length}`);
    
    for (let i = 0; i < Math.min(headings.length, 10); i++) {
      const heading = headings[i];
      const tagName = await heading.evaluate(el => el.tagName);
      const text = await heading.textContent();
      console.log(`${tagName}: ${text?.trim().substring(0, 50)}`);
    }
    
    // 检查表单标签
    const formInputs = await page.locator('input, textarea, select').all();
    console.log(`表单输入元素总数: ${formInputs.length}`);
    
    let labeledInputs = 0;
    for (const input of formInputs) {
      const label = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      const associatedLabel = await page.locator(`label[for="${await input.getAttribute('id')}"]`).count();
      
      if (label || placeholder || associatedLabel > 0) {
        labeledInputs++;
      }
    }
    
    console.log(`有标签的输入元素: ${labeledInputs}/${formInputs.length}`);
  });

  test('颜色对比度和视觉测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试颜色对比度和视觉效果 ===');
    
    // 测试不同的颜色模式（如果支持）
    const darkModeToggle = page.locator('text=/深色|dark|夜间|night/i, [data-theme], .theme-toggle');
    
    if (await darkModeToggle.count() > 0) {
      console.log('找到深色模式切换');
      
      // 截图浅色模式
      await helper.takeScreenshot('light-mode');
      
      // 切换到深色模式
      await darkModeToggle.first().click();
      await page.waitForTimeout(1000);
      
      // 截图深色模式
      await helper.takeScreenshot('dark-mode');
      
      console.log('深色模式测试完成');
    }
    
    // 检查图片的alt属性
    const images = await page.locator('img').all();
    let imagesWithAlt = 0;
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (alt && alt.trim() !== '') {
        imagesWithAlt++;
      }
    }
    
    console.log(`有alt属性的图片: ${imagesWithAlt}/${images.length}`);
  });

  test('屏幕阅读器友好性测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试屏幕阅读器友好性 ===');
    
    // 检查skip links
    const skipLinks = page.locator('a[href*="#"], .skip-link').filter({ hasText: /跳过|skip/i });
    console.log(`跳过链接数量: ${await skipLinks.count()}`);
    
    // 检查ARIA live regions
    const liveRegions = await page.locator('[aria-live], [role="status"], [role="alert"]').count();
    console.log(`动态内容区域数量: ${liveRegions}`);
    
    // 检查按钮和链接的描述性文本
    const buttons = await page.locator('button, a').all();
    let descriptiveButtons = 0;
    
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');
      
      if ((text && text.trim().length > 2) || ariaLabel || title) {
        descriptiveButtons++;
      }
      
      console.log(`按钮/链接 ${i + 1}: "${text?.trim()}" - aria-label: ${ariaLabel} - title: ${title}`);
    }
    
    console.log(`有描述性文本的按钮: ${descriptiveButtons}/${Math.min(buttons.length, 10)}`);
  });

  test('移动端可访问性测试', async ({ page }) => {
    // 设置移动端视图
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试移动端可访问性 ===');
    
    // 检查触摸目标大小
    const clickableElements = await page.locator('button, a, input, [onclick]').all();
    let adequateSizeTargets = 0;
    
    for (let i = 0; i < Math.min(clickableElements.length, 10); i++) {
      const element = clickableElements[i];
      const box = await element.boundingBox();
      
      if (box && box.width >= 44 && box.height >= 44) {
        adequateSizeTargets++;
      }
      
      console.log(`触摸目标 ${i + 1}: ${box?.width}x${box?.height}px`);
    }
    
    console.log(`符合大小标准的触摸目标: ${adequateSizeTargets}/${Math.min(clickableElements.length, 10)}`);
    
    // 测试移动端菜单可访问性
    const mobileMenuButton = page.locator('button[aria-expanded], .menu-toggle, .hamburger');
    
    if (await mobileMenuButton.count() > 0) {
      const ariaExpanded = await mobileMenuButton.first().getAttribute('aria-expanded');
      console.log(`移动端菜单按钮 aria-expanded: ${ariaExpanded}`);
      
      await mobileMenuButton.first().click();
      await page.waitForTimeout(500);
      
      const expandedState = await mobileMenuButton.first().getAttribute('aria-expanded');
      console.log(`点击后 aria-expanded: ${expandedState}`);
    }
    
    await helper.takeScreenshot('mobile-accessibility');
  });

  test('错误处理和用户反馈测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试错误处理和用户反馈 ===');
    
    // 查找表单进行错误测试
    const forms = await page.locator('form').all();
    
    if (forms.length > 0) {
      console.log(`找到 ${forms.length} 个表单`);
      
      const form = forms[0];
      const requiredInputs = await form.locator('input[required], textarea[required]').all();
      
      if (requiredInputs.length > 0) {
        console.log(`找到 ${requiredInputs.length} 个必填字段`);
        
        // 尝试提交空表单触发验证错误
        const submitButton = form.locator('button[type="submit"], input[type="submit"]');
        
        if (await submitButton.count() > 0) {
          await submitButton.first().click();
          await page.waitForTimeout(1000);
          
          // 检查错误消息
          const errorMessages = page.locator('.error, [role="alert"], .invalid-feedback, .field-error');
          console.log(`错误消息数量: ${await errorMessages.count()}`);
          
          if (await errorMessages.count() > 0) {
            const firstError = await errorMessages.first().textContent();
            console.log(`第一个错误消息: ${firstError?.trim()}`);
          }
        }
      }
    }
    
    // 检查加载状态指示器
    const loadingIndicators = page.locator('.loading, .spinner, [aria-busy="true"]');
    console.log(`加载指示器数量: ${await loadingIndicators.count()}`);
    
    // 检查成功/信息提示
    const notifications = page.locator('.notification, .toast, .alert, [role="status"]');
    console.log(`通知/提示数量: ${await notifications.count()}`);
  });

  test('国际化和本地化测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    console.log('=== 测试国际化和本地化 ===');
    
    // 检查语言切换功能
    const langSwitcher = page.locator('text=/语言|language|lang|中文|English/i, select[name*="lang"]');
    
    if (await langSwitcher.count() > 0) {
      console.log('找到语言切换功能');
      
      const currentLang = await page.locator('html').getAttribute('lang');
      console.log(`当前语言设置: ${currentLang}`);
      
      // 尝试切换语言
      await langSwitcher.first().click();
      await page.waitForTimeout(1000);
      
      const langOptions = page.locator('[role="option"], option');
      if (await langOptions.count() > 0) {
        console.log(`可用语言选项: ${await langOptions.count()}`);
        
        for (let i = 0; i < Math.min(await langOptions.count(), 3); i++) {
          const option = langOptions.nth(i);
          const optionText = await option.textContent();
          console.log(`语言选项 ${i + 1}: ${optionText?.trim()}`);
        }
      }
    }
    
    // 检查文本方向性
    const rtlElements = await page.locator('[dir="rtl"]').count();
    const ltrElements = await page.locator('[dir="ltr"]').count();
    console.log(`RTL元素: ${rtlElements}, LTR元素: ${ltrElements}`);
    
    // 检查日期和数字格式
    const dateElements = page.locator('time, .date, [datetime]');
    if (await dateElements.count() > 0) {
      const dateText = await dateElements.first().textContent();
      console.log(`日期格式示例: ${dateText?.trim()}`);
    }
  });
});

