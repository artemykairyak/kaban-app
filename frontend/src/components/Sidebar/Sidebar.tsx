import s from './styles.module.scss';
import Logo from '@/components/Header/images/logo.svg';
import { HEADER_HEIGHT } from '@/constants/constants';
import { SVG } from '@/components/ui/SVG/SVG';
import AddProjectIcon from '@/images/icons/addProjectIcon.svg';
import { Project } from '@commonTypes/Project';
import { useProjectsStore } from '@/store/ProjectsStore';
import clsx from 'clsx';
import { useEffect } from 'react';

const projects: Project[] = [
  {
    id: '1',
    title: 'Test Project',
    color: '#fff000',
  },
  {
    id: '2',
    title: 'Test Project 2',
    color: '#ff00ff',
  },
];

export const Sidebar = () => {
  const { selectedProject, setSelectedProject } = useProjectsStore(
    ({ selectedProject, setSelectedProject }) => ({
      selectedProject,
      setSelectedProject,
    }),
  );

  useEffect(() => {
    if (projects.length) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  const onSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className={s.sidebar}>
      <div className={s.logoHeader} style={{ height: HEADER_HEIGHT }}>
        <a className={s.logo} href="/">
          <img src={Logo.src} alt="Kaban logo" className={s.logoPic} /> Kaban
        </a>
      </div>
      <div className={s.projects}>
        <div className={s.projectsHeader}>
          <span className={s.projectsTitle}>My projects</span>
          <button>
            <SVG src={AddProjectIcon} className={s.addProjectIcon} />
          </button>
        </div>
        <div className={s.projectsList}>
          {projects.map((item) => {
            const isSelected = selectedProject?.id === item.id;
            return (
              <button
                className={clsx(s.projectLink, { [s.selected]: isSelected })}
                key={item.id}
                onClick={() => onSelectProject(item)}
              >
                <span
                  className={s.projectColor}
                  style={{ backgroundColor: item.color }}
                />
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
