
export const fetchStoredProjects = async () => {
  try {
    const initialFetch = await fetch('/api/v1/projects');
    const fetchedProjects = await initialFetch.json();
    return fetchedProjects;
  } catch (error) {
    return error;
  }
};

export const fetchProjectContributors = async (id) => {
  try {
    const initialFetch = await fetch(`/api/v1/projects/${id}/contributors`);
    const fetchedContributors = await initialFetch.json();
    return fetchedContributors;
  } catch (error) {
    return error;
  }
};

export const postProject = async (title, description, goal_amount, fund_amount) => {
  try {
  const postProject = await fetch('/api/v1/projects', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({title, description, goal_amount: parseFloat(goal_amount), fund_amount: parseFloat(fund_amount)}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const project = await postProject.json()
  return project
  } catch (error) {
    console.log(error)
    return error


  }
};

export const postLogin = async (email, password) => {
  try {
    const postUser = await fetch('/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const user = await postUser.json();
    return user;
  } catch (error) {
    return null;
  }
};