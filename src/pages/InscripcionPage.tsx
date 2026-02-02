import { useState, useRef } from "react"
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
  Upload,
  ExternalLink,
  Copy,
  AlertCircle,
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
    subtitle: "Inglés Conversacional",
    price: "$180.000 CLP",
    priceNumber: 180000,
    icon: Globe,
    gradient: "from-[#316eb5] to-[#254e8a]",
    accentColor: "#316eb5",
    paymentLink: "https://www.flow.cl/btn.php?token=EXAMPLE_TOKEN_1",
    paymentInfo: {
      bank: "Banco Santander",
      accountType: "Cuenta corriente",
      rut: "77.631.728-4",
      name: "LINAC Capacitaciones SPA",
      accountNumber: "89017866",
      email: "linaccapacitaciones@gmail.com",
      note: "Indicar en el mensaje: SPEAK EASY ACCESS + tu nombre",
    },
  },
  "toma-las-riendas": {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    subtitle: "Coaching con Caballos",
    price: "$220.000 CLP",
    priceNumber: 220000,
    icon: Heart,
    gradient: "from-[#3CAA36] to-[#2d8a2a]",
    accentColor: "#3CAA36",
    paymentLink: "https://www.flow.cl/btn.php?token=EXAMPLE_TOKEN_2",
    paymentInfo: {
      bank: "Banco Santander",
      accountType: "Cuenta corriente",
      rut: "77.631.728-4",
      name: "LINAC Capacitaciones SPA",
      accountNumber: "89017866",
      email: "linaccapacitaciones@gmail.com",
      note: "Indicar en el mensaje: TOMA LAS RIENDAS + tu nombre",
    },
  },
  "oratoria-comunicacion": {
    id: "oratoria-comunicacion",
    title: "Oratoria, Empoderamiento y Comunicación Asertiva",
    subtitle: "Comunicación Efectiva",
    price: "$250.000 CLP",
    priceNumber: 250000,
    icon: Mic,
    gradient: "from-[#FBEA24] to-[#e6d520]",
    accentColor: "#FBEA24",
    paymentLink: "https://www.flow.cl/btn.php?token=EXAMPLE_TOKEN_3",
    paymentInfo: {
      bank: "Banco Santander",
      accountType: "Cuenta corriente",
      rut: "77.631.728-4",
      name: "LINAC Capacitaciones SPA",
      accountNumber: "89017866",
      email: "linaccapacitaciones@gmail.com",
      note: "Indicar en el mensaje: ORATORIA + tu nombre",
    },
  },
  "bootcamp-contenido": {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    price: "$60.000 CLP",
    priceNumber: 60000,
    originalPrice: "$75.000 CLP",
    icon: Video,
    gradient: "from-[#E91E63] to-[#9C27B0]",
    accentColor: "#E91E63",
    paymentLink: "https://www.flow.cl/btn.php?token=EXAMPLE_TOKEN_4",
    paymentInfo: {
      bank: "Banco Santander",
      accountType: "Cuenta corriente",
      rut: "77.631.728-4",
      name: "LINAC Capacitaciones SPA",
      accountNumber: "89017866",
      email: "linaccapacitaciones@gmail.com",
      note: "Indicar en el mensaje: BOOTCAMP de CONTENIDO + tu nombre",
    },
  },
}

