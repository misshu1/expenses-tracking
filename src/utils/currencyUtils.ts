export type Currency = "RON" | "EUR" | "USD";

export async function fetchExchangeRates(base: Currency = "RON") {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=RON,EUR,USD`,
  );
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  const data = await res.json();
  return data.rates as Record<Currency, number>;
}

export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency,
  rates: Record<Currency, number>,
) {
  if (from === to) return amount;
  const baseAmount = amount / rates[from];
  return baseAmount * rates[to];
}

export function formatCurrency(amount: number, currency: Currency) {
  return amount.toLocaleString("en-US", { style: "currency", currency });
}
