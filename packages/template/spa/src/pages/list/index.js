import React, { useState, useEffect, useCallback } from "react";
import { message, Table, Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Box from "components/box";
import axios from "@/plugins/axios";
import moment from "moment";
import { useSelector } from "react-redux";

const { confirm } = Modal;
export default () => {
  const [addVisible, setAddVisible] = useState(false);
  const [tableData, setTableData] = useState([]); // 设置表格数据
  const [tableLoading, setTableLoading] = useState(false); // 表格加载状态
  const { userInfo } = useSelector((state) => state.system);
  /* ========== 删除账号 ========== */
  const del = (row) => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除管理员吗",
      onOk() {
        axios.get("/control/user/del", { params: { id: row.id } }).then((res) => {
          if (res.code === "000000") {
            getTableData();
            message.success(res.msg);
          } else {
            message.error(res.msg);
          }
        });
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "编号",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "open_id",
      dataIndex: "open_id",
      width: 120,
    },
    {
      title: "管理员姓名",
      dataIndex: "user_name",
      width: 120,
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      width: 120,
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "操作",
      width: 220,
      dataIndex: "operate",
      render: (text, record) => {
        return (
          <div className="table_btn">
            <Space>
              {userInfo.open_id !== record.open_id && (
                <a
                  onClick={() => {
                    del(record);
                  }}
                >
                  删除
                </a>
              )}
            </Space>
          </div>
        );
      },
    },
  ];

  /* ========= 获得表格数据 ========== */
  const getTableData = useCallback(() => {
    setTableLoading(true);
    axios.post("/control/user/list").then((res) => {
      if (res.code === "000000") {
        setTableLoading(false);
        setTableData(res.data);
      } else {
        message.error("获取失败");
      }
    });
  }, []);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <Box title="账号列表">
      <div style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => setAddVisible(true)}>
          添加账号
        </Button>
      </div>
      <Table rowKey={(record) => record.id} dataSource={tableData} columns={columns} loading={tableLoading} />
    </Box>
  );
};
