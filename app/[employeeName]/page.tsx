import type { Metadata } from 'next';
import EmployeeProfile from '@/component/EmployeeProfile';
import { EmployeeData } from '@/component/EmployeeProfile';

interface PageProps {
  params: Promise<{ employeeName: string }>;
}

export const metadata: Metadata = {
  title: 'Employee Profile',
  description: 'View employee profile information',
};

async function getEmployeeData(employeeName: string): Promise<EmployeeData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/employees/${employeeName}`;
    
    console.log('=== FRONTEND DEBUG ===');
    console.log('Fetching from URL:', apiUrl);
    console.log('Employee name:', employeeName);
    console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      console.log('Response not OK, returning null');
      return null;
    }

    const result = await response.json();
    console.log('API Response:', result);
    console.log('Success:', result.success);
    console.log('Data exists:', !!result.data);
    
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return null;
  }
}

export default async function EmployeeProfilePage({ params }: PageProps) {
  const { employeeName } = await params;
  const employee = await getEmployeeData(employeeName);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
          <p className="text-gray-600 mb-6">
            The employee profile you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#2158D0] hover:bg-[#1a47a8] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <EmployeeProfile employee={employee} />;
}
