// Future implementation: Video Schema
// To be used when video content is created

export type VideoData = {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 duration format (e.g., PT1M30S for 1 minute 30 seconds)
};

export const createVideoSchema = (video: VideoData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    duration: video.duration,
    publisher: {
      '@id': 'https://stratomai.com/#organization',
    },
  };
};

// Example video schema for trading process explainer
export const exampleVideoSchema = createVideoSchema({
  name: 'Urea 46% Trading Process Explained',
  description:
    'Learn how Stratoma Interchange facilitates international Urea trading with our comprehensive step-by-step process guide.',
  thumbnailUrl: 'https://stratomai.com/videos/trading-process-thumbnail.jpg',
  uploadDate: '2025-01-15',
  contentUrl: 'https://stratomai.com/videos/trading-process.mp4',
  embedUrl: 'https://www.youtube.com/embed/example-video-id',
  duration: 'PT5M30S', // 5 minutes 30 seconds
});
