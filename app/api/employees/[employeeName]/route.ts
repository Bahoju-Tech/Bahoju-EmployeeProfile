import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Employee from '@/models/Employee';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000, // 45 seconds socket timeout
  maxPoolSize: 10, // Connection pool size
};

// GET employee by profile URL name or employee ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ employeeName: string }> }
) {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, mongooseOptions);
    
    const { employeeName } = await params;
    
    console.log('=== DEBUG INFO ===');
    console.log('Looking for employee with identifier:', employeeName);
    console.log('Identifier type:', typeof employeeName);
    console.log('Identifier length:', employeeName.length);
    
    // First, try to find by employee ID (if it starts with EMP)
    if (employeeName.startsWith('EMP')) {
      console.log('Identifier starts with EMP, trying employee ID lookup...');
      const employeeById = await Employee.findOne({ employeeId: employeeName });
      console.log('Looking for employee by ID:', employeeName);
      console.log('Found by ID:', employeeById ? 'Yes' : 'No');
      
      if (employeeById) {
        console.log('✅ Employee found by ID, returning...');
        return NextResponse.json({ success: true, data: employeeById });
      }
    } else {
      console.log('Identifier does not start with EMP, skipping ID lookup');
    }
    
    // Try to find by profile URL (try both localhost and production URLs)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const profileUrl = `${baseUrl}/${employeeName}`;
    // const localhostUrl = `http://localhost:3000/${employeeName}`;
    // const productionUrl = `https://staff.bahojutech.com/${employeeName}`;
    
    // console.log('=== DEBUG INFO ===');
    // console.log('Looking for employee with identifier:', employeeName);
    // console.log('NODE_ENV:', process.env.NODE_ENV);
    // console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
    // console.log('Current baseUrl:', baseUrl);
    
    // In production, prioritize production URL; in development, try both
    let employee;
    
    if (process.env.NODE_ENV === 'production') {
      console.log('Production mode - trying production URL first:', profileUrl);
      employee = await Employee.findOne({ profileUrl: profileUrl });
      
      if (!employee) {
        console.log('Production URL failed, trying localhost URL as fallback:', profileUrl);
        employee = await Employee.findOne({ profileUrl: profileUrl });
        console.log('Found employee by localhost URL:', employee ? 'Yes' : 'No');
      } else {
        console.log('✅ Employee found by production URL:', employee ? 'Yes' : 'No');
      }
    } else {
      console.log('Development mode - trying localhost URL first:', profileUrl);
      employee = await Employee.findOne({ profileUrl: profileUrl });
      console.log('Found employee by localhost URL:', employee ? 'Yes' : 'No');
      
      // If not found with localhost, try production URL (for testing)
      if (!employee) {
        console.log('Localhost URL failed, trying production URL as fallback:', profileUrl);
        employee = await Employee.findOne({ profileUrl: profileUrl });
        console.log('Found employee by production URL:', employee ? 'Yes' : 'No');
      }
    }
    
    if (!employee) {
      // Try to find by name as fallback
      console.log('Trying name lookup as fallback...');
      const employeeByName = await Employee.findOne({ 
        name: { $regex: new RegExp(employeeName.replace(/-/g, ' '), 'i') }
      });
      
      console.log('Looking for employee by name:', employeeName.replace(/-/g, ' '));
      console.log('Found by name:', employeeByName ? 'Yes' : 'No');
      
      if (employeeByName) {
        console.log('✅ Employee found by name, returning...');
        return NextResponse.json({ success: true, data: employeeByName });
      }
      
      console.log('❌ No employee found with any method');
      return NextResponse.json(
        { success: false, error: 'Employee profile not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Employee found, returning...');
    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employee profile' },
      { status: 500 }
    );
  }
}
