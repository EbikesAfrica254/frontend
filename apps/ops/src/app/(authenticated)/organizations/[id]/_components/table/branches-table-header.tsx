import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";

export function BranchesTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Branch</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Created</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
