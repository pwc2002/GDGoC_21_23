import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const myplan = await prisma.userplan.findMany({
      where: { user_id: token.id },
    });
    return NextResponse.json({ success: true, myplan });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch myplan' }, { status: 500 });
  }
}

export async function POST(request) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { myplan } = await request.json();

  try {
    await prisma.myPlan.deleteMany({
      where: { userId: token.sub },
    });

    const createdPlans = await prisma.myPlan.createMany({
      data: myplan.map(plan => ({
        title: plan.title,
        userId: token.sub,
      })),
    });

    return NextResponse.json({ success: true, createdPlans });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update myplan' }, { status: 500 });
  }
}
