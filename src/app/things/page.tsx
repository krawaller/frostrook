import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getThings } from './actions';
import ThingsContent from './components/ThingsContent';

export default async function ThingsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Get things for the user
  const thingsResult = await getThings();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Things</h1>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Back to Home
            </a>
          </div>

          <Suspense
            fallback={<div className="text-center py-4">Loading...</div>}
          >
            <ThingsContent
              initialThings={
                thingsResult.success ? thingsResult.data || [] : []
              }
              error={
                thingsResult.success
                  ? null
                  : thingsResult.error || 'Unknown error'
              }
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
