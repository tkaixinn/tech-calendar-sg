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
    <div className="px-6 pb-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-[#f6efe5] shadow-[0_18px_50px_rgba(194,151,108,0.12)]">
        <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
          <PlasmicComponent component="TechCalendarBanner" />
        </PlasmicRootProvider>
      </div>
    </div>
  );
}