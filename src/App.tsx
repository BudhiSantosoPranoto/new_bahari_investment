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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-luxury-dark/80 backdrop-blur-md border-b border-luxury-gold/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left aligned, smaller size with Gold Glow and Brand Name */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/new_logo_bahari_investment.jpeg" 
              alt="Bahari Investment Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(184,145,70,0.5)]"
            />
            <span className="font-serif text-xl font-bold text-[#B89146] hidden md:block">
              Bahari Investment
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Home</a>
            <a href="#portfolio" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Portfolio</a>
            <a href="#opportunities" className="text-luxury-gold font-bold transition-colors">Investment Opportunities</a>
            <a href="#about" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">About</a>
            <a href="#contact" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Contact</a>
            <button className="bg-luxury-gold text-luxury-dark px-6 py-2 rounded-sm font-semibold hover:bg-luxury-gold/90 transition-colors shadow-lg shadow-luxury-gold/20">
              Invest Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-luxury-off-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-luxury-gold/20 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Home</a>
              <a href="#portfolio" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Portfolio</a>
              <a href="#opportunities" className="text-luxury-gold font-bold transition-colors">Investment Opportunities</a>
              <a href="#about" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">About</a>
              <a href="#contact" className="text-luxury-off-white hover:text-luxury-gold transition-colors font-medium">Contact</a>
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

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  // Hide section if no data available
  if (!loading && projects.length === 0) {
    return null
  }

  return (
    <section id="opportunities" className="py-24 bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Investment Opportunities
          </h2>
          <p className="text-luxury-off-white/70 text-lg max-w-2xl mx-auto">
            Discover premium investment opportunities in Indonesia's most prestigious developments
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-luxury-dark-light border border-luxury-gold/20 p-8 animate-pulse">
                <div className="h-8 bg-luxury-gold/20 rounded mb-4"></div>
                <div className="h-4 bg-luxury-gold/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-luxury-gold/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="border border-luxury-gold text-luxury-gold px-8 py-3 rounded-none font-medium hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300">
                View All Projects
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-luxury-dark-light border-t border-luxury-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-luxury-gold" />
              <span className="font-serif text-lg font-semibold text-white">Bahari Investment</span>
            </div>
            <p className="text-luxury-off-white/60">
              Premium real estate investment opportunities in Indonesia's most promising cities.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-luxury-off-white/60 hover:text-luxury-gold transition-colors">Home</a></li>
              <li><a href="#projects" className="text-luxury-off-white/60 hover:text-luxury-gold transition-colors">Projects</a></li>
              <li><a href="#about" className="text-luxury-off-white/60 hover:text-luxury-gold transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-luxury-off-white/60">
              <li>Tegal, Central Java</li>
              <li>info@bahariinvestment.com</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-luxury-gold/20 pt-8 text-center">
          <p className="text-luxury-off-white/40">
            © {new Date().getFullYear()} Bahari Investment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-luxury-dark">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
