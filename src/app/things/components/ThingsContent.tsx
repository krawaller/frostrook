'use client';

import { useState, useTransition } from 'react';
import { createThing, updateThing, deleteThing } from '../actions';
import type { Thing } from '@/types/database';

interface ThingsContentProps {
  initialThings: Thing[];
  error: string | null;
}

export default function ThingsContent({
  initialThings,
  error: initialError,
}: ThingsContentProps) {
  const [things, setThings] = useState<Thing[]>(initialThings);
  const [newThingTitle, setNewThingTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [error, setError] = useState<string | null>(initialError);
  const [isPending, startTransition] = useTransition();

  const handleAddThing = () => {
    if (!newThingTitle.trim()) return;

    startTransition(async () => {
      const result = await createThing({ title: newThingTitle.trim() });

      if (result.success && result.data) {
        setThings((prev) => [result.data!, ...prev]);
        setNewThingTitle('');
        setError(null);
      } else {
        setError(result.error || 'Failed to create thing');
      }
    });
  };

  const handleStartEdit = (thing: Thing) => {
    setEditingId(thing.id);
    setEditingTitle(thing.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingTitle.trim()) return;

    startTransition(async () => {
      const result = await updateThing({
        id: editingId,
        title: editingTitle.trim(),
      });

      if (result.success && result.data) {
        setThings((prev) =>
          prev.map((thing) => (thing.id === editingId ? result.data! : thing))
        );
        setEditingId(null);
        setEditingTitle('');
        setError(null);
      } else {
        setError(result.error || 'Failed to update thing');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this thing?')) return;

    startTransition(async () => {
      const result = await deleteThing(id);

      if (result.success) {
        setThings((prev) => prev.filter((thing) => thing.id !== id));
        setError(null);
      } else {
        setError(result.error || 'Failed to delete thing');
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
    if (e.key === 'Escape' && editingId) {
      handleCancelEdit();
    }
  };

  return (
    <div>
      {/* Error display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Add new thing form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Add New Thing
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newThingTitle}
            onChange={(e) => setNewThingTitle(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleAddThing)}
            placeholder="Enter thing title..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isPending}
          />
          <button
            onClick={handleAddThing}
            disabled={isPending || !newThingTitle.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      {/* Things list */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Things ({things.length})
        </h2>

        {things.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No things yet. Add your first thing above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {things.map((thing) => (
              <div
                key={thing.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  {editingId === thing.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleSaveEdit)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isPending}
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        disabled={isPending || !editingTitle.trim()}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isPending}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {thing.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created{' '}
                        {new Date(thing.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {editingId !== thing.id && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleStartEdit(thing)}
                      disabled={isPending}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(thing.id)}
                      disabled={isPending}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
