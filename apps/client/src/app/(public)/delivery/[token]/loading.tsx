export default function DeliveryLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
          <div className="rounded-md border p-4 space-y-2">
            <div className="h-3 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
          <div className="rounded-md border divide-y">
            <div className="px-4 py-3">
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-4 py-3 flex justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                </div>
                <div className="h-4 bg-muted rounded w-12" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-[360px] bg-muted rounded-md" />
          <div className="h-11 bg-muted rounded-md" />
        </div>
      </div>
    </div>
  );
}
