import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function sendLeadNotificationEmail(leadData: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Resend Mock] Email payload:', leadData);
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'TMFS Lead System <onboarding@resend.dev>',
      to: ['tiru.jeypore@gmail.com'],
      subject: `New Wealth Consultation Lead: ${leadData.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0f2744;">New Consultation Inquiry</h2>
          <p><strong>Name:</strong> ${leadData.name}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Interested Service:</strong> ${leadData.service || 'General Portfolio Advice'}</p>
          <p><strong>Message:</strong> ${leadData.message || 'N/A'}</p>
          <hr/>
          <p style="font-size: 12px; color: #64748b;">Tirumala Mutual Fund Services — Automated Advisory Notification</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('[Resend Error]:', error);
    return { success: false, error };
  }
}
