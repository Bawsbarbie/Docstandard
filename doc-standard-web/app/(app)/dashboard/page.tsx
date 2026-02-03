import Link from "next/link"
import { getUserOrders } from "@/lib/actions/upload"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const { data: orders, error } = await getUserOrders()

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage your document processing orders
            </p>
          </div>
          <Link
            href="/upload"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            New Order
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-3xl font-bold">{orders?.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-3xl font-bold">
              {orders?.filter((o) => ["uploaded", "queued", "processing"].includes(o.status))
                .length || 0}
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold">
              {orders?.filter((o) => o.status === "delivered").length || 0}
            </p>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Orders</h2>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!error && (!orders || orders.length === 0) && (
            <div className="p-12 rounded-lg border bg-card text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">No orders yet</p>
              <p className="text-muted-foreground mb-6">
                Upload your first batch of documents to get started
              </p>
              <Link
                href="/upload"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Upload Documents
              </Link>
            </div>
          )}

          {orders && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "failed"
                              ? "bg-red-100 text-red-700"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      {order.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {order.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${(order.price_cents / 100).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.scope}
                      </p>
                      {order.status === "uploaded" && !order.paid_at && (
                        <Link
                          href={`/checkout/${order.id}`}
                          className="mt-2 inline-block px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:opacity-90"
                        >
                          Complete Payment
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
