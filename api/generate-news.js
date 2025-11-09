/**
 * Server-Side API Endpoint for AI News Generation
 * Bảo vệ OpenAI API key, không expose trên client
 */

import OpenAI from 'openai';

// Initialize OpenAI with server-side key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Server-side only
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model = 'gpt-4', temperature = 0.7, max_tokens = 2000 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    // Rate limiting check (optional)
    // TODO: Implement rate limiting based on IP or user

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens
    });

    const result = completion.choices[0].message.content;

    res.status(200).json({ 
      success: true, 
      content: result,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    res.status(500).json({ 
      error: 'Failed to generate content',
      message: error.message 
    });
  }
}
