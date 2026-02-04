"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { IntroBlock } from "@/components/pseo/IntroBlock"
import { PainSection } from "@/components/pseo/PainSection"

interface HeroProps {
  intro: BlockItem
  pain: BlockItem
  intentName: string
  imageUrl?: string
  integrationPair?: string
  useCase?: string
  technicalSpecs?: string
  operationalRequirements?: string[]
  painPoints?: string[]
  valueLogic?: string
}

export function Hero({
  intro,
  pain,
  intentName,
  imageUrl,
  integrationPair,
  useCase,
  technicalSpecs,
  operationalRequirements,
  painPoints,
  valueLogic,
}: HeroProps) {
  return (
    <>
      <IntroBlock
        content={intro}
        cityName="Global"
        serviceName={intentName}
        imageUrl={imageUrl}
        integrationPair={integrationPair}
        useCase={useCase}
        technicalSpecs={technicalSpecs}
        operationalRequirements={operationalRequirements}
      />
      <PainSection content={pain} painPoints={painPoints} valueLogic={valueLogic} />
    </>
  )
}
