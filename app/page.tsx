"use client"

import type React from "react"
import { DisasterReportingInterface } from "@/components/disaster-reporting"
import { NGOResourceDashboard } from "@/components/ngo-dashboard"
import { HelpRequestSystem } from "@/components/help-request-system"
import { DonationManagement } from "@/components/donation-management"
import { VolunteerSystem } from "@/components/volunteer-system"
import { AdminPanel } from "@/components/admin-panel"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Shield, Users, Heart, MapPin, Bell } from "lucide-react"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"citizen" | "ngo" | "donor" | "volunteer" | "admin" | null>(null)

  if (isLoggedIn && userRole) {
    return (
      <Dashboard
        userRole={userRole}
        onLogout={() => {
          setIsLoggedIn(false)
          setUserRole(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DisasterAid</h1>
                <p className="text-xs text-muted-foreground">Emergency Response Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Emergency Response
              <span className="text-primary"> Coordination</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance mb-8">
              Connect citizens, NGOs, donors, and volunteers in times of crisis. Report disasters, request help, and
              coordinate relief efforts efficiently.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">1000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-warning">99%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-success">500+</div>
                <div className="text-sm text-muted-foreground">Lives Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Access Platform</CardTitle>
                <CardDescription>Choose your role and sign in to start helping</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <LoginForm
                      onLogin={(role) => {
                        setIsLoggedIn(true)
                        setUserRole(role)
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="register">
                    <RegisterForm
                      onRegister={(role) => {
                        setIsLoggedIn(true)
                        setUserRole(role)
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Platform Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for disaster management and emergency response coordination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<AlertTriangle className="w-8 h-8" />}
              title="Disaster Reporting"
              description="Citizens can quickly report disasters with location and detailed descriptions"
              color="text-emergency"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="NGO Dashboard"
              description="Organizations can publish available resources and coordinate relief efforts"
              color="text-primary"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Help Requests"
              description="Request emergency assistance for food, shelter, medical aid, and more"
              color="text-accent"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Location Tracking"
              description="Real-time location services for efficient resource deployment"
              color="text-warning"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Alert System"
              description="Instant notifications about nearby disasters and emergency updates"
              color="text-info"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure Platform"
              description="End-to-end encryption and secure donation processing"
              color="text-success"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function LoginForm({ onLogin }: { onLogin: (role: "citizen" | "ngo" | "donor" | "volunteer" | "admin") => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"citizen" | "ngo" | "donor" | "volunteer" | "admin">("citizen")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(role)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
        >
          <option value="citizen">Citizen</option>
          <option value="ngo">NGO Representative</option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}

function RegisterForm({
  onRegister,
}: { onRegister: (role: "citizen" | "ngo" | "donor" | "volunteer" | "admin") => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen" as "citizen" | "ngo" | "donor" | "volunteer" | "admin",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    onRegister(formData.role)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-role">Role</Label>
        <select
          id="reg-role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
        >
          <option value="citizen">Citizen</option>
          <option value="ngo">NGO Representative</option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className={`${color} mb-2`}>{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function Dashboard({
  userRole,
  onLogout,
}: {
  userRole: "citizen" | "ngo" | "donor" | "volunteer" | "admin"
  onLogout: () => void
}) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">DisasterAid</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            {(userRole === "citizen" || userRole === "admin") && (
              <button
                onClick={() => setActiveTab("report")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "report"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Report Disaster
              </button>
            )}
            {(userRole === "ngo" || userRole === "admin") && (
              <button
                onClick={() => setActiveTab("resources")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "resources"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Manage Resources
              </button>
            )}
            {(userRole === "citizen" || userRole === "volunteer" || userRole === "admin") && (
              <button
                onClick={() => setActiveTab("help")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "help"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Help Requests
              </button>
            )}
            {(userRole === "donor" || userRole === "admin") && (
              <button
                onClick={() => setActiveTab("donations")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "donations"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Donations
              </button>
            )}
            {(userRole === "volunteer" || userRole === "admin") && (
              <button
                onClick={() => setActiveTab("volunteers")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "volunteers"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Volunteers
              </button>
            )}
            {userRole === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "admin"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to your {userRole} dashboard</h1>
              <p className="text-muted-foreground">Manage your activities and stay updated on emergency situations</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for {userRole}s</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Role-specific features will be available here
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "report" && (userRole === "citizen" || userRole === "admin") && <DisasterReportingInterface />}

        {activeTab === "resources" && (userRole === "ngo" || userRole === "admin") && <NGOResourceDashboard />}

        {activeTab === "help" && (userRole === "citizen" || userRole === "volunteer" || userRole === "admin") && (
          <HelpRequestSystem />
        )}

        {activeTab === "donations" && (userRole === "donor" || userRole === "admin") && <DonationManagement />}

        {activeTab === "volunteers" && (userRole === "volunteer" || userRole === "admin") && <VolunteerSystem />}

        {activeTab === "admin" && userRole === "admin" && <AdminPanel />}
      </main>
    </div>
  )
}
