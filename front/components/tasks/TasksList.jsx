import { Button, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import TaskListItem from "./TaskListItem";

const TasksList = ({ tasks, onItemDelete, onItemEdit }) => {
  if (!tasks.length) {
    return (
      <div>
        <p>На сегодня задач не запланировано</p>
      </div>
    );
  }

  return (
    <List
      header={<div>Tasks</div>}
      bordered
      dataSource={tasks}
      renderItem={(item) => (
        <TaskListItem
          taskItem={item}
          onItemEdit={onItemEdit}
          onItemDelete={onItemDelete}
        />
      )}
    />
  );
};

export default TasksList;
