import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, mobile, email, city, investmentInterest, approximateAmount, message, preferredContactTime } = body;

    // Validation
    if (!fullName || !mobile) {
      return NextResponse.json(
        { error: 'Full name and mobile number are required.' },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // In production, this would save to MongoDB and send email notifications
    // For now, log the lead data
    console.log('📩 New Lead Received:', {
      fullName,
      mobile,
      email,
      city,
      investmentInterest,
      approximateAmount,
      message,
      preferredContactTime,
      timestamp: new Date().toISOString(),
      source: 'website-lead-form',
    });

    // TODO: Save to MongoDB
    // const lead = await Lead.create({ ...body, status: 'new', source: 'website' });

    // TODO: Send email notification via Nodemailer
    // await sendLeadNotification(lead);

    // TODO: Prepare WhatsApp message
    // const whatsappMsg = formatWhatsAppMessage(lead);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your enquiry! Our financial advisor will contact you within 24 hours.',
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
