import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyWebhookSignature, retrieveSession, PLAN_NAMES } from '../../lib/stripe.js';
import { sendBookingConfirmation } from '../../lib/resend.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let event;
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    event = verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await handleCheckoutComplete(session);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function handleCheckoutComplete(session) {
  const { metadata, id, amount_total } = session;
  const plan = metadata.plan;
  const leadEmail = metadata.lead_email;

  // Find or create lead
  let lead = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('email', leadEmail)
    .single();

  let leadId = lead.data?.id;

  if (!leadId) {
    const { data } = await supabaseAdmin
      .from('leads')
      .insert({ email: leadEmail, name: 'Lead via Stripe', project_type: 'booking' })
      .select('id')
      .single();
    leadId = data.id;
  }

  // Create booking
  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      lead_id: leadId,
      plan,
      amount_cents: amount_total,
      currency: 'eur',
      stripe_session_id: id,
      status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }

  // Update lead status
  await supabaseAdmin
    .from('leads')
    .update({ status: 'won' })
    .eq('id', leadId);

  // Send confirmation email
  const { data: leadData } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadData) {
    await sendBookingConfirmation(booking, leadData);
  }

  console.log(`Booking completed: ${booking.id} for plan ${plan}`);
}
