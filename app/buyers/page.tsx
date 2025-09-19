// app/buyers/page.tsx
import axios from "axios";
import BuyerList from "../components/BuyerList";
import Pagination from "../components/Pagination";

type Props = {
  searchParams: { page?: string };
};

interface Buyer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  propertyType: string;
  bhk: string;
  purpose: string;
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  source: string;
  status: string;
  notes: string;
  tags: string[];
  ownerId: string;
  updatedAt: string;
  createdAt: string;
}


export default async function BuyersPage({ searchParams }: Props) {
  const page = await parseInt(searchParams.page || "1", 10);
  const pageSize = 10;

  // 🔹 Replace this with DB query in real app
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`,
    { cache: "no-store" } // ensures SSR fresh fetch
  );
  const posts = await res.json();

  const myres = await axios.get(`${process.env.NEXTAUTH_URL}/api/buyers`);
  console.log("All buyesr from the db:- ",myres.data.buyers);
  const rawbuyers = myres.data.buyers;


  

  // map posts to Buyer shape (demo)
  const buyers = rawbuyers.map((p: Buyer) => ({
    id: String(p.id),
    name: p.fullName.slice(0, 15),
    phone: `+91${p.phone}`,
    city: p.city,
    propertyType: p.propertyType,
    budgetMin: p.budgetMin,
    budgetMax: p.budgetMax,
    timeline: p.timeline,
    status: p.status,
    updatedAt: p.updatedAt,
  }));

  // JSONPlaceholder always has 100 posts
  const total = 50;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6">
      <BuyerList buyers={buyers} />
      <div className="flex justify-center gap-2 mt-6">
        <Pagination page={page} totalPages={totalPages}/>
        {/* {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          console.log("P:- ", p);
          return (
            <a
              key={p}
              href={`/buyers?page=${p}`}
              className={`px-3 py-1 rounded ${
                page === p ? "bg-white text-black" : "bg-black text-white border border-white"
              }`}
            >
              {p}
            </a>
          );
        })} */}
      </div>
    </div>
  );
}
