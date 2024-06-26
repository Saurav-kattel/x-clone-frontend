"use client"
import { useEffect, useState } from 'react';
import { getImage } from './(ts)/getImages';
import Spinner from '@/lib/Spinner';
import Image from 'next/image';

const TweetImage = ({ imageId, height = 80, width = 80, showFullImage = false }: { imageId: string; height?: number; width?: number, showFullImage?: boolean }) => {
  if (!imageId) {
    return null;
  }

  const [image, setImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async (id: string) => {
      try {


        const data = await getImage(id);
        if (data?.status === 200) {
          const imageData = `data:image/jpeg;base64,${data.res.image}`;
          setImage(imageData);
          if (typeof window !== 'undefined' && window.localStorage) {
            const imageCache = JSON.parse(localStorage.getItem("image") || "{}");
            imageCache[imageId] = imageData;
            localStorage.setItem("image", JSON.stringify(imageCache));
          }
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };


    if (typeof window !== 'undefined' && window.localStorage) {
      const imageCache = JSON.parse(localStorage.getItem("image") || "{}");
      if (imageCache[imageId]) {
        setImage(imageCache[imageId])
        setLoading(false)
        return
      }
    }


    setLoading(true);
    fetchImage(imageId);

  }, [imageId]);

  return (
    <div className="flex justify-center items-center h-[300px] w-[35vw]">
      {loading ? (
        <Spinner />
      ) : (
        showFullImage ?
          <Image
            alt="tweet image"
            height={height}
            width={width}
            loading="lazy"
            className="md:w-[38vw] lg:w-[38vw] w-[80vw] p-3  rounded-lg bg-contain object-contain max-h-[50vh]"
            src={image || 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'}
            placeholder='blur'
            blurDataURL='https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'
          />
          :

          <Image
            alt="tweet image"
            height={height}
            width={width}
            loading="lazy"
            className="md:w-[38vw] lg:w-[38vw] w-[90vw] h-[50vh] p-3 rounded-md  bg-contain object-cover"
            src={image || 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'}
            placeholder='blur'
            blurDataURL='https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'
          />
      )}
    </div>
  );
};

export default TweetImage;
