'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
        <div className="text-blue-500 text-6xl mb-4">�</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Employee Profile Portal</h1>
        <p className="text-slate-600 mb-6">
          This portal is for viewing individual employee profiles. 
          Please scan the employee's QR code or use their direct profile URL to access their information.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Example URL:</strong>
          </p>
          <code className="text-xs bg-gray-200 px-2 py-1 rounded">
            http://localhost:3000/john-doe
          </code>
        </div>
        <p className="text-sm text-gray-500">
          Contact your administrator if you need assistance accessing an employee profile.
        </p>
      </div>
    </div>
  );
}
