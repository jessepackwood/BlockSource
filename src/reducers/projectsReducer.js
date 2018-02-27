const initialState = {
  projectsIsLoading: false,
  projectsData: [],
  projectsHasErrored: false,
  projectsError: null
};



const projectsReducer = (state = [], action) => {
switch (action.type) {
    // case 'PROJECTS_IS_LOADING':
    //   return { ...state,
    //     projectsIsLoading: true,
    //     projectsData: [],
    //     projectsHasErrored: false,
    //     projectsError: null
    //   };
    case 'PROJECTS_SUCCESS':
      return action.projects
    // case 'PROJECTS_HAS_ERRORED':
    //   return { ...state,
    //     projectsIsLoading: false,
    //     projectsData: null,
    //     projectsHasErrored: true,
    //     projectsError: action.error
    //   };
    default:
      return state;
  }
};

export default projectsReducer;