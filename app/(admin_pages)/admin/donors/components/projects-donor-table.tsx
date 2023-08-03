import { SearchOutlined } from "@ant-design/icons";
import currencyFormat from "@lib/useCurrencyFormat";
import { Button, InputRef, Typography, Space } from "antd";
import type { ColumnsType, ColumnType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import { Input, Table } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface DataType {
  key: string;
  title: string;
  name: string;
  category: string;
  amount: number;
  date: string;
}

type DataIndex = keyof DataType;
const priceFormat = currencyFormat();
const { Title, Text } = Typography;
const data: DataType[] = [
  {
    key: "1",
    title: "The Widows Project",
    name: "Semira Yesufu",
    category: "Widows",
    amount: 135000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "2",
    title: "The Missions Project",
    name: "Anonymous",
    category: "Missions",
    amount: 550000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "3",
    title: "The Widows Project",
    name: "Semira Yesufu",
    category: "Widows",
    amount: 157000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "4",
    title: "The Orphans Project",
    name: "Anonymous",
    category: "Orphans",
    amount: 500000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "5",
    title: "The Missions Project",
    name: "Semira Yesufu",
    category: "Missions",
    amount: 600000,
    date: "21st March 2023; 4:45pm",
  },
  {
    key: "6",
    title: "The Orphans Project",
    name: "Anonymous",
    category: "Orphans",
    amount: 300000,
    date: "21st March 2023; 4:45pm",
  },
];

const ProjectsDonorTable = () => {
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
          Donor's Name
        </Title>
      ),
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      render: (item) => (
        <Text className="text-[13px] font-semibold">{item}</Text>
      ),
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.name || null,
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
      render: (item) => <Text className="text-[13px]">{item}</Text>,
      sorter: (a, b) => a.title.length - b.title.length,
      filteredValue: filteredInfo.title || null,
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
      width: "15%",
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
      filteredValue: filteredInfo.amount || null,
      render: (item) => (
        <Text className="text-[13px]">{priceFormat(item)}</Text>
      ),
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
      sorter: (a, b) => a.date.length - b.date.length,
      render: (item) => <Text className="text-[13px]">{item}</Text>,

      filteredValue: filteredInfo.date || null,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 896 }}
      onChange={handleChange}
    />
  );
};

export default ProjectsDonorTable;
