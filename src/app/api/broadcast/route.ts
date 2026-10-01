import { NextRequest, NextResponse } from 'next/server';

interface BroadcastRecipient {
  id?: string;
  fullName?: string;
  mobile?: string;
  email?: string;
  sipAmount?: string;
  sipDate?: number;
  fundName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignType, title, fundName, closeDate, minSip, customMessage, recipients, documentUrl, documentName } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients provided' }, { status: 400 });
    }

    const docAttachmentText = documentUrl
      ? `\n\n📄 *Attached Document:* ${documentName || 'Download PDF Brochure'}\n📥 *Download Link:* ${documentUrl.startsWith('http') ? documentUrl : `https://tirumalamutualfunds.in${documentUrl}`}`
      : '';

    // Generate personalized messages and WhatsApp click-to-chat links
    const preparedMessages = recipients.map((r: BroadcastRecipient) => {
      let text = '';
      if (campaignType === 'nfo') {
        text = `Dear ${r.fullName || 'Investor'},\n\nGreetings from Tirumala Mutual Fund Services (ARN-144270).\n\n🚀 *New Fund Offer (NFO) Alert:*\n*${fundName || title || 'Upcoming Mutual Fund NFO'}*\n\n📅 *Closing Date:* ${closeDate || 'Soon'}\n💰 *Minimum SIP:* ₹${minSip || '500'}/month\n\nTake advantage of early NAV entry to compound wealth over market cycles. To view the prospectus or invest directly, visit https://tirumalamutualfunds.in/news or reply to this message to speak with Mr. Tirumala Talabaktula.${docAttachmentText}\n\n_Mutual fund investments are subject to market risks. Read scheme documents carefully._`;
      } else if (campaignType === 'sip') {
        text = `Dear ${r.fullName || 'Investor'},\n\nNamaste from Tirumala Mutual Fund Services (ARN-144270).\n\n⏰ *Monthly SIP Debit Reminder:*\nYour scheduled mutual fund installment of *${r.sipAmount || '₹5,000'}* is due on *${r.sipDate ? `${r.sipDate}th of this month` : 'upcoming mandate date'}* for *${r.fundName || 'Active SIP'}*.\n\nKindly ensure your registered bank account has sufficient balance to maintain uninterrupted compounding and avoid bank mandate bounce charges.${docAttachmentText}\n\nWarm regards,\n*Tirumala Mutual Fund Services*\nJeypore, Odisha • Call: +91 8763732389`;
      } else {
        text = `Dear ${r.fullName || 'Investor'},\n\n${customMessage || 'Update from Tirumala Mutual Fund Services.'}${docAttachmentText}\n\nFor personalized portfolio assistance, contact Sri Tirumala Talabaktula, ARN-144270.\nhttps://tirumalamutualfunds.in`;
      }

      const cleanPhone = (r.mobile || '').replace(/[^0-9]/g, '').slice(-10);
      const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`;

      return {
        recipientId: r.id,
        name: r.fullName,
        mobile: cleanPhone,
        email: r.email,
        text,
        whatsappUrl,
        documentUrl,
        documentName,
      };
    });

    // Optional email dispatch if RESEND_API_KEY is configured
    let emailDispatched = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailList = recipients
          .filter((r: BroadcastRecipient) => r.email && r.email.includes('@'))
          .map((r: BroadcastRecipient) => r.email as string);
        if (emailList.length > 0) {
          await resend.emails.send({
            from: 'Tirumala Mutual Fund Services <updates@tirumalamutualfunds.in>',
            to: emailList,
            subject: title || 'Important Investor Advisory - Tirumala Mutual Fund Services',
            text: preparedMessages[0]?.text || '',
          });
          emailDispatched = true;
        }
      } catch (emailErr) {
        console.warn('Resend email dispatch warning (key might be test/missing):', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      count: recipients.length,
      emailDispatched,
      campaignType,
      title: title || fundName,
      preparedMessages,
      timestamp: new Date().toISOString(),
      message: `Successfully prepared broadcast for ${recipients.length} recipients.`,
    });
  } catch (error) {
    console.error('API /broadcast error:', error);
    return NextResponse.json({ error: 'Broadcast preparation failed' }, { status: 500 });
  }
}
