import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { EmptyWalletIcon } from "@components/assets/icons";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import ResultComponent from "@shared/ResultComponent";
import { usePayoutHistoryQuery } from "@store/services/payouts";
import { Button, Input, InputRef, Space, Spin, Table, Typography } from "antd";
import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import type {
  FilterConfirmProps,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { FilterValue } from "antd/es/table/interface";
import moment from "moment";
import { Fragment, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  reference: string;
  title: string;
  amount: number;
  date: string;
}

const { Title, Text } = Typography;
type DataIndex = keyof DataType;
const priceFormat = currencyFormat();

// const data: DataType[] = [
//   {
//     key: "1",
//     title: "The Widows Project",
//     reference: "#ABC1234567",
//     amount: 135000,
//     date: "21st March 2023; 4:45pm",
//   },
//   {
//     key: "2",
//     title: "The Orphans Project",
//     reference: "#ABC5934567",
//     amount: 125000,
//     date: "27st March 2023; 4:45pm",
//   },
//   {
//     key: "3",
//     title: "The Missions Project",
//     amount: 150000,
//     reference: "#ABC1236567",
//     date: "12st March 2023; 4:45pm",
//   },
//   {
//     key: "4",
//     title: "The Widows Project",
//     reference: "#AEC1236567",
//     date: "1st March 2023; 4:45pm",
//     amount: 245000,
//   },
//   {
//     key: "5",
//     reference: "#AEC1263567",
//     date: "12st March 2023; 4:45pm",
//     title: "The Missions Project",
//     amount: 375000,
//   },
//   {
//     key: "6",
//     reference: "#AEC1693567",
//     date: "12st March 2023; 4:45pm",
//     title: "The Orphans Project",
//     amount: 650000,
//   },
// ];

const CompletedProjectsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
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
  const {
    data: res,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = usePayoutHistoryQuery({ page: pagination.current });
  function handleRefetch() {
    refetch();
  }
  const paginationHandler = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  const dataSource: DataType[] | undefined = res?.data.map((item) => ({
    key: item.id,
    title: capitalizeFirstLetters(item.project_title),
    amount: Number(item.amount),
    reference: item.reference,
    date: moment(item.createdAt).format("Do MMMM YYYY; h:mm:ss a"),
  }));

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
      record[dataIndex]
        .toString()
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
          Reference No.
        </Title>
      ),
      dataIndex: "reference",
      key: "reference",
      width: "25%",
      render: (item) => (
        <Text className="text-[13px] font-semibold">{item}</Text>
      ),
      sorter: (a, b) => a.reference.length - b.reference.length,
      filteredValue: null,
    },
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
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      filteredValue: filteredInfo.title || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Amount Paid
        </Title>
      ),
      dataIndex: "amount",
      key: "amount",
      width: "25%",
      filteredValue: null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Payout Date
        </Title>
      ),
      dataIndex: "date",
      key: "date",
      width: "25%",
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      sorter: (a, b) => a.date.length - b.date.length,
      filteredValue: filteredInfo.date || null,
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
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading || isFetching}
        onChange={handleChange}
        scroll={{ x: 896 }}
        rowKey={(record) => record.key}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {},
          };
        }}
        pagination={{
          defaultCurrent: res?.paginationInfo.currentPage,
          defaultPageSize: res?.paginationInfo.limit,
          total: res?.paginationInfo.totalItems,
          onChange: (page: number, pageSize: number) =>
            paginationHandler(page, pageSize),
        }}
        sticky
      />
    </Fragment>
  );
  return <Fragment>{content}</Fragment>;
};
export default CompletedProjectsTable;
