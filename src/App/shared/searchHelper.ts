import { ISearchFilters } from '../../interfaces/commonSearchTerm'

// Define a generic search function
export function createSearchQuery<T>(
  searchTerm: ISearchFilters<T>['searchTerm'],
  searchableFields: string[],
) {
  if (searchTerm) {
    const searchRegex = {
      $regex: searchTerm,
      $options: 'i',
    }

    const searchQuery = {
      $or: searchableFields.map(field => ({
        [field]: searchRegex,
      })),
    }
    return searchQuery
  } else {
    // Return an empty query if searchTerm is not provided
    return {}
  }
}
