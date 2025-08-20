/**
 * Crepal.ai 全站测试执行脚本
 * 这个脚本提供了一个统一的入口来执行所有测试套件
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

interface TestSuite {
  name: string;
  description: string;
  command: string;
  essential: boolean; // 是否为核心测试
}

const testSuites: TestSuite[] = [
  {
    name: '首页测试',
    description: '测试网站首页的基本功能和加载',
    command: 'npx playwright test tests/pages/homepage.spec.ts',
    essential: true
  },
  {
    name: '导航测试',
    description: '测试网站导航和页面跳转功能',
    command: 'npx playwright test tests/pages/navigation.spec.ts',
    essential: true
  },
  {
    name: '表单交互测试',
    description: '测试表单填写和用户交互功能',
    command: 'npx playwright test tests/functionality/forms.spec.ts',
    essential: true
  },
  {
    name: '视频生成功能测试',
    description: '深度测试视频生成相关功能',
    command: 'npx playwright test tests/functionality/video-generation.spec.ts',
    essential: true
  },
  {
    name: '可访问性测试',
    description: '测试网站的可访问性和用户体验',
    command: 'npx playwright test tests/accessibility/a11y.spec.ts',
    essential: false
  },
  {
    name: '性能测试',
    description: '测试网站性能和加载速度',
    command: 'npx playwright test tests/performance/performance.spec.ts',
    essential: false
  }
];

async function runTests() {
  console.log('🚀 开始执行 Crepal.ai 全站自动化测试');
  console.log('=' .repeat(60));

  // 确保测试结果目录存在
  if (!existsSync('test-results')) {
    mkdirSync('test-results', { recursive: true });
  }

  if (!existsSync('test-results/screenshots')) {
    mkdirSync('test-results/screenshots', { recursive: true });
  }

  const results: { suite: string; status: 'success' | 'failed'; error?: string }[] = [];

  // 运行核心测试套件
  console.log('\n📋 执行核心测试套件...\n');
  
  for (const suite of testSuites.filter(s => s.essential)) {
    console.log(`🧪 正在执行: ${suite.name}`);
    console.log(`📝 描述: ${suite.description}`);
    console.log(`⚡ 命令: ${suite.command}`);
    
    try {
      execSync(suite.command, { 
        stdio: 'inherit',
        timeout: 300000 // 5分钟超时
      });
      
      results.push({ suite: suite.name, status: 'success' });
      console.log(`✅ ${suite.name} - 测试通过\n`);
      
    } catch (error) {
      results.push({ 
        suite: suite.name, 
        status: 'failed', 
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`❌ ${suite.name} - 测试失败\n`);
      console.log(`错误信息: ${error}\n`);
    }
  }

  // 运行扩展测试套件
  console.log('\n📋 执行扩展测试套件...\n');
  
  for (const suite of testSuites.filter(s => !s.essential)) {
    console.log(`🧪 正在执行: ${suite.name}`);
    console.log(`📝 描述: ${suite.description}`);
    console.log(`⚡ 命令: ${suite.command}`);
    
    try {
      execSync(suite.command, { 
        stdio: 'inherit',
        timeout: 300000 // 5分钟超时
      });
      
      results.push({ suite: suite.name, status: 'success' });
      console.log(`✅ ${suite.name} - 测试通过\n`);
      
    } catch (error) {
      results.push({ 
        suite: suite.name, 
        status: 'failed', 
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`⚠️  ${suite.name} - 测试失败（非核心测试）\n`);
      console.log(`错误信息: ${error}\n`);
    }
  }

  // 生成测试报告
  console.log('\n📊 测试结果汇总');
  console.log('=' .repeat(60));
  
  const successCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  const coreFailedCount = results.filter(r => 
    r.status === 'failed' && 
    testSuites.find(s => s.name === r.suite)?.essential
  ).length;

  console.log(`总测试套件数: ${results.length}`);
  console.log(`✅ 通过: ${successCount}`);
  console.log(`❌ 失败: ${failedCount}`);
  console.log(`🔥 核心测试失败: ${coreFailedCount}`);

  console.log('\n📋 详细结果:');
  results.forEach(result => {
    const suite = testSuites.find(s => s.name === result.suite);
    const icon = result.status === 'success' ? '✅' : (suite?.essential ? '❌' : '⚠️');
    const type = suite?.essential ? '[核心]' : '[扩展]';
    console.log(`${icon} ${type} ${result.suite}: ${result.status.toUpperCase()}`);
    
    if (result.error) {
      console.log(`    错误: ${result.error.substring(0, 100)}...`);
    }
  });

  // 生成HTML测试报告
  try {
    console.log('\n📄 生成HTML测试报告...');
    execSync('npx playwright show-report', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  HTML报告生成失败，但测试已完成');
  }

  console.log('\n🎉 测试执行完成！');
  console.log('📁 测试结果保存在 test-results/ 目录');
  console.log('📸 测试截图保存在 test-results/screenshots/ 目录');
  
  if (coreFailedCount > 0) {
    console.log('\n⚠️  警告: 有核心测试失败，请检查网站功能');
    process.exit(1);
  } else {
    console.log('\n🎊 所有核心测试通过！网站功能正常');
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runTests().catch(error => {
    console.error('❌ 测试执行过程中发生错误:', error);
    process.exit(1);
  });
}

export { runTests, testSuites };

