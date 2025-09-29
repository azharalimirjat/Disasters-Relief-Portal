"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Users,
  AlertTriangle,
  DollarSign,
  Activity,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
} from "lucide-react"

interface SystemStats {
  totalUsers: number
  activeReports: number
  totalDonations: number
  activeVolunteers: number
  systemUptime: string
  responseTime: string
}

interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "ngo" | "donor" | "volunteer"
  status: "active" | "suspended" | "pending"
  joinDate: Date
  lastActive: Date
  activityCount: number
}

interface ContentItem {
  id: string
  type: "disaster_report" | "help_request" | "resource" | "donation"
  title: string
  author: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  flagCount: number
}

export function AdminPanel() {
  const [systemStats] = useState<SystemStats>({
    totalUsers: 1247,
    activeReports: 23,
    totalDonations: 156780,
    activeVolunteers: 89,
    systemUptime: "99.8%",
    responseTime: "1.2s",
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "citizen",
      status: "active",
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      activityCount: 15,
    },
    {
      id: "2",
      name: "Red Cross Organization",
      email: "contact@redcross.org",
      role: "ngo",
      status: "active",
      joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      activityCount: 127,
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "volunteer",
      status: "active",
      joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      activityCount: 45,
    },
    {
      id: "4",
      name: "Suspicious User",
      email: "suspicious@example.com",
      role: "citizen",
      status: "pending",
      joinDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      activityCount: 1,
    },
  ])

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      type: "disaster_report",
      title: "Flood in Downtown District",
      author: "John Smith",
      status: "approved",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      flagCount: 0,
    },
    {
      id: "2",
      type: "help_request",
      title: "Emergency Food for Family",
      author: "Maria Rodriguez",
      status: "pending",
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      flagCount: 1,
    },
    {
      id: "3",
      type: "resource",
      title: "Medical Supplies Available",
      author: "Medical Corps",
      status: "approved",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      flagCount: 0,
    },
    {
      id: "4",
      type: "donation",
      title: "Suspicious Large Donation",
      author: "Anonymous",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      flagCount: 3,
    },
  ])

  const handleUserStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const handleContentStatusChange = (itemId: string, newStatus: ContentItem["status"]) => {
    setContentItems(contentItems.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "citizen":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "ngo":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "donor":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "volunteer":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "suspended":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "disaster_report":
        return <AlertTriangle className="w-4 h-4" />
      case "help_request":
        return <Users className="w-4 h-4" />
      case "resource":
        return <Shield className="w-4 h-4" />
      case "donation":
        return <DollarSign className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const pendingUsers = users.filter((u) => u.status === "pending")
  const pendingContent = contentItems.filter((c) => c.status === "pending")
  const flaggedContent = contentItems.filter((c) => c.flagCount > 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-500" />
            Admin Management Panel
          </h2>
          <p className="text-muted-foreground">Monitor system activity, manage users, and moderate content</p>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-blue-500">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reports</p>
                <p className="text-2xl font-bold text-red-500">{systemStats.activeReports}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-2xl font-bold text-green-500">${systemStats.totalDonations.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Volunteers</p>
                <p className="text-2xl font-bold text-purple-500">{systemStats.activeVolunteers}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-indigo-500">{systemStats.systemUptime}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-orange-500">{systemStats.responseTime}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users ({pendingUsers.length})
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Content ({pendingContent.length})
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleColor(user.role)}>{user.role.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status.toUpperCase()}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div>
                        <div>Joined: {user.joinDate.toLocaleDateString()}</div>
                        <div>Last active: {user.lastActive.toLocaleTimeString()}</div>
                        <div>Activities: {user.activityCount}</div>
                      </div>

                      <div className="flex gap-2">
                        {user.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleUserStatusChange(user.id, "active")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUserStatusChange(user.id, "suspended")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {user.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserStatusChange(user.id, "suspended")}
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {user.status === "suspended" && (
                          <Button size="sm" onClick={() => handleUserStatusChange(user.id, "active")}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Moderation */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Review and moderate user-generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                        {getContentTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">By: {item.author}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{item.type.replace("_", " ").toUpperCase()}</Badge>
                          <Badge className={getStatusColor(item.status)}>{item.status.toUpperCase()}</Badge>
                          {item.flagCount > 0 && <Badge variant="destructive">{item.flagCount} flags</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div>
                        <div>Created: {item.createdAt.toLocaleString()}</div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleContentStatusChange(item.id, "approved")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleContentStatusChange(item.id, "rejected")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Reports */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Recent system activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>New disaster reports today</span>
                    <Badge variant="destructive">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Help requests fulfilled</span>
                    <Badge className="bg-green-500/10 text-green-500">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New volunteer registrations</span>
                    <Badge className="bg-purple-500/10 text-purple-500">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Donations processed</span>
                    <Badge className="bg-blue-500/10 text-blue-500">23</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Database Status</span>
                    <Badge className="bg-green-500/10 text-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Response Time</span>
                    <Badge className="bg-green-500/10 text-green-500">1.2s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Connections</span>
                    <Badge className="bg-blue-500/10 text-blue-500">247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error Rate</span>
                    <Badge className="bg-green-500/10 text-green-500">0.02%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="maintenance-mode" />
                    <span className="text-sm">Enable maintenance mode</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auto-approval">Auto-approval Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-approve-reports" />
                      <span className="text-sm">Auto-approve disaster reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-approve-resources" />
                      <span className="text-sm">Auto-approve resource listings</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-settings">Notification Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-alerts" defaultChecked />
                      <span className="text-sm">Send email alerts for critical reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-alerts" />
                      <span className="text-sm">Send SMS alerts for emergencies</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label>Security Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="two-factor" defaultChecked />
                      <span className="text-sm">Require 2FA for admin accounts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="ip-whitelist" />
                      <span className="text-sm">Enable IP whitelisting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="audit-logging" defaultChecked />
                      <span className="text-sm">Enable audit logging</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Update Security Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
