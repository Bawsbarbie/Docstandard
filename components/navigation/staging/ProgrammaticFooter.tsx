
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

// Helper function to generate slugs
const toSlug = (str: string) => str.toLowerCase().replace(/\\s+/g, '-');

async function getFooterData() {
  const dataPath = path.join(process.cwd(), 'doc-standard-web', 'data', 'pools');

  // --- Column A: Top 10 Core Integrations ---
  const systemsFilePath = path.join(dataPath, 'systems.json');
  const systemsFile = await fs.readFile(systemsFilePath, 'utf8');
  const systemsData: { systemA: string; systemB: string }[] = JSON.parse(systemsFile);

  const allSystems = new Set<string>();
  systemsData.forEach(({ systemA, systemB }) => {
    allSystems.add(systemA);
    allSystems.add(systemB);
  });
  const coreIntegrations = Array.from(allSystems).slice(0, 10);

  // --- Column B: Top 10 Comparison Guides ---
  const comparisonGuides = systemsData.slice(0, 10).map(({ systemA, systemB }) => ({
    name: `${systemA} vs ${systemB}`,
    href: `/comparison/${toSlug(systemA)}-vs-${toSlug(systemB)}`,
  }));

  // --- Column C: Top 5 Global Port Cities ---
  const locationsFilePath = path.join(dataPath, 'locations.json');
  const locationsFile = await fs.readFile(locationsFilePath, 'utf8');
  const locationsData: { city: string }[] = JSON.parse(locationsFile);
  const globalPortCities = locationsData.slice(0, 5);

  // --- Column D: Technical Verticals ---
  const technicalVerticals = [
    { name: 'Finance', href: '/finance' },
    { name: 'Customs', href: '/customs' },
    { name: 'Logistics', href: '/logistics' },
    { name: 'Warehousing', href: '/warehousing' },
    { name: 'Supply Chain', href: '/supply-chain' },
  ];

  return {
    coreIntegrations,
    comparisonGuides,
    globalPortCities,
    technicalVerticals,
  };
}

const ProgrammaticFooter = async () => {
  const {
    coreIntegrations,
    comparisonGuides,
    globalPortCities,
    technicalVerticals,
  } = await getFooterData();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column A */}
          <div>
            <h3 className="font-bold text-lg mb-4">Core Integrations</h3>
            <ul>
              {coreIntegrations.map((system) => (
                <li key={system} className="mb-2">
                  <Link href={`/integration/${toSlug(system)}`} className="hover:text-gray-300">
                    {system}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column B */}
          <div>
            <h3 className="font-bold text-lg mb-4">Comparison Guides</h3>
            <ul>
              {comparisonGuides.map((guide) => (
                <li key={guide.name} className="mb-2">
                  <Link href={guide.href} className="hover:text-gray-300">
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column C */}
          <div>
            <h3 className="font-bold text-lg mb-4">Global Port Cities</h3>
            <ul>
              {globalPortCities.map((location) => (
                <li key={location.city} className="mb-2">
                  <Link href={`/${toSlug(location.city)}`} className="hover:text-gray-300">
                    {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column D */}
          <div>
            <h3 className="font-bold text-lg mb-4">Technical Verticals</h3>
            <ul>
              {technicalVerticals.map((vertical) => (
                <li key={vertical.name} className="mb-2">
                  <Link href={vertical.href} className="hover:text-gray-300">
                    {vertical.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProgrammaticFooter;
