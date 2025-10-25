'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import type {
  ActionResult,
  CreateThingData,
  UpdateThingData,
  Thing,
} from '@/types/database';

export async function getThings(): Promise<ActionResult<Thing[]>> {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get all things for the current user (RLS will automatically filter)
    const { data: things, error } = await supabase
      .from('things')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: things || [] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function createThing(
  data: CreateThingData
): Promise<ActionResult<Thing>> {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Create new thing
    const { data: newThing, error } = await supabase
      .from('things')
      .insert({
        title: data.title,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the things page to show the new thing
    revalidatePath('/things');

    return { success: true, data: newThing };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateThing(
  data: UpdateThingData
): Promise<ActionResult<Thing>> {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Update thing (RLS will ensure user can only update their own things)
    const { data: updatedThing, error } = await supabase
      .from('things')
      .update({ title: data.title })
      .eq('id', data.id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the things page to show the updated thing
    revalidatePath('/things');

    return { success: true, data: updatedThing };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteThing(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Delete thing (RLS will ensure user can only delete their own things)
    const { error } = await supabase.from('things').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the things page to remove the deleted thing
    revalidatePath('/things');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
