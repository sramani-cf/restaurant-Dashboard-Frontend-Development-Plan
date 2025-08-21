import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Restaurant Management Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive restaurant operations management system
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href="/dashboard" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Dashboard
              </h2>
              <p className="text-muted-foreground">
                View real-time metrics, sales data, and performance indicators
              </p>
            </div>
          </Link>

          <Link href="/orders" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Orders
              </h2>
              <p className="text-muted-foreground">
                Manage orders, track status, and handle customer requests
              </p>
            </div>
          </Link>

          <Link href="/menu" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Menu Management
              </h2>
              <p className="text-muted-foreground">
                Update menu items, prices, and availability
              </p>
            </div>
          </Link>

          <Link href="/inventory" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Inventory
              </h2>
              <p className="text-muted-foreground">
                Track stock levels, manage suppliers, and handle ordering
              </p>
            </div>
          </Link>

          <Link href="/staff" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Staff Management
              </h2>
              <p className="text-muted-foreground">
                Schedule shifts, manage roles, and track performance
              </p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                Analytics
              </h2>
              <p className="text-muted-foreground">
                Detailed reports, trends, and business insights
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex gap-4">
            <Link 
              href="/auth/login" 
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/docs" 
              className="btn-outline px-6 py-3 rounded-lg font-medium"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Restaurant Management Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}