import BePartOfOurJourney from '../components/about/be-part-of-our-journey';
import CoreValues from '../components/about/corevalues';
import MissionVision from '../components/about/missionvision';
import OurJourney from '../components/about/ourjourney';
import OurTeam from '../components/about/ourteam';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <section className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elevating Digital Invitations
        </motion.h1>
        <motion.p
          className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Where technology meets elegance, creating seamless and memorable
          experiences.
        </motion.p>
      </div>

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Core Values - Interactive Flip Cards */}
      <CoreValues />

      {/* Timeline - Company Journey */}
      <OurJourney />

      <OurTeam />

      {/* Call to Action */}
      <BePartOfOurJourney />
    </section>
  );
}
