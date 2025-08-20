"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  CheckCircle, 
  AlertCircle,
  Star,
  User,
  Mail,
  MessageSquare,
  Tag
} from 'lucide-react';

interface FeedbackData {
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  rating: number;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    type: 'general',
    subject: '',
    message: '',
    rating: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const feedbackTypes = [
    { id: 'bug', name: '问题报告', color: 'bg-red-100 text-red-800', icon: '🐛' },
    { id: 'feature', name: '功能建议', color: 'bg-blue-100 text-blue-800', icon: '💡' },
    { id: 'improvement', name: '改进建议', color: 'bg-green-100 text-green-800', icon: '⚡' },
    { id: 'general', name: '一般反馈', color: 'bg-gray-100 text-gray-800', icon: '💬' },
    { id: 'praise', name: '表扬建议', color: 'bg-purple-100 text-purple-800', icon: '👏' }
  ];

  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!formData.name.trim()) {
      setError('请输入您的姓名');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('请输入您的邮箱地址');
      return;
    }
    
    if (!formData.message.trim()) {
      setError('请输入反馈内容');
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('请输入有效的邮箱地址');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 这里应该调用实际的API
      console.log('Feedback submitted:', formData);
      
      setIsSubmitted(true);
    } catch (err) {
      setError('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      type: 'general',
      subject: '',
      message: '',
      rating: 5
    });
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">反馈提交成功！</h3>
          <p className="text-gray-600">
            感谢您的宝贵意见！我们已收到您的反馈，将在1-3个工作日内回复您。
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">反馈编号: #{Date.now().toString().slice(-6)}</p>
            <p>您可以通过此编号跟踪反馈处理进度</p>
          </div>
        </div>
        
        <Button onClick={resetForm} variant="outline" className="mr-3">
          提交新反馈
        </Button>
        <Button onClick={() => window.location.href = '/'} className="bg-blue-600 hover:bg-blue-700 text-white">
          返回首页
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 错误提示 */}
      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* 基本信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            姓名 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="请输入您的姓名"
            className="border-gray-300 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            邮箱 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="请输入您的邮箱地址"
            className="border-gray-300 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* 反馈类型 */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-medium flex items-center gap-2">
          <Tag className="w-4 h-4" />
          反馈类型
        </Label>
        <div className="flex flex-wrap gap-3">
          {feedbackTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('type', type.id)}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg border transition-all ${
                formData.type === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* 满意度评分 */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-medium">总体满意度</Label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleInputChange('rating', star)}
              disabled={isSubmitting}
              className={`w-8 h-8 transition-colors ${
                star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400`}
            >
              <Star className="w-full h-full fill-current" />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {formData.rating === 5 ? '非常满意' :
             formData.rating === 4 ? '满意' :
             formData.rating === 3 ? '一般' :
             formData.rating === 2 ? '不满意' : '非常不满意'}
          </span>
        </div>
      </div>

      {/* 主题 */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-gray-700 font-medium">
          反馈主题
        </Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder="简要描述您的反馈主题"
          className="border-gray-300 focus:border-blue-500"
          disabled={isSubmitting}
        />
      </div>

      {/* 详细内容 */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          详细内容 <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="请详细描述您的反馈内容、遇到的问题或改进建议..."
          className="min-h-32 border-gray-300 focus:border-blue-500 resize-none"
          disabled={isSubmitting}
        />
        <div className="text-right text-sm text-gray-500">
          {formData.message.length} / 1000
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              提交中...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              提交反馈
            </>
          )}
        </Button>
      </div>

      {/* 提示信息 */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium text-gray-800 mb-2">提交前请确认：</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>所有必填信息已完整填写</li>
          <li>邮箱地址正确，以便我们及时回复</li>
          <li>反馈内容描述清晰具体</li>
          <li>如果是问题报告，请尽量包含复现步骤</li>
        </ul>
      </div>
    </form>
  );
}
