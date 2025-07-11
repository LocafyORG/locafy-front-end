import React, { useState, useEffect, useCallback, useRef } from "react";

type Props = {
  onSelect: (lat: number, lon: number, displayName: string) => void;
  placeholder?: string;
  disableCoords?: boolean;
  value?: string;
};

export const LocationSearchInput: React.FC<Props> = ({
  onSelect,
  placeholder = "Search address...",
  disableCoords = false,
  value,
}) => {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const justSelectedRef = useRef(false);

  // Keep query in sync with value prop
  useEffect(() => {
    if (typeof value === "string" && value !== query) {
      setQuery(value);
    }
  }, [value]);

  const fetchResults = useCallback(async (q: string) => {
    if (!q) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
    );
    const data = await res.json();
    setResults(data);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (justSelectedRef.current) {
      // Skip fetch, reset the flag for future input
      justSelectedRef.current = false;
      return;
    }

    setIsTyping(true);
    const timeout = setTimeout(() => {
      fetchResults(query);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, fetchResults]);

  const handleSelect = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    setQuery(result.display_name);
    setResults([]);
    justSelectedRef.current = true;

    if (disableCoords) {
      onSelect(NaN, NaN, result.display_name);
    } else {
      onSelect(lat, lon, result.display_name);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      {isTyping && <div className="text-sm text-gray-500">Searching...</div>}
      {results.length > 0 && (
        <ul className="absolute top-[100%] z-10 left-0 right-0 max-h-60 overflow-y-auto border bg-white shadow rounded">
          {results.map((result, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(result)}
              className="cursor-pointer hover:bg-blue-100 p-2 text-sm"
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
