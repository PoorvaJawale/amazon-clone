export default async function ProductPage({ params }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product {id}</h1>
      </div>
    </div>
  );
}
