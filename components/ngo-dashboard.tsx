"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building2, Package, Users, MapPin, Clock, Plus, Edit, Trash2, CheckCircle } from "lucide-react"

interface Resource {
  id: string
  type: "food" | "shelter" | "medical" | "clothing" | "transport" | "other"
  name: string
  description: string
  quantity: number
  unit: string
  location: string
  availability: "available" | "limited" | "unavailable"
  contactInfo: string
  lastUpdated: Date
  ngoName: string
}

export function NGOResourceDashboard() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      type: "food",
      name: "Emergency Food Packages",
      description: "Ready-to-eat meals for families of 4, includes water and basic supplies",
      quantity: 150,
      unit: "packages",
      location: "Karachi East District, Gulshan-e-Iqbal Block 13",
      availability: "available",
      contactInfo: "relief@edhi.org",
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ngoName: "Edhi Foundation",
    },
    {
      id: "2",
      type: "shelter",
      name: "Temporary Housing",
      description: "Safe temporary accommodation with basic amenities",
      quantity: 50,
      unit: "beds",
      location: "Sukkur District, Civil Hospital Premises",
      availability: "limited",
      contactInfo: "+92-71-5632147",
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
      ngoName: "Saylani Welfare Trust",
    },
    {
      id: "3",
      type: "medical",
      name: "Mobile Medical Unit",
      description: "Basic medical care and first aid supplies",
      quantity: 2,
      unit: "units",
      location: "Larkana District, Chandka Medical College",
      availability: "available",
      contactInfo: "emergency@aku.edu",
      lastUpdated: new Date(Date.now() - 45 * 60 * 1000),
      ngoName: "Aga Khan University Hospital",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [newResource, setNewResource] = useState({
    type: "food" as Resource["type"],
    name: "",
    description: "",
    quantity: 0,
    unit: "",
    location: "",
    availability: "available" as Resource["availability"],
    contactInfo: "",
  })

  const handleSubmitResource = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingResource) {
      // Update existing resource
      setResources(
        resources.map((r) => (r.id === editingResource.id ? { ...r, ...newResource, lastUpdated: new Date() } : r)),
      )
      setEditingResource(null)
    } else {
      // Add new resource
      const resource: Resource = {
        id: Date.now().toString(),
        ...newResource,
        lastUpdated: new Date(),
        ngoName: "Current NGO", // This would come from user context
      }
      setResources([resource, ...resources])
    }

    setNewResource({
      type: "food",
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      location: "",
      availability: "available",
      contactInfo: "",
    })
    setShowAddForm(false)
  }

  const handleEditResource = (resource: Resource) => {
    setNewResource({
      type: resource.type,
      name: resource.name,
      description: resource.description,
      quantity: resource.quantity,
      unit: resource.unit,
      location: resource.location,
      availability: resource.availability,
      contactInfo: resource.contactInfo,
    })
    setEditingResource(resource)
    setShowAddForm(true)
  }

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  const getResourceTypeIcon = (type: string) => {
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
        return "📦"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "limited":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "unavailable":
        return "bg-red-500/10 text-red-500 border-red-500/20"
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
            <Building2 className="w-6 h-6 text-blue-500" />
            NGO Resource Dashboard
          </h2>
          <p className="text-muted-foreground">Manage and publish available resources for disaster relief</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Resource Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold">{resources.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-500">
                  {resources.filter((r) => r.availability === "available").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Limited</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {resources.filter((r) => r.availability === "limited").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">People Helped</p>
                <p className="text-2xl font-bold text-purple-500">1,247</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Resource Form */}
      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400">
              {editingResource ? "Edit Resource" : "Add New Resource"}
            </CardTitle>
            <CardDescription>Provide detailed information about the available resource</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitResource} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resource-type">Resource Type</Label>
                  <select
                    id="resource-type"
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value as Resource["type"] })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                    required
                  >
                    <option value="food">Food & Water</option>
                    <option value="shelter">Shelter & Housing</option>
                    <option value="medical">Medical Aid</option>
                    <option value="clothing">Clothing & Supplies</option>
                    <option value="transport">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability Status</Label>
                  <select
                    id="availability"
                    value={newResource.availability}
                    onChange={(e) =>
                      setNewResource({ ...newResource, availability: e.target.value as Resource["availability"] })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="available">Available</option>
                    <option value="limited">Limited Supply</option>
                    <option value="unavailable">Currently Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-name">Resource Name</Label>
                <Input
                  id="resource-name"
                  placeholder="e.g., Emergency Food Packages"
                  value={newResource.name}
                  onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-description">Description</Label>
                <Textarea
                  id="resource-description"
                  placeholder="Detailed description of the resource, what it includes, who it's for, etc."
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={newResource.quantity}
                    onChange={(e) => setNewResource({ ...newResource, quantity: Number.parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., packages, beds, units"
                    value={newResource.unit}
                    onChange={(e) => setNewResource({ ...newResource, unit: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource-location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="resource-location"
                    placeholder="Specific address in Sindh (e.g., Hyderabad, Qasimabad)"
                    value={newResource.location}
                    onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-info">Contact Information</Label>
                <Input
                  id="contact-info"
                  placeholder="Email or phone number (+92-xxx-xxxxxxx)"
                  value={newResource.contactInfo}
                  onChange={(e) => setNewResource({ ...newResource, contactInfo: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingResource ? "Update Resource" : "Publish Resource"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingResource(null)
                    setNewResource({
                      type: "food",
                      name: "",
                      description: "",
                      quantity: 0,
                      unit: "",
                      location: "",
                      availability: "available",
                      contactInfo: "",
                    })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Published Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Published Resources</h3>

        {resources.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No resources published yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getResourceTypeIcon(resource.type)}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getAvailabilityColor(resource.availability)}>
                            {resource.availability.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {resource.quantity} {resource.unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {resource.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Updated {resource.lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-foreground mb-3">{resource.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contact: {resource.contactInfo}</span>
                    <span className="text-muted-foreground">By: {resource.ngoName}</span>
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
