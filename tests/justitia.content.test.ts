import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const read = (file: string) => readFileSync(resolve(projectRoot, file), "utf8");
const appSource = read("client/src/App.tsx");
const siteSource = read("client/src/pages/Site.tsx");
const activeFiles = [
  "client/src/App.tsx",
  "client/src/main.tsx",
  "client/src/components/ErrorBoundary.tsx",
  "client/src/components/ui/button.tsx",
  "client/src/components/ui/card.tsx",
  "client/src/contexts/ThemeContext.tsx",
  "client/src/index.css",
  "client/src/lib/utils.ts",
  "client/src/pages/NotFound.tsx",
  "client/src/pages/Site.tsx",
  "client/index.html",
  "vite.config.ts",
  "vitest.config.ts",
  "package.json",
];
const activeSource = activeFiles.map(read).join("\n");

describe("Justitia static website safeguards", () => {
  it("registers every required public route", () => {
    for (const route of [
      "/about",
      "/what-we-do",
      "/where-we-work",
      "/impact",
      "/legal-help",
      "/get-involved",
      "/donate",
      "/stories",
      "/resources",
      "/contact",
    ]) {
      expect(appSource).toContain(`path="${route}"`);
    }
  });

  it("keeps legal-help and donation boundaries explicit", () => {
    expect(siteSource).toContain("does not provide a secure case-management portal");
    expect(siteSource).toContain("Donation processing is not activated.");
    expect(siteSource).toContain("Awaiting verified data");
    expect(siteSource).toContain("does not guarantee acceptance of a case");
  });

  it("uses the confirmed Justitia contact details consistently", () => {
    expect(siteSource).toContain("ykbh.justitia@gmail.com");
    expect(siteSource).toContain("+62-812-3617-9074");
    expect(siteSource).toContain(
      "Jalan Samratulangi II, No. 33, Kec. Kelapa Lima, Kel. Kelapa Lima, Kupang, NTT, Indonesia, 85228"
    );
    expect(siteSource).not.toContain("info@justitia-ntt.org");
    expect(siteSource).not.toContain("+62 380 123456");
    expect(siteSource).not.toContain("Jl. El Tari II");
  });

  it("keeps the active application independent of Manus and server services", () => {
    for (const forbidden of [
      "vite-plugin-manus-runtime",
      "@trpc/",
      "api/trpc",
      "sessionStorage",
      "OAuth",
      "oauth",
      "Express",
      "express",
      "Drizzle",
      "drizzle",
      "mysql",
      "MySQL",
      "@aws-sdk",
      "storageProxy",
      "BUILT_IN_FORGE",
      "DATABASE_URL",
      "JWT_SECRET",
      "VITE_APP_ID",
    ]) {
      expect(activeSource).not.toContain(forbidden);
    }
  });
});