export function InscripcionPage() {
  const { programId } = useParams<{ programId: string }>()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const onSubmit = async (data: RegistrationFormData) => {
    console.log("Formulario enviado:", data)
    setSubmittedData(data)

    // Enviar a Formspree
    try {
      const formData = {
        ...data,
        programa: program.title,
        precio: program.price,
        timestamp: new Date().toISOString(),
      }

      await fetch("https://formspree.io/f/xdadzwdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("Datos enviados a Formspree exitosamente")
    } catch (error) {
      console.error("Error al enviar a Formspree:", error)
      // Continuamos aunque falle el envío
    }

    setStep(2)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tipo de archivo (imágenes y PDFs)
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        alert("Por favor, sube solo imágenes (JPG, PNG, WEBP) o PDFs")
        return
      }

      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo no debe superar los 5MB")
        return
      }

      setUploadedFile(file)

      // Crear preview para imágenes
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedFilePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setUploadedFilePreview(null)
      }
    }
  }

  const handleSubmitProof = async () => {
    if (!uploadedFile || !submittedData) {
      alert("Por favor, carga tu comprobante de pago")
      return
    }

    setIsSubmitting(true)

    try {
      // Convertir archivo a base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64File = reader.result as string

        // Enviar comprobante a Formspree
        const proofData = {
          programa: program.title,
          participante: submittedData.fullName,
          email: submittedData.email,
          rut: submittedData.rut,
          telefono: submittedData.phone,
          tipoInscripcion: submittedData.registrationType,
          precio: program.price,
          archivoNombre: uploadedFile.name,
          archivoTipo: uploadedFile.type,
          archivoTamaño: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
          mensaje: "Comprobante de pago adjunto",
          timestamp: new Date().toLocaleString("es-CL"),
        }

        await fetch("https://formspree.io/f/xdadzwdd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proofData),
        })

        setSubmitSuccess(true)
        setIsSubmitting(false)
      }

      reader.readAsDataURL(uploadedFile)
    } catch (error) {
      console.error("Error al enviar comprobante:", error)
      alert("Hubo un error al enviar el comprobante. Por favor, intenta de nuevo.")
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#233a63] mb-4">Curso no encontrado</h1>
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
            Inscripción al Curso
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
                    <p className="text-sm opacity-90">Curso seleccionado</p>
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
                      placeholder="¿Tienes alguna pregunta o comentario sobre el curso?"
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
          ) : submitSuccess ? (
            /* Vista de Éxito */
            <div className="p-8 lg:p-10 space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-[#233a63] mb-3">¡Inscripción Completada!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Hemos recibido tu comprobante de pago. Te contactaremos pronto al email{" "}
                  <span className="font-semibold text-[#316eb5]">{submittedData?.email}</span>
                </p>

                <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-green-800 mb-2">Próximos pasos</h3>
                  <ul className="text-sm text-green-700 text-left space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Recibirás un email de confirmación en las próximas horas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Verificaremos tu pago y te enviaremos los detalles del curso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Si tienes dudas, contáctanos a linaccapacitaciones@gmail.com</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-10 py-4 bg-gradient-to-r from-[#316eb5] to-[#254e8a] text-white font-semibold rounded-xl hover:from-[#254e8a] hover:to-[#1a3a5c] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          ) : (
            /* Paso 2: Pago y Comprobante */
            <div className="p-8 lg:p-10 space-y-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#233a63] mb-2">¡Inscripción Registrada!</h2>
                <p className="text-gray-600">
                  Completa tu pago y carga el comprobante para finalizar tu inscripción
                </p>
              </div>

              {/* Resumen */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-[#233a63] mb-4">Resumen de tu inscripción</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Curso:</span>
                    <span className="font-medium text-[#233a63]">{program.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Participante:</span>
                    <span className="font-medium text-[#233a63]">{submittedData?.fullName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-[#233a63]">{submittedData?.email}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-gray-700 font-semibold">Total a pagar:</span>
                    <span className="font-bold text-2xl text-[#316eb5]">{program.price}</span>
                  </div>
                </div>
              </div>

              {/* Opciones de Pago */}
              <div className="space-y-5">
                <h3 className="font-semibold text-[#233a63] text-lg flex items-center gap-2">
                  <CreditCard size={20} className="text-[#316eb5]" />
                  Opciones de Pago
                </h3>

                {/* Link de Pago Online */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#233a63] mb-1">Pago Online (Recomendado)</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Paga con tarjeta de crédito o débito de forma segura
                      </p>
                      <a
                        href={program.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                      >
                        Ir a Pagar Ahora
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Transferencia Bancaria */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#233a63] flex items-center justify-center flex-shrink-0">
                      <Banknote className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#233a63] mb-1">Transferencia Bancaria</h4>
                      <p className="text-sm text-gray-600">Transfiere a nuestra cuenta bancaria</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {[
                      { label: "Banco", value: program.paymentInfo.bank },
                      { label: "Tipo de cuenta", value: program.paymentInfo.accountType },
                      { label: "RUT", value: program.paymentInfo.rut },
                      { label: "Titular", value: program.paymentInfo.name },
                      { label: "N° Cuenta", value: program.paymentInfo.accountNumber },
                      { label: "Email", value: program.paymentInfo.email },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3">
                        <span className="text-sm text-gray-600 min-w-[100px]">{item.label}:</span>
                        <span className="font-medium text-[#233a63] flex-1">{item.value}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.value, item.label)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Copiar"
                        >
                          {copiedField === item.label ? (
                            <CheckCircle2 size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      <strong>Importante:</strong> {program.paymentInfo.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carga de Comprobante */}
              <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                <h3 className="font-semibold text-[#233a63] text-lg flex items-center gap-2">
                  <Upload size={20} className="text-[#316eb5]" />
                  Comprobante de Pago
                </h3>

                <p className="text-sm text-gray-600">
                  Una vez realizado el pago, carga tu comprobante (imagen o PDF, máx 5MB)
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#316eb5] transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {uploadedFile ? (
                    <div className="space-y-4">
                      {uploadedFilePreview && (
                        <img
                          src={uploadedFilePreview}
                          alt="Preview"
                          className="max-w-xs mx-auto rounded-lg shadow-md"
                        />
                      )}
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle2 className="text-green-600" size={24} />
                        <div className="text-left">
                          <p className="font-medium text-[#233a63]">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm text-[#316eb5] hover:underline"
                      >
                        Cambiar archivo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload size={48} className="mx-auto text-gray-400" />
                      <div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-2 bg-[#316eb5] text-white font-semibold rounded-lg hover:bg-[#254e8a] transition-colors"
                        >
                          Seleccionar Archivo
                        </button>
                        <p className="text-sm text-gray-500 mt-2">o arrastra y suelta aquí</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones Finales */}
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
                  onClick={handleSubmitProof}
                  disabled={!uploadedFile || isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Comprobante
                      <ArrowRight size={20} />
                    </>
                  )}
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
