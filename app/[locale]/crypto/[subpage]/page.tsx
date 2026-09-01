import { notFound } from "next/navigation";
import CryptoView from "@/components/CryptoView";

const SUBPAGES = [
  "overview",
  "orders",
  "addresses",
  "transactions",
  "investment",
  "fixedTerm",
  "safeguarding",
  "settlement",
] as const;

const locales = ["zh-CN", "zh-TW", "en"] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SUBPAGES.map((subpage) => ({ locale, subpage })),
  );
}

export default async function CryptoSubpageRoute({
  params,
}: {
  params: Promise<{ locale: string; subpage: string }>;
}) {
  const { locale, subpage } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  if (!(SUBPAGES as readonly string[]).includes(subpage)) notFound();
  return <CryptoView />;
}
