
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  leadSource?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const formData: ContactFormData = await req.json();
    const { name, email, phone, company, message, leadSource = 'website_contact_form' } = formData;

    // Get client IP and user agent
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    console.log('Processing contact form submission:', { name, email, company });

    // Create contact lead in database
    const { data: contactLead, error: leadError } = await supabaseClient
      .from('contact_leads')
      .insert({
        name,
        email,
        phone,
        company,
        message,
        lead_source: leadSource,
        lead_status: 'new',
        priority: 'medium',
        ip_address: clientIP,
        user_agent: userAgent,
        metadata: {
          form_submission_date: new Date().toISOString(),
          source_url: req.headers.get('referer') || 'direct'
        }
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error creating contact lead:', leadError);
      throw new Error('Failed to save contact information');
    }

    // Create contact submission record
    const { error: submissionError } = await supabaseClient
      .from('contact_submissions')
      .insert({
        contact_lead_id: contactLead.id,
        form_data: formData,
        email_sent: false,
        ip_address: clientIP,
        user_agent: userAgent
      });

    if (submissionError) {
      console.error('Error creating submission record:', submissionError);
    }

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Mandala Medery <noreply@mandalamedery.com>",
      to: [email],
      subject: "Thank you for your interest in Mandala Mead",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🍯 Mandala Medery</h1>
            <p style="color: #fef3c7; margin: 10px 0 0 0; font-size: 16px;">Sacred Kashmir Mead</p>
          </div>
          
          <div style="padding: 30px; background-color: #fefbf3;">
            <h2 style="color: #92400e; margin-bottom: 20px;">Thank you for your inquiry, ${name}!</h2>
            
            <p style="color: #451a03; line-height: 1.6; margin-bottom: 20px;">
              We've received your message and are excited about the possibility of bringing sacred Kashmir mead to your territory through our distribution network.
            </p>
            
            <div style="background-color: #fed7aa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #9a3412; margin-top: 0;">What happens next?</h3>
              <ul style="color: #451a03; margin: 10px 0;">
                <li>Our distribution team will review your inquiry within 24 hours</li>
                <li>We'll assess territorial opportunities in your area</li>
                <li>A dedicated representative will contact you to discuss partnership details</li>
                <li>We'll provide you with exclusive distributor materials and pricing</li>
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">🌟 Exclusive Distributor Benefits</h3>
              <ul style="color: #451a03; margin: 10px 0;">
                <li><strong>Territorial Protection:</strong> Exclusive rights in your designated area</li>
                <li><strong>Premium Margins:</strong> Competitive wholesale pricing structure</li>
                <li><strong>Marketing Support:</strong> Professional materials and training</li>
                <li><strong>Sacred Quality:</strong> Consciousness-driven premium Kashmir mead</li>
              </ul>
            </div>
            
            <p style="color: #451a03; line-height: 1.6;">
              In the meantime, feel free to explore our product catalog and learn more about our sacred mead-making process.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mandalamedery.com/catalog" 
                 style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View Product Catalog
              </a>
            </div>
            
            <p style="color: #92400e; font-style: italic; text-align: center; margin-top: 30px;">
              Blessed with sacred intention,<br>
              The Mandala Medery Team
            </p>
          </div>
          
          <div style="background-color: #451a03; color: #fef3c7; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 Mandala Medery | Sacred Kashmir Mead Distribution Network</p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Mandala Medery <noreply@mandalamedery.com>",
      to: ["admin@mandalamedery.com"],
      subject: `🚨 New Distribution Inquiry: ${company || name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚨 New Lead Alert</h1>
            <p style="color: #fecaca; margin: 10px 0 0 0;">Distribution Inquiry Received</p>
          </div>
          
          <div style="padding: 30px; background-color: #fefefe;">
            <h2 style="color: #991b1b; margin-bottom: 20px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Name:</td>
                <td style="padding: 10px 0; color: #111827;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 10px 0; color: #111827;">${email}</td>
              </tr>
              ${phone ? `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 10px 0; color: #111827;">${phone}</td>
              </tr>
              ` : ''}
              ${company ? `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Company:</td>
                <td style="padding: 10px 0; color: #111827;">${company}</td>
              </tr>
              ` : ''}
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Lead Source:</td>
                <td style="padding: 10px 0; color: #111827;">${leadSource}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Lead ID:</td>
                <td style="padding: 10px 0; color: #111827;">${contactLead.id}</td>
              </tr>
            </table>
            
            <h3 style="color: #991b1b; margin: 30px 0 15px 0;">Message:</h3>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
              <p style="color: #111827; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mandalamedery.com/admin/leads" 
                 style="background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View in CRM Dashboard
              </a>
            </div>
            
            <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="color: #991b1b; margin: 0; font-size: 14px;">
                <strong>Action Required:</strong> Follow up within 24 hours to maintain lead quality and conversion potential.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Update submission record with email status
    await supabaseClient
      .from('contact_submissions')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString()
      })
      .eq('contact_lead_id', contactLead.id);

    console.log("Contact form processed successfully:", { 
      leadId: contactLead.id,
      customerEmail: customerEmailResponse.data?.id,
      adminEmail: adminEmailResponse.data?.id
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: contactLead.id,
        message: "Thank you! We'll be in touch within 24 hours."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process contact form"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
