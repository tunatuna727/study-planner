'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTaskContext } from '@/context';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';

export default function Confirm() {
  const { temporaryTasks, resetTemporaryTasks, addTask } = useTaskContext();
  const router = useRouter();

  function handleClickReturn() {
    resetTemporaryTasks();
    router.push('/new');
  }
  function handleClickDecide() {
    temporaryTasks.map((task: Task) =>
      addTask({
        id: task.id,
        subject: task.subject,
        topic: task.topic,
        name: task.name,
        done: task.done,
        date: new Date(task.date),
      })
    );
    router.push('/list');
  }

  return (
    <div className="container space-y-20 py-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>トピック</TableHead>
            <TableHead>期間</TableHead>
            <TableHead>TODO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {temporaryTasks.map((task: Task, index: number) => (
            <TableRow key={index.toString()}>
              <TableCell>{task.topic}</TableCell>
              <TableCell>
                {new Date(task.date)
                  .toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .split('/')
                  .join('.')}
              </TableCell>
              <TableCell>{task.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-6">
        <Button onClick={handleClickReturn} variant="secondary">
          作り直す
        </Button>
        <Button onClick={handleClickDecide}>決定</Button>
      </div>
    </div>
  );
}
