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

export default function List() {
  return (
    <div className="container space-y-20 py-12">
      <Card>
        <CardHeader>
          <CardTitle>今日のTODOリスト</CardTitle>
        </CardHeader>
        <CardContent>
          {' '}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>トピック</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>TODO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>固有値</TableCell>
                <TableCell>2024.12.21-2024.12.30</TableCell>
                <TableCell>固有値の求め方を学ぶ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>固有値</TableCell>
                <TableCell>2024.12.21-2024.12.30</TableCell>
                <TableCell>固有値の求め方を学ぶ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>固有値</TableCell>
                <TableCell>2024.12.21-2024.12.30</TableCell>
                <TableCell>固有値の求め方を学ぶ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="科目を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">線形代数</SelectItem>
            <SelectItem value="dark">微分積分学</SelectItem>
            <SelectItem value="system">社会情報実践</SelectItem>
          </SelectContent>
        </Select>

        <Card>
          <CardHeader>
            <CardTitle>科目別</CardTitle>
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
                <TableRow>
                  <TableCell>固有値</TableCell>
                  <TableCell>2024.12.21-2024.12.30</TableCell>
                  <TableCell>0/10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>固有値</TableCell>
                  <TableCell>2024.12.21-2024.12.30</TableCell>
                  <TableCell>0/10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>固有値</TableCell>
                  <TableCell>2024.12.21-2024.12.30</TableCell>
                  <TableCell>0/10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
