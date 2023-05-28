import { create } from 'zustand';
import { type ProposalState } from './types';
const useProposalStore = create<ProposalState>((set) => ({
  riskObject: null,
  riskSubject: null,
  coverages: null,
  setRiskSubject: (riskSubject) => set((state) => ({ ...state, riskSubject })),
  setMakerAndModel: (partialRiskObject) =>
    set((state) => ({
      ...state,
      riskObject: {
        ...partialRiskObject,
        doorsNumber: undefined,
        version: undefined,
        releaseDate: undefined,
        retailPrice: undefined,
      },
    })),
  setCarVersion: (partialRiskObject) =>
    set((state) => ({
      ...state,
      riskObject: { ...state.riskObject, ...partialRiskObject },
    })),
  defineCoverages: (coverages) =>
    set((state) => ({
      ...state,
      coverages: coverages.map((cov) => ({ ...cov, selected: false })),
    })),
  selectCoverages: (coverageIds: number[]) =>
    set((state) => ({
      ...state,
      coverages: state.coverages.map((cov) => ({
        ...cov,
        selected: coverageIds.includes(cov.id),
      })),
    })),
}));

export default useProposalStore;
