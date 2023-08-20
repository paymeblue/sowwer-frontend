import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import currencyFormat from "@lib/useCurrencyFormat";
import ResultComponent from "@shared/ResultComponent";
import { useGetDonationsForDonorUserQuery } from "@store/services/projects";
import {
  Button,
  Empty,
  Input,
  InputRef,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import type {
  FilterConfirmProps,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { FilterValue } from "antd/es/table/interface";
// import moment from "moment";
import React, { FC, Fragment, useId, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

const priceFormat = currencyFormat();
interface DataType {
  key: React.Key;
  ministry: string;
  type: string;
  frequency: string;
  amount: number;
  date: string;
}
// type IProps = {
//   id: string;
//   title: string;
//   createdAt: string;
//   category: "widows" | "orphans" | "missions";
//   type: "one-time" | "recurring";
//   frequency: string;
//   amount: string;
//   date: string;
// };

type DataIndex = keyof DataType;
const { Title, Text } = Typography;

const GeneralDonationTable: FC = () => {
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
  const { data, isLoading, isFetching, error, isError, refetch } =
    useGetDonationsForDonorUserQuery({
      type: "ministry",
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  function handleRefetch() {
    refetch();
  }
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
  const dataSource: DataType[] = [
    {
      key: useId(),
      ministry: "Family Worship Centre",
      frequency: "Monthly",
      type: "Recurring Donation",
      amount: 135000,
      date: "21st March 2023; 4:45pm",
    },
    {
      key: useId(),
      ministry: "Family Worship Centre",
      type: "One-time Donation",
      amount: 150000,
      frequency: "-",
      date: "21st March 2023; 4:45pm",
    },
    {
      key: useId(),
      ministry: "Family Worship Centre",
      type: "Recurring Donation",
      frequency: "Monthly",
      amount: 130000,
      date: "21st March 2023; 4:45pm",
    },
    {
      key: useId(),
      ministry: "Family Worship Centre",
      type: "One-time Donation",
      frequency: "-",
      amount: 125000,
      date: "21st March 2023; 4:45pm",
    },
    {
      key: useId(),
      ministry: "Family Worship Centre",
      type: "Recurring Donation",
      frequency: "Monthly",
      amount: 145000,
      date: "21st March 2023; 4:45pm",
    },
  ];
  // const dataSource: DataType[] | undefined = data?.data.map((item: IProps) => ({
  //   key: item.id,
  //   ministry: capitalizeFirstLetters(item.title),
  // type: capitalizeFirstLetters(`${item.type} donation`),
  // frequency: capitalizeFirstLetters(item.frequency),
  //   amount: item.amount,
  //   date: moment(item.date).format('Do MMMM YYYY; h:mm:ss a')  }));

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Title
          level={5}
          className="m-0 p-0 text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Ministry's Name
        </Title>
      ),
      dataIndex: "ministry",
      width: "25%",
      sorter: {
        compare: (a, b) => a.ministry.length - b.ministry.length,
        multiple: 1,
      },
      ...getColumnSearchProps("ministry"),
      sortDirections: ["descend", "ascend"],
      render: (item) => (
        <Text className="text-[13px] font-semibold">{item}</Text>
      ),
      filteredValue: filteredInfo.ministry || null,
    },
    {
      title: (
        <Title
          level={5}
          className=" m-0 p-0  text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Donation Type
        </Title>
      ),
      dataIndex: "type",
      filters: [
        { text: "Recurring Donation", value: "Recurring Donation" },
        { text: "One-time Donatio", value: "One-time Donatio" },
      ],
      filteredValue: filteredInfo.type || null,
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      onFilter: (value: any, record) => record.type.includes(value),

      width: "20%",
    },
    {
      title: (
        <Title
          level={5}
          className="m-0 p-0 text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Frequency
        </Title>
      ),
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      dataIndex: "frequency",
      filteredValue: null,
      width: "15%",
    },
    {
      title: (
        <Title
          level={5}
          className="m-0 p-0 text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Amount Donated
        </Title>
      ),
      dataIndex: "amount",
      filteredValue: null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 1,
      },
      width: "20%",
    },
    {
      title: (
        <Title
          level={5}
          className="m-0 p-0 text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Date Donated
        </Title>
      ),
      filteredValue: null,
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      dataIndex: "date",
      width: "25%",
    },
    {
      title: "",
      key: "action",
      dataIndex: "action",
      width: "12%",
      filteredValue: null,
      render: (_, record: { frequency: string; key: React.Key }) => {
        console.log(record, "record");
        if (record.frequency !== "-") {
          return (
            <Button className="text-[14px] font-semibold leading-[22px]" danger>
              Pause Payment
            </Button>
          );
        } else return null;
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
  ) : data?.data?.length === 0 ? (
    <Empty description="You have not made any general donations yet!" />
  ) : (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isLoading || isFetching}
      onChange={handleChange}
      scroll={{ x: 896 }}
      pagination={{
        defaultCurrent: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: paginationHandler,
      }}
      sticky
    />
  );
  return <Fragment>{content}</Fragment>;
};

export default GeneralDonationTable;
