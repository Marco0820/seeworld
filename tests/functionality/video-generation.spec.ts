import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 视频生成功能深度测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
  });

  test('视频生成工作流程完整测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 1. 查找并点击主要的视频生成入口
    const generateButtons = page.locator('text=/开始生成|立即生成|生成视频|create video|generate/i');
    
    if (await generateButtons.count() > 0) {
      console.log('找到视频生成入口按钮');
      await generateButtons.first().click();
      await helper.waitForPageLoad();
      
      // 2. 测试文本输入功能
      await testTextInput(page);
      
      // 3. 测试模型选择功能
      await testModelSelection(page);
      
      // 4. 测试参数设置功能
      await testParameterSettings(page);
      
      // 5. 测试预览功能
      await testPreviewFunction(page);
      
      await helper.takeScreenshot('video-generation-workflow');
    } else {
      console.log('未找到明显的视频生成入口，尝试其他方式');
      await exploreVideoGenerationFeatures(page);
    }
  });

  test('视频生成历史记录测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找历史记录相关链接
    const historyLinks = page.locator('text=/历史|history|我的作品|my works|项目|projects/i');
    
    if (await historyLinks.count() > 0) {
      console.log('找到历史记录入口');
      await historyLinks.first().click();
      await helper.waitForPageLoad();
      
      // 查找视频列表
      const videoItems = page.locator('.video-item, .project-item, .history-item');
      console.log(`找到 ${await videoItems.count()} 个历史项目`);
      
      if (await videoItems.count() > 0) {
        // 测试第一个项目的操作
        const firstItem = videoItems.first();
        await firstItem.hover();
        
        // 查找操作按钮
        const actionButtons = firstItem.locator('button, .action');
        console.log(`项目操作按钮数量: ${await actionButtons.count()}`);
        
        await helper.takeScreenshot('video-history');
      }
    }
  });

  test('视频生成配额和限制测试', async ({ page }) => {
    await page.goto('/');
    await helper.waitForPageLoad();

    // 查找配额显示
    const quotaElements = page.locator('text=/配额|quota|剩余|remaining|次数|credits/i');
    
    if (await quotaElements.count() > 0) {
      console.log('找到配额信息');
      const quotaText = await quotaElements.first().textContent();
      console.log(`配额信息: ${quotaText?.trim()}`);
      
      // 查找升级或购买按钮
      const upgradeButtons = page.locator('text=/升级|upgrade|购买|buy|充值|recharge/i');
      if (await upgradeButtons.count() > 0) {
        console.log('找到升级/购买选项');
        const upgradeText = await upgradeButtons.first().textContent();
        console.log(`升级选项: ${upgradeText?.trim()}`);
      }
    }
  });
});

// 辅助函数
async function testTextInput(page: any) {
  console.log('=== 测试文本输入功能 ===');
  
  // 查找文本输入区域
  const textInputs = page.locator('textarea, input[type="text"], [contenteditable="true"]');
  
  if (await textInputs.count() > 0) {
    const mainTextInput = textInputs.first();
    
    // 测试不同类型的提示词
    const testPrompts = [
      '一只可爱的橘猫在阳光明媚的花园里追逐蝴蝶',
      'A beautiful sunset over the ocean with waves gently crashing on the beach',
      '科技感十足的未来城市，霓虹灯闪烁，飞行汽车穿梭其中'
    ];
    
    for (const prompt of testPrompts) {
      await mainTextInput.fill('');
      await mainTextInput.fill(prompt);
      await page.waitForTimeout(1000);
      
      // 检查字符计数器
      const charCounter = page.locator('text=/\\d+\\/\\d+|字符|characters/i');
      if (await charCounter.count() > 0) {
        const counterText = await charCounter.first().textContent();
        console.log(`字符计数器显示: ${counterText}`);
      }
      
      console.log(`测试提示词: ${prompt.substring(0, 30)}...`);
    }
    
    // 测试提示词建议功能
    const suggestions = page.locator('.suggestion, .prompt-suggestion, .example');
    if (await suggestions.count() > 0) {
      console.log(`找到 ${await suggestions.count()} 个提示词建议`);
      await suggestions.first().click();
      await page.waitForTimeout(500);
    }
  }
}

async function testModelSelection(page: any) {
  console.log('=== 测试模型选择功能 ===');
  
  // 查找模型选择器
  const modelSelectors = page.locator('select, .model-select, .select-trigger').filter({ hasText: /模型|model/i });
  
  if (await modelSelectors.count() > 0) {
    console.log('找到模型选择器');
    
    await modelSelectors.first().click();
    await page.waitForTimeout(1000);
    
    // 查找可用模型选项
    const modelOptions = page.locator('[role="option"], option, .model-option');
    const optionCount = await modelOptions.count();
    console.log(`找到 ${optionCount} 个模型选项`);
    
    if (optionCount > 0) {
      // 测试选择不同模型
      for (let i = 0; i < Math.min(optionCount, 3); i++) {
        const option = modelOptions.nth(i);
        const optionText = await option.textContent();
        console.log(`测试模型: ${optionText?.trim()}`);
        
        await option.click();
        await page.waitForTimeout(1000);
        
        // 重新打开选择器继续测试下一个
        if (i < Math.min(optionCount, 3) - 1) {
          await modelSelectors.first().click();
          await page.waitForTimeout(500);
        }
      }
    }
  }
  
  // 查找模型信息展示
  const modelInfo = page.locator('.model-info, .model-description, .info');
  if (await modelInfo.count() > 0) {
    const infoText = await modelInfo.first().textContent();
    console.log(`模型信息: ${infoText?.substring(0, 100)}...`);
  }
}

