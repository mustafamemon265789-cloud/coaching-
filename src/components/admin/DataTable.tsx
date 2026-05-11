'use client'

import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Search } from 'lucide-react'

interface Column {
  key: string
  label: string
}

interface DataTableProps<T extends object> {
  columns: Column[]
  data: T[]
  searchKeys?: (keyof T & string)[]
  actions?: (row: T) => ReactNode
}

function getRowValue<T extends object>(row: T, key: string) {
  return row[key as keyof T]
}

export default function DataTable<T extends object>({
  columns,
  data,
  searchKeys,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) =>
        String(getRowValue(row, key) ?? '').toLowerCase().includes(q)
      )
    )
  }, [search, data, searchKeys])

  return (
    <div className="space-y-4">
      {searchKeys && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F]"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-500"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3">
                      {String(getRowValue(row, col.key) ?? '-')}
                    </td>
                  ))}
                  {actions && (
                    <td className="whitespace-nowrap px-4 py-3">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
