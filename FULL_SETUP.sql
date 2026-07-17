-- FocusBloom 4.0 — Full Supabase setup
-- Run the entire file in Supabase > SQL Editor > New query.

create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.subject_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null,
  storage_path text not null unique,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text,
  output_type text not null,
  title text,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;
alter table public.subject_files enable row level security;
alter table public.ai_outputs enable row level security;

drop policy if exists "state_select_own" on public.user_app_state;
create policy "state_select_own" on public.user_app_state
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "state_insert_own" on public.user_app_state;
create policy "state_insert_own" on public.user_app_state
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "state_update_own" on public.user_app_state;
create policy "state_update_own" on public.user_app_state
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "files_select_own" on public.subject_files;
create policy "files_select_own" on public.subject_files
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "files_insert_own" on public.subject_files;
create policy "files_insert_own" on public.subject_files
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "files_delete_own" on public.subject_files;
create policy "files_delete_own" on public.subject_files
for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "outputs_select_own" on public.ai_outputs;
create policy "outputs_select_own" on public.ai_outputs
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "outputs_insert_own" on public.ai_outputs;
create policy "outputs_insert_own" on public.ai_outputs
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "outputs_delete_own" on public.ai_outputs;
create policy "outputs_delete_own" on public.ai_outputs
for delete to authenticated using ((select auth.uid()) = user_id);

-- Private file bucket
insert into storage.buckets (id, name, public, file_size_limit)
values ('subject-files', 'subject-files', false, 52428800)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "storage_upload_own" on storage.objects;
create policy "storage_upload_own" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'subject-files'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "storage_read_own" on storage.objects;
create policy "storage_read_own" on storage.objects
for select to authenticated
using (
  bucket_id = 'subject-files'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "storage_delete_own" on storage.objects;
create policy "storage_delete_own" on storage.objects
for delete to authenticated
using (
  bucket_id = 'subject-files'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
