import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your operations
        </p>
      </section>

      {/* Stats Grid */}
      <section aria-label="Key metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="sr-only">Total orders: </span>0
              </div>
              <p className="text-muted-foreground text-xs mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Riders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="sr-only">Active riders: </span>0
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="sr-only">Pending assignments: </span>0
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                Awaiting rider
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section aria-label="Recent activity">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No recent activity to display
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
