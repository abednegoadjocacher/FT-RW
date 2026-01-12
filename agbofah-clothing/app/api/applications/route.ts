import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 1. POST: Save a new application
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, fullName, email, phone, experience, portfolio, portfolioData, portfolioType } = body;

    const query = `
      INSERT INTO applications (id, fullName, email, phone, experience, portfolio, portfolioData, portfolioType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [id, fullName, email, phone, experience, portfolio, portfolioData, portfolioType]);

    return NextResponse.json({ message: 'Application saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
  }
}

// 2. GET: Fetch all applications for the Admin Dashboard
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM applications ORDER BY submittedAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}