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

// ! demo call this function
// For academic semesters
// const academicSemesterSearchableFields = ['title', 'code', 'year'];
// const academicSearchTerm: ISearchFilters<string>['searchTerm'] = 'yourSearchTermHere';
// const academicQuery = createSearchQuery(academicSearchTerm, academicSemesterSearchableFields);
// console.log(academicQuery, 'searchQuery');

// For users
// const userSearchableFields = ['name', 'email', 'username'];
// const userSearchTerm: ISearchFilters<string>['searchTerm'] = 'userSearchTermHere';
// const userQuery = createSearchQuery(userSearchTerm, userSearchableFields);
// console.log(userQuery, 'searchQuery');
