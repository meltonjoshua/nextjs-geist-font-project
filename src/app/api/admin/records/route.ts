import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getRecords, updateRecord } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const records = getRecords();
    return NextResponse.json({ records });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }
    const records = getRecords();
    const record = records.find((r) => r.id === id);
    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    if (record.clockOut) {
      return NextResponse.json({ error: 'Record is already completed' }, { status: 400 });
    }
    updateRecord(id, { clockOut: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

