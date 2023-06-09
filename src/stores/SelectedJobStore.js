import axios from 'axios';
import { defineStore } from 'pinia';

export const useSelectedJobStore = defineStore({
  id: 'selectedJob',

  state: () => ({
    job: null,
    loading: false,
    notSelected: null,
  }),

  getters: {
    selectedJob() {
      return this.job;
    },
  },

  actions: {
    async selectJob(id) {
      this.loading = true;
      this.notSelected = null;
    
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${id}`);
        const job = response.data;
        this.job = job;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.notSelected = 'Failed to fetch job';
        throw new Error('Failed to fetch job');
      }
    }
  },
});