import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead) {
  const { name, email, company, project_type, budget, message } = lead;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'ArtiMindArt <hello@artimind.art>',
      to: 'javierpato@gmail.com',
      subject: `🎬 new lead · ${name} · ${budget || 'budget TBD'}`,
      html: `
        <h2>${name}</h2>
        <p><strong>${company || 'Independent'}</strong> · ${project_type || 'Project TBD'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p>${message || 'No message'}</p>
      `,
      reply_to: email,
    });
  } catch (err) {
    console.error('Failed to send lead notification:', err);
  }
}

export async function sendSubscribeConfirm(email, token) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'ArtiMindArt <hello@artimind.art>',
      to: email,
      subject: 'Confirm your ArtiMindArt newsletter subscription',
      html: `
        <p>Hey there,</p>
        <p>Click the link below to confirm your subscription to the ArtiMindArt newsletter.</p>
        <a href="${process.env.VERCEL_URL || 'https://artimind.art'}/api/subscribe/confirm?token=${token}" style="display:inline-block;padding:10px 20px;background:#ff2e2e;color:#fff;text-decoration:none;border-radius:4px;margin:20px 0">
          Confirm subscription
        </a>
        <p>Or paste this link: ${process.env.VERCEL_URL || 'https://artimind.art'}/api/subscribe/confirm?token=${token}</p>
      `,
    });
  } catch (err) {
    console.error('Failed to send subscribe confirm:', err);
  }
}

export async function sendBookingConfirmation(booking, lead) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'ArtiMindArt <hello@artimind.art>',
      to: lead.email,
      subject: `🎬 Booking confirmed · ArtiMindArt`,
      html: `
        <p>Hey ${lead.name},</p>
        <p>Your deposit has been received. We're thrilled to work on <strong>${lead.project_type}</strong> with you.</p>
        <p><strong>Plan:</strong> ${booking.plan}</p>
        <p><strong>Amount:</strong> €${(booking.amount_cents / 100).toFixed(2)}</p>
        <p>Expect a kickoff call within 48 hours.</p>
        <p>Best,<br/>Javier @ ArtiMindArt</p>
      `,
    });
  } catch (err) {
    console.error('Failed to send booking confirmation:', err);
  }
}
