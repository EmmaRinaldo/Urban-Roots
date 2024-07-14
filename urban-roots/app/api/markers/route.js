import fs from 'fs';
import path from 'path';

export async function GET(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'markers.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const markers = JSON.parse(jsonData);

    return new Response(JSON.stringify(markers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load markers data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
