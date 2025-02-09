import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Register data', data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-bold text-[var(--primary-maroon)]">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          {...register('name')}
          error={errors.name?.message as string}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message as string}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message as string}
        />
        <Button
          type="submit"
          className="w-full bg-[var(--secondary-forest-green)] text-white hover:bg-opacity-90"
        >
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm text-[var(--accent-charcoal-gray)]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-[var(--secondary-royal-blue)] hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
