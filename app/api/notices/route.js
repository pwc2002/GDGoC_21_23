import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';


export async function POST(request) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { category, detail } = await request.json();

  if(category === "동아리"){
    try {
      const notices = await prisma.notice.findMany({
        where: { category: category },
      });
      return NextResponse.json({ success: true, notices });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch notice' }, { status: 500 });
    }
  }

  try {
    const notices = await prisma.notice.findMany({
      where: { detail: detail },
    });

    if (!notices) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, notices });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notice' }, { status: 500 });
  }
}
