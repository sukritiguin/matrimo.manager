import { Button } from './../ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-maroon)] to-[var(--accent-coral)] text-white">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Celebrate{' '}
            <span className="text-[var(--primary-gold)]">
              Love & Togetherness
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Plan and cherish unforgettable wedding experiences with elegance,
            joy, and culture.
          </p>
          <div className="mt-6 flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/auth/login">
              <Button className="bg-[var(--primary-gold)] text-black px-6 py-3 text-lg font-bold">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button className="bg-white text-[var(--primary-maroon)] px-6 py-3 text-lg font-bold border border-white">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="https://png.pngtree.com/png-clipart/20231003/original/pngtree-lord-ganesha-png-image_13236682.png"
            alt="Wedding Theme"
            className="w-96"
          />
        </motion.div>
      </div>
    </section>
  );
}
