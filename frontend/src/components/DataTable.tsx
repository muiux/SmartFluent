import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrafficHistory } from "@/types/Traffic.types";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

interface DataTableProps {
  data: TrafficHistory[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-center">No</TableHead>
            <TableHead className="">Page URL</TableHead>
            <TableHead className="text-right">Visits Count</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length !== 0 ? (
            data.map((traffichistory, index) => (
              <TableRow key={`traffichistory_${index}`}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="text-left">
                  {traffichistory.pageUrl}
                </TableCell>
                <TableCell className="text-right">
                  {traffichistory.count}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="ml-auto flex h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="p-10 text-lg" colSpan={3}>No Traffic Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
