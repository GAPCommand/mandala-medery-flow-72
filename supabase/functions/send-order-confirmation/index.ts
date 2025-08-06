
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderNumber, customerEmail, orderDetails } = await req.json();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation - Sacred Fire Mead</title>
          <style>
            body { font-family: 'Georgia', serif; line-height: 1.6; color: #2D1810; background: linear-gradient(135deg, #FFF8DC 0%, #F5E6D3 100%); margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1); }
            .header { background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            .content { padding: 30px; }
            .order-details { background: #FFF8DC; border-left: 4px solid #D97706; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { background: #2D1810; color: #F5E6D3; padding: 20px; text-align: center; font-size: 14px; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5E6D3; }
            .blessing { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍯 Sacred Fire Mead 🍯</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px;">Order Confirmation</p>
            </div>
            
            <div class="content">
              <h2 style="color: #D97706;">Thank you for your order!</h2>
              <p>Dear Sacred Distributor,</p>
              <p>Your order has been received and is being prepared with the highest consciousness and care. Our sacred mead is crafted with ancient wisdom and modern precision.</p>
              
              <div class="order-details">
                <h3 style="color: #D97706; margin-top: 0;">Order Details</h3>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Estimated Delivery:</strong> ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>

              <div class="blessing">
                "May this sacred mead bring abundance, wisdom, and divine connection to all who partake in its golden essence."
              </div>

              <h3 style="color: #D97706;">What's Next?</h3>
              <ul>
                <li>Our master mead crafters will prepare your order with sacred intention</li>
                <li>Your order will be blessed and packaged with consciousness</li>
                <li>You'll receive tracking information once shipped</li>
                <li>Expect delivery within 5-7 business days</li>
              </ul>

              <p>If you have any questions, please don't hesitate to contact our support team.</p>
              
              <p style="margin-top: 30px;">With gratitude and blessings,<br><strong>The Sacred Fire Mead Team</strong></p>
            </div>
            
            <div class="footer">
              <p>Sacred Fire Mead | Crafted with Ancient Wisdom | Modern Excellence</p>
              <p>This is a divine transaction confirmation. Please keep for your records.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // In a real implementation, you would integrate with your email service
    // For now, we'll log the email content
    console.log('Order confirmation email prepared for:', customerEmail);
    console.log('Order number:', orderNumber);

    return new Response(
      JSON.stringify({ success: true, message: 'Order confirmation email prepared' }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
