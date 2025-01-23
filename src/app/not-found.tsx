"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-light text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl mb-6">页面未找到</p>
        <p className="text-gray-300 mb-8">
          抱歉，您访问的页面似乎不存在或已被移除。
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
export const runtime = "edge";
