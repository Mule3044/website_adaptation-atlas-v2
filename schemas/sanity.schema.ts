import { type SchemaTypeDefinition } from 'sanity'

import page from './page.schema'
import home from './home.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, home],
}
