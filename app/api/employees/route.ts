import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Employee from '@/models/Employee';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000, // 45 seconds socket timeout
  maxPoolSize: 10, // Connection pool size
};

// GET all employees
export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL!, mongooseOptions);
    console.log('Connected to MongoDB, fetching employees...');
    
    const employees = await Employee.find().sort({ createdAt: -1 });
    console.log('Found employees:', employees.length);
    
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST create new employee
export async function POST(request: NextRequest) {
  try {
    console.log('Connecting to MongoDB for POST...');
    await mongoose.connect(process.env.MONGODB_URL!, mongooseOptions);
    console.log('Connected to MongoDB, creating employee...');
    
    const employeeData = await request.json();
    console.log('Received employee data:', employeeData);
    
    // Generate unique employee ID
    const generatedEmployeeId = `EMP${Date.now().toString().slice(-6)}`;
    
    // Generate unique profile URL
    const employeeName = employeeData.name.replace(/\s+/g, '-').toLowerCase();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const profileUrl = `${baseUrl}/${employeeName}`;
    
    console.log('Generated profileUrl:', profileUrl);
    
    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // Create employee with generated data
    const newEmployee = new Employee({
      ...employeeData,
      employeeId: generatedEmployeeId,
      profileUrl: profileUrl,
      qrCodeUrl: qrCodeDataUrl,
      updatedAt: new Date()
    });
    
    console.log('Saving employee to database...');
    await newEmployee.save();
    console.log('Employee saved successfully!');
    
    return NextResponse.json({ 
      success: true, 
      data: newEmployee,
      message: 'Employee profile created successfully' 
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    
    // Handle duplicate key errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create employee profile' },
      { status: 500 }
    );
  }
}
