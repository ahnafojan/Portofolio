import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-nb-bg px-6 text-nb-text">
      <Card variant="yellow" className="max-w-xl text-center">
        <p className="font-mono text-xs font-bold uppercase text-nb-muted">404</p>
        <h1 className="nb-h2 mt-3 font-heading font-black">Page not found</h1>
        <p className="mt-3 text-sm text-nb-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-6 flex justify-center">
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Card>
    </main>
  );
}
