// supabase/functions/send-otp.ts
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return new Response(JSON.stringify({ error: 'Phone number is required' }), { status: 400 });
    }

     const VONAGE_API_KEY = Deno.env.get('VONAGE_API_KEY');
    const VONAGE_API_SECRET = Deno.env.get('VONAGE_API_SECRET');
    const VONAGE_BRAND_NAME = Deno.env.get('VONAGE_BRAND_NAME') || 'MyApp';


    const response = await fetch('https://api.nexmo.com/verify/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: VONAGE_API_KEY,
        api_secret: VONAGE_API_SECRET,
        number: phone,
        brand: VONAGE_BRAND_NAME,
      }),
    });

    const result = await response.json();

    if (result.status !== '0') {
      return new Response(JSON.stringify({ error: result.error_text || 'Failed to send OTP' }), { status: 400 });
    }

    return new Response(JSON.stringify({ request_id: result.request_id }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
});
