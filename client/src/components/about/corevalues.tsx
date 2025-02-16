import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './../../components/ui/card';
import {
  FaRegLightbulb,
  FaHandshake,
  FaUsers,
  FaShieldAlt,
} from 'react-icons/fa';

const coreValues = [
  {
    icon: <FaRegLightbulb className="text-[var(--primary-gold)] text-4xl" />,
    title: 'Innovation',
    description:
      'We embrace creativity and cutting-edge solutions to redefine industry standards.',
  },
  {
    icon: (
      <FaHandshake className="text-[var(--secondary-royal-blue)] text-4xl" />
    ),
    title: 'Integrity',
    description:
      'Honesty and transparency are the cornerstones of our work culture.',
  },
  {
    icon: <FaUsers className="text-[var(--secondary-soft-pink)] text-4xl" />,
    title: 'Collaboration',
    description: 'Working together, we create meaningful and lasting impact.',
  },
  {
    icon: (
      <FaShieldAlt className="text-[var(--secondary-forest-green)] text-4xl" />
    ),
    title: 'Excellence',
    description:
      'We strive for perfection in every project, ensuring the best outcomes.',
  },
];

export default function CoreValues() {
  return (
    <section className="py-16 bg-[var(--primary-off-white)]">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-[var(--primary-maroon)] mb-8"
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="shadow-lg border border-[var(--accent-charcoal-gray)] bg-white rounded-xl p-6 flex items-center gap-4">
                <CardHeader className="flex-shrink-0">{value.icon}</CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold text-[var(--primary-maroon)]">
                    {value.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
