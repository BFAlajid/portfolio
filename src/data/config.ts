const config = {
  title: "Basil Alajid | Full Stack Developer",
  description: {
    long: "Full Stack Developer specializing in React, TypeScript, Next.js, and Test Automation. Building production systems at Accenture for Singapore Defence. Open to US remote roles.",
    short:
      "Full Stack Developer. React, TypeScript, Next.js, Playwright. Open to US remote roles.",
  },
  keywords: [
    "Basil Alajid",
    "full stack developer",
    "React developer",
    "TypeScript",
    "Next.js",
    "Playwright",
    "test automation",
    "software engineer",
    "remote developer",
    "Philippines",
  ],
  author: "Basil Alajid",
  email: "basilfrancis.alajid@yahoo.com",
  site: "https://basilalajid.dev",

  githubUsername: "BFAlajid",
  githubRepo: "portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/basil-francis-alajid-4a8413179",
    instagram: "",
    facebook: "",
    github: "https://github.com/BFAlajid",
  },
};
export { config };
