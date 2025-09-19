"use client"
import { useRouter } from "next/navigation";
const Pagination = ({ page, totalPages}: {page: number, totalPages: number}) => {
  const router = useRouter();
  return (
<nav className="flex items-center gap-x-1" aria-label="Pagination">
  <button type="button" onClick={() => {
    if(page <= 1){
      router.push(`/buyers?page=${1}`)
    }else{
      router.push(`/buyers?page=${page-1}`)
    }
  }} className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 cursor-pointer" aria-label="Previous">
    <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
    <span>Previous</span>
  </button>
  <div className="flex items-center gap-x-1">

    
    {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          console.log("P:- ", p);
          return (
            <button key={p} onClick={() => router.push(`/buyers?page=${p}`)} type="button" className={`min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 cursor-pointer ${page == p ? "bg-white/10" : ""}`} aria-current="page">{p}</button>
          );
        })}
  </div>
  <button type="button" onClick={() => {
    if(page >= totalPages){
      router.push(`/buyers?page=${totalPages}`)
    }else{
      router.push(`/buyers?page=${page+1}`)
    }
  }} className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 cursor-pointer " aria-label="Next">
    <span>Next</span>
    <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  </button>
</nav>
  )
}

export default Pagination
