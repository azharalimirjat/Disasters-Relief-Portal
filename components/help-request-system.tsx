"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Phone, User, AlertCircle, CheckCircle, Plus } from "lucide-react"

interface HelpRequest {
  id: string
  type: "food" | "shelter" | "medical" | "clothing" | "transport" | "other"
  urgency: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  location: string
  contactInfo: string
  peopleAffected: number
  requestedBy: string
  timestamp: Date
  status: "open" | "in-progress" | "fulfilled" | "closed"
  assignedTo?: string
}

export function HelpRequestSystem() {
  const [requests, setRequests] = useState<HelpRequest[]>([
    {
      id: "1",
      type: "food",
      urgency: "high",
      title: "Emergency Food for Family",
      description:
        "Family of 5 stranded due to flooding in monsoon season. Need immediate food supplies and clean water.",
      location: "Thatta District, Makli Town",
      contactInfo: "+92-298-370145",
      peopleAffected: 5,
      requestedBy: "Fatima Sheikh",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      status: "open",
    },
    {
      id: "2",
      type: "medical",
      urgency: "critical",
      title: "Medical Assistance Required",
      description:
        "Elderly person with diabetes needs insulin and medical attention. Unable to reach hospital due to flooded roads.",
      location: "Mirpurkhas District, Digri Taluka",
      contactInfo: "+92-233-874521",
      peopleAffected: 1,
      requestedBy: "Muhammad Hassan",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "in-progress",
      assignedTo: "Sindh Institute of Urology",
    },
    {
      id: "3",
      type: "shelter",
      urgency: "medium",
      title: "Temporary Housing Needed",
      description:
        "House damaged by cyclone. Family needs temporary accommodation for 2-3 days while repairs are made.",
      location: "Badin District, Tando Bago",
      contactInfo: "+92-297-856321",
      peopleAffected: 4,
      requestedBy: "Ayesha Khatoon",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "fulfilled",
      assignedTo: "Al-Khidmat Foundation",
    },
  ])

  const [showRequestForm, setShowRequestForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    type: "food" as HelpRequest["type"],
    urgency: "medium" as HelpRequest["urgency"],
    title: "",
    description: "",
    location: "",
    contactInfo: "",
    peopleAffected: 1,
  })

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()

    const request: HelpRequest = {
      id: Date.now().toString(),
      ...newRequest,
      requestedBy: "Current User",
      timestamp: new Date(),
      status: "open",
    }

    setRequests([request, ...requests])
    setNewRequest({
      type: "food",
      urgency: "medium",
      title: "",
      description: "",
      location: "",
      contactInfo: "",
      peopleAffected: 1,
    })
    setShowRequestForm(false)
  }

  const handleStatusUpdate = (id: string, newStatus: HelpRequest["status"], assignedTo?: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus, assignedTo } : r)))
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "food":
        return "🍽️"
      case "shelter":
        return "🏠"
      case "medical":
        return "🏥"
      case "clothing":
        return "👕"
      case "transport":
        return "🚐"
      default:
        return "❓"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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
      case "open":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "in-progress":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "fulfilled":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "closed":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const openRequests = requests.filter((r) => r.status === "open")
  const inProgressRequests = requests.filter((r) => r.status === "in-progress")
  const fulfilledRequests = requests.filter((r) => r.status === "fulfilled")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Help Request System
          </h2>
          <p className="text-muted-foreground">Request emergency assistance and coordinate help for those in need</p>
        </div>
        <Button onClick={() => setShowRequestForm(true)} className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Request Help
        </Button>
      </div>

      {/* Request Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Requests</p>
                <p className="text-2xl font-bold text-red-500">{openRequests.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-orange-500">{inProgressRequests.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fulfilled</p>
                <p className="text-2xl font-bold text-green-500">{fulfilledRequests.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">People Helped</p>
                <p className="text-2xl font-bold text-purple-500">
                  {requests.filter((r) => r.status === "fulfilled").reduce((sum, r) => sum + r.peopleAffected, 0)}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Request Form */}
      {showRequestForm && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Request Emergency Help</CardTitle>
            <CardDescription>Provide detailed information about the assistance you need</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="help-type">Type of Help Needed</Label>
                  <select
                    id="help-type"
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value as HelpRequest["type"] })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                    required
                  >
                    <option value="food">Food & Water</option>
                    <option value="shelter">Shelter & Housing</option>
                    <option value="medical">Medical Assistance</option>
                    <option value="clothing">Clothing & Supplies</option>
                    <option value="transport">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <select
                    id="urgency"
                    value={newRequest.urgency}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, urgency: e.target.value as HelpRequest["urgency"] })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="low">Low - Can wait</option>
                    <option value="medium">Medium - Needed soon</option>
                    <option value="high">High - Urgent</option>
                    <option value="critical">Critical - Life threatening</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="help-title">Request Title</Label>
                <Input
                  id="help-title"
                  placeholder="Brief description of what you need"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="help-description">Detailed Description</Label>
                <Textarea
                  id="help-description"
                  placeholder="Provide specific details about your situation and what help you need"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="help-location">Location</Label>
                  <div className="flex gap-2">
                    <Input
                      id="help-location"
                      placeholder="Your location in Sindh (e.g., Nawabshah, Sakrand)"
                      value={newRequest.location}
                      onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                      required
                    />
                    <Button type="button" variant="outline" size="icon">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people-affected">Number of People</Label>
                  <Input
                    id="people-affected"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={newRequest.peopleAffected}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, peopleAffected: Number.parseInt(e.target.value) || 1 })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-info">Contact Information</Label>
                <Input
                  id="contact-info"
                  placeholder="Phone number or email (+92-xxx-xxxxxxx)"
                  value={newRequest.contactInfo}
                  onChange={(e) => setNewRequest({ ...newRequest, contactInfo: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Help Requests List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Help Requests</h3>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No help requests at the moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getRequestTypeIcon(request.type)}</div>
                      <div>
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                          <span className="text-sm text-muted-foreground">{request.peopleAffected} people</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {request.status === "open" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(request.id, "in-progress", "Current User")}
                        >
                          Accept
                        </Button>
                      )}
                      {request.status === "in-progress" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(request.id, "fulfilled")}>
                          Mark Fulfilled
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {request.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {request.contactInfo}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {request.timestamp.toLocaleTimeString()} - {request.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-foreground mb-3">{request.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Requested by: {request.requestedBy}</span>
                    {request.assignedTo && (
                      <span className="text-muted-foreground">Assigned to: {request.assignedTo}</span>
                    )}
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
