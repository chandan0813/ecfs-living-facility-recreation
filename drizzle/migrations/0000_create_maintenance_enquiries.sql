CREATE TABLE public.maintenance_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(btrim(email)) BETWEEN 1 AND 254),
  city text NOT NULL CHECK (char_length(btrim(city)) BETWEEN 1 AND 100),
  issue text NOT NULL CHECK (char_length(btrim(issue)) BETWEEN 20 AND 1200)
);
REVOKE ALL ON public.maintenance_enquiries FROM anon, authenticated;
GRANT ALL ON public.maintenance_enquiries TO service_role;
ALTER TABLE public.maintenance_enquiries ENABLE ROW LEVEL SECURITY;