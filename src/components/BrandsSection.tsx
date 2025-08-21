"use client";

export default function BrandsSection() {
  const brands = [
    "Coca-Cola", "Microsoft", "Nike", "P&G", "LANCOME", "zoom", "SONY", "Mercedes-Benz",
    "Coca-Cola", "Microsoft", "Nike", "P&G", "LANCOME", "zoom"
  ];

  return (
    <section className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="overflow-hidden">
          <div className="flex animate-scroll-left space-x-12 items-center">
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="flex-shrink-0 text-white/60 text-xl font-medium hover:text-white/80 transition-colors duration-300"
                style={{ minWidth: 'fit-content' }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
