// import {Link} from 'react-router-dom'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
    
  return (
    <footer className="bg-slate-50 text-zinc-800 py-8 border-t">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center space-x-8 mb-6">
          <Link to="#" className="hover:text-violet-600 transition-colors">
            Contact us
          </Link>
          <Link to="#" className="hover:text-violet-600 transition-colors">
            Our Services
          </Link>
          <Link to="#" className="hover:text-violet-600 transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-violet-600 transition-colors">
            Terms & Conditions
          </Link>
        </nav>
        
        <div className="flex justify-center space-x-6 mb-6">
          <Link to="#" className="text-zinc-800 hover:text-violet-600 transition-colors">
            <Facebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link to="#" className="text-zinc-800 hover:text-violet-600 transition-colors">
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link to="#" className="text-zinc-800 hover:text-violet-600 transition-colors">
            <Youtube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link to="#" className="text-zinc-800 hover:text-violet-600 transition-colors">
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>

        <div className="text-center text-sm text-zinc-600">
          <p>Copyright © 2024-StyleHub || All rights reserved || Designed with React</p>
        </div>
      </div>
    </footer>
  )
}

