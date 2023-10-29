import { create } from 'zustand';
import { Project } from '@commonTypes/Project';
import { instance } from '@/services/apiService/apiService';
import { useAuthStore } from '@/store/AuthStore';
import { BaseResponse } from '@/types/types';
import { generateColor } from '@/utils/utils';

interface ProjectsState {
  getProjects: (projectId?: string) => void;
  projects: Project[];
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  addProject: (title: string) => void;
  editProject: (title: string) => void;
  deleteProject: (projectId: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  getProjects: async (projectId) => {
    const userId = useAuthStore.getState().user.id;

    const { data } = await instance.get<Project[]>(`/projects/${userId}`);

    if (data.length) {
      const selectedProject =
        data.find((item) => item.id === projectId) || data[0];
      set(() => ({ projects: data, selectedProject }));
    }
  },
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  addProject: async (title) => {
    const userId = useAuthStore.getState().user.id;
    const color = generateColor();

    const { data } = await instance.post<BaseResponse<Project>>(
      `/projects/${userId}`,
      { title, color },
    );

    set((state) => {
      if (data.isSuccess) {
        return {
          projects: [...state.projects, data.data],
          selectedProject: data.data,
        };
      }
    });
  },
  editProject: async (title) => {
    const projectId = useProjectsStore.getState().selectedProject.id;

    const { data } = await instance.put<BaseResponse<Project>>(
      `/projects/${projectId}`,
      { title },
    );

    set((state) => {
      if (data.isSuccess) {
        const newProjects = state.projects.map((item) => {
          if (item.id === projectId) {
            return data.data;
          }

          return item;
        });

        return {
          selectedProject: data.data,
          projects: [...newProjects],
        };
      }
    });
  },
  deleteProject: async (projectId) => {
    const selectedProject = useProjectsStore.getState().selectedProject;

    const { data } = await instance.delete<BaseResponse<boolean>>(
      `/projects/${projectId}`,
    );

    set((state) => {
      if (data.isSuccess) {
        const newProjects = state.projects.filter((item) => {
          return item.id !== projectId;
        });

        return {
          selectedProject:
            selectedProject.id === projectId ? newProjects[0] : selectedProject,
          projects: [...newProjects],
        };
      }
    });
  },
}));
