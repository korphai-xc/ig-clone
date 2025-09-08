'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { isSearchModeAtom } from '@/store/feed';
import Post from '../Post';
import { Box, Button, CircularProgress } from '@mui/material';

const SCROLL_THRESHOLD = 50;

interface SearchFeedProps {
  breed: string;
  onBackToFeed: () => void;
}

export default function SearchFeed({ breed, onBackToFeed }: SearchFeedProps) {
  const [, setIsSearchMode] = useAtom(isSearchModeAtom);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(0);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchSearchResults = useCallback(async (page: number = 0) => {
    if (isSearching || !breed || !hasMoreSearchResults) {
      return;
    }

    setIsSearching(true);
    try {
      const breedParts = breed.split('-');
      const breedName = breedParts[0];
      const subbreedName = breedParts.slice(1).join('-');

      const queryParams = new URLSearchParams({
        breed: breedName,
        subbreed: subbreedName,
        count: '10'
      });

      const response = await fetch(`/api/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        if (page === 0) {
          setSearchResults(data.data);
        } else {
          setSearchResults(prev => [...prev, ...data.data]);
        }
        setSearchPage(page + 1);
        setHasMoreSearchResults(data.data.length >= 10);
      } else {
        setHasMoreSearchResults(false);
      }
    } catch (error) {
      console.error('Error fetching more search results:', error);
      setHasMoreSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  }, [isSearching, breed, hasMoreSearchResults]);

  const lastSearchResultRef = useCallback(
    (node: any) => {
      if (isSearching || !hasMoreSearchResults) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        const shouldLoadMore = entry?.isIntersecting &&
                              hasMoreSearchResults &&
                              !isSearching &&
                              searchResults.length > 0 &&
                              searchResults.length < SCROLL_THRESHOLD;

        if (shouldLoadMore) {
          fetchSearchResults(searchPage);
        }
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });

      if (node) observer.current.observe(node);
    },
    [isSearching, hasMoreSearchResults, searchPage, searchResults.length]
  );

  const prevBreedRef = useRef<string>('');

  useEffect(() => {
    if (breed && breed !== prevBreedRef.current) {
      prevBreedRef.current = breed;
      setSearchResults([]);
      setSearchPage(0);
      setHasMoreSearchResults(true);
      fetchSearchResults(0);
    }
  }, [breed]);

  const handleBackToFeed = () => {
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchPage(0);
    setHasMoreSearchResults(true);
    onBackToFeed();
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <h2 className="mb-2">Search Results for: {breed}</h2>
        {isSearching && searchResults.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : searchResults.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {searchResults.map((post: any, index: number) => {
              if (searchResults.length === index + 1) {
                return (
                  <Box key={post.ID} sx={{ width: 300 }} ref={lastSearchResultRef}>
                    <Post postData={post} />
                  </Box>
                );
              }
              return (
                <Box key={post.ID} sx={{ width: 300 }}>
                  <Post postData={post} />
                </Box>
              );
            })}
          </Box>
        ) : (
          <p>No images found for {breed}</p>
        )}

        {isSearching && searchResults.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <Button
          onClick={handleBackToFeed}
          sx={{ mt: 2 }}
        >
          Back to Feed
        </Button>
      </Box>
    </Box>
  );
}
