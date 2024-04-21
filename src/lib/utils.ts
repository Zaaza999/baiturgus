import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const {currency = "EUR", notation = "compact"} = options

  const numericPrice = typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice)
}

export function constructMetadata({
  title = 'BaiTurgus - the marketplace for digital assets',
  description = 'BaiTurgus is an open-source marketplace for high-quality digital goods.',
  image = '/baiturgus_transparent.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    metadataBase: new URL('https://baiturgus-rvxc.vercel.app'), //add real site
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
