import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { Calendar } from "antd";

const TasksCalendar = ({ tasks, handleSelect }) => {
  const getListData = (value) => {
    const day = DateTime.fromISO(value.toISOString());
    const result = tasks.filter((task) => {
      const taskDay = DateTime.fromISO(task.time);

      if (taskDay.startOf("day").ts === day.startOf("day").ts) {
        return true;
      }

      return false;
    });

    return result;
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);

    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={nanoid()}>{item.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={handleSelect}
    />
  );
};

export default TasksCalendar;
