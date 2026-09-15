import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const eventsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    galleryImages: z.array(z.string()).optional()
  }),
});

export const collections = {
  events: eventsCollection,
};
