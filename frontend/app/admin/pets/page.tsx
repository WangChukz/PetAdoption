import React from 'react';
import { 
  Plus, 
  Search, 
  Baby, 
  Stethoscope, 
  ShieldAlert, 
  MonitorCheck, 
  GraduationCap, 
  CheckCircle2, 
  EyeOff,
  Dog,
  Heart
} from 'lucide-react';

import { fetchAPI } from '@/lib/api';
import PetListingClient from './components/PetListingClient';

type Pet = {
  id: number;
  name: string;
  species: string;
  age_months: number;
  breed: string | null;
  pet_profile?: {
    status: string;
    intake_date: string | null;
  };
  gender: 'male' | 'female' | 'unknown';
  image_url: string | null;
};

type PaginatedPets = {
  data: Pet[];
  current_page: number;
  last_page: number;
  total: number;
};

const statusMap: Record<string, { label: string; color: string }> = {
  READY_FOR_ADOPTION: { label: 'CHỜ NHẬN NUÔI', color: 'bg-emerald-50 text-emerald-500' },
  AVAILABLE:          { label: 'ĐANG TÌM CHỦ', color: 'bg-emerald-50 text-emerald-500' },
  ADOPTED:            { label: 'ĐÃ CÓ CHỦ', color: 'bg-blue-50 text-blue-500' },
  TREATMENT:          { label: 'ĐANG ĐIỀU TRỊ', color: 'bg-orange-50 text-orange-500' },
  FOSTERED:           { label: 'CHĂM SÓC TẠM THỜI', color: 'bg-purple-50 text-purple-500' },
  INTAKE:             { label: 'MỚI TIẾP NHẬN', color: 'bg-gray-50 text-gray-500' },
};

async function getPets(page = 1, search = ''): Promise<PaginatedPets> {
  const query = new URLSearchParams({ page: page.toString() });
  if (search) query.set('search', search);

  const res = await fetchAPI(`/admin/pets?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminPetsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const search = params.search ?? '';
  
  const initialData = await getPets(page, search);

  return (
    <PetListingClient 
      initialData={initialData} 
      statusMap={statusMap} 
    />
  );
}
