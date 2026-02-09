"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FileText, Star, AlertCircle } from "lucide-react"
import { signUp, signIn } from "@/lib/actions/auth"

export default function LoginSignupPage() {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const mode = searchParams.get("mode")
    if (mode === "signup") {
      setIsLogin(false)
    } else if (mode === "login") {
      setIsLogin(true)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null) // Clear error on input change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = isLogin
        ? await signIn(formData)
        : await signUp(formData)

      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Sign Up Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center mb-12">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-2xl text-gray-900">DocStandard</span>
          </Link>

          {/* Form Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Sign In" : "Sign Up for Free"}
            </h1>
            {!isLogin && (
              <p className="text-gray-600 mb-8">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true)
                    setError(null)
                  }}
                  className="text-brand-600 hover:underline"
                >
                  Click here to login
                </button>
              </p>
            )}
            {isLogin && (
              <p className="text-gray-600 mb-8">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setError(null)
                  }}
                  className="text-brand-600 hover:underline"
                >
                  Click here to sign up
                </button>
              </p>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Your Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="you@company.com"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="Password (min. 6 characters)"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-brand-600 text-white rounded-lg font-semibold text-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
              </button>

              {/* Terms and Privacy */}
              {!isLogin && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  By registering an account, you agree to our{" "}
                  <Link href="/terms" className="text-brand-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              )}
            </form>

            {/* Consultation Link */}
            {!isLogin && (
              <p className="mt-6 text-sm text-gray-600">
                Not sure how to make the most out of DocStandard?{" "}
                <Link href="/contact" className="text-brand-600 hover:underline">
                  Request a free consultation
                </Link>
                .
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-md mx-auto w-full mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gray-700">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-gray-700">
                Terms
              </Link>
            </div>
            <p>© {new Date().getFullYear()} DocStandard. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Column: Testimonial & Product Demo */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-blue-50 to-cyan-50 p-12 flex-col justify-between">
        <div>
          {/* Testimonial */}
          <div className="mb-12">
            <p className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              &quot;So much time saved!! I&apos;m fairly new to DocStandard, but
              can say that it has saved me so much time.&quot;
            </p>
            <p className="text-gray-700 font-medium mb-2">– Scott K., Branch Manager</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Product Demo Placeholder */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-4 text-sm text-gray-500 font-mono">
                app.docstandard.com
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <span className="font-semibold text-gray-900">My Document Parser</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Define Field Position - Draw a rectangle around the fixed position
                  where the text is located
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded border border-green-200">
                    <span className="text-xs text-gray-500">Invoice Number</span>
                    <p className="text-sm font-mono text-green-700">1002</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="text-xs text-gray-500">Date</span>
                    <p className="text-sm font-mono">02/11/2025</p>
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors">
                Add Parsing Rule
              </button>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-4 text-center">Trusted by leading companies</p>
          <div className="grid grid-cols-3 gap-6 opacity-60">
            {["L'ORÉAL", "NBA", "General Mills", "Workday", "LACOSTE", "Safelite"].map(
              (company) => (
                <div
                  key={company}
                  className="text-center text-sm font-semibold text-gray-600"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
