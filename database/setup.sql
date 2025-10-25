-- Create the 'things' table
CREATE TABLE public.things (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.things ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only see their own things
CREATE POLICY "Users can view own things" ON public.things
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own things
CREATE POLICY "Users can insert own things" ON public.things
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own things
CREATE POLICY "Users can update own things" ON public.things
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own things
CREATE POLICY "Users can delete own things" ON public.things
    FOR DELETE USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_things_updated_at
    BEFORE UPDATE ON public.things
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();