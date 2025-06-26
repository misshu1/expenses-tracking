import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request}) => {
	const data = await request.json();
	// TODO: Add DB logic here
	return new Response(
		JSON.stringify({success: true, type: "expense", data}),
		{
			status: 200,
			headers: {"Content-Type": "application/json"},
		},
	);
};
