import express from 'express';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Vonage } from '@vonage/server-sdk';

config(); // Load .env

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) return res.status(400).json({ error });

    // Use a placeholder code as Supabase doesn’t expose the OTP
    const otp = '123456';

    await vonage.sms.send({
      to: phone,
      from: 'MyApp',
      text: `Your verification code is: ${otp}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/verify-otp', async (req, res) => {
  const { request_id, code } = req.body;

  try {
    const result = await vonage.verify.check({
      request_id,
      code,
    });

    if (result.status !== '0') {
      return res.status(400).json({ error: result.error_text });
    }

    res.json({ verified: true });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://10.0.2.2:${PORT}`);
});
