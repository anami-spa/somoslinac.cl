import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  FileText,
  Building2,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Banknote,
  ArrowLeft,
  Globe,
  Heart,
  Mic,
  Video,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Validación de RUT chileno
const validateRut = (rut: string) => {
  if (!rut) return false
  const cleanRut = rut.replace(/[.-]/g, "").toUpperCase()
  if (cleanRut.length < 8 || cleanRut.length > 9) return false

  const body = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1)

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number.parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const calculatedDv = 11 - (sum % 11)
  const finalDv = calculatedDv === 11 ? "0" : calculatedDv === 10 ? "K" : calculatedDv.toString()

  return dv === finalDv
}

// Schema de validación (SIN términos y condiciones)
const registrationSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  rut: z.string().min(8, "RUT inválido").refine(validateRut, "RUT inválido"),
  registrationType: z.enum(["individual", "empresa"]),
  companyName: z.string().optional(),
  companyRut: z.string().optional(),
  howDidYouHear: z.string().optional(),
  comments: z.string().optional(),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

// Datos de programas (simplificado)
const programsData = {
  "speak-easy-access": {
    id: "speak-easy-access",
    title: "Speak Easy Access!",
    subtitle: "Programa de Inglés",
    price: "$180.000 CLP",
    icon: Globe,
    gradient: "from-[#316eb5] to-[#254e8a]",
    accentColor: "#316eb5",
  },
  "toma-las-riendas": {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    subtitle: "Coaching con Caballos",
    price: "$220.000 CLP",
    icon: Heart,
    gradient: "from-[#3CAA36] to-[#2d8a2a]",
    accentColor: "#3CAA36",
  },
  "oratoria-comunicacion": {
    id: "oratoria-comunicacion",
    title: "Oratoria, Empoderamiento y Comunicación Asertiva",
    subtitle: "Comunicación Efectiva",
    price: "$250.000 CLP",
    icon: Mic,
    gradient: "from-[#FBEA24] to-[#e6d520]",
    accentColor: "#FBEA24",
  },
  "bootcamp-contenido": {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    price: "$60.000 CLP",
    originalPrice: "$75.000 CLP",
    icon: Video,
    gradient: "from-[#E91E63] to-[#9C27B0]",
    accentColor: "#E91E63",
  },
}

