import { Link, Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

export function RootLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link
            to="/"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            AI Blog
          </Link>
          <nav className="flex items-center gap-1">
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
