import NavBar from "@/components/NavBar";
import FeedbackForm from "@/components/FeedbackForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "用户反馈",
  description: "向我们提供您的宝贵意见和建议，帮助我们改进产品",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-14 min-h-[calc(100vh-3.5rem)] px-4 mx-auto max-w-3xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">用户反馈</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            您的意见对我们非常重要！请告诉我们您的使用体验、遇到的问题或改进建议。
            我们会认真阅读每一份反馈，并持续优化产品以提供更好的服务。
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <FeedbackForm />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">功能建议</h3>
            <p className="text-sm text-gray-600">
              告诉我们您希望看到的新功能或改进
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">问题报告</h3>
            <p className="text-sm text-gray-600">
              遇到了bug或技术问题？请详细描述
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">用户体验</h3>
            <p className="text-sm text-gray-600">
              分享您的使用感受和体验评价
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">常见问题</h3>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                反馈提交后多久会收到回复？
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4">
                我们通常在1-3个工作日内回复您的反馈。紧急问题会优先处理。
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                如何跟踪我的反馈处理进度？
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4">
                提交反馈后，您会收到一个跟踪编号。您可以通过邮件或登录账户查看处理进度。
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                我的反馈信息会被保密吗？
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4">
                是的，我们严格保护用户隐私。反馈信息仅用于产品改进，不会泄露给第三方。
              </p>
            </details>
          </div>
        </div>
      </main>
    </div>
  );
}
