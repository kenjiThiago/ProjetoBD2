import { useState, useEffect } from 'react'
import { companies, jobs } from '@/data/mockData'
import type { Company, Job } from '@/data/mockData'

export function useCompanyFilters() {
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("Setores")
  const [selectedSize, setSelectedSize] = useState("Porte")
  const [selectedLocation, setSelectedLocation] = useState("Localização")
  const [selectedJobType, setSelectedJobType] = useState("Modalidade")
  const [selectedJobLevel, setSelectedJobLevel] = useState("Nível")
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

      if (selectedIndustry !== "Setores") {
        filtered = filtered.filter(company => company.industry === selectedIndustry)
      }

      if (selectedSize !== "Porte") {
        filtered = filtered.filter(company => company.size.includes(selectedSize.split(' ')[0]))
      }

      if (selectedLocation !== "Localização") {
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

      if (selectedJobType !== "Modalidade") {
        filtered = filtered.filter(job => job.type === selectedJobType)
      }

      if (selectedJobLevel !== "Nível") {
        filtered = filtered.filter(job => job.level === selectedJobLevel)
      }

      if (selectedLocation !== "Localização") {
        filtered = filtered.filter(job => job.location === selectedLocation)
      }

      setFilteredJobs(filtered)
    }
  }, [searchTerm, selectedJobType, selectedJobLevel, selectedLocation, jobs, activeTab])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("Setores")
    setSelectedSize("Porte")
    setSelectedLocation("Localização")
    setSelectedJobType("Modalidade")
    setSelectedJobLevel("Nível")
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
