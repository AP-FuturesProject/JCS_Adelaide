import { NextResponse } from "next/server";

const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,timestamp";
const LIMIT = 9;

export const revalidate = 3600; // refresh every hour

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "No access token configured" }, { status: 500 });
  }

  const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: "Instagram API error", detail: body }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
