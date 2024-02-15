import { createClient, groq } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/lib/env'
import { Home } from '@/types/sanity.types'

// Utility function to get homepage content from sanity database
// createClient allows us to read data from the admin
// Define the promise type returning an array of projects
// Adding types to the sanity utils keeps all the typing in one place
// All pages and components that use these utils inherit the types
export async function getHomeContent(slug: string): Promise<Home> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
  });

  // Use groq to query the database
  // TODO: flesh out the homepageLinks query to streamline content rendering
  return client.fetch(
    groq`*[_type == 'home' && _id == 'home'][0] {
      title,
      introText,
    }`
  )
}
