import type { Metadata } from "next";
import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Sites" };
export const revalidate = 60;

export default async function SitesPage() {
  const sites = await api.sites.list().catch(() => []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sites</h1>
        <span className="text-sm text-gray-500">{sites.length} sites</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sites.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                No sites found.
              </TableCell>
            </TableRow>
          ) : (
            sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell className="font-medium text-gray-900">{site.name}</TableCell>
                <TableCell className="text-gray-500">{site.address ?? "—"}</TableCell>
                <TableCell className="text-gray-500">{site.city ?? "—"}</TableCell>
                <TableCell className="text-gray-500">{site.state ?? "—"}</TableCell>
                <TableCell className="text-gray-500">{site.country}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
