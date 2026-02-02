import { Linkedin, Twitter, Mail } from "lucide-react"

const team = [
  {
    name: "Dr. Carlos Mendoza",
    role: "Director Académico",
    image: `${import.meta.env.BASE_URL}professional-male-director-portrait.jpg`,
    bio: "PhD en Administración de Empresas con 20 años de experiencia en formación ejecutiva.",
  },
  {
    name: "Lic. María González",
    role: "Coordinadora de Cursos",
    image: `${import.meta.env.BASE_URL}professional-female-coordinator-portrait.jpg`,
    bio: "Especialista en diseño curricular y desarrollo de cursos de liderazgo.",
  },
  {
    name: "Ing. Roberto Silva",
    role: "Director de Innovación",
    image: `${import.meta.env.BASE_URL}professional-male-innovation-director-portrait.jpg`,
    bio: "Experto en transformación digital y metodologías ágiles de aprendizaje.",
  },
  {
    name: "Dra. Ana Martínez",
    role: "Especialista en Comunicación",
    image: `${import.meta.env.BASE_URL}professional-female-communication-specialist-portr.jpg`,
    bio: "Consultora internacional en comunicación corporativa y oratoria ejecutiva.",
  },
]

export function Team() {
  return (
    <section id="equipo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">Nuestro Equipo</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Conoce a los profesionales dedicados a impulsar tu desarrollo y éxito profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={member.image || `${import.meta.env.BASE_URL}placeholder.svg`}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="#"
                      className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="#"
                      className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-slate-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
