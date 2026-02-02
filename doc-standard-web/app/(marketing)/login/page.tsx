"use client"

import React, { useState } from "react"
import Link from "next/link"
import { FileText, Star } from "lucide-react"

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication
    console.log(isLogin ? "Login" : "Signup", formData)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-12">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-flex items-center mb-12">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-2xl text-gray-900">DocStandard</span>
          </Link>

          {/* Form Header */}
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Sign In" : "Sign Up for Free"}
            </h1>
            {!isLogin && (
              <p className="text-gray-600 mb-8">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
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
                  onClick={() => setIsLogin(false)}
                  className="text-brand-600 hover:underline"
                >
                  Click here to sign up
                </button>
              </p>
            )}

            {/* Social Sign Up Buttons */}
            {!isLogin && (
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                  Sign up with Microsoft
                </button>
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
                    Show Password
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="Password"
                />
              </div>

              {/* Terms and Privacy */}
              <p className="text-sm text-gray-600">
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-brand-600 text-white rounded-lg font-semibold text-lg hover:bg-brand-700 transition-colors"
              >
                {isLogin ? "Sign In" : "Register"}
              </button>
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
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 p-12 flex-col justify-between">
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
