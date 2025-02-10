import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './../ui/card';
import { Button } from './../ui/button';
import { useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';

const testimonials = [
  {
    name: 'Amit Sharma',
    review:
      'Elegant and beautifully designed invitations! Truly outstanding service.',
    rating: 5,
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Patel',
    review: 'The customization options were fantastic! Seamless experience.',
    rating: 4.5,
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rahul Mehta',
    review: 'Professional and helpful team. My wedding invites were perfect!',
    rating: 4,
    img: 'https://randomuser.me/api/portraits/men/40.jpg',
  },
  {
    name: 'Sneha Verma',
    review: 'A smooth and delightful experience. Highly recommended!',
    rating: 5,
    img: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[var(--primary-maroon)] to-[var(--secondary-royal-blue)] text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-extrabold">What Our Customers Say</h2>
        <p className="mt-2 text-lg text-white/80">
          See why people love Invitaria!
        </p>

        {/* Carousel */}
        <div className="relative mt-10 max-w-2xl mx-auto">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
              <CardContent className="flex flex-col items-center">
                <img
                  src={testimonials[index].img}
                  alt={testimonials[index].name}
                  className="w-16 h-16 rounded-full border-4 border-[var(--primary-gold)]"
                />
                <h3 className="mt-4 text-lg font-semibold">
                  {testimonials[index].name}
                </h3>

                {/* Star Ratings */}
                <div className="flex justify-center mt-2 space-x-1">
                  {[...Array(Math.floor(testimonials[index].rating))].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[var(--primary-gold)] fill-[var(--primary-gold)]"
                      />
                    )
                  )}
                  {testimonials[index].rating % 1 !== 0 && (
                    <Star className="w-5 h-5 text-[var(--primary-gold)] fill-[var(--primary-gold)] opacity-50" />
                  )}
                </div>

                <p className="text-white/90 mt-3 text-sm">
                  {testimonials[index].review}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[var(--primary-maroon)] text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            ◀
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--primary-maroon)] text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            ▶
          </Button>
        </div>
      </div>
    </section>
  );
}
