import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { CheckCircleIcon, EmptyWalletIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import ResultComponent from "@shared/ResultComponent";
import { useRequestPayoutMutation } from "@store/services/payouts";
import { useGetMinistryProjectsQuery } from "@store/services/projects";
import {
  Button,
  Input,
  InputRef,
  Space,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import type {
  FilterConfirmProps,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { FilterValue } from "antd/es/table/interface";
import { Fragment, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import PayoutFormModal from "./payout-modal";

export interface DataType {
  key: string;
  title: string;
  goal: number;
  category: string;
  donors: number;
  amount: number;
  btn: string;
}

type DataIndex = keyof DataType;
const priceFormat = currencyFormat();
const { Title, Text } = Typography;
// const data: DataType[] = [
//   {
//     key: "1",
//     goal: 500000,
//     title: "The Widows Project",
//     category: "Widows",
//     donors: 53,
//     amount: 135000,
//     btn: "Request Payout",
//   },
//   {
//     key: "2",
//     goal: 125000,
//     title: "The Orphans Project",
//     category: "Orphans",
//     donors: 50,
//     amount: 105000,
//     btn: "Request Payout",
//   },
//   {
//     key: "3",
//     goal: 500000,
//     title: "The Missions Project",
//     category: "Missions",
//     donors: 35,
//     amount: 135000,
//     btn: "Request Payout",
//   },
//   {
//     key: "4",
//     goal: 400000,
//     title: "The Widows Project",
//     category: "Widows",
//     donors: 53,
//     amount: 245000,
//     btn: "Request Payout",
//   },
//   {
//     key: "5",
//     goal: 750000,
//     title: "The Missions Project",
//     category: "Missions",
//     donors: 23,
//     amount: 375000,
//     btn: "Request Payout",
//   },
//   {
//     key: "6",
//     goal: 700000,
//     title: "The Orphans Project",
//     category: "Orphans",
//     donors: 70,
//     amount: 650000,
//     btn: "Request Payout",
//   },
// ];
const CompletedProjectsTable = ({ acctLinked }: { acctLinked: boolean }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const { user } = useAuth();
  let id;
  if (user) {
    id = user.ministry.id;
  }
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
  const [requestPayout, { isLoading: requestLoading }] =
    useRequestPayoutMutation();
  const {
    data: res,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetMinistryProjectsQuery({
    id,
    page: pagination.current,
    status: "completed",
  });
  function handleRefetch() {
    refetch();
  }
  const paginationHandler = () => {
    return setPagination((prev) => ({
      ...prev,
      current: res?.paginationInfo?.currentPage,
      total: res?.paginationInfo?.totalItems,
      pageSize: res?.paginationInfo?.limit,
    }));
  };

  const dataSource: DataType[] | undefined = res?.data.map((item) => ({
    key: item.id,
    goal: Number(item.targetAmount),
    title: capitalizeFirstLetters(item.title),
    category: item.category,
    donors: item.donors,
    amount: Number(item.amountRaised),
    btn: "Request Payout",
  }));
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  // const [dataSource, setDataSource] = useState<DataType[]>(data);

  const handleDisable = (obj: DataType) => {
    if (obj.btn === "Payout Requested") {
      return true;
    }
    return false;
  };

  const callback = async (record: DataType) => {
    try {
      await requestPayout(record.key).unwrap();
      messageApi.open({
        content: `Payout payout for ${record.title} sent successfully`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      dataSource?.map((item) => {
        if (item.key === record.key) {
          return {
            ...item,
            btn: "Payout Requested", // Update the button text content
          };
        }
        return item;
      });
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }

    // setTimeout(() => {
    //   messageApi.open({
    //     content: `Payout payout for ${record.title} sent successfully`,
    //     className: "[&>div]:bg-[#17B472] [&>div]:text-white",
    //     icon: <CheckCircleIcon />,
    //   });

    //   setDataSource(updatedData);
    // }, 500);
  };

  // const handleModalClose = (record: DataType) => {
  //   callback(record); // Continue execution after form modal updates acctLinked
  // };

  const handleRequestPayout = (
    record: DataType,
    callback: (record: DataType) => void
  ) => {
    if (!acctLinked) {
      setModalOpen(true);
      // Assuming the form modal updates acctLinked when closed
      // You can add an appropriate event listener or callback to handle the modal close event
      // For example, if the modal has an "onClose" prop:
      // modalProps = { onClose: handleModalClose }
      // When the modal is closed, the handleModalClose callback will be triggered
      // and the execution will continue from there.
    } else {
      callback(record); // Continue execution if acctLinked is already true
    }
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
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
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

  const msg = () => {
    messageApi.open({
      content: "Account connected successfully!",
      className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
      icon: <CheckCircleIcon />,
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Project Title
        </Title>
      ),
      dataIndex: "title",
      key: "title",
      width: "20%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
      render: (item) => (
        <Text className="text-[13px] font-semibold">{item}</Text>
      ),
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
      filteredValue: null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.goal - b.goal,
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
      filteredValue: filteredInfo.category || null,
      onFilter: (value: any, record) => record.category.includes(value),
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      width: "10%",
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          No of Donor's
        </Title>
      ),
      dataIndex: "donors",
      key: "donors",
      width: "15%",
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      sorter: (a, b) => a.donors - b.donors,
      filteredValue: filteredInfo.donors || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Amount Raised
        </Title>
      ),
      dataIndex: "amount",
      key: "amount",
      width: "15%",
      filteredValue: null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "",
      key: "action",
      dataIndex: "btn",
      width: "15%",
      filteredValue: null,
      render: (_, record: DataType) => {
        return (
          <Button
            className={`border-accent text-[13px] font-semibold leading-[16px] text-accent disabled:border-[#E8E9ED] disabled:bg-[#E8E9ED] disabled:text-white`}
            disabled={handleDisable(record)}
            loading={requestLoading}
            onClick={() => handleRequestPayout(record, callback)}
          >
            {record.btn}
          </Button>
        );
      },
    },
  ];
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
  ) : res?.data?.length === 0 ? (
    <ResultComponent
      title={
        <Title className="text-[18px] font-bold leading-[22.68px]">
          No payouts yet
        </Title>
      }
      subTitle={
        <Text className="text-[13px] leading-[19px] text-gray-500">
          None of your projects have been completed. Once they're completed, you
          will see a list of <br /> your completed projects and be able to
          request payouts after adding your payout details.
        </Text>
      }
      icon={<EmptyWalletIcon />}
    />
  ) : (
    <Fragment>
      {contextHolder}
      <PayoutFormModal
        modalOpen={modalOpen}
        msg={msg}
        showForm={showForm}
        setShowForm={setShowForm}
        setModalOpen={setModalOpen}
      />
      ;
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading || isFetching}
        onChange={handleChange}
        scroll={{ x: 896 }}
        rowKey="key"
        pagination={{
          defaultCurrent: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: paginationHandler,
          position: ["bottomRight"],
        }}
        sticky
      />
    </Fragment>
  );
  return <Fragment>{content}</Fragment>;
};

export default CompletedProjectsTable;
