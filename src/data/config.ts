const config = {
  title: "Basil Francis Alajid | Full Stack Developer",
  description: {
    long: "Full Stack Software Engineer specializing in React, TypeScript, Next.js, and enterprise systems.",
    short:
      "Full Stack Software Engineer. React, TypeScript, Next.js. Open to global remote roles.",
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
