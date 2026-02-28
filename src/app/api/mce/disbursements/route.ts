// src/app/api/mce/disbursements/route.ts
// Mesocratic Compliance Engine — Disbursement Entry API
//
// POST /api/mce/disbursements — create a disbursement record
// GET  /api/mce/disbursements?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
//
// Secured with MCE_REPORT_API_KEY env var.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { writeAuditLog } from '@/lib/mce/audit';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const VALID_CATEGORIES = ['operating', 'contribution', 'independent_expenditure', 'other'] as const;

function isAuthorized(request: NextRequest): boolean {
  const apiKey = process.env.MCE_REPORT_API_KEY;
  if (!apiKey) return false;

  const bearerToken = request.headers
    .get('authorization')
    ?.replace('Bearer ', '');
  const headerKey = request.headers.get('x-api-key');

  return bearerToken === apiKey || headerKey === apiKey;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate required fields
  const errors: string[] = [];

  const payeeName = body.payeeName as string | undefined;
  const amountCents = body.amountCents as number | undefined;
  const date = body.date as string | undefined;
  const purpose = body.purpose as string | undefined;
  const category = body.category as string | undefined;

  if (!payeeName?.trim()) errors.push('payeeName is required');
  if (amountCents === undefined || amountCents <= 0) errors.push('amountCents must be a positive integer');
  if (!date?.trim()) errors.push('date is required');
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push('date must be YYYY-MM-DD format');
  if (!purpose?.trim()) errors.push('purpose is required');
  if (!category || !VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
    errors.push(`category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
  }

  const supabase = getSupabase();

  const record = {
    payee_name: payeeName!.trim(),
    payee_address_line1: ((body.payeeAddressLine1 as string) || '').trim(),
    payee_address_city: ((body.payeeAddressCity as string) || '').trim(),
    payee_address_state: ((body.payeeAddressState as string) || '').trim(),
    payee_address_zip: ((body.payeeAddressZip as string) || '').trim(),
    amount_cents: amountCents!,
    date: date!,
    purpose: purpose!.trim(),
    category: category!,
    check_number: ((body.checkNumber as string) || null),
    receipt_url: ((body.receiptUrl as string) || null),
  };

  const { data: disbursement, error } = await supabase
    .from('disbursements')
    .insert(record)
    .select()
    .single();

  if (error) {
    console.error('[MCE Disbursements] Insert failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Audit log (fire-and-forget)
  writeAuditLog(
    'disbursements',
    disbursement.id,
    'create',
    null,
    record,
    request.headers.get('x-forwarded-for') || null
  );

  return NextResponse.json({ disbursement }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing required parameters: startDate, endDate' },
      { status: 400 }
    );
  }

  const supabase = getSupabase();

  const { data: disbursements, error } = await supabase
    .from('disbursements')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) {
    console.error('[MCE Disbursements] Query failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ disbursements });
}
