import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Separator } from './../../components/ui/seperator';
import { Card, CardContent } from './../../components/ui/card';

const milestones = [
  {
    year: '2018',
    event: 'Company founded with a vision for digital invitations.',
    image:
      'https://cdn.prod.website-files.com/66636e6bdd12f4f3d0617065/6705da7d4a81ce60f453e0d9_Our%20Investment%20in%20Zepto.jpg',
  },
  {
    year: '2021',
    event: 'Expanded to a global market, serving thousands of users.',
    image:
      'https://cdn.prod.website-files.com/66636e6bdd12f4f3d0617065/6705da7d4a81ce60f453e0d9_Our%20Investment%20in%20Zepto.jpg',
  },
  {
    year: 'Present',
    event: 'Continuing to innovate and lead in the industry.',
    image:
      'https://cdn.prod.website-files.com/66636e6bdd12f4f3d0617065/6705da7d4a81ce60f453e0d9_Our%20Investment%20in%20Zepto.jpg',
  },
];

export default function OurJourney() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-6 my-20 py-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-2xl">
      <motion.h2
        className="text-5xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Journey
      </motion.h2>
      <Separator className="my-6 border-gray-700" />
      <div className="relative flex flex-col items-center space-y-12">
        {milestones.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row items-center justify-center w-full"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Timeline Indicator */}
            <div className="relative flex items-center justify-center lg:justify-start">
              <motion.span
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {item.year}
              </motion.span>
              {/* Vertical Line (Hidden on Mobile) */}
              {index !== milestones.length - 1 && (
                <div className="hidden lg:block w-1 bg-gradient-to-b from-purple-500 to-indigo-500 h-16 absolute left-1/2 transform -translate-x-1/2 top-12"></div>
              )}
            </div>

            {/* Content */}
            <motion.div
              className="w-full max-w-2xl mt-6 lg:mt-0 lg:ml-8"
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="flex flex-col lg:flex-row items-center p-6">
                  <img
                    src={item.image}
                    alt={item.year}
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-gray-300 ml-6 text-lg font-medium">
                    {item.event}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
