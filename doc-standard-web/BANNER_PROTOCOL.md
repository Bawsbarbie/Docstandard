# DocStandard Authority Banner Protocol (Minimalist)

To maintain a professional "Engineering Veteran" aesthetic while minimizing asset management overhead, we are implementing a **System Banner** strategy for all blog and authority pages.

## 1. The Banner Architecture
Instead of unique cover images for 54 posts, we use 4 high-fidelity "Industry Master Banners."

- **`banner-ops.jpg`** (Cluster 1: Operational Normalization)
- **`banner-data.jpg`** (Cluster 2: Data Cleaning & Extraction)
- **`banner-finance.jpg`** (Cluster 3: Invoice & AP)
- **`banner-logistics.jpg`** (Cluster 4: Logistics & Trade)

## 2. Global Component Implementation
Every blog post will feature a 200px height "Technical Header Banner" at the top of the article.

- **Layout:** Full-width bleed, 20% opacity dark overlay, centered title.
- **Overlay Text:** The post title will render dynamically over the industry-specific banner.

## 3. Cursor Implementation (Copy/Paste)
"Update the blog post template (`app/blog/[slug]/page.tsx`) to include a `<HeaderBanner />` component. 

Logic:
1. Identify the 'Vertical' from the post content or slug.
2. Load the corresponding banner from `/public/images/banners/banner-[vertical].jpg`.
3. Render the Post Title as an H1 overlay on this banner.
4. If no specific vertical is found, default to `banner-general.jpg`.

This removes the need for individual featured images while maintaining a high-authority brand look."
