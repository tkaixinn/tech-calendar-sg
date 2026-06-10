"use client";

import { useEffect, useState } from "react";
import { PLASMIC } from "@/lib/plasmic-init";
import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";

export default function PlasmicBanner() {
  const [plasmicData, setPlasmicData] = useState<any>(null);

  useEffect(() => {
    PLASMIC.fetchComponentData("TechCalendarBanner").then(setPlasmicData);
  }, []);

  if (!plasmicData) return null;

  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component="TechCalendarBanner" />
    </PlasmicRootProvider>
  );
}