import { useState, useEffect } from 'react'
import { companies, jobs } from '@/data/mockData'
import type { Company, Job } from '@/data/mockData'

export function useCompanyFilters() {
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("Todas")
  const [selectedSize, setSelectedSize] = useState("Todos")
  const [selectedLocation, setSelectedLocation] = useState("Todas")
  const [selectedJobType, setSelectedJobType] = useState("Todos")
  const [selectedJobLevel, setSelectedJobLevel] = useState("Todos")
  const [activeTab, setActiveTab] = useState<'companies' | 'jobs'>('companies')

  // Filter companies
  useEffect(() => {
    if (activeTab === 'companies') {
      let filtered = companies

      if (searchTerm) {
        filtered = filtered.filter(company =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }

      if (selectedIndustry !== "Todas") {
        filtered = filtered.filter(company => company.industry === selectedIndustry)
      }

      if (selectedSize !== "Todos") {
        filtered = filtered.filter(company => company.size.includes(selectedSize.split(' ')[0]))
      }

      if (selectedLocation !== "Todas") {
        filtered = filtered.filter(company => company.location === selectedLocation)
      }

      setFilteredCompanies(filtered)
    }
  }, [searchTerm, selectedIndustry, selectedSize, selectedLocation, companies, activeTab])

  // Filter jobs
  useEffect(() => {
    if (activeTab === 'jobs') {
      let filtered = jobs

      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }

      if (selectedJobType !== "Todos") {
        filtered = filtered.filter(job => job.type === selectedJobType)
      }

      if (selectedJobLevel !== "Todos") {
        filtered = filtered.filter(job => job.level === selectedJobLevel)
      }

      if (selectedLocation !== "Todas") {
        filtered = filtered.filter(job => job.location === selectedLocation)
      }

      setFilteredJobs(filtered)
    }
  }, [searchTerm, selectedJobType, selectedJobLevel, selectedLocation, jobs, activeTab])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("Todas")
    setSelectedSize("Todos")
    setSelectedLocation("Todas")
    setSelectedJobType("Todos")
    setSelectedJobLevel("Todos")
  }

  return {
    companies,
    jobs,
    filteredCompanies,
    filteredJobs,
    searchTerm,
    selectedIndustry,
    selectedSize,
    selectedLocation,
    selectedJobType,
    selectedJobLevel,
    activeTab,
    setSearchTerm,
    setSelectedIndustry,
    setSelectedSize,
    setSelectedLocation,
    setSelectedJobType,
    setSelectedJobLevel,
    setActiveTab,
    clearAllFilters
  }
}
