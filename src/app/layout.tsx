import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MojiVibe - 五十音图学习',
  description: 'AI 驱动的日语学习助手',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): any {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}