'use client';

import React, { useState } from 'react';
import { EmployeeData, SocialLink } from './EmployeeProfile';
import Image from 'next/image';
import { Upload, X, Plus, Download, ExternalLink } from 'lucide-react';

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>({
    name: '',
    title: '',
    employeeId: '',
    profileImage: '',
    email: '',
    phone: '',
    officeLocation: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    companyAddress: '',
    socials: []
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: EmployeeData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    const newSocials = [...formData.socials];
    if (!newSocials[index]) {
      newSocials[index] = { platform: '', url: '', color: '#2158D0' };
    }
    newSocials[index] = {
      ...newSocials[index],
      [field]: value
    };
    setFormData((prev: EmployeeData) => ({
      ...prev,
      socials: newSocials
    }));
  };

  const addSocialLink = () => {
    setFormData((prev: EmployeeData) => ({
      ...prev,
      socials: [...prev.socials, { platform: '', url: '', color: '#2158D0' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev: EmployeeData) => ({
      ...prev,
      socials: prev.socials.filter((_: SocialLink, i: number) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setFormData((prev: EmployeeData) => ({
          ...prev,
          profileImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmployeeProfile = async () => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setProfileUrl(result.data.profileUrl);
        setQrCodeUrl(result.data.qrCodeUrl);
        
        setFormData((prev: EmployeeData) => ({
          ...prev,
          employeeId: result.data.employeeId
        }));
        
        setShowResults(true);
      } else {
        console.error('Error creating employee:', result.error);
        alert('Failed to create employee profile: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating employee profile:', error);
      alert('Failed to create employee profile. Please try again.');
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `${formData.name.replace(/\s+/g, '-').toLowerCase()}-qrcode.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateEmployeeProfile();
  };

  const resetForm = () => {
    setShowResults(false);
    setFormData({
      name: '',
      title: '',
      employeeId: '',
      profileImage: '',
      email: '',
      phone: '',
      officeLocation: '',
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyWebsite: '',
      companyAddress: '',
      socials: []
    });
    setQrCodeUrl('');
    setProfileUrl('');
    setUploadedImage('');
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 lg:py-4">
        <div className="max-w-md mx-auto bg-white lg:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-4">
          <div className="flex items-center justify-center mb-5 mt-8">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </div>

          <h2 className="text-[22px] font-[500] text-[#000] text-center mt-4">
            Profile Created Successfully!
          </h2>
          <p className="text-[14px] font-[400] text-[#625D5D] text-center mt-2">
            Your employee profile has been generated
          </p>

          {/* QR Code Section */}
          <div className="mt-8">
            <h2 className="text-[18px] font-[500] text-[#000000] text-start">QR Code</h2>
            <div className="border border-gray-200 rounded-[10px] p-6 mt-3">
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>
              <button
                onClick={downloadQRCode}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#2158D0] hover:bg-[#1a47a8] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download QR Code</span>
              </button>
            </div>
          </div>

          {/* Profile URL Section */}
          <div className="mt-6">
            <h2 className="text-[18px] font-[500] text-[#000000] text-start">Profile Link</h2>
            <div className="border border-gray-200 rounded-[10px] p-4 mt-3">
              <h2 className="text-[16px] font-[500] text-[#000000] text-start">URL</h2>
              <p className="text-[12px] font-[400] text-gray-700 text-start mt-1 break-all font-mono bg-gray-50 p-2 rounded">
                {profileUrl}
              </p>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#00A859] hover:bg-[#008a49] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">View Profile</span>
              </a>
            </div>
          </div>

          {/* Create Another Button */}
          <button
            onClick={resetForm}
            className="w-full mt-8 mb-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Create Another Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 lg:py-4">
      <div className="max-w-md mx-auto bg-white lg:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-4">
        <div className="flex items-center justify-center mb-5 mt-8">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        
        <h2 className="text-[15px] font-[500] text-[#625D5D] text-start mt-4">Create Profile</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Profile Image Upload */}
          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden p-4">
            <h2 className="text-[16px] font-[500] text-[#000000] text-start mb-3">Profile Image</h2>
            <div className="relative">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2158D0] transition-colors"
              >
                {uploadedImage ? (
                  <div className="relative w-24 h-24">
                    <Image
                      src={uploadedImage}
                      alt="Profile preview"
                      width={96}
                      height={96}
                      className="rounded-[15px] object-cover border-2 border-[#2158D0]"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Employee Information */}
          <div className="mt-6">
            <h2 className="text-[18px] font-[500] text-[#000000] text-start">Employee's Information</h2>
            <div className="border border-gray-200 rounded-[10px] p-4 mt-3 space-y-4">
              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="Enter job title"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="+234 000 000 0000"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Office Location *
                </label>
                <input
                  type="text"
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="Enter office location"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="mt-6">
            <h2 className="text-[18px] font-[500] text-[#000000] text-start">Company's Information</h2>
            <div className="border border-gray-200 rounded-[10px] p-4 mt-3 space-y-4">
              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Company Email *
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="company@example.com"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Company Phone *
                </label>
                <input
                  type="tel"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="+234 000 000 0000"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Company Website *
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <hr className="border-gray-200 border-1" />

              <div>
                <label className="text-[16px] font-[500] text-[#000000] text-start block mb-2">
                  Company Address *
                </label>
                <textarea
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent resize-none"
                  placeholder="Enter company address"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 pb-6">
            <h2 className="text-[18px] font-[500] text-[#000000] text-start">Socials</h2>
            <div className="border border-gray-200 rounded-[10px] p-4 mt-3">
              {formData.socials.length > 0 && (
                <div className="space-y-4 mb-4">
                  {formData.socials.map((social: SocialLink, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-[14px] font-[500] text-[#000000]">Social Link {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeSocialLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Platform (e.g., Instagram)"
                          value={social.platform}
                          onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                          className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        />
                        <input
                          type="url"
                          placeholder="URL (e.g., https://instagram.com/username)"
                          value={social.url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                          className="w-full text-[14px] font-[400] text-gray-700 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addSocialLink}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Social Link</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mb-4 bg-[#2158D0] hover:bg-[#1a47a8] text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Create Employee Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;