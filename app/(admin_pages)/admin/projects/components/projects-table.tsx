import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CheckCircleIcon, EmptySpeakerIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import { useAppDispatch } from "@hooks/useStore";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import { generateAvatar } from "@lib/user-details";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import ResultComponent from "@shared/ResultComponent";
import { setProjectId } from "@store/reducers/utilSlice";
import {
  useCloseMinistryProjectMutation,
  useDeleteMinistryProjectMutation,
  useGetMinistryProjectDonorsQuery,
  useGetMinistryProjectsQuery,
} from "@store/services/projects";
import { ProjectData } from "@store/types";
import type { TableProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  InputRef,
  List,
  MenuProps,
  Modal,
  Space,
  Spin,
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
import moment from "moment";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

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

type RecordState = {
  amount_raised: number;
  category: string;
  goal: number;
  key: string;
  no_of_donors: number;
  status: any;
  title: string;
};
type IProps = {
  id: string;
  title: string;
  targetAmount: string;
  createdAt: string;
  category: "widows" | "orphans" | "missions";
  amountRaised: string;
  status: string;
  donors: number;
};
const { Title, Text, Paragraph } = Typography;
const { Item, useForm } = Form;

const ProjectsTable = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const password = Form.useWatch("password", form);

  let id: string | undefined;
  if (user && "ministry" in user) {
    id = user.ministry.id;
  }
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [rowRecord, setRowRecord] = useState<RecordState | undefined>();
  const [rowId, setRowId] = useState<string | undefined>();
  const [rowTitle, setRowTitle] = useState<string>("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const { data: donors } = useGetMinistryProjectDonorsQuery(rowId ?? skipToken);

  const { data, isLoading, isFetching, error, isError, refetch } =
    useGetMinistryProjectsQuery({
      id,
      page: pagination.current,
    });
  function handleRefetch() {
    refetch();
  }
  const [deleteMinistryProject, { isLoading: deleteLoading }] =
    useDeleteMinistryProjectMutation();

  const [closeMinistryProject, { isLoading: closeLoading }] =
    useCloseMinistryProjectMutation();
  const getColorForStatus = (status: ProjectData["status"]) => {
    return status === "drafted"
      ? "yellow"
      : status === "active"
      ? "blue"
      : status === "completed"
      ? "green"
      : status === "closed"
      ? "gainsboro"
      : "gray";
  };

  const projectDataSource: DataType[] | undefined = data?.data.map(
    (item: IProps) => ({
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
    })
  );

  const showModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showCloseProjectModal = () => {
    setIsCloseModalOpen(true);
  };
  const handleCloseOk = () => {
    setIsCloseModalOpen(false);
  };

  const handleCloseCancel = () => {
    setIsCloseModalOpen(false);
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
  const editHandler = (id?: string) => {
    router.push(`/admin/projects/new-project?q=${id}`);
  };
  const item1 = {
    key: "1",
    label: (
      <Button
        icon={<EditOutlined />}
        type="text"
        className="flex items-center justify-center text-[12px] hover:bg-transparent"
        onClick={() => {
          editHandler(rowId);
          dispatch(setProjectId({ projectId: rowId }));
        }}
      >
        Edit
      </Button>
    ),
  };
  const item2 = {
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
  };
  const item3 = {
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
  };
  const item4 = {
    key: "4",
    label: (
      <Button
        type="text"
        icon={<CloseOutlined />}
        className="flex items-center justify-center text-[12px] hover:bg-transparent"
        onClick={showCloseProjectModal}
      >
        Close project
      </Button>
    ),
  };

  // const items: MenuProps["items"] = [item1, item2, item3, item4];
  const [items, setItems] = useState<MenuProps["items"]>([]);
  useEffect(() => {
    if (rowRecord) {
      const { text } = rowRecord.status.props;

      switch (text.toLowerCase()) {
        case "drafted":
        case "in-progress":
          setItems((prev) => (prev = [item1, item2]));
          break;

        case "active":
          setItems((prev) => (prev = [item3, item4]));
          break;

        case "closed":
        case "completed":
          setItems((prev) => (prev = [item3]));
          break;
      }
    }
  }, [rowRecord]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#FFC629",
      }}
      spin
    />
  );
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
  };

  const paginationHandler = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
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
      render: (_, record: RecordState, i) => {
        return (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottomLeft"
            arrow
          >
            <Button
              size="small"
              type="text"
              className="flex items-center justify-center"
            >
              <MoreOutlined rotate={90} />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const handleDeleteBtn = async () => {
    try {
      const res = await deleteMinistryProject(rowId).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: `[&>div]:bg-red-800 [&>div]:text-white`,
      });
    }
    handleDeleteCancel();
  };

  const onFinish = async (values: { password: string }): Promise<void> => {
    try {
      const res = await closeMinistryProject({
        id: rowId,
        password: values.password,
      }).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
      form.resetFields();
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: `[&>div]:bg-red-800 [&>div]:text-white`,
      });
    }
    handleCloseCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };
  const content = isLoading ? (
    <Spin size="large" indicator={antIcon} />
  ) : isError ? (
    <ResultComponent
      title="Oops... Something went wrong :("
      subTitle={`${error}`}
      btnBg="primary"
      btnText="Retry"
      btnTextColor="black"
      status="error"
      showBtn={true}
      onBtnClick={handleRefetch}
    />
  ) : data?.data?.length === 0 ? (
    <ResultComponent
      icon={<EmptySpeakerIcon />}
      title={
        <Title level={4} className="text-18px leading-22.68px font-bold">
          No Projects yet
        </Title>
      }
      subTitle="Create a new project and manage all your projects from here."
    />
  ) : (
    <Fragment>
      {contextHolder}
      <Modal
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        closeIcon={<CloseOutlined style={{ color: "black" }} />}
        footer={null}
        title={
          <>
            <Title level={5} className="text-[21px] font-bold leading-normal">
              Delete this project?
            </Title>
            <Divider />
          </>
        }
      >
        <Paragraph className="text-center text-[14px] font-normal leading-[21px] tracking-[0.28px] text-body-1">
          Are you sure you want to delete “<strong>{rowTitle}</strong>”? Please
          note that this action cannot be undone.
        </Paragraph>
        <Button
          type="primary"
          key="console"
          onClick={handleDeleteBtn}
          loading={deleteLoading}
          className="my-6 flex items-center justify-center bg-[#DD3636] py-6 text-[13px] font-semibold leading-[16px] text-white"
          size="large"
          block
        >
          Yes, delete project
        </Button>
      </Modal>
      <Modal
        open={isCloseModalOpen}
        onOk={handleCloseOk}
        onCancel={handleCloseCancel}
        footer={null}
        closeIcon={<CloseOutlined style={{ color: "black" }} />}
        title={
          <>
            <Title level={5} className="text-[21px] font-bold leading-normal">
              Close Project
            </Title>
            <Divider />
          </>
        }
      >
        <Paragraph className="my-8 text-center text-[14px] font-medium leading-[21px] tracking-wide text-body-1">
          Are you sure you want to close your project “
          <strong>{rowTitle}</strong>”? Please note that you haven't reached
          your project goal and this action cannot be undone.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="close_project_form_modal"
        >
          <Item
            name="password"
            label="To close the project, enter your password below:"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[13px] [&>div>div.ant-form-item-label>label]:leading-[21px] [&>div>div.ant-form-item-label]:mx-auto  [&>div>div.ant-form-item-label]:p-0  [&>div>div.ant-form-item-label]:pb-3 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            rules={[
              {
                // required: true,
                message: "Please enter your password",
              },
              {
                min: 8,
                message: "Password too short!",
              },
              {
                max: 16,
                message: "Password should not exceed 16 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your password"
              pattern="^.{8,16}$"
              className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
            />
          </Item>
          <Item>
            <Button
              type="primary"
              key="console"
              loading={closeLoading}
              htmlType="submit"
              className="my-2 flex items-center justify-center bg-[#DD3636] py-6 text-[13px] font-semibold leading-[16px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
              size="large"
              disabled={!password}
              block
            >
              Close project
            </Button>
          </Item>
        </Form>
      </Modal>
      <Modal
        open={isDonorModalOpen}
        onOk={handleDonorOk}
        onCancel={handleDonorCancel}
        footer={null}
        className="[&>.ant-modal-content]:max-h-[450px] [&>.ant-modal-content]:overflow-y-scroll"
      >
        {donors?.data?.length === 0 ? (
          <Empty
            description={
              <Paragraph className="text-sm text-body-2">
                No donation for {rowTitle} yet!
              </Paragraph>
            }
          />
        ) : (
          <Fragment>
            <Title level={4} className="my-3 font-title">
              {rowTitle} Project Donors
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={donors?.data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={56}
                        className="bg-[#fff8e2] align-middle font-semibold text-body-1"
                      >
                        {generateAvatar(item.name)}
                      </Avatar>
                    }
                    title={
                      <Paragraph className="mb-0 font-medium">
                        {capitalizeFirstLetters(item.name)} made a
                        <strong>
                          &nbsp;{priceFormat(Number(item.amount))}
                        </strong>
                        &nbsp;donation
                      </Paragraph>
                    }
                    description={
                      <Text className="text-xs text-body-2">
                        {moment(item.createdAt).format(
                          "Do MMMM YYYY; h:mm:ss a"
                        )}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Fragment>
        )}
      </Modal>
      <Table
        columns={columns}
        dataSource={projectDataSource}
        onChange={handleChange}
        scroll={{ x: 896 }}
        loading={isLoading || isFetching}
        rowKey={(record) => record.key}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowId(record.key);
              setRowTitle(record.title);
              setRowRecord(record);
            },
          };
        }}
        pagination={{
          defaultCurrent: data?.paginationInfo.currentPage,
          defaultPageSize: data?.paginationInfo.limit,
          total: data?.paginationInfo.totalItems,
          onChange: (page: number, pageSize: number) =>
            paginationHandler(page, pageSize),
        }}
        sticky
      />
    </Fragment>
  );
  return <Fragment>{content}</Fragment>;
};
export default ProjectsTable;
