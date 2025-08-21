import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn how to use the Restaurant Management Dashboard
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Getting Started */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                Quick start guide to help you get up and running with the dashboard.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Setting up your restaurant profile</li>
                <li>• Configuring menu items</li>
                <li>• Managing staff accounts</li>
                <li>• Initial inventory setup</li>
              </ul>
            </div>

            {/* Dashboard Overview */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
              <p className="text-muted-foreground mb-4">
                Understanding the main dashboard and key metrics.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Real-time sales data</li>
                <li>• Order management</li>
                <li>• Performance analytics</li>
                <li>• Staff monitoring</li>
              </ul>
            </div>

            {/* Inventory Management */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
              <p className="text-muted-foreground mb-4">
                Track stock levels, manage suppliers, and handle ordering.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Adding inventory items</li>
                <li>• Setting up suppliers</li>
                <li>• Automated reordering</li>
                <li>• Waste tracking</li>
              </ul>
            </div>

            {/* Analytics & Reports */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">Analytics & Reports</h2>
              <p className="text-muted-foreground mb-4">
                Generate insights and reports for better decision making.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Sales reports</li>
                <li>• Inventory analytics</li>
                <li>• Staff performance</li>
                <li>• Custom reports</li>
              </ul>
            </div>

            {/* Kitchen Display System */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">Kitchen Display System</h2>
              <p className="text-muted-foreground mb-4">
                Streamline kitchen operations with digital order displays.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Order queue management</li>
                <li>• Cooking timers</li>
                <li>• Station assignments</li>
                <li>• All-day items</li>
              </ul>
            </div>

            {/* POS Integration */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4">POS Integration</h2>
              <p className="text-muted-foreground mb-4">
                Connect with point-of-sale systems for seamless operations.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Order synchronization</li>
                <li>• Payment processing</li>
                <li>• Customer management</li>
                <li>• Receipt generation</li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn-outline px-4 py-2 rounded-lg">
                Dashboard
              </Link>
              <Link href="/inventory" className="btn-outline px-4 py-2 rounded-lg">
                Inventory
              </Link>
              <Link href="/orders" className="btn-outline px-4 py-2 rounded-lg">
                Orders
              </Link>
              <Link href="/analytics" className="btn-outline px-4 py-2 rounded-lg">
                Analytics
              </Link>
              <Link href="/kds" className="btn-outline px-4 py-2 rounded-lg">
                KDS
              </Link>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}