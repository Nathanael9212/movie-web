"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Search movies, TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
