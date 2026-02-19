import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Employee Profile Portal',
  description: 'Welcome to the Employee Profile Portal',
};

export default function Home() {
  return (
    <div>
      <h1>Employee Profile Portal</h1>
      <p>This portal is for viewing individual employee profiles.</p>
    </div>
  );
}
