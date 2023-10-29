import { UserModel } from "../models/UserModel";
import { ProjectModel } from "../models/ProjectModel";
import { Project } from "@commonTypes/Project";
import { TaskModel } from "../models/TaskModel";

export const projectController = {
  getProjectsByUserId: async (userId: string) => {
    const findedUser = await UserModel.findOne({ _id: userId });

    if (findedUser) {
      return ProjectModel.find({ userId });
    }
    return [];
  },

  createProject: async (userId: string, project: Partial<Project>) => {
    const findedUser = await UserModel.findOne({ _id: userId });

    if (findedUser) {
      return ProjectModel.create({ userId, ...project });
    }

    return null;
  },

  editProject: async (projectId: string, project: Partial<Project>) => {
    const findedProject = await ProjectModel.findOne({ _id: projectId });

    if (findedProject) {
      return ProjectModel.findOneAndUpdate({ _id: projectId }, project, {
        returnOriginal: false,
      });
    }

    return null;
  },

  deleteProject: async (projectId: string) => {
    const findedProject = await ProjectModel.findOne({
      _id: projectId,
    });

    if (!findedProject) {
      return false;
    }

    const deletedProject = await ProjectModel.deleteOne({ _id: projectId });

    await TaskModel.deleteMany({ projectId });

    return !!deletedProject;
  },
};
