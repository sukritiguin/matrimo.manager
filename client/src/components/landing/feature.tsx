import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Users, CalendarHeart } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="w-10 h-10 text-[var(--primary-gold)]" />,
    title: 'Seamless Invitations',
    description: 'Create and send stunning digital invitations effortlessly.',
  },
  {
    icon: <Users className="w-10 h-10 text-[var(--secondary-royal-blue)]" />,
    title: 'Guest Management',
    description: 'Track RSVPs, manage guest lists, and stay organized.',
  },
  {
    icon: (
      <CalendarHeart className="w-10 h-10 text-[var(--secondary-forest-green)]" />
    ),
    title: 'Event Scheduler',
    description: 'Plan your wedding timeline with ease and precision.',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-[var(--accent-coral)]" />,
    title: 'Personalized Themes',
    description: 'Choose from a variety of elegant wedding themes.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-[var(--primary-off-white)]">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-[var(--primary-maroon)]"
        >
          Why Choose Invitaria?
        </motion.h2>
        <p className="text-lg text-gray-700 mt-4">
          Elevate your wedding experience with our exclusive features.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-center p-6 bg-white shadow-lg rounded-xl space-x-6"
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-[var(--primary-maroon)]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
