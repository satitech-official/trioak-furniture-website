"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const fallbackImage = "/images/real/interior-detail.jpg";

function prefixPath(value: string) {
  if (
    !basePath ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value === basePath ||
    value.startsWith(`${basePath}/`)
  ) {
    return value;
  }
  return `${basePath}${value}`;
}

function updateAttribute(element: Element, attribute: string, nextValue: string) {
  const currentValue = element.getAttribute(attribute);
  if (currentValue !== nextValue) element.setAttribute(attribute, nextValue);
}

function fixElement(element: Element) {
  for (const attribute of ["href", "src", "poster", "action"]) {
    const value = element.getAttribute(attribute);
    if (!value) continue;
    updateAttribute(element, attribute, prefixPath(value));
  }

  const srcset = element.getAttribute("srcset");
  if (srcset) {
    const nextSrcset = srcset
      .split(",")
      .map((entry) => {
        const [url, descriptor] = entry.trim().split(/\s+/, 2);
        return `${prefixPath(url)}${descriptor ? ` ${descriptor}` : ""}`;
      })
      .join(", ");
    updateAttribute(element, "srcset", nextSrcset);
  }

  const style = element.getAttribute("style");
  if (style?.includes("url(/")) {
    const nextStyle = style.replace(
      /url\((['"]?)\/(?!\/|trioak-furniture-website\/)/g,
      `url($1${basePath}/`
    );
    updateAttribute(element, "style", nextStyle);
  }
}

export function BasePathGuard() {
  useEffect(() => {
    if (!basePath) return;

    const apply = (root: ParentNode) => {
      if (root instanceof Element) fixElement(root);
      root.querySelectorAll?.("[href],[src],[srcset],[poster],[action],[style]").forEach(fixElement);
    };

    apply(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.target instanceof Element) {
          fixElement(mutation.target);
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) apply(node);
        });
      }
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["href", "src", "srcset", "poster", "action", "style"],
    });

    const onError = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.srcset = "";
      image.src = prefixPath(fallbackImage);
    };

    document.addEventListener("error", onError, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("error", onError, true);
    };
  }, []);

  return null;
}
