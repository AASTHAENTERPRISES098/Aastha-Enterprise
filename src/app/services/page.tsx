import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ProcessStrip from "@/components/shared/ProcessStrip";
import TrustStrip from "@/components/home/TrustStrip";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: `Aluminium, Glazing, Furniture & Interior Services in ${site.address.city} | ${site.name}`,
  description:
    "Aluminium windows & doors, structural glazing & curtain walls, wooden & modular furniture, false ceiling & interior work — one contractor in Vadodara.",
};

export default function ServicesPage() {
  return (
    <main>
      <div className="mx-auto w-full max-w-site px-6 pt-20 md:px-16 md:pt-32">
        <PageHeader
          label="02 — What we do"
          title="Four crafts,"
          emphasis="one standard"
          lead="From a single window to a full factory façade — one contractor, one bill, one point of responsibility."
        />
      </div>

      <Reveal stagger={0.06} className="mt-14 border-t border-hairline-light">
        {site.services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col items-start gap-6 border-b border-hairline-light px-6 py-8 transition-colors hover:bg-stone/40 sm:flex-row sm:items-center md:px-16"
          >
            <span className="font-display text-h3 font-bold text-stone-muted">
              0{i + 1}
            </span>
            <div className="flex-1">
              <h2 className="font-display text-h3 font-bold leading-tight transition-colors group-hover:text-ember">
                {service.title}
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm text-text-muted">
                {service.short}
              </p>
            </div>
            <div className="w-full shrink-0 overflow-hidden rounded-card sm:w-32">
              <Image
                src={`/images/services/${service.slug}.webp`}
                alt={service.title}
                width={300}
                height={300}
                sizes="128px"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <span
              aria-hidden
              className="hidden text-xl text-ember transition-transform duration-300 group-hover:translate-x-1 sm:block"
            >
              →
            </span>
          </Link>
        ))}
      </Reveal>

      <ProcessStrip
        label="03 — How it works"
        title="Five steps,"
        emphasis="no surprises"
      />

      <TrustStrip label="04 — Trusted by" />

      <CtaBand label="05 — Start a conversation" />
    </main>
  );
}
