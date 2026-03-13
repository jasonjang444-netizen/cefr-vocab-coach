import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, targetCefr } = await request.json();

    if (!userId || !targetCefr) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.userLevel.upsert({
      where: { userId },
      create: {
        userId,
        targetCefr,
      },
      update: {
        targetCefr,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting target level:', error);
    return NextResponse.json({ error: 'Failed to set target level' }, { status: 500 });
  }
}
