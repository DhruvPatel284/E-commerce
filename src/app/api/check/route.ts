// app/api/check/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token; // Retrieve token from cookie
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '');
    
    // Token is valid, user is authenticated
    res.status(200).json({ authenticated: true, user: decodedToken });
  } catch (error) {
    // Token is invalid or expired
    res.status(401).json({ authenticated: false });
  }
}
