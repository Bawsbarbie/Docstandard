const fs = require("fs")
const path = require("path")

const root = process.cwd()
const dashboardPath = path.join(root, "app/(app)/dashboard/page.tsx")
const layoutPath = path.join(root, "app/(app)/layout.tsx")
const modalPath = path.join(root, "components/OnboardingModal.tsx")

const dashboard = fs.readFileSync(dashboardPath, "utf8")
const layout = fs.readFileSync(layoutPath, "utf8")
const modal = fs.readFileSync(modalPath, "utf8")

const checks = [
  {
    name: "App layout renders shared onboarding gate",
    pass: layout.includes("<OnboardingGate />"),
  },
  {
    name: "Dashboard page has no legacy onboarding modal state",
    pass:
      !dashboard.includes("isOnboardingOpen") &&
      !dashboard.includes("setIsOnboardingOpen") &&
      !dashboard.includes("onboardingStep") &&
      !dashboard.includes("setOnboardingStep"),
  },
  {
    name: "Shared onboarding modal uses light background style",
    pass: modal.includes("bg-white text-slate-900"),
  },
  {
    name: "Shared onboarding modal excludes sign-in copy for signed-in users",
    pass: !modal.includes("Already have an account? Sign In"),
  },
]

const failed = checks.filter((check) => !check.pass)

if (failed.length > 0) {
  console.error("Onboarding UI assertion failed:")
  for (const check of failed) {
    console.error(`- ${check.name}`)
  }
  process.exit(1)
}

console.log("Onboarding UI assertion passed.")
