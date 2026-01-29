export default function Loading() {
    return (
      <div className="min-h-screen px-4 md:px-12 py-8">
        <div className="container mx-auto">
          {/* Skeleton Header */}
          <div className="mb-12">
            <div className="h-12 w-64 bg-white/10 rounded-lg shimmer mb-4"></div>
            <div className="h-6 w-96 bg-white/10 rounded-lg shimmer"></div>
          </div>
  
          {/* Skeleton Grid */}
          {[1, 2, 3, 4].map((section) => (
            <section key={section} className="mb-12">
              <div className="h-8 w-48 bg-white/10 rounded-lg shimmer mb-6"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[2/3] bg-white/10 rounded-lg shimmer"></div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }
  