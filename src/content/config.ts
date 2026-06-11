import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const eventsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string(),
    galleryImages: z.array(z.string()).optional().nullable(),
  })
});

const announcementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string().optional(),
    galleryImages: z.array(z.string()).optional().nullable(),
  })
});

export const collections = {
  events: eventsCollection,
  announcements: announcementsCollection,
};
