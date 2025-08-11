export async function fetchProducts() {
  const response = await fetch('/api/storage');
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.storage;
}

export async function fetchProductById(id) {
  const products = await fetchProducts();
  return products.find((p) => p.id === Number(id));
}
