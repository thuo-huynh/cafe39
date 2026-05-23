import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Cafe bà Chín · Danang',
  description: 'A Vietnamese coffee shop in Danang — phin brew, real fruit smoothies, warm welcome. Since 2006.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
