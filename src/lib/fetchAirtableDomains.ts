export interface AirtableDomain {
  id: string;
  [key: string]: any;
  vaulted?: boolean;
}

export interface AirtableDomainResult {
  active: AirtableDomain[];
  vaulted: AirtableDomain[];
  all: AirtableDomain[];
}

export async function fetchAirtableDomains(): Promise<AirtableDomainResult> {
  const res = await fetch("http://localhost:3001/api/domains");
  const data = await res.json();

  const allDomains: AirtableDomain[] = data.data.map((record: any) => ({
    id: record.id,
    ...record.fields,
  }));

  const active = allDomains.filter((d) => !d.vaulted);
  const vaulted = allDomains.filter((d) => d.vaulted);

  return { active, vaulted, all: allDomains };
} 