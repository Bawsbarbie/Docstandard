import { redirect } from "next/navigation"

export default function OrderPage() {
  redirect("/login?mode=signup")
}
