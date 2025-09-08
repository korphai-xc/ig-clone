import { NextRequest, NextResponse } from 'next/server';
import { sampleUsers, sampleCaptions, sampleComments } from "../feed/mock";

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get('breed');
    const subbreed = searchParams.get('subbreed');
    const count = searchParams.get('count') || MAX_IMAGES;

    if (!breed) {
      return NextResponse.json(
        { error: 'Breed parameter is required' },
        { status: 400 }
      );
    }

    let apiUrl = `https://dog.ceo/api/breed/${subbreed ? `${subbreed}/` : ''}${breed}`;
    apiUrl += `/images/random/${count}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Dog CEO API responded with status: ${response.status}`);
    }

    const { message: images, status } = await response.json();

    if (status !== 'success') {
      throw new Error('Failed to fetch images from dog.ceo API');
    }

    const posts = images.map((image: string, index: number) => ({
      ID: Date.now() + index,
      image: image,
      user: getRandomItem(sampleUsers),
      caption: `${breed}${subbreed ? ` ${subbreed}` : ''} - Beautiful dog!`,
      likes: Math.floor(Math.random() * 1000),
      comments: getRandomComments(),
    }));

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error('Error fetching dog images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dog images' },
      { status: 500 }
    );
  }
}
