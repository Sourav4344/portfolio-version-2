export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    </div>
  );
}
