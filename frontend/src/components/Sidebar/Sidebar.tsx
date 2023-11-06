import s from './styles.module.scss';
import Logo from '@/components/Header/images/logo.svg';
import { HEADER_HEIGHT } from '@/constants/constants';
import { SVG } from '@/components/ui/SVG/SVG';
import AddProjectIcon from '@/images/icons/addProjectIcon.svg';
import { Project } from '@commonTypes/Project';
import { useProjectsStore } from '@/store/ProjectsStore';
import clsx from 'clsx';
import { MouseEvent, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { Modal } from '@/components/Modal/Modal';
import { AddProjectModal } from '@/components/Sidebar/components/AddProjectModal/AddProjectModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DeleteIcon from '@/images/icons/deleteIcon.svg';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const queryParams = useSearchParams();
  const pathname = usePathname();

  const {
    selectedProject,
    setSelectedProject,
    getProjects,
    deleteProject,
    projects,
  } = useProjectsStore((state) => state);
  const [isAddProjectModalShowed, setIsAddProjectModalShowed] = useState(false);

  useEffect(() => {
    if (user) {
      getProjects(queryParams.get('projectId'));
    }
  }, [user]);

  useEffect(() => {
    if (selectedProject) {
      router.push(`${pathname}?projectId=${selectedProject.id}`);
      return;
    }

    router.push(pathname);
  }, [selectedProject]);

  const onSelectProject = async (project: Project) => {
    setSelectedProject(project);
  };

  const onDeleteProject = (projectId: string) => (e: MouseEvent) => {
    e.stopPropagation();
    deleteProject(projectId);
  };

  return (
    <>
      <div className={s.sidebar}>
        <div className={s.logoHeader} style={{ height: HEADER_HEIGHT }}>
          <a className={s.logo} href="/">
            <img src={Logo.src} alt="Kaban logo" className={s.logoPic} /> Kaban
          </a>
        </div>
        {user && (
          <div className={s.projects}>
            <div className={s.projectsHeader}>
              <span className={s.projectsTitle}>My projects</span>
              <button onClick={() => setIsAddProjectModalShowed(true)}>
                <SVG src={AddProjectIcon} className={s.addProjectIcon} />
              </button>
            </div>
            <div className={s.projectsList}>
              {projects.map((item) => {
                const isSelected = selectedProject?.id === item.id;

                return (
                  <button
                    className={clsx(s.projectLink, {
                      [s.selected]: isSelected,
                    })}
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                  >
                    <span
                      className={s.projectColor}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={s.projectTitle}>{item.title}</span>
                    <button
                      className={s.deleteBtn}
                      onClick={onDeleteProject(item.id)}
                    >
                      <SVG src={DeleteIcon} className={s.deleteIcon} />
                    </button>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isAddProjectModalShowed}
        onClose={() => setIsAddProjectModalShowed(false)}
        className={s.modal}
      >
        <AddProjectModal onClose={() => setIsAddProjectModalShowed(false)} />
      </Modal>
    </>
  );
};
