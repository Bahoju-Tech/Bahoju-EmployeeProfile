import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employee Profile Portal',
  description: 'Portal for viewing individual employee profiles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
