import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Puzzle } from 'lucide-react';

/**
 * RelatedIntegrationsCard
 * 
 * A React component that suggests related integration pages based on blog content.
 * Parses the current blog slug to infer context and recommends 3 relevant integrations.
 * 
 * Usage:
 * <RelatedIntegrationsCard 
 *   currentSlug="understanding-edi-214-shipment-status"
 *   integrationData={integrationDetails}
 * />
 * 
 * @param currentSlug - The slug of the current blog post
 * @param integrationData - Array of integration detail objects
 */

interface Integration {
  slug: string;
  systemA: string;
  systemB: string;
  friction: string;
  solution: string;
}

interface RelatedIntegrationsCardProps {
  currentSlug: string;
  integrationData: Integration[];
  maxSuggestions?: number;
}

// Keyword mappings for context inference
type KeywordMap = Record<string, string[]>;

const CONTEXT_KEYWORDS: KeywordMap = {
  // Customs and Trade
  customs: ['descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge', 'isf-10-importer-security-filing'],
  tariff: ['descartes-to-netsuite-customs-bridge', 'hts-harmonized-tariff-schedule'],
  hts: ['descartes-to-netsuite-customs-bridge', 'hts-harmonized-tariff-schedule'],
  duty: ['descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge'],
  entry: ['descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge'],
  import: ['descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge', 'isf-10-importer-security-filing'],
  
  // EDI and Document Processing
  edi: ['edi-document-normalization-services', 'edi-214-transportation-carrier-shipment-status'],
  '214': ['edi-214-transportation-carrier-shipment-status', 'edi-document-normalization-services'],
  '210': ['edi-document-normalization-services', 'mercurygate-to-oracle-integration'],
  document: ['edi-document-normalization-services', 'bill-of-lading-consignee-field'],
  status: ['edi-214-transportation-carrier-shipment-status', 'blueyonder-to-dynamics365-normalization'],
  
  // Freight and Transportation
  freight: ['mercurygate-to-oracle-integration', 'blueyonder-to-dynamics365-normalization', 'freightpop-to-netsuite-normalization'],
  shipment: ['edi-214-transportation-carrier-shipment-status', 'blueyonder-to-dynamics365-normalization'],
  carrier: ['mercurygate-to-oracle-integration', 'blueyonder-to-dynamics365-normalization'],
  tms: ['mercurygate-to-oracle-integration', 'blueyonder-to-dynamics365-normalization'],
  
  // Warehouse and Inventory
  warehouse: ['3pl-central-to-dynamics365-bridge', 'manhattan-to-sap-normalization'],
  wms: ['manhattan-to-sap-normalization', '3pl-central-to-dynamics365-bridge'],
  inventory: ['manhattan-to-sap-normalization', '3pl-central-to-dynamics365-bridge'],
  '3pl': ['3pl-central-to-dynamics365-bridge'],
  extensiv: ['3pl-central-to-dynamics365-bridge'],
  
  // ERP Systems
  netsuite: ['cargowise-to-netsuite-data-bridge', 'descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge'],
  sap: ['cargowise-to-sap-integration', 'manhattan-to-sap-normalization', 'motive-to-sap-ifta-normalization'],
  dynamics: ['blueyonder-to-dynamics365-normalization', '3pl-central-to-dynamics365-bridge'],
  'd365': ['blueyonder-to-dynamics365-normalization', '3pl-central-to-dynamics365-bridge'],
  'business-central': ['cargowise-to-dynamics-bc-bridge'],
  quickbooks: ['magaya-to-quickbooks-bridge', 'kuebix-to-quickbooks-bridge', 'roserocket-to-quickbooks-bridge'],
  qb: ['magaya-to-quickbooks-bridge', 'kuebix-to-quickbooks-bridge'],
  sage: ['shipstation-to-sage-normalization'],
  oracle: ['mercurygate-to-oracle-integration'],
  
  // Logistics Platforms
  cargowise: ['cargowise-to-netsuite-data-bridge', 'cargowise-to-sap-integration', 'cargowise-to-dynamics-bc-bridge'],
  wisetech: ['cargowise-to-netsuite-data-bridge', 'cargowise-to-sap-integration'],
  descartes: ['descartes-to-netsuite-customs-bridge'],
  flexport: ['flexport-to-netsuite-bridge'],
  magaya: ['magaya-to-quickbooks-bridge'],
  mercurygate: ['mercurygate-to-oracle-integration'],
  blueyonder: ['blueyonder-to-dynamics365-normalization'],
  'blue-yonder': ['blueyonder-to-dynamics365-normalization'],
  manhattan: ['manhattan-to-sap-normalization'],
  shipstation: ['shipstation-to-sage-normalization'],
  freightpop: ['freightpop-to-netsuite-normalization'],
  motive: ['motive-to-sap-ifta-normalization'],
  eld: ['motive-to-sap-ifta-normalization'],
  kuebix: ['kuebix-to-quickbooks-bridge'],
  'rose-rocket': ['roserocket-to-quickbooks-bridge'],
  
  // Technical Concepts
  api: ['netsuite-restlet-integration', 'netsuite-suitetalk-soap-api'],
  soap: ['netsuite-suitetalk-soap-api'],
  rest: ['netsuite-restlet-integration'],
  restlet: ['netsuite-restlet-integration'],
  idoc: ['sap-idoc-intermediate-document', 'sap-idoc-reference-qualifier', 'sap-bgm02-message-name'],
  's4-hana': ['clean-logistics-data-for-sap-s4hana', 'manhattan-to-sap-normalization'],
  s4hana: ['clean-logistics-data-for-sap-s4hana'],
  integration: ['cargowise-to-netsuite-data-bridge', 'edi-document-normalization-services'],
  normalize: ['clean-logistics-data-for-sap-s4hana', 'edi-document-normalization-services'],
  
  // Financial/Accounting
  invoice: ['edi-document-normalization-services', 'mercurygate-to-oracle-integration'],
  ap: ['mercurygate-to-oracle-integration', '3pl-central-to-dynamics365-bridge'],
  'accounts-payable': ['mercurygate-to-oracle-integration'],
  billing: ['3pl-central-to-dynamics365-bridge', 'magaya-to-quickbooks-bridge'],
  
  // eCommerce
  ecommerce: ['shipstation-to-sage-normalization'],
  shopify: ['shipstation-to-sage-normalization'],
  amazon: ['shipstation-to-sage-normalization'],
  
  // Document Types
  bol: ['bill-of-lading-consignee-field', 'house-bill-of-lading', 'master-bill-of-lading'],
  'bill-of-lading': ['bill-of-lading-consignee-field', 'house-bill-of-lading', 'master-bill-of-lading'],
  awb: ['air-waybill'],
  'air-waybill': ['air-waybill'],
  
  // Trade Terms
  incoterms: ['incoterms-international-commerce-terms'],
  fob: ['incoterms-international-commerce-terms'],
  cif: ['incoterms-international-commerce-terms'],
  ddp: ['incoterms-international-commerce-terms'],
  
  // Compliance
  isf: ['isf-10-importer-security-filing'],
  '10+2': ['isf-10-importer-security-filing'],
  compliance: ['isf-10-importer-security-filing', 'hts-harmonized-tariff-schedule'],
};