async function testParameterSettings(page: any) {
  console.log('=== 测试参数设置功能 ===');
  
  // 测试视频尺寸设置
  const sizeSelectors = page.locator('select, .select-trigger').filter({ hasText: /尺寸|size|分辨率|resolution/i });
  if (await sizeSelectors.count() > 0) {
    console.log('找到尺寸设置');
    await sizeSelectors.first().click();
    await page.waitForTimeout(500);
    
    const sizeOptions = page.locator('[role="option"], option').filter({ hasText: /\d+x\d+|16:9|4:3|1:1/i });
    if (await sizeOptions.count() > 0) {
      await sizeOptions.first().click();
      console.log('设置视频尺寸');
    }
  }
  
  // 测试时长设置
  const durationControls = page.locator('input[type="range"], .slider, .duration-control');
  if (await durationControls.count() > 0) {
    console.log('找到时长控制');
    const durationSlider = durationControls.first();
    
    // 测试拖拽滑块
    const sliderBox = await durationSlider.boundingBox();
    if (sliderBox) {
      await page.mouse.click(sliderBox.x + sliderBox.width * 0.7, sliderBox.y + sliderBox.height / 2);
      console.log('调整视频时长');
    }
  }
  
  // 测试风格设置
  const styleOptions = page.locator('.style-option, .preset, input[type="radio"]');
  if (await styleOptions.count() > 0) {
    console.log(`找到 ${await styleOptions.count()} 个风格选项`);
    await styleOptions.first().click();
    console.log('选择视频风格');
  }
  
  // 测试高级参数
  const advancedToggle = page.locator('text=/高级|advanced|更多选项|more options/i');
  if (await advancedToggle.count() > 0) {
    await advancedToggle.first().click();
    await page.waitForTimeout(1000);
    console.log('展开高级参数设置');
  }
}

async function testPreviewFunction(page: any) {
  console.log('=== 测试预览功能 ===');
  
  // 查找预览按钮
  const previewButtons = page.locator('text=/预览|preview|查看效果/i');
  
  if (await previewButtons.count() > 0) {
    await previewButtons.first().click();
    await page.waitForTimeout(2000);
    
    // 查找预览区域
    const previewArea = page.locator('.preview, .video-preview, video, canvas');
    if (await previewArea.count() > 0) {
      await expect(previewArea.first()).toBeVisible();
      console.log('预览功能正常');
      
      // 测试预览控制按钮
      const playButton = page.locator('button').filter({ hasText: /播放|play|▶/i });
      if (await playButton.count() > 0) {
        await playButton.first().click();
        console.log('测试播放控制');
      }
    }
  }
}

async function exploreVideoGenerationFeatures(page: any) {
  console.log('=== 探索视频生成相关功能 ===');
  
  // 查找可能的视频生成相关页面
  const videoLinks = page.locator('a').filter({ hasText: /视频|video|AI|生成|create|工具|tool/i });
  
  if (await videoLinks.count() > 0) {
    console.log(`找到 ${await videoLinks.count()} 个可能相关的链接`);
    
    const firstLink = videoLinks.first();
    const linkText = await firstLink.textContent();
    console.log(`点击链接: ${linkText?.trim()}`);
    
    await firstLink.click();
    await page.waitForTimeout(3000);
    
    // 在新页面中查找生成功能
    const generateElements = page.locator('button, .generate, .create').filter({ hasText: /生成|generate|创建|create/i });
    if (await generateElements.count() > 0) {
      console.log('在新页面找到生成功能');
      await testBasicGenerationFlow(page);
    }
  }
}

async function testBasicGenerationFlow(page: any) {
  console.log('=== 测试基础生成流程 ===');
  
  // 查找主要输入元素
  const inputs = page.locator('textarea, input[type="text"], [contenteditable="true"]');
  if (await inputs.count() > 0) {
    await inputs.first().fill('测试视频生成：一个简单的动画场景');
    console.log('填写生成描述');
  }
  
  // 查找生成按钮（但不实际点击）
  const generateBtn = page.locator('button').filter({ hasText: /生成|generate|开始|start/i });
  if (await generateBtn.count() > 0) {
    const btnText = await generateBtn.first().textContent();
    console.log(`找到生成按钮: ${btnText?.trim()}（未点击以避免实际生成）`);
    
    // 检查按钮状态
    const isEnabled = await generateBtn.first().isEnabled();
    console.log(`生成按钮状态: ${isEnabled ? '可用' : '不可用'}`);
  }
}