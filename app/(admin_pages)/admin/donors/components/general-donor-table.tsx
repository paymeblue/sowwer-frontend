import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { EmptyDonorIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import ResultComponent from "@shared/ResultComponent";
import { useGetDonationsForAdminUserQuery } from "@store/services/projects";
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
  name: string;
  type: string | any;
  frequency: string;
  amount: number;
  date: string;
}

type DataIndex = keyof DataType;
const priceFormat = currencyFormat();
const { Title, Text } = Typography;

const GeneralDonorsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const { user } = useAuth();
  let id: string | undefined;
  if (user && "ministry" in user) {
    id = user.ministry.id;
  }
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
  } = useGetDonationsForAdminUserQuery({
    id,
    page: pagination.current,
    type: "ministry",
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
  const dataSource: DataType[] | undefined = res?.data.map((item, i) => ({
    key: item.id,
    name: capitalizeFirstLetters(item.donorName),
    frequency: capitalizeFirstLetters(item.donorInterval ?? "-"),
    amount: Number(item.amount),
    type: capitalizeFirstLetters(
      `${item.donorType === null ? "one-time" : item.donorType} donation`
    ),
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
          Donor's Name
        </Title>
      ),
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      render: (value) => (
        <Text className="text-[13px] font-semibold">{value}</Text>
      ),
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.name || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Donation Type
        </Title>
      ),
      key: "type",
      dataIndex: "type",
      filters: [
        { text: "One-time", value: "One-time Donation" },
        { text: "Recurring", value: "Recurring  Donation" },
      ],
      filteredValue: filteredInfo.type || null,
      render: (value) => <Text className="text-[13px]">{value}</Text>,
      onFilter: (value: any, record) => record.type.includes(value),
      width: "20%",
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Frequency
        </Title>
      ),
      dataIndex: "frequency",
      key: "frequency",
      width: "15%",
      render: (value) => <Text className="text-[13px]">{value}</Text>,
      sorter: (a, b) => a.frequency.length - b.frequency.length,
      filteredValue: filteredInfo.frequency || null,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Amount Donated
        </Title>
      ),
      dataIndex: "amount",
      key: "amount",
      width: "20%",
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      filteredValue: filteredInfo.amount || null,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: (
        <Title className="text-[12px] font-semibold leading-[15.12px]">
          Date Donated
        </Title>
      ),
      dataIndex: "date",
      key: "date",
      width: "25%",
      render: (value) => <Text className="text-[13px]">{value}</Text>,
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
          No donors yet
        </Title>
      }
      subTitle={
        <Text className="text-[13px] leading-[19px] text-gray-500">
          Once you start receiving donations your list of donors will appear
          here.
        </Text>
      }
      icon={<EmptyDonorIcon />}
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

export default GeneralDonorsTable;
