'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import s from './styles.module.scss';
import { Column } from './components/Column/Column';
import { Modal } from '@/components/Modal/Modal';
import { TaskModal } from '@/components/Board/components/AddTodoModal/TaskModal';
import { useProjectsStore } from '@/store/ProjectsStore';
import { useBoardHandlers } from '@/components/Board/hooks/useBoardHandlers';
import { SVG } from '@/components/ui/SVG/SVG';
import EditIcon from '@/images/icons/editIcon.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const Board = () => {
  const { selectedProject, editProject } = useProjectsStore((state) => state);
  const board = useBoardStore((state) => state.board);

  const titleRef = useRef<HTMLInputElement>(null);

  const [isEditingTitle, setEditingTitle] = useState(false);

  const {
    handleOnDragEnd,
    onAddTask,
    onEditTask,
    onCloseModal,
    openedModal,
    newTaskStatus,
  } = useBoardHandlers();

  console.log('BOARD', board.columns);

  const onEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
    editProject(e.target.value);
    setEditingTitle(false);
  };

  useEffect(() => {
    if (isEditingTitle) {
      titleRef.current.value = selectedProject?.title;
      titleRef.current.focus();
    }
  }, [isEditingTitle]);

  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          {isEditingTitle ? (
            <input
              ref={titleRef}
              type="text"
              onBlur={onEditTitle}
              className={s.titleInput}
            />
          ) : (
            <h1 ref={titleRef} className={s.title}>
              {selectedProject?.title}
            </h1>
          )}
          {!isEditingTitle && (
            <button onClick={() => setEditingTitle(true)}>
              <SVG src={EditIcon} className={s.editIcon} />
            </button>
          )}
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable direction="horizontal" droppableId="board" type="column">
            {(provided) => (
              <div
                className={s.board}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[...board.columns.entries()].map(([id, column], index) => {
                  return (
                    <Column
                      id={id}
                      key={id}
                      tasks={column.tasks}
                      index={index}
                      className={s.column}
                      onEditTask={onEditTask}
                      onAddTask={onAddTask}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal isOpen={!!openedModal} onClose={onCloseModal}>
        <TaskModal onClose={onCloseModal} status={newTaskStatus} />
      </Modal>
    </>
  );
};
