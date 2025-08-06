
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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
    const { sessionId } = await req.json();
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    });

    if (session.payment_status === 'paid') {
      // Use service role to create order record
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const orderData = {
        order_number: `MM-${Date.now()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
        distributor_id: session.metadata?.user_id,
        total_amount: session.amount_total! / 100,
        order_status: 'paid',
        order_date: new Date().toISOString(),
        estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        destination_address: JSON.parse(session.metadata?.shipping_address || '{}'),
        metadata: {
          stripe_session_id: sessionId,
          stripe_payment_intent_id: session.payment_intent?.id,
          payment_status: 'completed',
        },
      };

      const { data: order, error } = await supabaseAdmin
        .from('mandala_orders')
        .insert(orderData)
        .select()
        .single();

      if (error) {
        console.error('Order creation error:', error);
        throw new Error('Failed to create order record');
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          orderNumber: order.order_number,
          orderId: order.id 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Payment not completed' }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