// Category-based fallbacks when no keywords match
const CATEGORY_FALLBACKS: Record<string, string[]> = {
  customs: ['descartes-to-netsuite-customs-bridge', 'flexport-to-netsuite-bridge', 'isf-10-importer-security-filing'],
  edi: ['edi-document-normalization-services', 'edi-214-transportation-carrier-shipment-status'],
  warehouse: ['manhattan-to-sap-normalization', '3pl-central-to-dynamics365-bridge'],
  freight: ['mercurygate-to-oracle-integration', 'blueyonder-to-dynamics365-normalization'],
  integration: ['cargowise-to-netsuite-data-bridge', 'edi-document-normalization-services', 'clean-logistics-data-for-sap-s4hana'],
};

export function RelatedIntegrationsCard({
  currentSlug,
  integrationData,
  maxSuggestions = 3,
}: RelatedIntegrationsCardProps) {
  const relatedIntegrations = useMemo(() => {
    const slugLower = currentSlug.toLowerCase();
    const matchedSlugs = new Set<string>();
    
    // Extract keywords from slug
    const keywords = Object.keys(CONTEXT_KEYWORDS).filter(keyword => 
      slugLower.includes(keyword.toLowerCase())
    );
    
    // Collect matching integration slugs
    keywords.forEach(keyword => {
      CONTEXT_KEYWORDS[keyword].forEach(integrationSlug => {
        matchedSlugs.add(integrationSlug);
      });
    });
    
    // Map to integration objects
    let suggestions = Array.from(matchedSlugs)
      .map(slug => integrationData.find(i => i.slug === slug))
      .filter((i): i is Integration => i !== undefined);
    
    // If not enough matches, add fallbacks from category detection
    if (suggestions.length < maxSuggestions) {
      let category: string | null = null;
      
      if (keywords.some(k => ['customs', 'tariff', 'hts', 'duty', 'entry', 'import'].includes(k))) {
        category = 'customs';
      } else if (keywords.some(k => ['edi', '214', '210', 'document'].includes(k))) {
        category = 'edi';
      } else if (keywords.some(k => ['warehouse', 'wms', 'inventory', '3pl'].includes(k))) {
        category = 'warehouse';
      } else if (keywords.some(k => ['freight', 'shipment', 'carrier', 'tms'].includes(k))) {
        category = 'freight';
      }
      
      if (category && CATEGORY_FALLBACKS[category]) {
        CATEGORY_FALLBACKS[category].forEach(fallbackSlug => {
          if (!matchedSlugs.has(fallbackSlug) && suggestions.length < maxSuggestions) {
            const fallback = integrationData.find(i => i.slug === fallbackSlug);
            if (fallback) {
              suggestions.push(fallback);
            }
          }
        });
      }
    }
    
    // Ultimate fallback: most popular integrations
    if (suggestions.length === 0) {
      const popularSlugs = [
        'cargowise-to-netsuite-data-bridge',
        'edi-document-normalization-services',
        'clean-logistics-data-for-sap-s4hana'
      ];
      suggestions = popularSlugs
        .map(slug => integrationData.find(i => i.slug === slug))
        .filter((i): i is Integration => i !== undefined);
    }
    
    return suggestions.slice(0, maxSuggestions);
  }, [currentSlug, integrationData, maxSuggestions]);

  if (relatedIntegrations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Puzzle className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Related Integration Solutions
        </h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Explore how DocStandard solves data integration challenges for platforms mentioned in this article:
      </p>
      
      <div className="space-y-3">
        {relatedIntegrations.map((integration) => (
          <Link
            key={integration.slug}
            href={`/integration/${integration.slug}`}
            className="group block bg-white rounded-lg p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {integration.systemA}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {integration.systemB}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {integration.solution}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <Link 
          href="/integration"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
        >
          View all integrations
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// Export the keyword map for testing or extension
export { CONTEXT_KEYWORDS, CATEGORY_FALLBACKS };

// Default export for dynamic imports
export default RelatedIntegrationsCard;
