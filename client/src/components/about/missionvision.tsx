import { motion } from 'framer-motion';
import { FaBullseye, FaEye } from 'react-icons/fa';

export default function MissionVision() {
  return (
    <section className="w-full py-20 bg-[var(--primary-off-white)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[var(--primary-maroon)]">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Empowering love, joy, and elegance through seamless wedding
            experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 shadow-lg rounded-xl flex flex-col items-center text-center"
          >
            <FaBullseye className="text-[var(--primary-maroon)] text-6xl" />
            <h3 className="text-2xl font-bold text-[var(--primary-maroon)] mt-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mt-2 text-lg">
              To provide seamless, elegant, and personalized wedding solutions
              that turn dreams into reality.
            </p>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 shadow-lg rounded-xl flex flex-col items-center text-center"
          >
            <FaEye className="text-[var(--secondary-royal-blue)] text-6xl" />
            <h3 className="text-2xl font-bold text-[var(--secondary-royal-blue)] mt-4">
              Our Vision
            </h3>
            <p className="text-gray-600 mt-2 text-lg">
              To be the global leader in wedding planning, setting new standards
              for elegance, innovation, and joy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
