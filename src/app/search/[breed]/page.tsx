'use client';
import { useEffect, useState } from 'react';
import SearchFeed from '@/components/SearchFeed';

interface SearchPageProps {
  params: Promise<{ breed: string }>;
}

export default function SearchPage({ params }: SearchPageProps) {
  const [breed, setBreed] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setBreed(resolvedParams.breed);
    });
  }, [params]);

  const handleBackToFeed = () => {
    window.history.back();
  };

  return <SearchFeed breed={breed} onBackToFeed={handleBackToFeed} />;
}