"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// --- Schema ---
export const BuyerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().regex(/^\d{10,15}$/, "Phone must be 10–15 digits"),
    city: z.string().min(1, "City is required"),
    propertyType: z.enum(["Apartment", "Villa", "Plot"]),
    bhk: z.string().optional(),
    purpose: z.string().min(1, "Purpose is required"),
    budgetMin: z.string().optional(),
    budgetMax: z.string().optional(),
    timeline: z.string().min(1, "Timeline is required"),
    source: z.string().min(1, "Source is required"),
    notes: z.string().optional(),
    tags: z.string().optional(),
    status: z.string()
  })
  .refine(
    (data) =>
      !(data.propertyType === "Apartment" || data.propertyType === "Villa") ||
      !!data.bhk,
    { message: "BHK is required for Apartment/Villa", path: ["bhk"] }
  )
  .refine(
    (data) =>
      !data.budgetMin ||
      !data.budgetMax ||
      Number(data.budgetMax) >= Number(data.budgetMin),
    {
      message: "Max budget must be ≥ Min budget",
      path: ["budgetMax"],
    }
  );

type BuyerForm = z.infer<typeof BuyerSchema>;

export default function NewBuyerPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoaoding, setIsLoaoding] = useState(false);
  const [form, setForm] = useState<BuyerForm>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    propertyType: "Apartment",
    bhk: "",
    purpose: "",
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    source: "",
    notes: "",
    tags: "",
    status: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const result = BuyerSchema.safeParse(form);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const tagsArray = result.data.tags ? result.data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean) : [];
    const payload = {
      ...result.data,
      tags: tagsArray
    }
     
    if(form) {
      console.log("Form data: ", {payload, userId: session?.user.id});
    }
    setErrors({});
    console.log("✅ Valid submission:", result.data);

    // TODO: API request here
    try {
      setIsLoaoding(true);
        const res = await axios.post("/api/buyers/new", {payload: {
          ...payload,
          budgetMin: Number(payload.budgetMin),
          budgetMax: Number(payload.budgetMax)
        }, userId: session?.user.id});
        if(res.status === 201){
          console.log("Buyer created successfully");
          toast.success("Buyer created successfully");
          router.push("/buyers");
        }
        console.log("Response:- ", res.data);
    } catch (error) {
        console.log("Error creating the entry in the db", error);
        toast.error("Something went wrong, PLease Try again");
        return;
    }finally{
      setIsLoaoding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-5 border border-gray-700"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-white"
        >
          Create New Buyer
        </motion.h1>

        {[
          { name: "fullName", placeholder: "Full Name" },
          { name: "email", placeholder: "Email (optional)", type: "email" },
          { name: "phone", placeholder: "Phone (10–15 digits)" },
        ].map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              //{@ts-ignore}
              value={form[field.name as keyof BuyerForm] ?? ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors[field.name] && (
              <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
            )}
          </motion.div>
        ))}

        {/* Options field*/}
        {[
          { name: "city", placeholder: "City", options: ["Chandigarh","Mohali"," Zirakpur", "Panchkula", "Other"] },
          { name: "propertyType", placeholder: "PropertyType", options: ["Apartment","Villa","Plot","Office","Retail"] },
          { name: "bhk", placeholder: "BHK", options: ["Studio","One","Two","Three","Four"] },
          { name: "purpose", placeholder: "Purpose", options: ["Buy","Rent"] },
          { name: "timeline", placeholder: "Timeline", options: ["ZeroToThreeMonths","ThreeToSixMonths","SixMonthsPlus","Exploring"] },
          { name: "source", placeholder: "Source", options: ["Website","Referral","Walk_in","Call","Other"] },
          { name: "status", placeholder: "Status", options: ["New","Qualified"," Contacted","Visited","Negotiation","Converted","Dropped"] },

        ].map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <select
            name={field.name}
            value={form[field.name as keyof BuyerForm]}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-900/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
            ${!form[field.name as keyof BuyerForm] ? "text-gray-200 opacity-60" : "text-white"}`}
                  >
              <option className="text-gray-400" value="" >
                {`-- Select ${field.placeholder} --`}
              </option>
              {field.options.map(item => {
                return <option className="bg-gray-900 hover:bg-gray-700" key={item} value={item}>{item}</option>
              })}
          </select>
          {errors.propertyType && (
            <p className="text-red-400 text-sm mt-1">{errors.propertyType}</p>
          )}
            {errors[field.name] && (
              <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
            )}
          </motion.div>
        ))}

        {/* Property Type */}
        <input
              type={"text"}
              name={"tags"}
              placeholder={"Tags (comma separated)"}
              //{@ts-ignore}
              value={form.tags}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.tags && (
              <p className="text-red-400 text-sm mt-1">{errors.tags}</p>
            )}

        {/* Budget */}
        <div className="flex gap-3">
          <input
            type="number"
            name="budgetMin"
            placeholder="Min Budget"
            value={form.budgetMin}
            onChange={handleChange}
            className="w-1/2 p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="number"
            name="budgetMax"
            placeholder="Max Budget"
            value={form.budgetMax}
            onChange={handleChange}
            className="w-1/2 p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {errors.budgetMax && (
          <p className="text-red-400 text-sm mt-1">{errors.budgetMax}</p>
        )}

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Submit */}
      <motion.button
      whileHover={!isLoaoding ? { scale: 1.05 } : {}}
      whileTap={!isLoaoding ? { scale: 0.97 } : {}}
      type="submit"
      disabled={isLoaoding}
      className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 rounded-lg font-semibold text-white transition cursor-pointer flex justify-center items-center"
    >
      {isLoaoding ? (
        <div className="flex gap-2 items-center justify-center">
          <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
          Processing...
        </div>
      ) : (
        "Submit"
      )}
    </motion.button>
      </motion.form>
    </div>
  );
}
