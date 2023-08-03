import { SearchOutlined } from "@ant-design/icons";
import currencyFormat from "@lib/useCurrencyFormat";
import { Button, InputRef, Space } from "antd";
import type { ColumnsType, ColumnType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import { Input, Table, Typography } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";

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

const data: DataType[] = [
  {
    key: "1",
    title: "The Widows Project",
    reference: "#ABC1234567",
    amount: 135000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "2",
    title: "The Orphans Project",
    reference: "#ABC5934567",
    amount: 125000,
    date: "27st March 2023; 4:45pm",
  },
  {
    key: "3",
    title: "The Missions Project",
    amount: 150000,
    reference: "#ABC1236567",
    date: "12st March 2023; 4:45pm",
  },
  {
    key: "4",
    title: "The Widows Project",
    reference: "#AEC1236567",
    date: "1st March 2023; 4:45pm",
    amount: 245000,
  },
  {
    key: "5",
    reference: "#AEC1263567",
    date: "12st March 2023; 4:45pm",
    title: "The Missions Project",
    amount: 375000,
  },
  {
    key: "6",
    reference: "#AEC1693567",
    date: "12st March 2023; 4:45pm",
    title: "The Orphans Project",
    amount: 650000,
  },
];

const CompletedProjectsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

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

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 896 }}
      onChange={handleChange}
      sticky
    />
  );
};

export default CompletedProjectsTable;
