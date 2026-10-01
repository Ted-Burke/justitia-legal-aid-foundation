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
  "client/src/contexts/LanguageContext.tsx",
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
    expect(siteSource).toContain("awaiting verification");
    expect(siteSource).toContain("An enquiry is not an acceptance decision");
    expect(siteSource).toContain("The initial contact with Justitia may be via phone, post or in-person");
    expect(siteSource).toContain("based on this initial communication");
  });

  it("uses the confirmed Justitia contact details consistently", () => {
    expect(siteSource).toContain("ykbh.justitia@gmail.com");
    expect(siteSource).toContain("+62-812-3617-9074");
    expect(siteSource).toContain(
      "Jalan Samratulangi II, No. 33"
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
      "MutationObserver",
      "createTreeWalker",
      "translateBody",
      "originalTextByNode",
    ]) {
      expect(activeSource).not.toContain(forbidden);
    }
  });

  it("keeps the English/Bahasa Indonesia switcher in the shared header", () => {
    expect(siteSource).toContain('aria-label="Language selection: English or Indonesian"');
    expect(siteSource).toContain('aria-label="Select English"');
    expect(siteSource).toContain('aria-label="Select Indonesian"');
    expect(siteSource).toContain('>English</button>');
    expect(siteSource).toContain('>Indonesian</button>');
    expect(siteSource).not.toContain('>EN</button>');
    expect(siteSource).not.toContain('>ID</button>');
    expect(siteSource).toContain("function Shell");
    expect(activeSource).toContain("LanguageProvider");
    expect(activeSource).toContain('localStorage.getItem("justitia-language")');
    expect(activeSource).toContain('localStorage.setItem("justitia-language", next)');
    expect(activeSource).toContain("Keadilan Dapat Diakses oleh Semua Orang");
    expect(activeSource).toContain("document.documentElement.lang");
    expect(siteSource).toContain("type Copy = { en: string; id?: string }");
    expect(siteSource).toContain("function T({ text }: { text: Copy })");
  });

  it("contains the approved Home-page structure without unverified figures", () => {
    for (const phrase of [
      "Justice Is Accessible to",
      "Justice, truth, democracy and peace in NTT",
      "How Justitia Helps",
      "Who Justitia Serves",
      "Justitia works to strengthen access to justice and support the rights and wellbeing of people and communities in NTT through the following initiatives:",
      "Legal Aid & Representation",
      "Human & Community Rights",
      "Women’s Rights & Equality",
      "Community Empowerment – through Education and Economics",
      "The realization of an NTT society that is gender-sensitive, just, equitable, inclusive, and peaceful, and that upholds human rights.",
      "Verified impact information will be added as reliable data becomes available.",
      "Donate Safely",
      "Support Justitia's Work",
      "Promote the Justitia Website",
    ]) {
      expect(siteSource).toContain(phrase);
    }
    expect(siteSource).not.toContain("1,000");
    expect(siteSource).not.toContain("10,000");
    expect(siteSource).toContain("The organization seeks to keep the cost of legal help as low as possible and may provide consultation, case strategy development, and court representation.");
    expect(siteSource).toContain("Clients are normally asked only to cover necessary local expenses such as transportation and photocopying.");
    expect(siteSource).toContain("When donor funding is not available, staff may work on a volunteer basis.");
    expect(siteSource).not.toContain("A foundation rooted in justice and human rights.");
  });
});
