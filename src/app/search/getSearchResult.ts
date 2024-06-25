import { backendUrl } from "@/lib/exportEnvs";

export async function getSearchResult({ query }: { query: string }) {
	const res = await fetch(`${backendUrl}/api/v1/user/search?query=${query}`)
	return res.json()
}
