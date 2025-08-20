import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 表单和交互功能测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
  });

  test('注册/登录表单测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找登录/注册相关按钮
    const authButtons = page.locator('text=/登录|注册|login|register|sign/i');
    
    if (await authButtons.count() > 0) {
      console.log('找到认证相关按钮，开始测试');
      
      await authButtons.first().click();
      await helper.waitForPageLoad();
      
      // 查找表单元素
      const formElements = await helper.checkFormElements();
      console.log('表单元素统计:', formElements);
      
      // 查找邮箱输入框
      const emailInput = page.locator('input[type="email"], input[name*="email"], input[placeholder*="邮箱"], input[placeholder*="email"]');
      if (await emailInput.count() > 0) {
        await emailInput.first().fill('test@example.com');
        console.log('填写邮箱字段');
      }
      
      // 查找密码输入框
      const passwordInput = page.locator('input[type="password"], input[name*="password"], input[placeholder*="密码"], input[placeholder*="password"]');
      if (await passwordInput.count() > 0) {
        await passwordInput.first().fill('testpassword123');
        console.log('填写密码字段');
      }
      
      // 截图记录
      await helper.takeScreenshot('auth-form-filled');
      
      // 注意：不实际提交表单，避免创建测试数据
      console.log('表单填写测试完成（未提交）');
    }
  });

  test('联系表单测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找联系相关链接
    const contactLinks = page.locator('text=/联系|contact|支持|support/i');
    
    if (await contactLinks.count() > 0) {
      console.log('找到联系相关链接');
      
      await contactLinks.first().click();
      await helper.waitForPageLoad();
      
      // 查找联系表单
      const contactForm = page.locator('form').first();
      if (await contactForm.count() > 0) {
        console.log('找到联系表单，开始填写测试');
        
        // 姓名字段
        const nameInput = page.locator('input[name*="name"], input[placeholder*="姓名"], input[placeholder*="name"]');
        if (await nameInput.count() > 0) {
          await nameInput.first().fill('测试用户');
        }
        
        // 邮箱字段
        const emailInput = page.locator('input[type="email"], input[name*="email"]');
        if (await emailInput.count() > 0) {
          await emailInput.first().fill('test@example.com');
        }
        
        // 消息字段
        const messageInput = page.locator('textarea, input[name*="message"], input[placeholder*="消息"]');
        if (await messageInput.count() > 0) {
          await messageInput.first().fill('这是一个自动化测试消息');
        }
        
        await helper.takeScreenshot('contact-form-filled');
        console.log('联系表单填写测试完成（未提交）');
      }
    }
  });

  test('视频生成表单测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找视频生成相关按钮
    const generateButtons = page.locator('text=/生成|generate|创建|create|开始/i');
    
    if (await generateButtons.count() > 0) {
      console.log('找到生成相关按钮');
      
      await generateButtons.first().click();
      await helper.waitForPageLoad();
      
      // 查找文本输入区域
      const textInput = page.locator('textarea, input[type="text"], [contenteditable="true"]');
      if (await textInput.count() > 0) {
        await textInput.first().fill('一只可爱的小猫在花园里玩耍');
        console.log('填写视频描述文本');
      }
      
      // 查找参数设置
      const parameterSelects = page.locator('select, .select-trigger');
      if (await parameterSelects.count() > 0) {
        console.log(`找到 ${await parameterSelects.count()} 个参数选择器`);
        
        // 尝试点击第一个选择器
        await parameterSelects.first().click();
        await page.waitForTimeout(1000);
        
        // 查找选项并选择
        const options = page.locator('[role="option"], option');
        if (await options.count() > 0) {
          await options.first().click();
          console.log('选择了第一个参数选项');
        }
      }
      
      // 查找上传按钮
      const uploadInput = page.locator('input[type="file"]');
      if (await uploadInput.count() > 0) {
        console.log('找到文件上传功能');
        // 注意：实际测试中可能需要准备测试文件
      }
      
      await helper.takeScreenshot('generation-form-filled');
      console.log('视频生成表单测试完成（未提交）');
    }
  });

  test('搜索和筛选功能测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找搜索框
    const searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], .search input');
    
    if (await searchInput.count() > 0) {
      console.log('测试搜索功能');
      
      await searchInput.first().fill('AI视频');
      await page.keyboard.press('Enter');
      await helper.waitForPageLoad();
      
      // 查找筛选器
      const filters = page.locator('select, .filter, .checkbox, input[type="checkbox"]');
      console.log(`找到 ${await filters.count()} 个筛选器`);
      
      if (await filters.count() > 0) {
        // 尝试使用第一个筛选器
        await filters.first().click();
        await page.waitForTimeout(1000);
      }
      
      await helper.takeScreenshot('search-and-filter');
    }
  });

  test('下拉菜单和选择器测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找所有下拉菜单
    const dropdowns = page.locator('select, .dropdown, .select-trigger, [role="combobox"]');
    const dropdownCount = await dropdowns.count();
    console.log(`找到 ${dropdownCount} 个下拉菜单`);

    for (let i = 0; i < Math.min(dropdownCount, 3); i++) {
      try {
        const dropdown = dropdowns.nth(i);
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();
        await page.waitForTimeout(500);
        
        // 查找选项
        const options = page.locator('[role="option"], option, .dropdown-item');
        if (await options.count() > 0) {
          await options.first().click();
          console.log(`测试了第 ${i + 1} 个下拉菜单`);
        }
        
        await page.waitForTimeout(500);
      } catch (error) {
        console.log(`下拉菜单 ${i + 1} 测试失败:`, error);
      }
    }
  });

  test('按钮交互测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找所有按钮
    const buttons = page.locator('button, .btn, [role="button"]');
    const buttonCount = await buttons.count();
    console.log(`找到 ${buttonCount} 个按钮`);

    // 测试前5个按钮
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      try {
        const button = buttons.nth(i);
        const buttonText = await button.textContent();
        
        // 跳过可能导致页面跳转的危险按钮
        if (buttonText && /提交|submit|删除|delete|支付|pay/i.test(buttonText)) {
          console.log(`跳过危险按钮: ${buttonText.trim()}`);
          continue;
        }
        
        await button.scrollIntoViewIfNeeded();
        
        // 检查按钮状态
        const isDisabled = await button.isDisabled();
        const isVisible = await button.isVisible();
        
        console.log(`按钮 ${i + 1}: "${buttonText?.trim()}" - 可见: ${isVisible}, 禁用: ${isDisabled}`);
        
        if (isVisible && !isDisabled) {
          await button.hover();
          await page.waitForTimeout(200);
          
          // 某些按钮可能只需要hover效果
          console.log(`成功hover按钮: ${buttonText?.trim()}`);
        }
        
      } catch (error) {
        console.log(`按钮 ${i + 1} 测试失败:`, error);
      }
    }
  });

  test('模态框和弹窗测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找可能触发模态框的按钮
    const modalTriggers = page.locator('button, a').filter({ hasText: /详情|more|info|关于|about/i });
    
    if (await modalTriggers.count() > 0) {
      console.log('测试模态框功能');
      
      await modalTriggers.first().click();
      await page.waitForTimeout(1000);
      
      // 查找模态框
      const modal = page.locator('.modal, .dialog, [role="dialog"], .popup');
      if (await modal.count() > 0) {
        await expect(modal.first()).toBeVisible();
        console.log('模态框成功显示');
        
        await helper.takeScreenshot('modal-open');
        
        // 查找关闭按钮
        const closeButton = page.locator('.close, [aria-label*="close"], .modal-close, button').filter({ hasText: /×|关闭|close/i });
        if (await closeButton.count() > 0) {
          await closeButton.first().click();
          await page.waitForTimeout(500);
          console.log('模态框关闭测试完成');
        }
      }
    }
  });
});

