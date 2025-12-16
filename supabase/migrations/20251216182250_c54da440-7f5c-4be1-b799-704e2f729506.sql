-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  complaint_text TEXT NOT NULL,
  city TEXT,
  category TEXT,
  priority TEXT,
  department TEXT,
  summary TEXT,
  status TEXT DEFAULT 'pending',
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on complaints
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Users can view their own complaints
CREATE POLICY "Users can view their own complaints"
ON public.complaints
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own complaints
CREATE POLICY "Users can insert their own complaints"
ON public.complaints
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all complaints
CREATE POLICY "Admins can view all complaints"
ON public.complaints
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update all complaints
CREATE POLICY "Admins can update all complaints"
ON public.complaints
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for complaint images
INSERT INTO storage.buckets (id, name, public) VALUES ('complaint-images', 'complaint-images', true);

-- Storage policies for complaint images
CREATE POLICY "Users can upload complaint images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'complaint-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view complaint images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'complaint-images');

CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'complaint-images' AND auth.uid()::text = (storage.foldername(name))[1]);