import { Button, Col, List, Row, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TaskListItem = ({ taskItem, onItemDelete, onItemEdit }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col span={18}>
          <Typography.Text>
            {taskItem.name} <Space />
          </Typography.Text>
        </Col>
        <Col span={6}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() => {
                onItemEdit(taskItem);
              }}
              icon={<EditOutlined />}
            />
            <Button
              onClick={() => {
                onItemDelete(taskItem);
              }}
              style={{ marginLeft: "5px" }}
              icon={<DeleteOutlined />}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TaskListItem;
