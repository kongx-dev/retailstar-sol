/**
 * Fetches domain data from Airtable
 * @returns {Promise<Array>} Array of Airtable records with id and fields
 */
export async function fetchAirtableDomains() {
  const res = await fetch("http://localhost:3001/api/domains");
  const data = await res.json();

  return data.data.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
} 