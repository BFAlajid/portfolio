import type { Metadata } from "next";
import { config } from "@/data/config";
import ApproachContent from "./approach-content";

export const metadata: Metadata = {
  title: `Engineering Approach | ${config.author}`,
  description: `Engineering philosophy and principles that guide how ${config.author} designs, builds, and ships production software.`,
  openGraph: {
    title: `Engineering Approach | ${config.author}`,
    description: `Engineering philosophy and principles that guide how ${config.author} designs, builds, and ships production software.`,
    url: `${config.site}/approach`,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Engineering approach preview",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <ApproachContent />;
}
