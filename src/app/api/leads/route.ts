import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function getLeads(): Promise<any[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveLeads(leads: any[]) {
  const dir = path.dirname(DATA_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, mobile, email, city, investmentInterest, approximateAmount, message, preferredContactTime, sipDate, fundName } = body;

    // Validation
    if (!fullName || !mobile) {
      return NextResponse.json(
        { error: 'Full name and mobile number are required.' },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(mobile.replace(/[^0-9]/g, '').slice(-10))) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    const currentLeads = await getLeads();

    const newLead = {
      id: `lead_${Date.now()}`,
      fullName,
      mobile: mobile.replace(/[^0-9]/g, '').slice(-10),
      email: email || '',
      city: city || 'Jeypore',
      investmentInterest: investmentInterest || 'Mutual Fund Consultation',
      approximateAmount: approximateAmount || '',
      sipAmount: approximateAmount ? `₹${approximateAmount}/month` : '₹5,000/month',
      sipDate: sipDate ? Number(sipDate) : 10,
      fundName: fundName || 'Goal-Based Mutual Fund Portfolio',
      message: message || '',
      preferredContactTime: preferredContactTime || 'Morning',
      status: 'NEW_ENQUIRY',
      createdAt: new Date().toISOString(),
      source: 'website-lead-form',
    };

    const updated = [newLead, ...currentLeads];
    await saveLeads(updated);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your enquiry! Our financial advisor will contact you within 24 hours.',
        lead: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
