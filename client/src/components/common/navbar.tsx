import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { UserButton } from "./user-button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`w-full max-w-7xl z-50 transition-all`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold capitalize roboto-slab`}>
          Invitaria
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-8`}>
          <Link
            to="/"
            className="font-semibold text-sm opacity-100 hover:text-muted-foreground transition-all duration-200 delay-100"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-semibold text-sm opacity-100 hover:text-muted-foreground transition-all duration-200 delay-100"
          >
            About
          </Link>
          <Link
            to="/features"
            className="font-semibold text-sm opacity-100 hover:text-muted-foreground transition-all duration-200 delay-100"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="font-semibold text-sm opacity-100 hover:text-muted-foreground transition-all duration-200 delay-100"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="font-semibold text-sm opacity-100 hover:text-muted-foreground transition-all duration-200 delay-100"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <UserButton />

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="hover:text-[var(--primary-maroon)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-[var(--primary-maroon)] transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/features"
              className="hover:text-[var(--primary-maroon)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:text-[var(--primary-maroon)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="hover:text-[var(--primary-maroon)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <UserButton isMobile={menuOpen} />
          </div>
        </motion.div>
      )}
    </nav>
  );
}
