"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Heart, TrendingUp, Users, Calendar, CreditCard, Building, Plus } from "lucide-react"

interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  type: "monetary" | "resource"
  resourceType?: string
  resourceDescription?: string
  campaign?: string
  message?: string
  timestamp: Date
  status: "pending" | "completed" | "failed"
  isAnonymous: boolean
}

interface Campaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  donorCount: number
  endDate: Date
  status: "active" | "completed" | "paused"
  category: "emergency" | "relief" | "reconstruction" | "medical"
}

export function DonationManagement() {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      donorName: "John Smith",
      donorEmail: "john@example.com",
      amount: 500,
      type: "monetary",
      campaign: "Flood Relief Fund",
      message: "Hope this helps the affected families",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "completed",
      isAnonymous: false,
    },
    {
      id: "2",
      donorName: "Anonymous",
      donorEmail: "anonymous@system.com",
      amount: 1000,
      type: "monetary",
      campaign: "Emergency Medical Aid",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed",
      isAnonymous: true,
    },
    {
      id: "3",
      donorName: "Sarah Johnson",
      donorEmail: "sarah@example.com",
      amount: 0,
      type: "resource",
      resourceType: "Medical Supplies",
      resourceDescription: "50 first aid kits and emergency medications",
      campaign: "Emergency Medical Aid",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "completed",
      isAnonymous: false,
    },
  ])

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Flood Relief Fund",
      description: "Emergency fund for families affected by recent flooding in downtown district",
      targetAmount: 50000,
      currentAmount: 32500,
      donorCount: 127,
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "emergency",
    },
    {
      id: "2",
      title: "Emergency Medical Aid",
      description: "Providing medical supplies and healthcare support for disaster victims",
      targetAmount: 25000,
      currentAmount: 18750,
      donorCount: 89,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "medical",
    },
  ])

  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<string>("")

  const [newDonation, setNewDonation] = useState({
    donorName: "",
    donorEmail: "",
    amount: 0,
    type: "monetary" as "monetary" | "resource",
    resourceType: "",
    resourceDescription: "",
    message: "",
    isAnonymous: false,
  })

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    targetAmount: 0,
    endDate: "",
    category: "emergency" as Campaign["category"],
  })

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault()

    const donation: Donation = {
      id: Date.now().toString(),
      ...newDonation,
      campaign: selectedCampaign,
      timestamp: new Date(),
      status: "completed", // In real app, this would be 'pending' initially
    }

    setDonations([donation, ...donations])

    // Update campaign amount if monetary donation
    if (newDonation.type === "monetary" && selectedCampaign) {
      setCampaigns(
        campaigns.map((c) =>
          c.title === selectedCampaign
            ? { ...c, currentAmount: c.currentAmount + newDonation.amount, donorCount: c.donorCount + 1 }
            : c,
        ),
      )
    }

    setNewDonation({
      donorName: "",
      donorEmail: "",
      amount: 0,
      type: "monetary",
      resourceType: "",
      resourceDescription: "",
      message: "",
      isAnonymous: false,
    })
    setSelectedCampaign("")
    setShowDonationForm(false)
  }

  const handleSubmitCampaign = (e: React.FormEvent) => {
    e.preventDefault()

    const campaign: Campaign = {
      id: Date.now().toString(),
      ...newCampaign,
      currentAmount: 0,
      donorCount: 0,
      endDate: new Date(newCampaign.endDate),
      status: "active",
    }

    setCampaigns([campaign, ...campaigns])
    setNewCampaign({
      title: "",
      description: "",
      targetAmount: 0,
      endDate: "",
      category: "emergency",
    })
    setShowCampaignForm(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medical":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "relief":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "reconstruction":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const totalDonations = donations.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.amount, 0)
  const totalDonors = new Set(donations.filter((d) => d.status === "completed").map((d) => d.donorEmail)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            Donation Management
          </h2>
          <p className="text-muted-foreground">
            Manage donations, track contributions, and create fundraising campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowCampaignForm(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
          <Button onClick={() => setShowDonationForm(true)} className="bg-pink-600 hover:bg-pink-700 text-white">
            <Heart className="w-4 h-4 mr-2" />
            Make Donation
          </Button>
        </div>
      </div>

      {/* Donation Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold text-green-500">${totalDonations.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold text-blue-500">{totalDonors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold text-purple-500">
                  {campaigns.filter((c) => c.status === "active").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-orange-500">
                  $
                  {donations
                    .filter((d) => d.timestamp.getMonth() === new Date().getMonth())
                    .reduce((sum, d) => sum + d.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Form */}
      {showDonationForm && (
        <Card className="border-pink-200 bg-pink-50/50 dark:border-pink-800 dark:bg-pink-950/20">
          <CardHeader>
            <CardTitle className="text-pink-700 dark:text-pink-400">Make a Donation</CardTitle>
            <CardDescription>Support disaster relief efforts with your contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitDonation} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donation-type">Donation Type</Label>
                  <select
                    id="donation-type"
                    value={newDonation.type}
                    onChange={(e) =>
                      setNewDonation({ ...newDonation, type: e.target.value as "monetary" | "resource" })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="monetary">Monetary Donation</option>
                    <option value="resource">Resource Donation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-select">Campaign</Label>
                  <select
                    id="campaign-select"
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                    required
                  >
                    <option value="">Select a campaign</option>
                    {campaigns
                      .filter((c) => c.status === "active")
                      .map((campaign) => (
                        <option key={campaign.id} value={campaign.title}>
                          {campaign.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Full Name</Label>
                  <Input
                    id="donor-name"
                    placeholder="Enter your full name"
                    value={newDonation.donorName}
                    onChange={(e) => setNewDonation({ ...newDonation, donorName: e.target.value })}
                    required={!newDonation.isAnonymous}
                    disabled={newDonation.isAnonymous}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donor-email">Email Address</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="Enter your email"
                    value={newDonation.donorEmail}
                    onChange={(e) => setNewDonation({ ...newDonation, donorEmail: e.target.value })}
                    required={!newDonation.isAnonymous}
                    disabled={newDonation.isAnonymous}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newDonation.isAnonymous}
                  onChange={(e) =>
                    setNewDonation({
                      ...newDonation,
                      isAnonymous: e.target.checked,
                      donorName: e.target.checked ? "Anonymous" : "",
                      donorEmail: e.target.checked ? "anonymous@system.com" : "",
                    })
                  }
                  className="rounded border-border"
                />
                <Label htmlFor="anonymous">Make this donation anonymous</Label>
              </div>

              {newDonation.type === "monetary" ? (
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={newDonation.amount}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: Number.parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Resource Type</Label>
                    <Input
                      id="resource-type"
                      placeholder="e.g., Medical Supplies, Food, Clothing"
                      value={newDonation.resourceType}
                      onChange={(e) => setNewDonation({ ...newDonation, resourceType: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Resource Description</Label>
                    <Textarea
                      id="resource-description"
                      placeholder="Detailed description of the resources you're donating"
                      value={newDonation.resourceDescription}
                      onChange={(e) => setNewDonation({ ...newDonation, resourceDescription: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="donation-message">Message (Optional)</Label>
                <Textarea
                  id="donation-message"
                  placeholder="Leave a message of support"
                  value={newDonation.message}
                  onChange={(e) => setNewDonation({ ...newDonation, message: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {newDonation.type === "monetary" ? "Donate Now" : "Submit Donation"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowDonationForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Campaign Form */}
      {showCampaignForm && (
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400">Create New Campaign</CardTitle>
            <CardDescription>Start a new fundraising campaign for disaster relief</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitCampaign} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-title">Campaign Title</Label>
                <Input
                  id="campaign-title"
                  placeholder="e.g., Emergency Relief Fund"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Describe the purpose and goals of this campaign"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount ($)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={newCampaign.targetAmount}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, targetAmount: Number.parseInt(e.target.value) || 0 })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-category">Category</Label>
                <select
                  id="campaign-category"
                  value={newCampaign.category}
                  onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value as Campaign["category"] })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="emergency">Emergency Relief</option>
                  <option value="medical">Medical Aid</option>
                  <option value="relief">General Relief</option>
                  <option value="reconstruction">Reconstruction</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Campaign
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCampaignForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Campaigns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Campaigns</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {campaigns
            .filter((c) => c.status === "active")
            .map((campaign) => (
              <Card key={campaign.id} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <Badge className={getCategoryColor(campaign.category)}>{campaign.category.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">
                        ${campaign.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">of ${campaign.targetAmount.toLocaleString()}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-foreground mb-4">{campaign.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}% funded</span>
                      <span>{campaign.donorCount} donors</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span>Ends: {campaign.endDate.toLocaleDateString()}</span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedCampaign(campaign.title)
                        setShowDonationForm(true)
                      }}
                    >
                      Donate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Recent Donations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Donations</h3>

        {donations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No donations yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {donations.slice(0, 10).map((donation) => (
              <Card key={donation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full">
                        {donation.type === "monetary" ? (
                          <DollarSign className="w-5 h-5 text-pink-600" />
                        ) : (
                          <Building className="w-5 h-5 text-pink-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {donation.isAnonymous ? "Anonymous Donor" : donation.donorName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {donation.type === "monetary"
                            ? `$${donation.amount.toLocaleString()} to ${donation.campaign}`
                            : `${donation.resourceType} to ${donation.campaign}`}
                        </div>
                        {donation.message && (
                          <div className="text-sm text-muted-foreground italic mt-1">"{donation.message}"</div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={getStatusColor(donation.status)}>{donation.status.toUpperCase()}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {donation.timestamp.toLocaleDateString()}
                      </div>
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
