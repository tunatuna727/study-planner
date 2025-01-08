'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarIcon, Star } from 'lucide-react';
import React from 'react';

export default function New() {
  const [subject, setSubject] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [level, setLevel] = React.useState<string>('2');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
    console.log(subject);
  };

  const handleValueChange = (value: string) => {
    setLevel(value);
  };
  return (
    <div className="container space-y-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>STEP1 科目名を入力</CardTitle>
          <CardDescription>計画を立てたい科目名を入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">科目名</Label>
            <Input value={subject} onChange={handleChange} id="name" placeholder="社会情報実践" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>STEP2 期間を入力</CardTitle>
          <CardDescription>学習する期間を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">開始日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon />
                  {startDate ? (
                    format(startDate, 'yyyy年MM月dd日(E)', { locale: ja })
                  ) : (
                    <span>開始日を選択</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={ja}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">終了日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon />
                  {endDate ? (
                    format(endDate, 'yyyy年MM月dd日(E)', { locale: ja })
                  ) : (
                    <span>終了日を選択</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  locale={ja}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>STEP3 目標習熟度を選択</CardTitle>
          <CardDescription>
            この計画を完了したときの習熟度の目標を選択してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="name">習熟度</Label>
            <RadioGroup defaultValue="2" value={level} onValueChange={handleValueChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1" className="flex gap-2">
                  <Star size={18} className="fill-current text-yellow-400" />
                  <Star className="text-muted-foreground" size={18} />
                  <Star className="text-muted-foreground" size={18} />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="r2" />
                <Label htmlFor="r1" className="flex gap-2">
                  <Star size={18} className="fill-current text-yellow-400" />
                  <Star size={18} className="fill-current text-yellow-400" />
                  <Star className="text-muted-foreground" size={18} />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r3" />
                <Label htmlFor="r1" className="flex gap-2">
                  <Star size={18} className="fill-current text-yellow-400" />
                  <Star size={18} className="fill-current text-yellow-400" />
                  <Star size={18} className="fill-current text-yellow-400" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      <Button>計画を立てる</Button>
    </div>
  );
}
