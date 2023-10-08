import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	type:"content",
    schema: z.object({     
		title: z.string(),
		description: z.coerce.string().optional(),
		private: z.coerce.boolean().default(false),
		// Transform string to Date object
		publishDate: z.coerce.string().transform((str)=>new Date(str)),
		updatedDate: z.coerce.date().optional(),
		image: z.string().optional(),
	}),
});

export const collections = { blog };
