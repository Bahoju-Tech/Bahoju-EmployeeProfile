import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

export interface SocialLink {
  platform: string;
  url: string;
  color: string;
}

export interface EmployeeData {
  _id?: string;
  name: string;
  title: string;
  employeeId: string;
  profileImage: string;
  email: string;
  phone: string;
  officeLocation: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  socials: SocialLink[];
  profileUrl?: string;
  qrCodeUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeeProfileProps {
  employee: EmployeeData;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 lg:py-4">
      <div className="max-w-md mx-auto bg-white lg:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-4">
        <div className="flex items-center justify-center mb-5 mt-8">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        {/* <h2 className="text-[15px] font-[500] text-[#625D5D] text-start mt-4">Profile</h2> */}
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
          <div className="relative">
            <Image
              src="/Rectangle 48.png"
              alt={employee.name}
              width={500}
              height={200}
              className="w-full object-cover"
            />
            <div className="absolute left-1/5 -bottom-18 transform -translate-x-1/2 z-10">
              <Image
                src={employee.profileImage}
                alt={employee.name}
                width={118}
                height={118}
                className="border-2 border-[#2054C7] rounded-[15px] bg-white"
              />
            </div>
          </div>
          <div className="pt-24 px-4 pb-4">
            <h2 className="text-[22px] font-[500] text-[#000] text-start max-w-6xl">{employee.name}</h2>
            <h2 className="text-[16px] font-[700] text-[#00A859] text-start">{employee.title}</h2>
            <h3 className="text-[14px] font-[500] text-[#00000080]/70 text-start mt-1">Employee ID: {employee.employeeId}</h3>
          </div>
        </div>

        <div className="pt-6 pb-8 flex items-center gap-3">
          <a
            href={`tel:${employee.phone}`}
            className="flex items-center justify-center gap-2 bg-[#2158D0] hover:bg-[#2158D0] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex-1"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Call</span>
          </a>
          <a
            href={`mailto:${employee.email}`}
            className="flex items-center justify-center gap-2 bg-[#2158D0] hover:bg-[#2158D0] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex-1"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
        </div>

        <div className='pb-8'>
          <h2 className="text-[18px] font-[500] text-[#000000] text-start mt-4">Employee's Details</h2>
          <div className='border border-gray-200 rounded-[10px] p-4 mt-3'>
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Email Address</h2>
            <a href={`mailto:${employee.email}`} className="text-[14px] font-[400] text-gray-700 text-start mt-1 hover:underline hover:text-[#2158D0]">{employee.email}</a>
            <hr className="my-3 border-gray-200 border-1" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Phone Number</h2>
            <a href={`tel:${employee.phone}`} className="text-[14px] font-[400] text-gray-700 text-start mt-1 hover:underline hover:text-[#2158D0]">{employee.phone}</a>
            <hr className="my-3 border-gray-200 border-1" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Office Location</h2>
            <p className="text-[14px] font-[400] text-gray-700 text-start mt-1">{employee.officeLocation}</p>
          </div>
        </div>

        <div>
          <h1 className="text-[18px] font-[500] text-[#000000] text-start">Company's Information</h1>
          <div className='border border-gray-200 rounded-[10px] px-4 py-5 mt-3'>
            <Image src="/logo.png" alt="Company Logo" width={120} height={120} />
            <hr className="my-3 border-gray-200 border-1 mt-4" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Email Address</h2>
            <a href={`mailto:${employee.companyEmail}`} className="text-[14px] font-[400] text-gray-700 text-start mt-1 hover:underline hover:text-[#2158D0]">{employee.companyEmail}</a>
            <hr className="my-3 border-gray-200 border-1" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Phone Number</h2>
            <a href={`tel:${employee.companyPhone}`} className="text-[14px] font-[400] text-gray-700 text-start mt-1 hover:underline hover:text-[#2158D0]">{employee.companyPhone}</a>
            <hr className="my-3 border-gray-200 border-1" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Website</h2>
            <a href={employee.companyWebsite} className="text-[14px] font-[400] text-gray-700 text-start mt-1 hover:underline hover:text-[#2158D0]">{employee.companyWebsite}</a>
            <hr className="my-3 border-gray-200 border-1" />
            <h2 className="text-[16px] font-[500] text-[#000000] text-start">Address</h2>
            <p className="text-[14px] font-[400] text-gray-700 text-start mt-1">{employee.companyAddress}</p>
            <hr className="my-3 border-gray-200 border-1 mt-5" />

            <div>
              <h2 className="text-[16px] font-[500] text-[#000000] text-start">Socials</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {employee.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-[8px] text-xs font-semibold text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 bg-[#2158D0]"
                    // style={{ backgroundColor: social.color }}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default EmployeeProfile;