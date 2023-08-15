import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CheckCircleIcon } from "@components/assets/icons";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import { useGetMinistryProjectsQuery } from "@store/services/ministries";
import { ProjectData } from "@store/types";
import type { TableProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  InputRef,
  List,
  MenuProps,
  Modal,
  Pagination,
  Result,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type {
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { Fragment, ReactNode, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { InfoCircle } from "react-iconly";

const priceFormat = currencyFormat();

interface DataType {
  key: string;
  title: string;
  goal: number;
  category: string;
  no_of_donors: number;
  amount_raised: number;
  status: ReactNode;
}

type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     title: "The Widows Project",
//     goal: 500000,
//     category: "Widows",
//     no_of_donors: 53,
//     amount_raised: 135000,
//     status: (
//       <Badge
//         color="blue"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Active"
//       />
//     ),
//   },
//   {
//     key: "2",
//     title: "The Missions Project",
//     goal: 750000,
//     category: "Missions",
//     no_of_donors: 45,
//     amount_raised: 550000,
//     status: (
//       <Badge
//         color="blue"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Active"
//       />
//     ),
//   },
//   {
//     key: "3",
//     title: "The Widows Project",
//     goal: 200000,
//     category: "Widows",
//     no_of_donors: 32,
//     amount_raised: 157000,
//     status: (
//       <Badge
//         color="yellow"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Drafted"
//       />
//     ),
//   },
//   {
//     key: "4",
//     title: "The Orphans Project",
//     goal: 500000,
//     category: "Orphans",
//     no_of_donors: 35,
//     amount_raised: 500000,
//     status: (
//       <Badge
//         color="green"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Completed"
//       />
//     ),
//   },
//   {
//     key: "5",
//     title: "The Missions Project",
//     goal: 800000,
//     category: "Missions",
//     no_of_donors: 40,
//     amount_raised: 600000,
//     status: (
//       <Badge
//         color="yellow"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Drafted"
//       />
//     ),
//   },
//   {
//     key: "6",
//     title: "The Orphans Project",
//     goal: 300000,
//     category: "Orphans",
//     no_of_donors: 20,
//     amount_raised: 300000,
//     status: (
//       <Badge
//         key="20"
//         color="green"
//         className="[&>.ant-badge-status-text]:text-[12px]"
//         text="Completed"
//       />
//     ),
//   },
// ];

const dataSource = [
  {
    user: "Anonymous",
    amount: " ₦20,000",
    time: "2 hours ago",
    avatar: "A",
  },
  {
    user: "Semira Yesufu",
    amount: "₦35,000",
    time: "2 hours ago",
    avatar: "SY",
  },
  {
    user: "Semira Yesufu",
    amount: "₦35,000",
    time: "2 hours ago",
    avatar: "SY",
  },
];

const { Title, Text, Paragraph } = Typography;

const ProjectsTable = ({ id }: { id: string | undefined }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetMinistryProjectsQuery({
    id,
    page: pagination.current,
  });
  console.log(data, "hi");

  const getColorForStatus = (status: ProjectData["status"]) => {
    return status === "drafted"
      ? "yellow"
      : status === "active"
      ? "blue"
      : status === "completed"
      ? "green"
      : "gray";
  };

  const newDataSource = data?.data.map((item) => ({
    key: item.id,
    title: capitalizeFirstLetters(item.title),
    goal: Number(item.targetAmount),
    category: capitalizeFirstLetters(item.category),
    no_of_donors: item.donors,
    amount_raised: +item.amountRaised,
    status: (
      <Badge
        color={getColorForStatus(item.status)}
        className="[&>.ant-badge-status-text]:text-[12px]"
        text={capitalizeFirstLetters(item.status)}
      />
    ),
  }));

  const showModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showDonorModal = () => {
    setIsDonorModalOpen(true);
  };

  const handleDonorOk = () => {
    setIsDonorModalOpen(false);
  };

  const handleDonorCancel = () => {
    setIsDonorModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          icon={<EditOutlined />}
          type="text"
          className="flex items-center justify-center text-[12px] hover:bg-transparent"
        >
          Edit
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          className="flex items-center justify-center text-[12px] hover:bg-transparent"
          onClick={showModal}
        >
          Delete
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="flex items-center justify-center text-[12px] hover:bg-transparent"
          onClick={showDonorModal}
        >
          View Donors
        </Button>
      ),
    },
  ];
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);

    setFilteredInfo(filters);
  };

  const paginationHandler = () => {
    return setPagination((prev) => ({
      ...prev,
      current: data?.paginationInfo?.currentPage,
      total: data?.paginationInfo?.totalItems,
      pageSize: data?.paginationInfo?.limit,
    }));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)}>
            Reset
          </Button>
          <Button
            type="link"
            // size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            // size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]!.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Title
        </Title>
      ),
      dataIndex: "title",
      key: "title",
      width: "22%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      render: (value) => (
        <Text className="text-[13px] font-semibold">{value}</Text>
      ),
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.title || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Goal
        </Title>
      ),
      dataIndex: "goal",
      key: "goal",
      width: "15%",
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sorter: (a, b) => a.goal - b.goal,
      filteredValue: filteredInfo.goal || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Category
        </Title>
      ),
      key: "category",
      dataIndex: "category",
      filters: [
        { text: "Widows", value: "Widows" },
        { text: "Orphans", value: "Orphans" },
        { text: "Missions", value: "Missions" },
      ],
      render: (value) => <Text className="text-[13px]">{value}</Text>,
      filteredValue: filteredInfo.category || null,
      onFilter: (value: any, record) => record.category.includes(value),
      width: "12%",
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          No of Donors
        </Title>
      ),
      dataIndex: "no_of_donors",
      key: "no_of_donors",
      width: "13%",
      render: (value) => <Text className="text-[13px]">{value}</Text>,
      filteredValue: filteredInfo.no_of_donors || null,

      sorter: (a, b) => a.no_of_donors - b.no_of_donors,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Amount Raised
        </Title>
      ),
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      dataIndex: "amount_raised",
      key: "amount_raised",
      width: "15%",
      sorter: (a, b) => a.amount_raised - b.amount_raised,
      filteredValue: filteredInfo.amount_raised || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Status
        </Title>
      ),
      dataIndex: "status",
      key: "status",
      render: (value) => <Text className="text-[13px]">{value}</Text>,
      width: "13%",
      filteredValue: filteredInfo.status || null,
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement="bottomLeft"
          arrow
        >
          <Button size="small" type="text" className="flex items-end font-bold">
            <div>...</div>
          </Button>
        </Dropdown>
      ),
    },
  ];

  const handleDeleteBtn = () => {
    handleDeleteCancel();
    messageApi.open({
      content: "New project “The Widows Project” added",
      className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
      icon: <CheckCircleIcon />,
    });
  };

  return (
    <Fragment>
      {contextHolder}
      <Modal
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        footer={null}
      >
        <Result
          status="error"
          title={
            <Title level={5} className="text-[18px] leading-[22px]">
              Delete this project?
            </Title>
          }
          subTitle={
            <Paragraph className="text-[13px] leading-[20px] text-body-1">
              Are you sure you want to delete “The Widows Project”? Please note
              that this action cannot be undone.
            </Paragraph>
          }
          icon={
            <InfoCircle
              set="light"
              size={75}
              style={{ margin: "auto" }}
              primaryColor="#EB5757"
            />
          }
          extra={
            <Button
              type="primary"
              key="console"
              onClick={handleDeleteBtn}
              className={
                "mt-0 bg-[#EB5757] text-[13px] leading-[16px] text-white"
              }
              size="large"
            >
              Yes, delete project
            </Button>
          }
        />
      </Modal>
      <Modal
        open={isDonorModalOpen}
        onOk={handleDonorOk}
        onCancel={handleDonorCancel}
        footer={null}
      >
        <Title level={4} className="my-3 font-title">
          The Widows Project Donors
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={56}
                    className="bg-[#fff8e2] align-middle font-semibold text-body-1"
                  >
                    {item.avatar}
                  </Avatar>
                }
                title={
                  <Paragraph className="mb-0 font-medium">
                    {item.user} made a <strong>{item.amount}</strong>
                    &nbsp;donation
                  </Paragraph>
                }
                description={
                  <Text className="text-xs text-body-2">{item.time}</Text>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={newDataSource}
        onChange={handleChange}
        scroll={{ x: 896 }}
        loading={isLoading || isFetching}
        pagination={false}
        sticky
      />
      <Space className="my-4 flex w-full justify-end">
        <Pagination
          simple
          defaultCurrent={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total || 2}
          onChange={paginationHandler}
        />
      </Space>
    </Fragment>
  );
};

export default ProjectsTable;
