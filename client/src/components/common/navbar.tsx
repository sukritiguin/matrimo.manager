import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./../ui/button";
import { Menu, X } from "lucide-react";
import { UserButton } from "./user-button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold  ${
            isScrolled ? "text-[var(--primary-maroon)]" : "text-white"
          }`}
        >
          Invitaria
        </Link>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex space-x-8 ${isScrolled ? "text-black" : "text-amber-100"}`}
        >
          <Link
            to="/"
            className={`hover:${!isScrolled ? "text-white" : "text-[var(--primary-maroon)]"} transition`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:${!isScrolled ? "text-white" : "text-[var(--primary-maroon)]"} transition`}
          >
            About
          </Link>
          <Link
            to="/features"
            className={`hover:${!isScrolled ? "text-white" : "text-[var(--primary-maroon)]"} transition`}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={`hover:${!isScrolled ? "text-white" : "text-[var(--primary-maroon)]"} transition`}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className={`hover:${!isScrolled ? "text-white" : "text-[var(--primary-maroon)]"} transition`}
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
    </motion.nav>
  );
}
