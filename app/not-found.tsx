import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
        <div className="text-red-500 text-6xl mb-4">😞</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Employee Not Found</h1>
        <p className="text-slate-600 mb-6">
          The employee profile you're looking for doesn't exist or the URL is incorrect.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Try:</strong>
          </p>
          <ul className="text-xs text-gray-600 text-left space-y-1">
            <li>• Check the employee ID or name in the URL</li>
            <li>• Scan the employee's QR code again</li>
            <li>• Contact your administrator for the correct URL</li>
          </ul>
        </div>
        <p className="text-sm text-gray-500">
          Example: <code className="bg-gray-200 px-2 py-1 rounded">your-site.com/employee-name</code>
        </p>
      </div>
    </div>
  );
}
