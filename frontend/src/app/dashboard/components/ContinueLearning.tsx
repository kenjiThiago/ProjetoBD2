import Thumbnail from "@/components/Thumbnail"
import { InProgressCourse } from "@/data/mockData"
import { BookOpen, Play } from "lucide-react"

interface ContinueLearningProps {
  coursesInProgress?: InProgressCourse[]
}

export default function ContinueLearning({
  coursesInProgress,
}: ContinueLearningProps) {
  return (
    <div>
      {coursesInProgress.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {coursesInProgress.slice(0, 3).map((course: InProgressCourse, index) => (
            <div
              key={index}
              className="card p-6 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-start space-x-4">
                <Thumbnail
                  index={index}
                  course={course}
                  type={"list"}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {course.nome}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">
                      {course.aulas_concluidas || 0}/{course.total_aulas} aulas
                    </span>
                    <span className="text-sm font-semibold text-purple-400">
                      {(course.aulas_concluidas / course.total_aulas) * 100 || 0}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((course.aulas_concluidas * 100) / course.total_aulas) || 0}%` }}
                    />
                  </div>

                  <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Continuar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-7" />
            <h3 className="text-lg font-semibold text-white mb-2">Nenhum curso em andamento</h3>
            <p className="text-gray-400 mb-4">Comece um novo curso para aparecer aqui</p>
            <button
              className="btn-primary px-6 py-2"
              onClick={() => window.location.href = '/cursos'}
            >
              <span>Explorar Cursos</span>
            </button>
          </div>
        )}
    </div>
  )
}
