import { test, expect } from '@playwright/test';
import { CrepalTestHelper } from '../utils/test-helpers';

test.describe('Crepal.ai 性能和优化测试', () => {
  let helper: CrepalTestHelper;

  test.beforeEach(async ({ page }) => {
    helper = new CrepalTestHelper(page);
  });

  test('页面加载性能测试', async ({ page }) => {
    console.log('=== 页面加载性能测试 ===');
    
    // 开始性能监控
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // 获取性能指标
    const metrics = await helper.checkPerformance();
    console.log('详细性能指标:', metrics);
    
    // 性能断言
    expect(metrics.totalTime).toBeLessThan(10000); // 总加载时间小于10秒
    expect(metrics.domContentLoaded).toBeLessThan(5000); // DOM加载时间小于5秒
    expect(metrics.responseTime).toBeLessThan(3000); // 响应时间小于3秒
    
    // 获取更多性能信息
    const performanceEntries = await page.evaluate(() => {
      const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        dns: entries.domainLookupEnd - entries.domainLookupStart,
        tcp: entries.connectEnd - entries.connectStart,
        ssl: entries.connectEnd - entries.secureConnectionStart,
        ttfb: entries.responseStart - entries.requestStart,
        download: entries.responseEnd - entries.responseStart,
        domProcessing: entries.domContentLoadedEventStart - entries.responseEnd,
        resourceLoad: entries.loadEventStart - entries.domContentLoadedEventEnd
      };
    });
    
    console.log('网络性能分解:');
    console.log(`DNS查询: ${performanceEntries.dns}ms`);
    console.log(`TCP连接: ${performanceEntries.tcp}ms`);
    console.log(`SSL握手: ${performanceEntries.ssl}ms`);
    console.log(`首字节时间: ${performanceEntries.ttfb}ms`);
    console.log(`下载时间: ${performanceEntries.download}ms`);
    console.log(`DOM处理: ${performanceEntries.domProcessing}ms`);
    console.log(`资源加载: ${performanceEntries.resourceLoad}ms`);
  });

  test('资源加载性能测试', async ({ page }) => {
    console.log('=== 资源加载性能测试 ===');
    
    // 监控网络请求
    const requests: any[] = [];
    const responses: any[] = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: Date.now()
      });
    });
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        size: response.headers()['content-length'],
        timestamp: Date.now()
      });
    });
    
    await page.goto('/');
    await helper.waitForPageLoad();
    
    console.log(`总请求数: ${requests.length}`);
    console.log(`总响应数: ${responses.length}`);
    
    // 分析资源类型
    const resourceTypes = requests.reduce((acc: any, req) => {
      acc[req.resourceType] = (acc[req.resourceType] || 0) + 1;
      return acc;
    }, {});
    
    console.log('资源类型分布:', resourceTypes);
    
    // 检查失败的请求
    const failedRequests = responses.filter(res => res.status >= 400);
    console.log(`失败请求数: ${failedRequests.length}`);
    
    if (failedRequests.length > 0) {
      console.log('失败的请求:', failedRequests.slice(0, 5));
    }
    
    // 检查大型资源
    const largeResources = responses
      .filter(res => res.size && parseInt(res.size) > 1024 * 1024) // 大于1MB
      .sort((a, b) => parseInt(b.size) - parseInt(a.size));
    
    if (largeResources.length > 0) {
      console.log('大型资源 (>1MB):', largeResources.slice(0, 3));
    }
  });

  test('Core Web Vitals测试', async ({ page }) => {
    console.log('=== Core Web Vitals测试 ===');
    
    await page.goto('/');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // 获取Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay) - 模拟
        vitals.fid = 0; // 在自动化测试中难以准确测量
        
        // CLS (Cumulative Layout Shift)
        new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value;
            }
          }
          vitals.cls = cls;
        }).observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => resolve(vitals), 2000);
      });
    });
    
    console.log('Core Web Vitals:', vitals);
    
    // 断言Core Web Vitals指标
    if ((vitals as any).lcp) {
      expect((vitals as any).lcp).toBeLessThan(2500); // LCP应小于2.5秒
      console.log(`✓ LCP: ${(vitals as any).lcp}ms (目标: <2500ms)`);
    }
    
    if ((vitals as any).cls !== undefined) {
      expect((vitals as any).cls).toBeLessThan(0.1); // CLS应小于0.1
      console.log(`✓ CLS: ${(vitals as any).cls} (目标: <0.1)`);
    }
  });

  test('内存使用测试', async ({ page }) => {
    console.log('=== 内存使用测试 ===');
    
    await page.goto('/');
    await helper.waitForPageLoad();
    
    // 获取初始内存使用
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null;
    });
    
    if (initialMemory) {
      console.log('初始内存使用:', initialMemory);
      
      // 模拟用户交互
      await helper.simulateUserInteraction();
      
      // 触发一些交互
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        try {
          await buttons.nth(i).click();
          await page.waitForTimeout(500);
        } catch (error) {
          // 忽略点击错误
        }
      }
      
      // 获取交互后的内存使用
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        } : null;
      });
      
      if (finalMemory) {
        console.log('交互后内存使用:', finalMemory);
        
        const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
        console.log(`内存增长: ${memoryIncrease} bytes`);
        
        // 检查是否有内存泄漏（简单检查）
        const memoryIncreasePercent = (memoryIncrease / initialMemory.usedJSHeapSize) * 100;
        console.log(`内存增长百分比: ${memoryIncreasePercent.toFixed(2)}%`);
        
        expect(memoryIncreasePercent).toBeLessThan(200); // 内存增长不应超过200%
      }
    } else {
      console.log('浏览器不支持内存API');
    }
  });

  test('网络连接性能测试', async ({ page }) => {
    console.log('=== 网络连接性能测试 ===');
    
    // 模拟慢速网络
    await page.route('**/*', async route => {
      // 添加延迟模拟慢速网络
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await helper.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    
    console.log(`慢速网络下加载时间: ${loadTime}ms`);
    
    // 在慢速网络下，页面应该仍然可以在合理时间内加载
    expect(loadTime).toBeLessThan(15000); // 15秒内加载完成
  });

  test('缓存策略测试', async ({ page }) => {
    console.log('=== 缓存策略测试 ===');
    
    const cachedResources: string[] = [];
    const nonCachedResources: string[] = [];
    
    page.on('response', response => {
      const cacheControl = response.headers()['cache-control'];
      const expires = response.headers()['expires'];
      const etag = response.headers()['etag'];
      
      if (cacheControl || expires || etag) {
        cachedResources.push(response.url());
      } else {
        nonCachedResources.push(response.url());
      }
    });
    
    await page.goto('/');
    await helper.waitForPageLoad();
    
    console.log(`可缓存资源数: ${cachedResources.length}`);
    console.log(`不可缓存资源数: ${nonCachedResources.length}`);
    
    if (cachedResources.length > 0) {
      console.log('可缓存资源示例:', cachedResources.slice(0, 3));
    }
    
    if (nonCachedResources.length > 0) {
      console.log('不可缓存资源示例:', nonCachedResources.slice(0, 3));
    }
    
    // 第二次访问测试缓存效果
    console.log('测试缓存效果 - 第二次访问');
    const secondVisitStart = Date.now();
    await page.reload();
    await helper.waitForPageLoad();
    const secondVisitTime = Date.now() - secondVisitStart;
    
    console.log(`第二次访问加载时间: ${secondVisitTime}ms`);
    
    // 第二次访问应该更快（由于缓存）
    // expect(secondVisitTime).toBeLessThan(firstVisitTime * 0.8); // 应该快至少20%
  });

  test('JavaScript性能测试', async ({ page }) => {
    console.log('=== JavaScript性能测试 ===');
    
    await page.goto('/');
    await helper.waitForPageLoad();
    
    // 检查JavaScript错误
    const jsErrors: string[] = [];
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });
    
    // 执行一些交互触发JavaScript
    await helper.simulateUserInteraction();
    
    // 等待一段时间收集错误
    await page.waitForTimeout(3000);
    
    console.log(`JavaScript错误数量: ${jsErrors.length}`);
    if (jsErrors.length > 0) {
      console.log('JavaScript错误:', jsErrors.slice(0, 3));
    }
    
    // 检查长任务
    const longTasks = await page.evaluate(() => {
      return new Promise((resolve) => {
        const tasks: any[] = [];
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            tasks.push({
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        }).observe({ entryTypes: ['longtask'] });
        
        setTimeout(() => resolve(tasks), 2000);
      });
    });
    
    console.log(`长任务数量: ${(longTasks as any[]).length}`);
    if ((longTasks as any[]).length > 0) {
      console.log('长任务详情:', (longTasks as any[]).slice(0, 3));
    }
    
    // JavaScript错误不应该太多
    expect(jsErrors.length).toBeLessThan(5);
  });
});

