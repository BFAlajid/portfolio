import type { Metadata } from "next";
import { config } from "@/data/config";
import ProjectsContent from "./projects-content";

export const metadata: Metadata = {
  title: `Projects | ${config.author}`,
  description: `Case studies and technical deep-dives into projects built by ${config.author}.`,
  openGraph: {
    title: `Projects | ${config.author}`,
    description: `Case studies and technical deep-dives into projects built by ${config.author}.`,
    url: `${config.site}/projects`,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Projects preview",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <ProjectsContent />;
}
