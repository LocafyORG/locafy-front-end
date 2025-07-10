const fetchAddressSuggestions = async (query: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );
  return await res.json();
};