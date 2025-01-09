import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-end bg-primary">
      <Button asChild>
        <Link href="/new">目標作成</Link>
      </Button>
      <Button asChild>
        <Link href="/list">TODOリスト</Link>
      </Button>
    </header>
  );
}
