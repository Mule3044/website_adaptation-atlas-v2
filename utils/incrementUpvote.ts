import { createClient } from '@sanity/client'

// TODO: add sanity token to environment variables for security
const sanityToken = 'skaRbXbYkuQjP0BHVfFfTLaAei9lpGBvcLtcOXF3NavHEs4nHiQeX7Q4wFlbTU76zi0b4pIwM3TGCDxc1cLuK6aChR80QxCMXzefqrAASUzY7oRu8SamBhSM4TKzNHyPji5Oy88b6xkpbJ4rYdzQgFJyG5NBZ1KM6gnQyu1xnJWJdE6VRCAh'
const client = createClient({
  projectId: 'gukr2buh',
  dataset: 'production',
  token: sanityToken, // use environment variables
  useCdn: false // `false` if you want to ensure fresh data
}); 

// Function to increment upvotes
export function incrementUpvote(spotlightId: any) {
  client
    .patch(spotlightId) // Document ID to patch
    .inc({ upvotes: 1 }) // Increment upvotes by 1
    .commit() // Perform the patch and return a promise
    .then((updatedSpotlight: any) => {
      console.log(`Upvotes are now ${updatedSpotlight.upvotes}`)
    })
    .catch((err: any) => {
      console.error('The update failed: ', err.message)
    });
}
