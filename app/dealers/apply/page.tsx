import type { Metadata } from "next";
import { getPublicConfig } from "@/lib/getPublicConfig";
import DealerApplyForm from "./DealerApplyForm";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Apply for a Booth",
  description: "Apply to exhibit at the Santa Clara Coin Show. Table applications reviewed on a first-come, first-served basis.",
};

export default async function DealerApplyPage() {
  const config = await getPublicConfig();
  return (
    <DealerApplyForm
      showName={config.showName}
      firstShowDate={config.schedule[0]?.date ?? ""}
      contactEmail={config.contactEmail}
      contactPhone={config.contactPhone}
    />
  );
}
