import { getUserOrdersWithFiles } from "@/lib/actions/upload"
import { OperationsConsole } from "@/components/dashboard/OperationsConsole"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const { data: orders, error } = await getUserOrdersWithFiles()

  return <OperationsConsole orders={orders || []} error={error} />
}
