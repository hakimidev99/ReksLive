/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import 'https://deno.land/x/dotenv/load.ts';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const { request_id, code } = await req.json();

    if (!request_id || !code) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }

    const apiKey = Deno.env.get('VONAGE_API_KEY');
    const apiSecret = Deno.env.get('VONAGE_API_SECRET');

    if (!apiKey || !apiSecret) {
      return new Response(JSON.stringify({ error: 'API credentials not set in environment variables' }), { status: 500 });
    }

    const response = await fetch('https://api.nexmo.com/verify/check/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: apiKey,
        api_secret: apiSecret,
        request_id,
        code,
      }),
    });

    const result = await response.json();

    if (result.status !== '0') {
      return new Response(JSON.stringify({ verified: false, error: result.error_text }), { status: 400 });
    }

    return new Response(JSON.stringify({ verified: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), { status: 500 });
  }
});
