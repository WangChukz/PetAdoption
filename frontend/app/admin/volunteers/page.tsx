import React from 'react';
import { fetchAPI } from '@/lib/api';
import VolunteerListingClient from './components/VolunteerListingClient';

type VolunteerApplication = {
  id: number;
  name: string;
  email: string;
  position: string;
  cv_path: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

type PaginatedVolunteers = {
  data: VolunteerApplication[];
  current_page: number;
  last_page: number;
  total: number;
};

async function getVolunteers(page = 1, status = '', search = '', position = '', start_date = '', end_date = ''): Promise<PaginatedVolunteers> {
  const query = new URLSearchParams({ page: page.toString() });
  if (status) query.set('status', status);
  if (search) query.set('q', search);
  if (position) query.set('position', position);
  if (start_date) query.set('start_date', start_date);
  if (end_date) query.set('end_date', end_date);

  const res = await fetchAPI(`/admin/volunteers?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

async function getVolunteerStats() {
  const res = await fetchAPI('/admin/volunteers/stats', { cache: 'no-store' });
  return res.data;
}

export default async function AdminVolunteersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; q?: string; position?: string; start_date?: string; end_date?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const statusFilter = params.status ?? '';
  const searchQuery = params.q ?? '';
  const positionFilter = params.position ?? '';
  const startDate = params.start_date ?? '';
  const endDate = params.end_date ?? '';
  
  const [vPage, stats] = await Promise.all([
    getVolunteers(page, statusFilter, searchQuery, positionFilter, startDate, endDate),
    getVolunteerStats()
  ]);

  return (
    <VolunteerListingClient 
      initialData={vPage} 
      stats={stats} 
    />
  );
}
