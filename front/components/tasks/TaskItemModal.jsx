import { Modal } from "antd";
import { useRouter } from "next/router";
import TasksList from "./TasksList";
import client from "../../apolloClient";
import { gql } from "@apollo/client";

const TaskItemModal = ({ tasks, open = false, onOk, onCancel }) => {
  const router = useRouter();
  const onTaskDelete = async (task) => {
    const { data } = await client.mutate({
      mutation: gql`
      mutation deleteTask ($id: String) {
        deleteTask(where :{id: {_eq: $id}}) {}
      }
        `,
    });
    alert(task);

    router.push("/tasks/calendar");
  };

  const onTaskUpdate = async (task) => {};

  return (
    <Modal title="Задача" open={open} onOk={onOk} onCancel={onCancel}>
      <TasksList tasks={tasks} onItemDelete={onTaskDelete} />
    </Modal>
  );
};

export default TaskItemModal;
