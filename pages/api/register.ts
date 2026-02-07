import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // added cardTier to the destructuring
    const { username, email, rollNumber, proofOfPayment, eventName, cardTier } = req.body;

    // Basic validation
    if (!username || !email || !rollNumber || !proofOfPayment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const client = await clientPromise;
    const db = client.db('flowfest_db'); 

    await db.collection('registrations').insertOne({
      username,
      email,
      rollNumber,
      proofOfPayment,
      eventName: eventName || 'General Entry', // Default to General if not specific event
      cardTier: cardTier || 'Standard', // Capture the tier
      paymentStatus: 'Pending', // Default status
      createdAt: new Date(),
    });

    return res.status(201).json({ message: 'Registration successful! See you at the summit.' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}