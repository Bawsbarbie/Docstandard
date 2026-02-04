"use client"

import type { ProcessBlock } from "@/lib/pseo/types"
import { TechnicalProcess } from "@/components/pseo/TechnicalProcess"

interface ProcessStepsProps {
  process?: ProcessBlock
}

export function ProcessSteps({ process }: ProcessStepsProps) {
  return <TechnicalProcess process={process} />
}
