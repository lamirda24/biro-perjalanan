'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DetailPage() {
  const { get } = useSearchParams();
  const id = get('id') ?? 1;

  return <p>123</p>;
}
