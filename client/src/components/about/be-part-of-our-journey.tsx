import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Button } from './../../components/ui/button';

export default function BePartOfOurJourney() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="relative bg-[var(--primary-off-white)] py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-var(--primary-maroon) to-indigo-700 opacity-20"
        animate={{ x: [-100, 100], y: [-100, 100] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-5xl font-bold text-[var(--primary-maroon)] mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Be Part of Our Journey
        </motion.h2>
        <motion.p
          className="text-xl text-[var(--primary-maroon)] max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join us in revolutionizing the digital invitation industry. Together,
          we can create unforgettable experiences.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            className="bg-white text-[var(--primary-maroon)] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform"
            // whileHover={{ scale: 1.05 }}
          >
            Join Us Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
