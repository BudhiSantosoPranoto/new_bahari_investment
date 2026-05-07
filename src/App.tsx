import { useState, useEffect } from 'react'
import { Menu, X, Building2, MapPin, TrendingUp, CheckCircle2, Clock } from 'lucide-react'

// Google Sheets API configuration
const SHEET_ID = '13TmYQAgUVsiz7hXjsUoSXtEXchrEm_aZBfPblC8Imk4'
const SHEET_NAME = 'project_list'

interface Project {
  id: string
  name: string
  location: string
  roi: string
  status: string
  description?: string
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="relative w-full bg-[#121212] border-b border-luxury-gold/20 py-6 z-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Branding Text - Left */}
          <span className="font-serif text-2xl font-bold text-[#B89146]">
            Bahari Investment
          </span>

          {/* Navigation Menu - Right */}
          <div className="flex items-center gap-8">
            <a href="#home" className="text-luxury-off-white font-medium hover:text-[#B89146]">Home</a>
            <a href="#portfolio" className="text-luxury-off-white font-medium hover:text-[#B89146]">Portfolio</a>
            <a href="#opportunities" className="text-luxury-gold font-bold hover:text-[#B89146]">Investment Opportunities</a>
            <a href="#about" className="text-luxury-off-white font-medium hover:text-[#B89146]">About</a>
            <a href="#contact" className="text-luxury-off-white font-medium hover:text-[#B89146]">Contact</a>
            <button className="bg-luxury-gold text-luxury-dark px-6 py-2 rounded-sm font-semibold shadow-lg shadow-luxury-gold/20 hover:bg-white transition-colors">
              Invest Now
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-[#B89146]">
            Bahari Investment
          </span>

          {/* Mobile Menu Button */}
          <button
            className="text-luxury-off-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-luxury-gold/20 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-luxury-off-white hover:text-[#B89146] font-medium">Home</a>
              <a href="#portfolio" className="text-luxury-off-white hover:text-[#B89146] font-medium">Portfolio</a>
              <a href="#opportunities" className="text-luxury-gold font-bold">Investment Opportunities</a>
              <a href="#about" className="text-luxury-off-white hover:text-[#B89146] font-medium">About</a>
              <a href="#contact" className="text-luxury-off-white hover:text-[#B89146] font-medium">Contact</a>
              <button className="bg-luxury-gold text-luxury-dark px-6 py-2 rounded-sm font-semibold w-fit">
                Invest Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center backdrop-brightness-50"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)',
        }}
      >
        {/* Gradient Overlay: Black at bottom to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Over-title */}
        <p className="text-luxury-gold uppercase tracking-widest text-sm md:text-base mb-4 font-medium">
          Now Accepting International Investors
        </p>
        
        {/* Main Title with Gold Vertical Accent */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="hidden md:block w-1 h-24 bg-[#B89146]"></div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Premium Investment Opportunities in Indonesia
          </h1>
        </div>
        
        {/* Sub-title */}
        <p className="text-xl md:text-2xl text-luxury-off-white/80 mb-10 font-light max-w-3xl mx-auto">
          Secure, Profitable, and Transparent real estate investments in Southeast Asia's fastest-growing economy.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="border border-[#B89146] text-[#B89146] px-10 py-4 rounded-none font-medium text-lg hover:bg-[#B89146] hover:text-white transition-all duration-300">
            Explore Opportunities
          </button>
          <button className="border border-luxury-gold text-luxury-gold px-10 py-4 rounded-none font-medium text-lg hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`
    )
    const text = await response.text()
    const jsonText = text.substring(47).slice(0, -2)
    const json = JSON.parse(jsonText)
    
    return json.table.rows.map((row: any, index: number) => ({
      id: String(index),
      name: row.c[0]?.v || 'Unknown',
      location: row.c[1]?.v || 'Tegal',
      roi: row.c[2]?.v || 'N/A',
      status: row.c[3]?.v || 'Available',
      description: row.c[4]?.v || '',
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

function ProjectCard({ project }: { project: Project }) {
  const getStatusIcon = (status: string) => {
    if (status.toLowerCase().includes('available') || status.toLowerCase().includes('open')) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />
    }
    return <Clock className="w-5 h-5 text-luxury-gold" />
  }

  return (
    <div className="group relative bg-luxury-dark-light border border-luxury-gold/30 p-8 hover:border-luxury-gold transition-all duration-500 hover:shadow-lg hover:shadow-luxury-gold/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start justify-between mb-4">
        <Building2 className="w-8 h-8 text-luxury-gold" />
        <div className="flex items-center gap-2">
          {getStatusIcon(project.status)}
          <span className="text-sm text-luxury-off-white/70">{project.status}</span>
        </div>
      </div>

      <h3 className="font-serif text-2xl font-semibold text-white mb-2 group-hover:text-luxury-gold transition-colors">
        {project.name}
      </h3>

      <div className="flex items-center gap-2 text-luxury-off-white/70 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{project.location}</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-luxury-gold" />
        <span className="text-3xl font-serif font-bold text-luxury-gold">{project.roi}</span>
        <span className="text-luxury-off-white/70">ROI</span>
      </div>

      {project.description && (
        <p className="text-luxury-off-white/60 text-sm mb-6 line-clamp-2">
          {project.description}
        </p>
      )}

      <button className="w-full border border-luxury-gold text-luxury-gold py-3 rounded-sm font-medium hover:bg-luxury-gold hover:text-luxury-dark transition-all">
        View Details
      </button>
    </div>
  )
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showLogoModal, setShowLogoModal] = useState(true)

  useEffect(() => {
    fetchProjects().then(setProjects)
  }, [])

  // Tutup modal jika klik di luar area logo
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowLogoModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-[#B89146] selection:text-white">
      {/* LOGO MODAL OVERLAY - Melayang di awal, 4x lebih besar */}
      {showLogoModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={handleModalClick}
        >
          <div className="text-center p-8 animate-fade-in">
            <img 
              src="/images/new_logo_bahari_investment.jpeg" 
              alt="Bahari Investment" 
              className="h-80 w-auto object-contain mx-auto drop-shadow-[0_0_50px_rgba(184,145,70,0.8)]"
            />
            <p className="font-serif text-3xl text-[#B89146] mt-8 tracking-widest uppercase font-bold">
              Bahari Investment
            </p>
          </div>
        </div>
      )}

      <Navbar />
      <HeroSection />
      
      {/* Investment Opportunities Section */}
      {projects.length > 0 && (
        <section id="opportunities" className="py-24 px-6 bg-[#0F0F0F]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Investment Opportunities
              </h2>
              <p className="text-luxury-off-white/70 text-lg max-w-2xl mx-auto">
                Discover premium investment opportunities in Indonesia's most prestigious developments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="border border-luxury-gold text-luxury-gold px-8 py-3 rounded-sm font-medium hover:bg-luxury-gold hover:text-luxury-dark transition-all">
                View All Projects
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
