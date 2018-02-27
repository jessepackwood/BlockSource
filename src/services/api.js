
export const fetchStoredProjects = async () => {
  try {
    const initialFetch = await fetch('/api/v1/projects')
    const fetchedProjects = await initialFetch.json()
    return fetchedProjects
  } catch (error) {
    return error
  }
}