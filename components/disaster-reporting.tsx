"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Clock, Camera, Send, CheckCircle } from "lucide-react"

interface DisasterReport {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  coordinates?: { lat: number; lng: number }
  description: string
  reportedBy: string
  timestamp: Date
  status: "pending" | "verified" | "responding" | "resolved"
  images?: string[]
}

export function DisasterReportingInterface() {
  const [reports, setReports] = useState<DisasterReport[]>([
    {
      id: "1",
      type: "Flood",
      severity: "high",
      location: "Karachi Central District, Saddar Town",
      description:
        "Heavy monsoon flooding in Saddar area blocking main roads. Water level approximately 2 feet deep affecting local businesses.",
      reportedBy: "Ahmed Ali",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "verified",
    },
    {
      id: "2",
      type: "Building Collapse",
      severity: "critical",
      location: "Hyderabad District, Latifabad Unit 8",
      description:
        "Partial building collapse at residential complex due to heavy rains. Multiple families may be trapped.",
      reportedBy: "Emergency Services Sindh",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "responding",
    },
  ])

  const [showReportForm, setShowReportForm] = useState(false)
  const [newReport, setNewReport] = useState({
    type: "",
    severity: "medium" as "low" | "medium" | "high" | "critical",
    location: "",
    description: "",
    images: [] as string[],
  })

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()

    const report: DisasterReport = {
      id: Date.now().toString(),
      ...newReport,
      reportedBy: "Current User",
      timestamp: new Date(),
      status: "pending",
    }

    setReports([report, ...reports])
    setNewReport({
      type: "",
      severity: "medium",
      location: "",
      description: "",
      images: [],
    })
    setShowReportForm(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse-emergency"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "verified":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "responding":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            Disaster Reporting
          </h2>
          <p className="text-muted-foreground">Report emergencies and track disaster situations in real-time</p>
        </div>
        <Button onClick={() => setShowReportForm(true)} className="bg-red-600 hover:bg-red-700 text-white">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Report Emergency
        </Button>
      </div>

      {/* Emergency Report Form */}
      {showReportForm && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Emergency Report Form</CardTitle>
            <CardDescription>Provide detailed information about the emergency situation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="disaster-type">Disaster Type</Label>
                  <select
                    id="disaster-type"
                    value={newReport.type}
                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                    required
                  >
                    <option value="">Select disaster type</option>
                    <option value="Flood">Flood</option>
                    <option value="Fire">Fire</option>
                    <option value="Earthquake">Earthquake</option>
                    <option value="Building Collapse">Building Collapse</option>
                    <option value="Accident">Traffic Accident</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Cyclone">Cyclone</option>
                    <option value="Heat Wave">Heat Wave</option>
                    <option value="Drought">Drought</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <select
                    id="severity"
                    value={newReport.severity}
                    onChange={(e) => setNewReport({ ...newReport, severity: e.target.value as any })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="low">Low - Minor incident</option>
                    <option value="medium">Medium - Moderate impact</option>
                    <option value="high">High - Significant impact</option>
                    <option value="critical">Critical - Life threatening</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter location (e.g., Karachi South, Clifton Block 2)"
                    value={newReport.location}
                    onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the situation, number of people affected, immediate dangers, etc."
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Attach Images (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photos
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Images help emergency responders assess the situation
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowReportForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Reports */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Reports</h3>

        {reports.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No active disaster reports</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <CardTitle className="text-lg">{report.type}</CardTitle>
                      <Badge className={getSeverityColor(report.severity)}>{report.severity.toUpperCase()}</Badge>
                    </div>
                    <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {report.timestamp.toLocaleTimeString()} - {report.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-foreground mb-3">{report.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reported by: {report.reportedBy}</span>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {report.status === "pending" && (
                        <Button variant="outline" size="sm">
                          Verify Report
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
