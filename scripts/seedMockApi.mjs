import { initialProducts } from '../src/data/initialProducts.js';

const API_URL = 'https://6ae3ecaa933120ae20f94e1c.mockapi.io/gearpulse';

async function seed() {
  console.log(`Starting seeding ${initialProducts.length} products to ${API_URL}...`);

  for (const product of initialProducts) {
    // Clone product and exclude id if we want MockAPI to generate it, or include it
    const { id, ...payload } = product;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`Failed to post "${product.name}": ${response.status} ${response.statusText}`);
      } else {
        const data = await response.json();
        console.log(`✓ [${data.id}] Created: ${data.name}`);
      }
    } catch (err) {
      console.error(`Error posting "${product.name}":`, err.message);
    }
  }

  console.log('Seeding finished!');
}

seed();
