begin;

alter table public.registrations 
add column if not exists payment_status text default 'Pendente';

commit;
