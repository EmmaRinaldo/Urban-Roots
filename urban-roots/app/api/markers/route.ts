import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'markers.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const markers = JSON.parse(jsonData);

    return NextResponse.json(markers, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load markers data' }, {
      status: 500,
    });
  }
}
