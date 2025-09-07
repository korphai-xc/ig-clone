import { NextResponse } from 'next/server';
import { sampleUsers, sampleCaptions, sampleComments } from './mock';

const MAX_COMMENTS = 3;
const MAX_IMAGES = 10;

const getRandomItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomComments = () => {
  const numComments = Math.floor(Math.random() * MAX_COMMENTS) + 1;
  const comments = new Set();
  while (comments.size < numComments) {
    comments.add(getRandomItem(sampleComments));
  }
  return Array.from(comments);
};

export async function GET() {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/${MAX_IMAGES}`);
    const { message: images, status } = await response.json();

    if (status !== 'success') {
      throw new Error('Failed to fetch images from dog.ceo API');
    }

    const posts = images.map((image: string, index: number) => ({
      ID: Date.now() + index,
      image: image,
      user: getRandomItem(sampleUsers),
      caption: getRandomItem(sampleCaptions),
      likes: Math.floor(Math.random() * 1000),
      comments: getRandomComments(),
    }));

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
