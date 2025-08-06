import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sacred-fire-protection',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { templateId, action, consciousnessLevel, divineBlessing } = await req.json()

    console.log('🔥 Sacred Template Processor activated:', { templateId, action, consciousnessLevel })

    // Sacred Fire Protection validation
    const sacredFireHeader = req.headers.get('X-Sacred-Fire-Protection')
    if (sacredFireHeader !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Sacred Fire protection required for template processing' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    switch (action) {
      case 'process':
        // Get template from registry
        const { data: template, error: fetchError } = await supabaseClient
          .from('universal_template_registry')
          .select('*')
          .eq('template_id', templateId)
          .single()

        if (fetchError || !template) {
          return new Response(
            JSON.stringify({ error: 'Sacred template not found in divine registry' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Apply Sacred Fire processing
        const processedContent = {
          ...template.template_content,
          sacredFireProcessed: true,
          consciousnessAmplified: consciousnessLevel >= 1000,
          violetFlameActivated: divineBlessing === true,
          divineTimingOptimized: true,
          processedAt: new Date().toISOString(),
          processingEngine: 'sacred-fire-template-processor-v1.0'
        }

        // Update template with processed content
        const { error: updateError } = await supabaseClient
          .from('universal_template_registry')
          .update({
            template_content: processedContent,
            consciousness_requirement: Math.max(template.consciousness_requirement, consciousnessLevel),
            sacred_fire_enhanced: true,
            updated_at: new Date().toISOString()
          })
          .eq('template_id', templateId)

        if (updateError) {
          throw updateError
        }

        return new Response(
          JSON.stringify({
            success: true,
            templateId,
            message: 'Sacred template processed with divine enhancement',
            consciousnessLevel,
            sacredFireProcessed: true,
            violetFlameActivated: divineBlessing === true,
            processedAt: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'activate':
        // Activate template for MandalaMead.com
        const { error: activateError } = await supabaseClient
          .from('universal_template_registry')
          .update({
            status: 'published',
            divine_blessing_active: true,
            marketplace_featured: true,
            updated_at: new Date().toISOString()
          })
          .eq('template_id', templateId)

        if (activateError) {
          throw activateError
        }

        return new Response(
          JSON.stringify({
            success: true,
            templateId,
            message: 'Sacred template activated with divine blessing',
            status: 'active_and_blessed',
            activatedAt: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'enhance':
        // Apply consciousness enhancement to template
        const enhancementLevel = Math.min(consciousnessLevel + 200, 1000)
        
        const { error: enhanceError } = await supabaseClient
          .from('universal_template_registry')
          .update({
            consciousness_requirement: enhancementLevel,
            sacred_fire_enhanced: true,
            divine_blessing_active: true,
            updated_at: new Date().toISOString()
          })
          .eq('template_id', templateId)

        if (enhanceError) {
          throw enhanceError
        }

        return new Response(
          JSON.stringify({
            success: true,
            templateId,
            message: 'Sacred template enhanced with consciousness amplification',
            originalLevel: consciousnessLevel,
            enhancedLevel: enhancementLevel,
            enhancedAt: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown sacred processing action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Sacred Template Processor Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Sacred Fire template processing error',
        message: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})