// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(request: Request) {
  return NextAuth(request, authOptions);
}

export async function POST(request: Request) {
  return NextAuth(request, authOptions);
}
