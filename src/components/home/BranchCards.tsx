import { MapPin, Phone, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getBranches } from '@/lib/db'

export default async function BranchCards() {
  const rawBranches = await getBranches()
  const branches = rawBranches.length > 0 ? rawBranches : []
  return (
    <section className="bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-dark sm:text-4xl">Our Branches</h2>
          <p className="mt-3 text-text-muted">Visit us at a location near you</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-dark">{branch.name}</h3>
                  <p className="text-sm text-text-muted">{branch.city}</p>
                </div>
              </div>
              <p className="mb-1 text-sm text-text-dark">
                <span className="font-medium">Address:</span> {branch.address}
              </p>
              <div className="mb-6 flex items-center gap-2 text-sm text-text-dark">
                <Phone className="h-4 w-4 text-secondary" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href={branch.map_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get Directions
                </Link>
                <Link
                  href={`https://wa.me/${branch.phone?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
