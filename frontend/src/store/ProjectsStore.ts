import { create } from 'zustand';
import { IUser } from '@/types/types';
import { Project } from '@commonTypes/Project';

interface ProjectsState {
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));
