'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EmployeeProfile from '@/component/EmployeeProfile';
import { EmployeeData } from '@/component/EmployeeProfile';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function EmployeeProfilePage() {
  const params = useParams();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const employeeName = params.employeeName as string;
        const response = await fetch(`/api/employees/${employeeName}`);
        const result = await response.json();

        if (result.success) {
          setEmployee(result.data);
        } else {
          setError(result.error || 'Employee profile not found');
        }
      } catch (err) {
        setError('Error loading employee profile');
      } finally {
        setLoading(false);
      }
    };

    if (params.employeeName) {
      loadEmployeeData();
    }
  }, [params.employeeName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return <EmployeeProfile employee={employee} />;
}
