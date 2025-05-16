import { createClient } from '@sanity/client'

// TODO: add sanity token to environment variables for security
const sanityToken = 'skfwdRu0ewA9ipeNwli0BbSFwEet4zsH2JGXDg1fdYE995QPWdKa0ZJlcPw8oaBusbKf87BSWEObRNf1JMWHPX2PE5PvvuWrocma7q6TrV6kPtOxVejWVWjCSY5m1tZwmgcugCxYv2A4GuHwNoaWOIVuvD4hsCaCBPAbf23RmwrvEpwMFaoX'
const client = createClient({
  projectId: 'eumlnwcz',
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
