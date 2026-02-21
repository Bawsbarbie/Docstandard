
import React from 'react';
import Link from 'next/link';

// Helper function to generate slugs
const toSlug = (str: string) => str.toLowerCase().replace(/\\s+/g, '-');

// Static list of technical verticals/solutions.
// In a real-world scenario, this might come from a CMS or a dedicated data file.
const ALL_SOLUTIONS = [
  { name: 'Finance Solutions', slug: 'finance' },
  { name: 'Customs Declarations', slug: 'customs' },
  { name: 'Logistics Management', slug: 'logistics' },
  { name: 'Warehousing', slug: 'warehousing' },
  { name: 'Supply Chain Optimization', slug: 'supply-chain' },
  { name: 'Freight Forwarding', slug: 'freight-forwarding' },
  { name: 'Trade Compliance', slug: 'trade-compliance' },
];

interface ContextualSidebarProps {
  /** The city for which to display related solutions, e.g., "Rotterdam" */
  currentCity: string;
  /** The slug of the current page to exclude it from the list, e.g., "/rotterdam/finance" */
  currentSlug: string;
}

const ContextualSidebar: React.FC<ContextualSidebarProps> = ({
  currentCity,
  currentSlug,
}) => {
  const citySlug = toSlug(currentCity);

  // Generate potential solution links for the given city
  const relatedSolutions = ALL_SOLUTIONS.map(solution => ({
    name: solution.name,
    href: `/${citySlug}/${solution.slug}`,
  }))
  // Exclude the current page
  .filter(solution => solution.href !== currentSlug)
  // Take the top 5
  .slice(0, 5);

  if (relatedSolutions.length === 0) {
    return null; // Don't render the sidebar if there's nothing to show
  }

  return (
    <aside className="border border-gray-700 bg-gray-900 p-6 rounded-lg">
      <h3 className="font-bold text-xl mb-4 text-white">Related Solutions in {currentCity}</h3>
      <ul className="space-y-3">
        {relatedSolutions.map((solution) => (
          <li key={solution.href}>
            <Link href={solution.href} className="text-gray-300 hover:text-white hover:underline">
                {solution.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ContextualSidebar;
