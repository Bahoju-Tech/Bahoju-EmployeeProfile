import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  color: { type: String, required: true, default: '#3B82F6' }
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  profileImage: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  officeLocation: { type: String, required: true },
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  companyAddress: { type: String, required: true },
  socials: [SocialLinkSchema],
  profileUrl: { type: String, required: true, unique: true },
  qrCodeUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
