import * as apiCalls from './api';

describe('Api Calls tests', () => {

  describe('Projects fetch test', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(
          ['array', 'of', 'projects']
        )
      }));
    });

    it('should fetch the projects', async () => {
      const projects = await apiCalls.fetchStoredProjects();
      expect(projects).toEqual(['array', 'of', 'projects']);
    });
  });

  describe('Projects post test', () => {
    it('should post a new project', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(
          {
            title: 'Project 1',
            description: 'the best project',
            goal_amount: '5000',
            fund_amount: '2000'
          }
        )
      }));
      const newProject = await apiCalls.postProject({project: 'payload'});
      expect(newProject).toEqual({"description": "the best project", "fund_amount": "2000", "goal_amount": "5000", "title": "Project 1"});
    });
  })

  describe('Contributors fetch test', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(
          ['array', 'of', 'contributors']
        )
      }));
    });

    it('should fetch contributors for each project', async () => {
      const contributors = await apiCalls.fetchProjectContributors();
      expect(contributors).toEqual(['array', 'of', 'contributors']);
    });
  });

});