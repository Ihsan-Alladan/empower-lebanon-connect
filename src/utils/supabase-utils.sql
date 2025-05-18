
-- This file contains SQL snippets that need to be manually run in Supabase SQL Editor

-- Function to increment event attendees count
CREATE OR REPLACE FUNCTION public.increment_event_attendees(event_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.events
  SET registered_attendees = registered_attendees + 1
  WHERE id = event_id;
END;
$$;
