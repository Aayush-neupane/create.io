/**
 * Per-template predesigned libraries.
 * Every template owns its components AND its seed content — templates differ
 * in structure and copy, never just color theme.
 */
import type { SectionType } from "@/types/builder";
import type { BespokeProps } from "./minimal-portfolio";
import { seed as seedMinimal, components as compMinimal } from "./minimal-portfolio";
import { seed as seedCreative, components as compCreative } from "./creative-portfolio";
import { seed as seedBusiness, components as compBusiness } from "./professional-business";
import { seed as seedRestaurant, components as compRestaurant } from "./restaurant";
import { seed as seedAgency, components as compAgency } from "./agency";
import { seed as seedSaas, components as compSaas } from "./saas-starter";
import { seed as seedFreelancer, components as compFreelancer } from "./freelancer";
import { seed as seedEvent, components as compEvent } from "./event";

export type { BespokeProps };

const LIBS: Record<string, { seed: Partial<Record<SectionType, Record<string, unknown>>>; components: Record<string, (p: BespokeProps) => React.ReactNode> }> = {
  "minimal-portfolio": { seed: seedMinimal, components: compMinimal },
  "creative-portfolio": { seed: seedCreative, components: compCreative },
  "professional-business": { seed: seedBusiness, components: compBusiness },
  restaurant: { seed: seedRestaurant, components: compRestaurant },
  agency: { seed: seedAgency, components: compAgency },
  "saas-starter": { seed: seedSaas, components: compSaas },
  freelancer: { seed: seedFreelancer, components: compFreelancer },
  event: { seed: seedEvent, components: compEvent },
};

export function templateSeedContent(templateId: string): Partial<Record<SectionType, Record<string, unknown>>> {
  return LIBS[templateId]?.seed ?? {};
}

/** Bespoke signature component for a template section+variant, if one exists. */
export function getBespoke(templateId: string, type: SectionType, variant: string) {
  return LIBS[templateId]?.components[`${type}:${variant}`] ?? null;
}

export function isBespoke(templateId: string, type: SectionType, variant: string): boolean {
  return getBespoke(templateId, type, variant) !== null;
}
