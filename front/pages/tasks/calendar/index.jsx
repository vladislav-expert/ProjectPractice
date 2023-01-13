import client from "../../../apolloClient";
import { gql } from "@apollo/client";
import { useState } from "react";
import { Button } from "antd";
import { DateTime } from "luxon";
import TasksCalendar from "../../../components/tasks/TasksCalendar";
import TaskItemModal from "../../../components/tasks/TaskItemModal";

export async function getServerSideProps() {
  await client.resetStore();

  const { data } = await client.query({
    query: gql`
      query {
        tasks {
          id
          name
          time
          owner {
            id
            name
          }
        }
      }
    `,
  });

  return { props: { tasks: data.tasks } };
}

const Calendar = ({ tasks }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openAddTaskModal = () => {};

  const handleSelect = (value) => {
    const selectedDate = DateTime.fromISO(value.toISOString());
    const filteredTasks = tasks.filter((task) => {
      const taskDay = DateTime.fromISO(task.time);

      if (taskDay.startOf("day").ts === selectedDate.startOf("day").ts) {
        return true;
      }

      return false;
    });
    setSelectedTasks(filteredTasks);
    showModal();
  };

  return (
    <>
      <div>
        {/* <Button onClick={openAddTaskModal}>Add new task</Button> */}
        <TasksCalendar tasks={tasks} handleSelect={handleSelect} />
        <TaskItemModal
          tasks={selectedTasks}
          title="Задача"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default Calendar;
