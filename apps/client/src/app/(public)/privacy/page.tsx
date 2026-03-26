import { Metadata } from "next";
import { PolicyContent } from "../_components/policy-content";
import { getPrivacyPolicy } from "@/data/get-policy";
import { Header } from "../_components/header";

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function PrivacyPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const policy = await getPrivacyPolicy(searchParams.v);

  return (
    <>
      <Header />
      <PolicyContent policy={policy} />
    </>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const policy = await getPrivacyPolicy(searchParams.v);

  return {
    title: `Privacy Policy (v${policy.version})`,
    description: "Privacy policy for our platform",
    robots: {
      index: false,
      follow: false,
    },
  };
}
