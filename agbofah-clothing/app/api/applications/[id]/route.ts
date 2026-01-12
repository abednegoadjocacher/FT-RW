import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // 1. Define params as a Promise
) {
  try {
    // 2. You MUST await params before destructuring ID
    const { id } = await params; 
    
    const { status, notificationMethod, message } = await req.json();

    // 3. Perform the Database Update
    const query = 'UPDATE applications SET status = ? WHERE id = ?';
    await db.execute(query, [status, id]);

    // 4. Handle Real-Time SMS via Arkesel
    if (status === 'approved' && notificationMethod === 'sms') {
      const [rows]: any = await db.execute('SELECT phone FROM applications WHERE id = ?', [id]);
      
      if (rows && rows.length > 0) {
        let phone = rows[0].phone.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '233' + phone.substring(1);
        else if (!phone.startsWith('233')) phone = '233' + phone;

        // Using POST for real-time reliability
        await fetch(`https://sms.arkesel.com/api/v2/sms/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.ARKESEL_API_KEY || ''
          },
          body: JSON.stringify({
            sender: process.env.ARKESEL_SENDER_ID || 'Arkesel',
            message: message,
            recipients: [phone]
          })
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Detailed Server Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}