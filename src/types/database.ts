// Database types for the things table
export interface Thing {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// Type for creating a new thing (without auto-generated fields)
export interface CreateThingData {
  title: string;
}

// Type for updating a thing
export interface UpdateThingData {
  id: string;
  title: string;
}

// Response types for server actions
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
