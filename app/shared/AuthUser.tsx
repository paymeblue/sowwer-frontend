import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Dropdown,
  List,
  Space,
  Typography,
} from "antd";
import Link from "next/link";
import React, {
  ForwardedRef,
  ForwardRefRenderFunction,
  Fragment,
  useCallback,
  useState,
} from "react";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Login, Logout } from "react-iconly";

type MenuItem = {
  label: string;
  key: string;
  path: string;
  icon: React.ReactNode;
};

type Props = {
  name: string;
  email: string;
  itemList?: MenuItem[];
  avatar: string;
  signIn: string;
};

const { Title, Text, Paragraph } = Typography;

type AuthUserRef = {
  getNode(): HTMLDivElement | null;
};
const AuthUser: ForwardRefRenderFunction<AuthUserRef, Props> = (
  { name, email, avatar, signIn, itemList = [] }: Props,
  ref: ForwardedRef<AuthUserRef>
) => {
  const [auth, setAuth] = useState(true);
  const router = useRouter();
  const data = [
    {
      name,
      email,
      avatar,
    },
  ];

  const handleItemClick = useCallback(
    (itemPath: string) => {
      router.push(`/${itemPath}`);
    },
    [router]
  );

  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  const handleLogout = useCallback(() => {
    setAuth(false);
  }, []);

  const items = itemList.map((item) => ({
    label: (
      <Button
        onClick={() => handleItemClick(item.path)}
        className="flex items-center gap-2 border-none text-left text-body-1 shadow-none hover:bg-slate-100"
        block
        icon={item.icon}
        key={item.key}
      >
        {item.label}
      </Button>
    ),
    key: item.key,
  }));

  items.push({
    label: (
      <Button
        onClick={handleLogout}
        className="flex items-center gap-1 border-none text-left text-body-1 shadow-none hover:bg-slate-100"
        icon={<Logout set="light" />}
        block
        key="logout"
      >
        Logout
      </Button>
    ),
    key: "logout",
  });

  return (
    <Fragment>
      <div className="hidden tablet:block">
        {!auth ? (
          <Space className="my-auto flex items-center justify-center">
            <Paragraph className="m-0 text-center text-xs text-body-1">
              Already have an account?
            </Paragraph>
            <Link
              href={`/auth/signin/${signIn}`}
              className="text-xs font-semibold text-accent"
            >
              Sign in
            </Link>
          </Space>
        ) : (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="cursor-pointer"
          >
            <Space size="middle" align="center">
              <Avatar
                size={48}
                className="bg-[#fff8e2] align-middle font-semibold text-body-1"
              >
                {avatar}
              </Avatar>
              <Typography>
                <Title level={5} className="mb-0 text-xs font-semibold">
                  {name}
                </Title>
                <Text className="text-xs text-body-1">{email}</Text>
              </Typography>
              <DownOutlined style={{ color: "#555", fontSize: "14px" }} />
            </Space>
          </Dropdown>
        )}
      </div>
      <MenuOutlined
        onClick={showDrawer}
        style={{ fontSize: "21px" }}
        className="hover:text-yellow-400 tablet:hidden"
      />
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        width="65%"
      >
        {!auth ? (
          <Button
            block
            className="mt-2 flex items-center gap-2 rounded-md border-none bg-slate-50 py-6 font-medium text-black shadow-none hover:bg-slate-100 "
            icon={<Login set="light" />}
            onClick={() => router.push(`/auth/signin/${signIn}`)}
            key="login"
          >
            Signin
          </Button>
        ) : (
          <Fragment>
            <List
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    className="items-center [&>div>h4]:mb-0 [&>div>h4]:font-bold [&>div>h4]:leading-tight"
                    avatar={
                      <Avatar
                        size={48}
                        className="bg-[#fff8e2] align-middle font-semibold text-body-1"
                        icon={item.avatar}
                      />
                    }
                    title={item.name}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
            {itemList.map((item) => (
              <Button
                onClick={() => handleItemClick(item.path)}
                className="mt-2 flex items-center gap-2 rounded-md border-none py-6 font-medium text-black shadow-none hover:bg-slate-100 "
                block
                icon={item.icon}
                key={item.key}
              >
                {item.label}
              </Button>
            ))}
            <Divider type="horizontal" />
            <Button
              block
              className="mt-2 flex items-center gap-2 rounded-md border-none bg-slate-50 py-6 font-medium text-black shadow-none hover:bg-slate-100 "
              icon={<Logout set="light" />}
              onClick={handleLogout}
              key="logout"
            >
              Logout
            </Button>
          </Fragment>
        )}
      </Drawer>
    </Fragment>
  );
};

export default React.forwardRef(AuthUser);
