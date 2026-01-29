export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-brand-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl font-semibold gradient-text">Loading...</p>
        </div>
      </div>
    );
  }
  