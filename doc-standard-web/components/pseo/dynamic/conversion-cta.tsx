"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { CTASection } from "@/components/pseo/CTASection"

interface ConversionCtaProps {
  cta: BlockItem
}

export function ConversionCta({ cta }: ConversionCtaProps) {
  return <CTASection content={cta} />
}
