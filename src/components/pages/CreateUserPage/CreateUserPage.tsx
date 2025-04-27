import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../store/authStore';
import Button from '../../atoms/Button';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format'),
  status: z.enum(['active', 'locked']),
});

type UserFormData = z.infer<typeof userSchema>;

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: 'active',
    },
  });

  const createUser = async (userData: UserFormData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.result?.message || 'Failed to create user');
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(data.result?.message || 'User created successfully!');
      navigate('/dashboard'); // Changed to navigate to /dashboard as specified
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Create New User
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields remain the same as your original code */}
        {/* First Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name*
          </label>
          <input
            {...register('firstName')}
            className={`w-full p-2 border rounded ${
              errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            {...register('lastName')}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email*
          </label>
          <input
            type="email"
            {...register('email')}
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Date of Birth* (YYYY-MM-DD)
          </label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className={`w-full p-2 border rounded ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Status*
          </label>
          <select
            {...register('status')}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          >
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;