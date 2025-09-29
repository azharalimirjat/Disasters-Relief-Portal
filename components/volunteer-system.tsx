"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Clock, Phone, User, CheckCircle, Plus, Calendar, Star } from "lucide-react"

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  skills: string[]
  availability: "available" | "busy" | "unavailable"
  experience: string
  joinDate: Date
  assignmentsCompleted: number
  rating: number
  currentAssignment?: string
}

interface Assignment {
  id: string
  title: string
  description: string
  location: string
  urgency: "low" | "medium" | "high" | "critical"
  skillsRequired: string[]
  volunteersNeeded: number
  volunteersAssigned: number
  assignedVolunteers: string[]
  startDate: Date
  endDate: Date
  status: "open" | "in-progress" | "completed" | "cancelled"
  createdBy: string
}

export function VolunteerSystem() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1-555-0201",
      location: "Downtown District",
      skills: ["First Aid", "Search & Rescue", "Communication"],
      availability: "available",
      experience: "5 years of emergency response experience",
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      assignmentsCompleted: 23,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+1-555-0202",
      location: "Riverside District",
      skills: ["Medical Aid", "Transportation", "Logistics"],
      availability: "busy",
      experience: "3 years volunteering with Red Cross",
      joinDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
      assignmentsCompleted: 15,
      rating: 4.6,
      currentAssignment: "Medical Supply Distribution",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+1-555-0203",
      location: "Oak Avenue",
      skills: ["Food Distribution", "Shelter Management", "Counseling"],
      availability: "available",
      experience: "2 years community service",
      joinDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
      assignmentsCompleted: 12,
      rating: 4.9,
    },
  ])

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Emergency Food Distribution",
      description: "Distribute emergency food packages to flood-affected families",
      location: "Community Center, Main Street",
      urgency: "high",
      skillsRequired: ["Food Distribution", "Communication"],
      volunteersNeeded: 8,
      volunteersAssigned: 5,
      assignedVolunteers: ["Alice Johnson", "Carol Davis"],
      startDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 8 * 60 * 60 * 1000),
      status: "open",
      createdBy: "Red Cross",
    },
    {
      id: "2",
      title: "Medical Supply Distribution",
      description: "Deliver medical supplies to temporary shelters",
      location: "Various shelter locations",
      urgency: "critical",
      skillsRequired: ["Medical Aid", "Transportation"],
      volunteersNeeded: 4,
      volunteersAssigned: 4,
      assignedVolunteers: ["Bob Wilson"],
      startDate: new Date(Date.now() - 60 * 60 * 1000),
      endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
      status: "in-progress",
      createdBy: "Medical Corps",
    },
  ])

  const [showVolunteerForm, setShowVolunteerForm] = useState(false)
  const [showAssignmentForm, setShowAssignmentForm] = useState(false)

  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [] as string[],
    experience: "",
  })

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    location: "",
    urgency: "medium" as Assignment["urgency"],
    skillsRequired: [] as string[],
    volunteersNeeded: 1,
    startDate: "",
    endDate: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [assignmentSkillInput, setAssignmentSkillInput] = useState("")

  const handleSubmitVolunteer = (e: React.FormEvent) => {
    e.preventDefault()

    const volunteer: Volunteer = {
      id: Date.now().toString(),
      ...newVolunteer,
      availability: "available",
      joinDate: new Date(),
      assignmentsCompleted: 0,
      rating: 5.0,
    }

    setVolunteers([volunteer, ...volunteers])
    setNewVolunteer({
      name: "",
      email: "",
      phone: "",
      location: "",
      skills: [],
      experience: "",
    })
    setShowVolunteerForm(false)
  }

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault()

    const assignment: Assignment = {
      id: Date.now().toString(),
      ...newAssignment,
      volunteersAssigned: 0,
      assignedVolunteers: [],
      startDate: new Date(newAssignment.startDate),
      endDate: new Date(newAssignment.endDate),
      status: "open",
      createdBy: "Current User",
    }

    setAssignments([assignment, ...assignments])
    setNewAssignment({
      title: "",
      description: "",
      location: "",
      urgency: "medium",
      skillsRequired: [],
      volunteersNeeded: 1,
      startDate: "",
      endDate: "",
    })
    setShowAssignmentForm(false)
  }

  const handleAssignVolunteer = (assignmentId: string, volunteerId: string) => {
    const volunteer = volunteers.find((v) => v.id === volunteerId)
    if (!volunteer) return

    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              volunteersAssigned: a.volunteersAssigned + 1,
              assignedVolunteers: [...a.assignedVolunteers, volunteer.name],
              status: a.volunteersAssigned + 1 >= a.volunteersNeeded ? "in-progress" : a.status,
            }
          : a,
      ),
    )

    setVolunteers(
      volunteers.map((v) =>
        v.id === volunteerId
          ? { ...v, availability: "busy", currentAssignment: assignments.find((a) => a.id === assignmentId)?.title }
          : v,
      ),
    )
  }

  const addSkill = (skill: string, isAssignment = false) => {
    if (skill.trim()) {
      if (isAssignment) {
        setNewAssignment({
          ...newAssignment,
          skillsRequired: [...newAssignment.skillsRequired, skill.trim()],
        })
        setAssignmentSkillInput("")
      } else {
        setNewVolunteer({
          ...newVolunteer,
          skills: [...newVolunteer.skills, skill.trim()],
        })
        setSkillInput("")
      }
    }
  }

  const removeSkill = (skillToRemove: string, isAssignment = false) => {
    if (isAssignment) {
      setNewAssignment({
        ...newAssignment,
        skillsRequired: newAssignment.skillsRequired.filter((skill) => skill !== skillToRemove),
      })
    } else {
      setNewVolunteer({
        ...newVolunteer,
        skills: newVolunteer.skills.filter((skill) => skill !== skillToRemove),
      })
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "busy":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "unavailable":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "in-progress":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const availableVolunteers = volunteers.filter((v) => v.availability === "available")
  const activeAssignments = assignments.filter((a) => a.status === "open" || a.status === "in-progress")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-500" />
            Volunteer Management
          </h2>
          <p className="text-muted-foreground">Register volunteers and manage assignments for disaster response</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAssignmentForm(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Assignment
          </Button>
          <Button onClick={() => setShowVolunteerForm(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Users className="w-4 h-4 mr-2" />
            Register Volunteer
          </Button>
        </div>
      </div>

      {/* Volunteer Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
                <p className="text-2xl font-bold text-purple-500">{volunteers.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-500">{availableVolunteers.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Assignments</p>
                <p className="text-2xl font-bold text-orange-500">{activeAssignments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {(volunteers.reduce((sum, v) => sum + v.rating, 0) / volunteers.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volunteer Registration Form */}
      {showVolunteerForm && (
        <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">Volunteer Registration</CardTitle>
            <CardDescription>Join our volunteer network to help during emergencies</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitVolunteer} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volunteer-name">Full Name</Label>
                  <Input
                    id="volunteer-name"
                    placeholder="Enter your full name"
                    value={newVolunteer.name}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-email">Email Address</Label>
                  <Input
                    id="volunteer-email"
                    type="email"
                    placeholder="Enter your email"
                    value={newVolunteer.email}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volunteer-phone">Phone Number</Label>
                  <Input
                    id="volunteer-phone"
                    placeholder="Enter your phone number"
                    value={newVolunteer.phone}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-location">Location</Label>
                  <Input
                    id="volunteer-location"
                    placeholder="Your area/district"
                    value={newVolunteer.location}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volunteer-skills">Skills & Expertise</Label>
                <div className="flex gap-2">
                  <Input
                    id="volunteer-skills"
                    placeholder="Add a skill (e.g., First Aid, Communication)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill(skillInput)
                      }
                    }}
                  />
                  <Button type="button" onClick={() => addSkill(skillInput)} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newVolunteer.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volunteer-experience">Experience & Background</Label>
                <Textarea
                  id="volunteer-experience"
                  placeholder="Describe your relevant experience, training, or background"
                  value={newVolunteer.experience}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, experience: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Register as Volunteer
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowVolunteerForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Assignment Creation Form */}
      {showAssignmentForm && (
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400">Create New Assignment</CardTitle>
            <CardDescription>Create a volunteer assignment for disaster response activities</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assignment-title">Assignment Title</Label>
                <Input
                  id="assignment-title"
                  placeholder="e.g., Emergency Food Distribution"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment-description">Description</Label>
                <Textarea
                  id="assignment-description"
                  placeholder="Detailed description of the assignment and responsibilities"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-location">Location</Label>
                  <Input
                    id="assignment-location"
                    placeholder="Assignment location"
                    value={newAssignment.location}
                    onChange={(e) => setNewAssignment({ ...newAssignment, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignment-urgency">Urgency Level</Label>
                  <select
                    id="assignment-urgency"
                    value={newAssignment.urgency}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, urgency: e.target.value as Assignment["urgency"] })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment-skills">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="assignment-skills"
                    placeholder="Add required skill"
                    value={assignmentSkillInput}
                    onChange={(e) => setAssignmentSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill(assignmentSkillInput, true)
                      }
                    }}
                  />
                  <Button type="button" onClick={() => addSkill(assignmentSkillInput, true)} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newAssignment.skillsRequired.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill(skill, true)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volunteers-needed">Volunteers Needed</Label>
                  <Input
                    id="volunteers-needed"
                    type="number"
                    min="1"
                    value={newAssignment.volunteersNeeded}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, volunteersNeeded: Number.parseInt(e.target.value) || 1 })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date & Time</Label>
                  <Input
                    id="start-date"
                    type="datetime-local"
                    value={newAssignment.startDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date & Time</Label>
                  <Input
                    id="end-date"
                    type="datetime-local"
                    value={newAssignment.endDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Assignment
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAssignmentForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Assignments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Assignments</h3>

        <div className="grid gap-4">
          {activeAssignments.map((assignment) => (
            <Card key={assignment.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getUrgencyColor(assignment.urgency)}>{assignment.urgency.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(assignment.status)}>{assignment.status.toUpperCase()}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {assignment.volunteersAssigned}/{assignment.volunteersNeeded} volunteers
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {assignment.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {assignment.startDate.toLocaleDateString()} - {assignment.endDate.toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-foreground mb-3">{assignment.description}</p>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {assignment.skillsRequired.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {assignment.assignedVolunteers.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Assigned Volunteers:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {assignment.assignedVolunteers.map((volunteer, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {volunteer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>Created by: {assignment.createdBy}</span>
                  {assignment.status === "open" && availableVolunteers.length > 0 && (
                    <div className="flex gap-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAssignVolunteer(assignment.id, e.target.value)
                            e.target.value = ""
                          }
                        }}
                        className="px-2 py-1 text-xs bg-input border border-border rounded"
                      >
                        <option value="">Assign volunteer</option>
                        {availableVolunteers.map((volunteer) => (
                          <option key={volunteer.id} value={volunteer.id}>
                            {volunteer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Registered Volunteers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Registered Volunteers</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {volunteers.map((volunteer) => (
            <Card key={volunteer.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">{volunteer.name}</div>
                      <div className="text-sm text-muted-foreground">{volunteer.location}</div>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(volunteer.availability)}>
                    {volunteer.availability.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{volunteer.phone}</span>
                  </div>

                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {volunteer.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{volunteer.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {volunteer.assignmentsCompleted} assignments completed
                    </span>
                  </div>

                  {volunteer.currentAssignment && (
                    <div className="text-xs text-muted-foreground">
                      Currently assigned to: {volunteer.currentAssignment}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
