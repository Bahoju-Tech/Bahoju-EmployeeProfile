import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employee Profile',
  description: 'View employee profile information',
};

export default function EmployeeProfilePage() {
  return (
    <div>
      <h1>Employee Profile</h1>
      <p>Loading...</p>
    </div>
  );
}
