const config = {
  title: "Basil Francis Alajid | Full Stack Developer | Enterprise Systems & Test Automation",
  description: {
    long: "Full stack developer with 7 years of experience specializing in React, TypeScript, and Next.js. Building enterprise workflow systems, Playwright test automation, and production-grade applications for government and commercial clients.",
    short:
      "Full Stack Developer | 7 years shipping enterprise systems, test automation, React, TypeScript, Next.js.",
  },
  keywords: [
    "Basil Francis Alajid",
    "full stack developer",
    "React developer",
    "TypeScript",
    "Next.js",
    "software engineer",
    "remote developer",
    "Philippines",
  ],
  author: "Basil Francis Alajid",
  email: "basilfrancis.alajid@yahoo.com",
  phone: "(+63) 976-208-6765",
  location: "Cebu City, Philippines",
  site: "https://portfolio-ten-pearl-itp8iqdqjd.vercel.app",

  githubUsername: "BFAlajid",
  githubRepo: "portfolio",
  cacheTTL: 15 * 60 * 1000,

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/basil-francis-alajid-4a8413179",
    github: "https://github.com/BFAlajid",
  },
};
export { config };
