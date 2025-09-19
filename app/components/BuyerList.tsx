'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Eye, Edit2 } from 'lucide-react';

export type Buyer = {
  id: string;
  name: string;
  phone: string;
  city: string;
  propertyType: string;
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  status: 'New' | 'Contacted' | 'Closed' | 'On Hold' | string;
  updatedAt: string; // ISO date
};

interface Props {
  buyers?: Buyer[];
  onView?: (buyer: Buyer) => void;
  onEdit?: (buyer: Buyer) => void;
}

// Small sample data so the component is runnable out-of-the-box
export const sampleBuyers: Buyer[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: ['Ravi Kumar', 'Asha Patel', 'Karan Mehta', 'Sneha Rao', 'Vikram Singh'][i % 5] + ` #${i + 1}`,
  phone: `+91-9${String(100000000 + i).slice(1)}`,
  city: ['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Hyderabad'][i % 5],
  propertyType: ['Apartment', 'Villa', 'Plot', 'Independent House'][i % 4],
  budgetMin: 30 + i * 5,
  budgetMax: 50 + i * 6,
  timeline: ['Immediate', '1-3 months', '3-6 months'][i % 3],
  status: ['New', 'Contacted', 'On Hold', 'Closed'][i % 4] as Buyer['status'],
  updatedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export default function BuyerList({ buyers = sampleBuyers, onView, onEdit }: Props) {
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setOpenMenuFor(null);
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const formatBudget = (min: number, max: number) => `\u20B9${min}L - \u20B9${max}L`;
  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-800 bg-black text-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-sm uppercase text-gray-400">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden sm:table-cell">Phone</th>
              <th className="px-4 py-3 hidden md:table-cell">City</th>
              <th className="px-4 py-3 hidden lg:table-cell">Property Type</th>
              <th className="px-4 py-3 hidden xl:table-cell">Budget</th>
              <th className="px-4 py-3 hidden xl:table-cell">Timeline</th>
              <th className="px-4 py-3 hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 hidden lg:table-cell">Updated At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {buyers.map((b, idx) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.02 }}
                whileHover={{ scale: 1.01 }}
                className="border-t border-gray-800 hover:bg-gray-900"
              >
                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-white/10 flex items-center justify-center font-medium text-sm">
                      {b.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{b.name }</div>
                      <div className="text-xs text-gray-400 hidden sm:block">{b.city} • {b.propertyType}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 hidden sm:table-cell align-top">
                  <div className="text-sm">{b.phone}</div>
                </td>

                <td className="px-4 py-3 hidden md:table-cell align-top">
                  <div className="text-sm">{b.city}</div>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell align-top">
                  <div className="text-sm">{b.propertyType}</div>
                </td>

                <td className="px-4 py-3 hidden xl:table-cell align-top">
                  <div className="text-sm">{formatBudget(b.budgetMin, b.budgetMax)}</div>
                </td>

                <td className="px-4 py-3 hidden xl:table-cell align-top">
                  <div className="text-sm">{b.timeline}</div>
                </td>

                <td className="px-4 py-3 hidden sm:table-cell align-top">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                    b.status === 'Closed' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-200'
                  }`}> {b.status} </span>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell align-top">
                  <div className="text-sm flex text-gray-300">{formatDate(b.updatedAt)}</div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <button
                      aria-label={`View ${b.name}`}
                      onClick={() => onView?.(b)}
                      className="rounded-md p-2 hover:bg-white/5 cursor-pointer"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      aria-label={`Edit ${b.name}`}
                      onClick={() => onEdit?.(b)}
                      className="rounded-md p-2 hover:bg-white/5 cursor-pointer"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* three-dot menu - shows the less important fields on narrow screens */}
                    <div className="relative" ref={menuRef}>
                      <button
                        aria-haspopup
                        aria-expanded={openMenuFor === b.id}
                        aria-label={`More for ${b.name}`}
                        onClick={() => setOpenMenuFor(openMenuFor === b.id ? null : b.id)}
                        className="rounded-md p-2 hover:bg-white/5 cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      <AnimatePresence>
                        {openMenuFor === b.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-gray-800 bg-black p-3 text-sm shadow-lg"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="text-xs text-gray-400">Details</div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Phone</div>
                                <div className="font-medium">{b.phone}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">City</div>
                                <div className="font-medium">{b.city}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Property</div>
                                <div className="font-medium">{b.propertyType}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Budget</div>
                                <div className="font-medium">{formatBudget(b.budgetMin, b.budgetMax)}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Timeline</div>
                                <div className="font-medium">{b.timeline}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Status</div>
                                <div className="font-medium">{b.status}</div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-gray-300">Updated</div>
                                <div className="font-medium">{formatDate(b.updatedAt)}</div>
                              </div>

                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => {
                                    onView?.(b);
                                    setOpenMenuFor(null);
                                  }}
                                  className="flex-1 rounded-md border border-gray-700 px-2 py-1 text-sm"
                                >
                                  View
                                </button>

                                <button
                                  onClick={() => {
                                    onEdit?.(b);
                                    setOpenMenuFor(null);
                                  }}
                                  className="flex-1 rounded-md border border-gray-700 px-2 py-1 text-sm"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-gray-400">Tip: on very small screens the three-dot menu shows the hidden fields.</div>
    </div>
  );
}
