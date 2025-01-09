'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTaskContext } from '@/context';
import { useState, useEffect, useMemo } from 'react';
import { Task } from '@/types/task';

export default function List() {
  const { tasks, updateTask } = useTaskContext();
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const filteredTasks = tasks.filter(
      (task) =>
        new Date(task.date).getFullYear() === new Date().getFullYear() &&
        new Date(task.date).getMonth() === new Date().getMonth() &&
        new Date(task.date).getDate() === new Date().getDate()
    );
    console.log(filteredTasks);
    setTodayTasks(filteredTasks);
  }, [tasks]);

  // 科目の配列を作成
  const subjects = useMemo(() => {
    const uniqueSubjects = Array.from(new Set(tasks.map((task) => task.subject)));
    return uniqueSubjects.map((subject) => ({ value: subject, label: subject }));
  }, [tasks]);

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const filteredTopics = useMemo(() => {
    if (!selectedSubject) return [];
    return tasks
      .filter((task) => task.subject === selectedSubject)
      .reduce(
        (acc, task) => {
          const existing = acc.find((item) => item.topic === task.topic);
          if (existing) {
            existing.dates.push(task.date);
            existing.doneCount += task.done ? 1 : 0;
            existing.totalCount += 1;
          } else {
            acc.push({
              topic: task.topic,
              dates: [task.date],
              doneCount: task.done ? 1 : 0,
              totalCount: 1,
            });
          }
          return acc;
        },
        [] as { topic: string; dates: Date[]; doneCount: number; totalCount: number }[]
      );
  }, [tasks, selectedSubject]);

  const formatDateRange = (dates: Date[]) => {
    if (dates.length === 0) return '';
    const startDate = new Date(Math.min(...dates.map((date) => new Date(date).getTime())));
    const endDate = new Date(Math.max(...dates.map((date) => new Date(date).getTime())));
    return `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getDate().toString().padStart(2, '0')}~${endDate.getFullYear()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')}`;
  };

  const handleCheckboxChange = (index: number) => {
    console.log('clicked');
    const taskIndex = tasks.findIndex((task) => task.id === todayTasks[index].id);
    const updatedTask = { ...todayTasks[index], done: !todayTasks[index].done };
    updateTask(taskIndex, updatedTask);
  };

  return (
    <div className="container space-y-20 py-12">
      <Card>
        <CardHeader>
          <CardTitle>今日のTODOリスト</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>教科</TableHead>
                <TableHead>トピック</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>TODO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayTasks.map((task, index) => (
                <TableRow key={index.toString()}>
                  <TableCell>
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={() => handleCheckboxChange(index)}
                      // onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>{task.subject}</TableCell>
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
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Select onValueChange={handleSubjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="科目を選択" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedSubject && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedSubject}のトピック</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>トピック</TableHead>
                    <TableHead>期間</TableHead>
                    <TableHead>達成率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTopics.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{formatDateRange(item.dates)}</TableCell>
                      <TableCell>
                        {item.doneCount}/{item.totalCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
