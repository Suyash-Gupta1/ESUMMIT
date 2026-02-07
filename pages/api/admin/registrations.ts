import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Simple hardcoded key for demonstration. In production, use environment variables.
const ADMIN_KEY = process.env.ADMIN_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers['x-admin-key'];

  if (apiKey !== ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  const client = await clientPromise;
  const db = client.db('flowfest_db');

  if (req.method === 'GET') {
    try {
      const registrations = await db.collection('registrations')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(registrations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching data' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: 'Missing id or status' });
    }

    try {
      await db.collection('registrations').updateOne(
        { _id: new ObjectId(id) },
        { $set: { paymentStatus: status } }
      );
      return res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating status' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}