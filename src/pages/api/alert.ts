import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const income = Number(url.searchParams.get("income") || 0);
  const spent = Number(url.searchParams.get("spent") || 0);
  if (spent >= income && income > 0) {
    return new Response(
      JSON.stringify({
        alert: true,
        message: "Your expenses have reached or exceeded your monthly income!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return new Response(JSON.stringify({ alert: false }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
