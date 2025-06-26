import type {APIRoute} from "astro";
import {fetchExchangeRates} from "@utils/currencyUtils";

export const GET: APIRoute = async ({url}) => {
	const base = (url.searchParams.get("base") || "RON") as
		| "RON"
		| "EUR"
		| "USD";
	try {
		const rates = await fetchExchangeRates(base);
		return new Response(JSON.stringify({rates}), {
			status: 200,
			headers: {"Content-Type": "application/json"},
		});
	} catch (e) {
		return new Response(JSON.stringify({error: "Failed to fetch rates"}), {
			status: 500,
		});
	}
};
