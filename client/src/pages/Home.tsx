import Features from '../components/landing/feature';
import Footer from '../components/landing/footer';
import Hero from '../components/landing/hero';
import Testimonials from '../components/landing/testimonial';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--primary-off-white)] text-[var(--accent-charcoal-gray)]">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
