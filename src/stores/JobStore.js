import { defineStore } from 'pinia';

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: []
  }),

  actions: {
    async fetchJobs() {
      const response = await fetch('http://localhost:3000/jobs');
      const jobs = await response.json();
      return jobs;
    },

    updateJobs(jobs) {
      this.jobs = jobs;
    }
  },

  getters: {
    getJobById: (state) => (id) => {
      return state.jobs.find((job) => job.id === id);
    }
  }
});