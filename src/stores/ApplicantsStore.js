import axios from 'axios';
import { defineStore } from 'pinia';

export const useApplicantsStore = defineStore('applicant', {
  state: () => ({
    applicants: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAndSetApplicants() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('http://localhost:3000/applicants');
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    },


    async fetchAndSetApplicantsCategory(jobCode) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`http://localhost:3000/applicants?jobCode=${jobCode}`)
        this.applicants = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Failed to fetch applicants';
        throw new Error('Failed to fetch applicants');
      }
    }
  },

  getters: {

    totalApplicants(state) {
      return state.applicants.length
    }, 

    // Related new applicants getter functions
    newApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'new')
    },

    totalNewApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'new').length 
    },

    // Related shortlisted applicants getter functions
    shortlistedApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'shortlisted')
    },

    totalShortlistedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'shortlisted').length 
    },

    // Related interviewed applicants getter functions    
    interviewedApplicants(state) {
      return state.applicants.filter(applicant => applicant.category === 'interviewed')
    },

    totalInterviewedApplicants(state) { 
      return state.applicants.filter(applicant => applicant.category === 'interviewed').length 
    },
  }
});
