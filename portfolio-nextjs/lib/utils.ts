import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScroll(targetId: string) {
  const element = document.getElementById(targetId.replace("#", ""));
  if (element) {
    const offsetTop = element.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}
