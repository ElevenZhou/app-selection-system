"use client";

import { useState } from "react";
import type { AppReference, ProductForm, RouteId } from "../../lib/types";
import { bilingualName } from "../../lib/localization";
import { productFormLabel, referenceKindLabel } from "../../lib/taxonomy";

export function ProductIcon({
  title,
  route,
  iconUrl,
  compact = false,
}: {
  title: string;
  route: RouteId;
  iconUrl: string | null;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const className = `product-icon route-${route.toLowerCase()}${compact ? " compact" : ""}`;

  if (iconUrl && !failed) {
    return (
      // Candidate icons can come from many verified App sources, so a fixed Next.js host allowlist is not viable.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={`${title} 图标`}
        className={className}
        height={compact ? 34 : 42}
        loading="lazy"
        referrerPolicy="no-referrer"
        src={iconUrl}
        width={compact ? 34 : 42}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span aria-label={`${title} 生成图标`} className={`${className} generated`}>
      {initials(title)}
    </span>
  );
}

export function ReferenceLinks({
  references,
  compact = false,
}: {
  references: AppReference[];
  compact?: boolean;
}) {
  if (!references.length) return <span className="reference-missing">待补参照产品</span>;

  return (
    <div className={`reference-links${compact ? " compact" : ""}`}>
      <span>参照</span>
      {references.slice(0, compact ? 1 : 3).map((reference) => {
        const target = reference.storeUrl ?? reference.url;
        const destination = storeLabel(reference.store);
        return (
          <a
            aria-label={`打开${relationLabel(reference.relation)} ${bilingualName(reference.name, reference.nameZh)}的${destination}`}
            href={target}
            key={`${reference.name}-${target}`}
            rel="noopener noreferrer"
            target="_blank"
            title={`${relationLabel(reference.relation)} · ${destination} · ${bilingualName(reference.name, reference.nameZh)}`}
          >
            {bilingualName(reference.name, reference.nameZh)}
            <em className={`object-kind kind-${reference.kind}`}>{referenceKindLabel(reference.kind)}</em>
            <i aria-hidden="true">↗</i>
          </a>
        );
      })}
    </div>
  );
}

export function ProductFormBadge({
  form,
  compact = false,
}: {
  form: ProductForm;
  compact?: boolean;
}) {
  return (
    <span className={`product-form-badge form-${form}${compact ? " compact" : ""}`}>
      {productFormLabel(form)}
    </span>
  );
}

function initials(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return Array.from(title.trim()).slice(0, 2).join("").toUpperCase() || "AP";
}

function relationLabel(relation: AppReference["relation"]) {
  return { competitor: "竞品", similar: "相似品", substitute: "替代方案" }[relation];
}

function storeLabel(store: AppReference["store"]) {
  return store === "apple_app_store" ? "App Store" : store === "google_play" ? "Google Play" : "证据来源";
}
