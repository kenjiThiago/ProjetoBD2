import { Company } from "@/data/mockData"

interface CompanyThumbnailProps {
  company: Company
  index: number
  type?: 'grid' | 'list'
  className?: string
}

export default function CompanyThumbnail({
  company,
  index,
  type = "grid",
  className = "",
}: CompanyThumbnailProps) {
  const typeClass = {
    list: "w-16 h-16 flex-shrink-0",
    grid: "h-32 overflow-hidden mb-4"
  }

  const cardType = typeClass[type]

  // Função para obter gradiente baseado no ID da empresa
  const getCompanyGradient = (companyId: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-green-500',
      'from-rose-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-sky-500 to-blue-500',
      'from-cyan-500 to-teal-500',
      'from-slate-500 to-gray-500',
      'from-violet-500 to-indigo-500',
      'from-emerald-500 to-cyan-500',
      'from-red-500 to-rose-500',
      'from-yellow-500 to-amber-500',
      'from-lime-500 to-green-500',
      'from-fuchsia-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-blue-500',
      'from-emerald-500 to-lime-500',
    ]
    return gradients[companyId % gradients.length]
  }

  return (
    <div className={`bg-gradient-to-br ${getCompanyGradient(index)} rounded-lg relative flex items-center justify-center ${cardType} ${className}`}>
      {/* Ícone baseado na indústria/tecnologia */}
      <div className="text-white text-2xl font-bold opacity-90 group-hover:opacity-100 transition-opacity">
        {company.sigla}
      </div>

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-lg" />
    </div>
  )
}
