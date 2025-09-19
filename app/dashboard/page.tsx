"use client"
import React, { useState, useMemo } from "react";
import Image from "next/image";

interface BuyerLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

const sampleLeads: BuyerLead[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "987-654-3210" },
];

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<BuyerLead[]>(sampleLeads);
  const [search, setSearch] = useState("");

  // Filter leads by name/email/phone
  const filteredLeads = useMemo(() => {
    const lower = search.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lower) ||
        lead.email.toLowerCase().includes(lower) ||
        lead.phone.includes(lower)
    );
  }, [leads, search]);

  // CSV Export
  const exportCSV = () => {
    const header = ["ID", "Name", "Email", "Phone", "Notes"];
    const rows = leads.map((l) => [l.id, l.name, l.email, l.phone, l.notes || ""]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "buyer_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Import (simple, no validation beyond basic)
  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text !== "string") return;
      const lines = text.trim().split("\n");
      const newLeads: BuyerLead[] = [];
      for (let i = 1; i < lines.length; i++) {
        const [idStr, name, email, phone, notes] = lines[i].split(",");
        const id = Number(idStr);
        if (!id || !name || !email || !phone) continue;
        newLeads.push({ id, name, email, phone, notes });
      }
      setLeads((prev) => [...prev, ...newLeads]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-800">Buyer Leads</h1>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="csvImport"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-md text-gray-700 transition-colors duration-200"
              title="Import CSV"
            >
              Import CSV
            </label>
            <input
              type="file"
              id="csvImport"
              accept=".csv"
              onChange={importCSV}
              className="hidden"
            />
            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
              title="Export CSV"
            >
              Export CSV
            </button>
          </div>
        </section>

        <section>
          {filteredLeads.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Image
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
                alt="No leads"
                className="mx-auto mb-4 max-w-xs rounded-lg opacity-70"
                loading="lazy"
                width={150}
                height={150}
              />
              <p>No leads found. Try adding some!</p>
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-200 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2">Name</th>
                  <th className="border border-gray-300 px-3 py-2">Email</th>
                  <th className="border border-gray-300 px-3 py-2">Phone</th>
                  <th className="border border-gray-300 px-3 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(({ id, name, email, phone, notes }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border border-gray-300 px-3 py-2">{name}</td>
                    <td className="border border-gray-300 px-3 py-2">{email}</td>
                    <td className="border border-gray-300 px-3 py-2">{phone}</td>
                    <td className="border border-gray-300 px-3 py-2">{notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
