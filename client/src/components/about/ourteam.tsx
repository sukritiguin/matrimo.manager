import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Card, CardContent } from './../../components/ui/card';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Separator } from '../ui/seperator';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Michael Brown',
    role: 'Lead Designer',
    image:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Head',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
];

export default function OurTeam() {
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
        Our Team
      </motion.h2>
      <Separator className="my-6 border-gray-700" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Card className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover shadow-md mb-4"
                />
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-gray-400 text-lg mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
