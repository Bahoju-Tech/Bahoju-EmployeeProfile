import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Employee from '@/models/Employee';

// GET employee by profile URL name
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ employeeName: string }> }
) {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    
    const { employeeName } = await params;
    const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${employeeName}`;
    
    console.log('Looking for employee with profileUrl:', profileUrl);
    
    const employee = await Employee.findOne({ profileUrl: profileUrl });
    
    console.log('Found employee:', employee ? 'Yes' : 'No');
    
    if (!employee) {
      // Try to find by name as fallback
      const employeeByName = await Employee.findOne({ 
        name: { $regex: new RegExp(employeeName.replace(/-/g, ' '), 'i') }
      });
      
      console.log('Looking for employee by name:', employeeName.replace(/-/g, ' '));
      console.log('Found by name:', employeeByName ? 'Yes' : 'No');
      
      if (employeeByName) {
        return NextResponse.json({ success: true, data: employeeByName });
      }
      
      return NextResponse.json(
        { success: false, error: 'Employee profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employee profile' },
      { status: 500 }
    );
  }
}
