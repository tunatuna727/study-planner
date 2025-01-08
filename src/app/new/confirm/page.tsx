import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Confirm() {
  return (
    <div className="container space-y-20 py-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">トピック</TableHead>
            <TableHead>期間</TableHead>
            <TableHead>TODO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">固有値</TableCell>
            <TableCell>2024.12.21-2024.12.30</TableCell>
            <TableCell>固有値の求め方を学ぶ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">固有値</TableCell>
            <TableCell>2024.12.21-2024.12.30</TableCell>
            <TableCell>固有値の求め方を学ぶ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">固有値</TableCell>
            <TableCell>2024.12.21-2024.12.30</TableCell>
            <TableCell>固有値の求め方を学ぶ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center gap-6">
        <Button variant="secondary">作り直す</Button>
        <Button>決定</Button>
      </div>
    </div>
  );
}
