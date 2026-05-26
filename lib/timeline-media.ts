export type TimelineMedia = {
  imageUrl?: string
  videoEmbedUrl?: string
  videoSrc?: string
  posterUrl?: string
}

/** Generated from data/timeline-media-map.json — run: npm run timeline:media */
export const TIMELINE_MEDIA: Record<string, TimelineMedia> = {
  "1": {
    imageUrl: "/timeline/images/9-35-00-2h-23m-for-20mins.jpg",
  },
  "2": {
    imageUrl: "/timeline/images/10-53-40-1h-4m.jpg",
  },
  "3": {
    imageUrl: "/timeline/images/10-54-05-1h-3m.jpg",
  },
  "4": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019267173?h=e401ac3cf0",
    posterUrl: "/timeline/images/10-54-30-1h-3m-for-2mins-thumb.jpg",
  },
  "5": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266273?h=3dc8c6b91f",
    posterUrl: "/timeline/images/11-10-52-47m-thumb.jpg",
  },
  "6": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266833?h=7ad9305cf3",
    posterUrl: "/timeline/images/11-14-31-43m-for-35-secs-thumb.jpg",
  },
  "7": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266651?h=6a78977fda",
    posterUrl: "/timeline/images/11-35-08-22m-thumb.jpg",
  },
  "8": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266858?h=74ca29bda6",
    posterUrl: "/timeline/images/11-14-10-43m-thumb.jpg",
  },
  "9": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266571?h=49ee6d0bf8",
    posterUrl: "/timeline/images/11-37-45-20m-for-48-secs-thumb.jpg",
  },
  "10": {
    imageUrl: "/timeline/images/11-54-14-3m-48s.jpg",
  },
  "11": {
    imageUrl: "/timeline/images/11-57-26-36s.jpg",
  },
  "12": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019266492?h=9f8a25c65e",
    posterUrl: "/timeline/images/11-57-47-6s-thumb.jpg",
  },
  "13": {
    imageUrl: "/timeline/images/11-58-02-1s.jpg",
  },
  "14": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019292412?h=718f78d5e6",
    posterUrl: "/timeline/images/11-58-03-shots-fired-11-58-03-11-58-03-11-58-04-thumb.jpg",
  },
  "15": {
    imageUrl: "/timeline/images/11-58-13-11s.jpg",
  },
  "16": {
    videoEmbedUrl: "https://player.vimeo.com/video/1019292397?h=e86f605d52",
    posterUrl: "/timeline/images/11-58-16-14s-thumb.jpg",
  },
  "17": {
    imageUrl: "/timeline/images/11-58-19-17s.jpg",
  },
  "19": {
    imageUrl: "/timeline/images/12-00-50-2m-47s.jpg",
  },
  "20": {
    imageUrl: "/timeline/images/12-06-20-8m-20s.jpg",
  },
  "21": {
    imageUrl: "/timeline/images/12-10-20-12m-20s.jpg",
  },
  "22": {
    imageUrl: "/timeline/images/12-12-00-14m.jpg",
  },
  "27": {
    videoSrc: "/timeline/videos/11-58-43-handcuff.mp4",
    videoEmbedUrl: "https://www.youtube.com/embed/0GTvW4wyYLs?start=1278&end=1398",
    posterUrl: "/timeline/images/11-58-43-handcuff-thumb.jpg",
  },
}

export const mediaForEvent = (id: string): TimelineMedia | undefined => TIMELINE_MEDIA[id]
