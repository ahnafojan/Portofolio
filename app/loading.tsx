import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-nb-bg px-6 text-nb-text">
      <Loader size="lg" />
    </main>
  );
}
