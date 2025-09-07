'use client';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useCallback } from 'react';
import { postsAtom, isLoadingAtom } from '@/store/feed';
import Post from '../Post';
import { Box, Button, CircularProgress } from '@mui/material';

const SCROLL_THRESHOLD = 50;

export default function Feed() {
  const [posts, setPosts] = useAtom(postsAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const fetchFeed = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/feed");
      const data = await response.json();
      if (data.data) {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
      }
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
    setIsLoading(false);
  }, [isLoading, setPosts, setIsLoading]);

  const lastPostRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && posts.length < SCROLL_THRESHOLD) {
          fetchFeed();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchFeed, posts.length]
  );

  useEffect(() => {
    if (posts.length === 0) {
      fetchFeed();
    }
  }, [fetchFeed]);

  return (
    <Box>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostRef} key={post.ID}>
              <Post postData={post} />
            </div>
          );
        }
        return <Post key={post.ID} postData={post} />;
      })}

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && posts.length >= SCROLL_THRESHOLD && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={fetchFeed}>Load More</Button>
        </Box>
      )}
    </Box>
  );
}
