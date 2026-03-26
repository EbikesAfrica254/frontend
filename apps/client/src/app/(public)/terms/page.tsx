import { Metadata } from "next";
import { PolicyContent } from "../_components/policy-content";
import { getTermsPolicy } from "@/data/get-policy";
import { Header } from "../_components/header";

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function TermsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const policy = await getTermsPolicy(searchParams.v);

  return (
    <>
      <Header />
      <PolicyContent policy={policy} />
    </>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const policy = await getTermsPolicy(searchParams.v);

  return {
    title: `Terms & Conditions (v${policy.version})`,
    description: "Terms and conditions of service for our platform",
    robots: {
      index: false,
      follow: false,
    },
  };
}
