import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Assets" };
export const revalidate = 60;

interface PageProps {
  searchParams: { site_id?: string };
}

export default async function AssetsPage({ searchParams }: PageProps) {
  const [assets, sites] = await Promise.all([
    api.assets.list({ site_id: searchParams.site_id }).catch(() => []),
    api.sites.list().catch(() => []),
  ]);

  const siteMap = new Map(sites.map((s) => [s.id, s.name]));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
        <span className="text-sm text-gray-500">{assets.length} assets</span>
      </div>

      {/* Site filter */}
      {sites.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/assets"
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              !searchParams.site_id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Sites
          </Link>
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/assets?site_id=${site.id}`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                searchParams.site_id === site.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {site.name}
            </Link>
          ))}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Site</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                No assets found.
              </TableCell>
            </TableRow>
          ) : (
            assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium text-gray-900">{asset.name}</TableCell>
                <TableCell className="font-mono text-sm text-gray-500">
                  {asset.asset_code ?? "—"}
                </TableCell>
                <TableCell className="text-gray-500">{asset.asset_type ?? "—"}</TableCell>
                <TableCell className="text-gray-500">
                  {siteMap.get(asset.site_id) ?? asset.site_id}
                </TableCell>
                <TableCell>
                  {asset.is_active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="muted">Inactive</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
