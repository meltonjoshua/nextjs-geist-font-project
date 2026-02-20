import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getOpenRecord, createRecord, updateRecord } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== 'contractor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();
    const openRecord = getOpenRecord(session.id);

    if (action === 'clockIn') {
      if (openRecord) {
        return NextResponse.json({ error: 'Already clocked in' }, { status: 400 });
      }
      const record = {
        id: randomUUID(),
        userId: session.id,
        userName: session.name,
        clockIn: new Date().toISOString(),
        clockOut: null,
      };
      createRecord(record);
      return NextResponse.json({ success: true, record });
    }

    if (action === 'clockOut') {
      if (!openRecord) {
        return NextResponse.json({ error: 'Not clocked in' }, { status: 400 });
      }
      updateRecord(openRecord.id, { clockOut: new Date().toISOString() });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== 'contractor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const openRecord = getOpenRecord(session.id);
    return NextResponse.json({ isClockedIn: !!openRecord, openRecord: openRecord || null });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
