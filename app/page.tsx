"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage("Votre message a été envoyé avec succès!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitMessage("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      setSubmitMessage("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black border-b border-[#FFD700]">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_vector_ews.png"
              alt="Elite Women's Sport"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
            <span className="text-[#FFD700] font-bold">Elite Women's Sport</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
              Accueil
            </a>
            <a href="#qui-sommes-nous" className="text-[#FFD700] hover:text-white transition-colors">
              Qui sommes-nous?
            </a>
            <a href="#services" className="text-[#FFD700] hover:text-white transition-colors">
              Services
            </a>
            <a href="#players" className="text-[#FFD700] hover:text-white transition-colors">
              Joueuses
            </a>
            <a href="#contact" className="text-[#FFD700] hover:text-white transition-colors">
              Contact
            </a>
            <a href="#portail" className="text-[#FFD700] hover:text-white transition-colors">
              Portail Joueuses
            </a>
          </nav>
          <Button className="md:hidden" variant="ghost" size="icon">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#FFD700]"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center bg-black text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9c34e814-72af-4ffb-9c09-59d3e1b154f1.jpg-3Eq0T0GBVqOzWt3MIbJF9vMS8JPgVG.jpeg"
              alt="Women's football players in action"
              fill
              className="object-cover opacity-70"
              priority
            />
          </div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Agence de sport féminin</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">Votre talent est ma priorité</p>
            <blockquote className="italic text-lg md:text-xl mb-8 max-w-2xl border-l-4 border-[#FFD700] pl-4">
              "Ayez confiance en votre capacité à atteindre votre plus haut potentiel!"
              <footer className="text-[#FFD700] mt-2 text-right">— Angela Verdoes</footer>
            </blockquote>
            <Button asChild className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">
              <a href="#services">Découvrir nos services</a>
            </Button>
          </div>
        </section>

        {/* Qui sommes-nous Section */}
        <section id="qui-sommes-nous" className="py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] text-center mb-12">Qui sommes-nous?</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-white mb-6">
                  Elite Women's Sport (EWS) est né d'un vide. Celui d'un accompagnement féminin structuré, précis, et
                  visionnaire. Notre mission : construire une élite du football féminin. Pas simplement en accompagnant
                  des joueuses, mais en les formant, en les structurant, en les propulsant.
                </p>
                <p className="text-white mb-6">
                  Nous avons étudié les modèles d'agences masculines, les académies, les systèmes étrangers… Et nous
                  avons choisi de créer un modèle entièrement repensé pour les femmes : plus exigeant, plus formateur,
                  plus stratégique, plus humain.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-6">Notre vision</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>Former des athlètes professionnelles solides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>Développer des femmes visibles, influentes et respectées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>Créer des profils uniques, préparés pour durer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>Structurer l'avenir du football féminin avec méthode et ambition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] text-center mb-12">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Analyse individuelle approfondie</h3>
                <p className="text-white">
                  Chaque joueuse est diagnostiquée à 360° : profil technique, physique, mental, image, personnalité,
                  ambition. Objectif : connaître pour mieux orienter.
                </p>
              </div>
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Formation sur-mesure</h3>
                <p className="text-white">
                  Des parcours construits avec des experts de confiance : préparateurs mentaux, formateurs, coachs,
                  mentors, spécialistes en leadership féminin.
                </p>
              </div>
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Stratégie de carrière</h3>
                <p className="text-white">
                  Choix des clubs, planification à moyen/long terme, timing de mouvement. Chaque décision s'inscrit dans
                  un projet de carrière réfléchi.
                </p>
              </div>
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Image & influence</h3>
                <p className="text-white">
                  Positionnement, communication, réseaux sociaux, storytelling. Les joueuses sont formées à comprendre
                  et maîtriser leur image.
                </p>
              </div>
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Partenariats & développement</h3>
                <p className="text-white">
                  Connexion avec marques, médias, associations, projets à impact. Créer de la valeur autour de leur
                  profil, bien au-delà du terrain.
                </p>
              </div>
              <div className="bg-black border border-[#FFD700] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Programme Signature</h3>
                <p className="text-white">
                  Un parcours exclusif destiné à un groupe restreint de joueuses, sélectionnées pour leur potentiel et
                  leur engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Players Section */}
        <section id="players" className="py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] text-center mb-12">Nos Joueuses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image src="/linapic.PNG" alt="Haulani Lina" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#FFD700]">Haulani Lina</h3>
                  <p className="text-gray-400">DD/MC/MOC • WYDAD CASABLANCA</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-600">Photo</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#FFD700]">Nom de la joueuse</h3>
                  <p className="text-gray-400">Position • Club</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-600">Photo</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#FFD700]">Nom de la joueuse</h3>
                  <p className="text-gray-400">Position • Club</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">Voir toutes nos joueuses</Button>
            </div>
          </div>
        </section>

        {/* Notre Approche Section */}
        <section id="notre-approche" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] text-center mb-12">Notre Approche</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/notreApproche.jpg"
                  alt="Notre approche du football féminin"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div>
                <p className="text-white mb-6">
                  EWS ne veut pas "profiter" de l'essor du foot féminin. Nous voulons y apporter une structure, une
                  méthode, une ambition.
                </p>
                <p className="text-white mb-6">
                  Nous ne réagissons pas aux opportunités : nous les créons. Nous ne pensons pas "carrière" au sens
                  administratif : nous pensons trajectoire, puissance, longévité.
                </p>
                <p className="text-white mb-6">
                  Nous ne plaçons pas des profils : nous révélons des identités. Nous construisons un système qui ouvre
                  la voie à toutes les joueuses prêtes à se structurer — qu'elles atteignent le plus haut niveau ou non.
                </p>
                <p className="text-white font-bold">
                  Nous voulons que les femmes soient plus que des athlètes. Qu'elles soient des forces. Des références.
                  Des leaders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] text-center mb-12">Contactez-nous</h2>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#FFD700] mb-1">
                    Nom
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-[#FFD700] text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#FFD700] mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-[#FFD700] text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#FFD700] mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-gray-900 border-[#FFD700] text-white min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </Button>
                {submitMessage && <p className="text-center text-sm mt-2 text-white">{submitMessage}</p>}
              </form>
            </div>
          </div>
        </section>

        {/* Portail Section (Placeholder) */}
        <section id="portail" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-8">Portail Joueuses</h2>
            <p className="text-white mb-8 max-w-2xl mx-auto">
              Notre portail dédié aux joueuses sera bientôt disponible. Restez à l'écoute pour plus d'informations.
            </p>
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" disabled>
              Bientôt disponible
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-[#FFD700] py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo_vector_ews.png" alt="Elite Women's Sport" width={40} height={40} />
              <span className="text-[#FFD700] font-bold">Elite Women's Sport</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
            <p className="text-white text-sm">
              &copy; {new Date().getFullYear()} Elite Women's Sport. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