export function InscripcionPage() {
  const { programId } = useParams<{ programId: string }>()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null)

  const program = programsData[programId as keyof typeof programsData]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      registrationType: "individual",
    },
  })

  const registrationType = watch("registrationType")

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Formulario enviado:", data)
    setSubmittedData(data)
    setStep(2)
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#233a63] mb-4">Programa no encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="text-[#316eb5] hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const Icon = program.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9ff] to-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/programas/${programId}`)}
            className="text-[#316eb5] hover:text-[#254e8a] transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Volver al programa
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br mb-4"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${program.accentColor}, ${program.accentColor}dd)` }}
          >
            <Icon className="text-white" size={32} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#233a63] mb-2">
            Inscripción al Programa
          </h1>
          <p className="text-xl text-[#316eb5] font-semibold">{program.title}</p>
          <p className="text-gray-600">{program.subtitle}</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === 1 ? "bg-[#316eb5] text-white" : "bg-green-500 text-white"
                }`}
              >
                {step === 2 ? <CheckCircle2 size={18} /> : "1"}
              </div>
              <span className={`text-sm font-medium ${step === 1 ? "text-[#233a63]" : "text-gray-500"}`}>
                Datos Personales
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300">
              <div
                className="h-full bg-[#316eb5] transition-all duration-500"
                style={{ width: step === 2 ? "100%" : "0%" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === 2 ? "bg-[#316eb5] text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <span className={`text-sm font-medium ${step === 2 ? "text-[#233a63]" : "text-gray-500"}`}>
                Confirmación
              </span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {step === 1 ? (
            /* Paso 1: Formulario */
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-10 space-y-8">
              {/* Información del programa */}
              <div className="bg-gradient-to-r p-4 rounded-xl text-white mb-6"
                style={{ backgroundImage: `linear-gradient(to right, ${program.accentColor}, ${program.accentColor}dd)` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Programa seleccionado</p>
                    <p className="font-bold text-lg">{program.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Inversión</p>
                    <p className="font-bold text-2xl">{program.price}</p>
                  </div>
                </div>
              </div>

              {/* Datos Personales */}
              <div className="space-y-5">
                <h3 className="font-semibold text-[#233a63] text-lg flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                  <User size={20} className="text-[#316eb5]" />
                  Datos Personales
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Nombre completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Juan Pérez González"
                      className="h-11 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                      {...register("fullName")}
                    />
                    {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rut" className="text-sm font-medium text-gray-700">
                      RUT <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="rut"
                      placeholder="12.345.678-9"
                      className="h-11 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                      {...register("rut")}
                    />
                    {errors.rut && <p className="text-xs text-red-600">{errors.rut.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        className="h-11 pl-10 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="phone"
                        placeholder="+56 9 1234 5678"
                        className="h-11 pl-10 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Tipo de Inscripción */}
              <div className="space-y-5">
                <h3 className="font-semibold text-[#233a63] text-lg flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                  <Building2 size={20} className="text-[#316eb5]" />
                  Tipo de Inscripción
                </h3>

                <RadioGroup
                  defaultValue="individual"
                  onValueChange={(value) => setValue("registrationType", value as "individual" | "empresa")}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="individual" id="individual" className="border-[#316eb5] text-[#316eb5]" />
                    <Label htmlFor="individual" className="text-base cursor-pointer text-gray-700 font-medium">
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="empresa" id="empresa" className="border-[#316eb5] text-[#316eb5]" />
                    <Label htmlFor="empresa" className="text-base cursor-pointer text-gray-700 font-medium">
                      Empresa
                    </Label>
                  </div>
                </RadioGroup>

                {registrationType === "empresa" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid md:grid-cols-2 gap-5 pt-3"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                        Nombre de la empresa
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Empresa S.A."
                        className="h-11 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                        {...register("companyName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyRut" className="text-sm font-medium text-gray-700">
                        RUT de la empresa
                      </Label>
                      <Input
                        id="companyRut"
                        placeholder="76.543.210-K"
                        className="h-11 border-gray-300 focus:border-[#316eb5] focus:ring-[#316eb5]"
                        {...register("companyRut")}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Información Adicional */}
              <div className="space-y-5">
                <h3 className="font-semibold text-[#233a63] text-lg flex items-center gap-2 pb-3 border-b-2 border-gray-100">
                  <FileText size={20} className="text-[#316eb5]" />
                  Información Adicional
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="howDidYouHear" className="text-sm font-medium text-gray-700">
                      ¿Cómo nos conociste?
                    </Label>
                    <Select onValueChange={(value) => setValue("howDidYouHear", value)}>
                      <SelectTrigger className="h-11 border-gray-300">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="redes">Redes sociales</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="recomendacion">Recomendación</SelectItem>
                        <SelectItem value="publicidad">Publicidad</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
                      Comentarios o preguntas (opcional)
                    </Label>
                    <textarea
                      id="comments"
                      placeholder="¿Tienes alguna pregunta o comentario sobre el programa?"
                      rows={4}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#316eb5] focus:border-transparent"
                      {...register("comments")}
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate(`/programas/${programId}`)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#316eb5] transition-colors font-medium"
                >
                  <ArrowLeft size={20} />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#316eb5] to-[#254e8a] text-white font-semibold rounded-xl hover:from-[#254e8a] hover:to-[#1a3a5c] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Continuar
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          ) : (
            /* Paso 2: Confirmación */
            <div className="p-8 lg:p-10 space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#233a63] mb-2">¡Inscripción Recibida!</h2>
                <p className="text-gray-600">
                  Hemos recibido tu solicitud de inscripción. A continuación, selecciona tu método de pago preferido.
                </p>
              </div>

              {/* Resumen */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-[#233a63] mb-4">Resumen de tu inscripción</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Programa:</span>
                    <span className="font-medium text-[#233a63]">{program.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participante:</span>
                    <span className="font-medium text-[#233a63]">{submittedData?.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-[#233a63]">{submittedData?.email}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-gray-600 font-semibold">Total a pagar:</span>
                    <span className="font-bold text-xl text-[#316eb5]">{program.price}</span>
                  </div>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div className="space-y-4">
                <h3 className="font-semibold text-[#233a63] flex items-center gap-2">
                  <CreditCard size={20} className="text-[#316eb5]" />
                  Selecciona tu método de pago
                </h3>

                <div className="grid gap-3">
                  {[
                    {
                      name: "WebPay",
                      desc: "Tarjeta de crédito o débito",
                      color: "#00A6E0",
                      icon: CreditCard,
                    },
                    {
                      name: "PayPal",
                      desc: "Pago internacional seguro",
                      color: "#003087",
                      icon: null,
                    },
                    {
                      name: "Transferencia Bancaria",
                      desc: "Transferencia directa",
                      color: "#233a63",
                      icon: Banknote,
                    },
                  ].map((method) => (
                    <button
                      key={method.name}
                      type="button"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#316eb5] hover:bg-gray-50 transition-all flex items-center gap-4 text-left group"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.icon ? (
                          <method.icon className="text-white" size={24} />
                        ) : (
                          <span className="text-white font-bold">PP</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#233a63] group-hover:text-[#316eb5]">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#316eb5] transition-colors font-medium"
                >
                  <ArrowLeft size={20} />
                  Volver
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Nota de Seguridad */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            Tus datos están protegidos y serán utilizados únicamente para procesar tu inscripción.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
