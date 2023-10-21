'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import s from './styles.module.scss';
import { Column } from './components/Column/Column';
import { Modal } from '@/components/Modal/Modal';
import { TaskModal } from '@/components/Board/components/AddTodoModal/TaskModal';
import { useSession } from 'next-auth/react';
import { useProjectsStore } from '@/store/ProjectsStore';
import { useBoardHandlers } from '@/components/Board/hooks/useBoardHandlers';

export const Board = () => {
  const { data: session } = useSession();
  const { selectedProject } = useProjectsStore(({ selectedProject }) => ({
    selectedProject,
  }));
  const board = useBoardStore((state) => state.board);

  const {
    handleOnDragEnd,
    onAddTask,
    onEditTask,
    onCloseModal,
    openedModal,
    newTaskStatus,
  } = useBoardHandlers(session);

  console.log('BOARD', board.columns);

  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <h1 className={s.title}>{selectedProject?.title}</h1>
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
