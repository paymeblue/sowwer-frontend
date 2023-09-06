import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import capitalizeFirstLetters from "@lib/capitalize";
import currencyFormat from "@lib/useCurrencyFormat";
import ResultComponent from "@shared/ResultComponent";
import { useGetProjectDonationsForDonorUserQuery } from "@store/services/projects";
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
import moment from "moment";
import { FC, Fragment, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

type DataIndex = keyof DataType;
const priceFormat = currencyFormat();
interface DataType {
  key: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}
const { Title, Text } = Typography;
const ProjectDonationTable: FC = () => {
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
    useGetProjectDonationsForDonorUserQuery({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
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

  const dataSource: DataType[] | undefined = data?.data.map((item) => ({
    key: item.id,
    title: capitalizeFirstLetters(item.title),
    category: capitalizeFirstLetters(item.category),
    amount: Number(item.amountRaised),
    date: moment(item.createdAt).format("Do MMMM YYYY; h:mm:ss a"),
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Title
          level={5}
          className=" m-0 p-0  text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Project Title
        </Title>
      ),
      dataIndex: "title",
      filteredValue: filteredInfo.title || null,
      ...getColumnSearchProps("title"),
      sorter: {
        compare: (a, b) => a.title.length - b.title.length,
        multiple: 1,
      },
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      width: "25%",
    },
    {
      title: (
        <Title
          level={5}
          className=" m-0 p-0  text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Project Category
        </Title>
      ),
      dataIndex: "category",
      filters: [
        { text: "Widows", value: "Widows" },
        { text: "Orphans", value: "Orphans" },
        { text: "Missions", value: "Missions" },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value: any, record) => record.category.includes(value),
      render: (item) => <Text className="text-[13px]">{item}</Text>,

      width: "25%",
    },
    {
      title: (
        <Title
          level={5}
          className=" m-0 p-0  text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Amount Donated
        </Title>
      ),
      dataIndex: "amount",
      filteredValue: filteredInfo.amount || null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 1,
      },
      width: "25%",
    },
    {
      title: (
        <Title
          level={5}
          className=" m-0 p-0  text-[9.91px] font-semibold leading-[12.49px] laptop:text-[12px] laptop:leading-[15.12px]"
        >
          Date Donated
        </Title>
      ),
      dataIndex: "date",
      filteredValue: filteredInfo.date || null,
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      width: "25%",
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
    <Empty description="You have not made any project donations yet!" />
  ) : (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isLoading || isFetching}
      onChange={handleChange}
      rowKey={(record) => record.key}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {},
        };
      }}
      scroll={{ x: 896 }}
      pagination={{
        defaultCurrent: data?.paginationInfo.currentPage,
        defaultPageSize: data?.paginationInfo.limit,
        total: data?.paginationInfo.totalItems,
        onChange: (page: number, pageSize: number) =>
          paginationHandler(page, pageSize),
      }}
      sticky
    />
  );
  return <Fragment>{content}</Fragment>;
};

export default ProjectDonationTable;
