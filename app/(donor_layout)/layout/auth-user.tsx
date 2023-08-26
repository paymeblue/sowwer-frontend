import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "@hooks/useAuth";
import { useAppDispatch } from "@hooks/useStore";
import { logout } from "@store/reducers/authSlice";
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
import { usePathname, useRouter } from "next/navigation";
import React, {
  ForwardRefRenderFunction,
  ForwardedRef,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChevronDown, Login, Logout, User } from "react-iconly";

type MenuItem = {
  label: string;
  key: string;
  path: string;
  icon: React.ReactNode;
};

type Props = {
  name: string | undefined;
  email: string | undefined;
  itemList?: MenuItem[];
  avatar: string | undefined;
  signIn: string | undefined;
  profile: string | undefined;
};

const { Title, Text, Paragraph } = Typography;

type AuthUserRef = {
  getNode(): HTMLDivElement | null;
};
const AuthUser: ForwardRefRenderFunction<AuthUserRef, Props> = (
  { name, email, avatar, signIn, itemList = [], profile }: Props,
  ref: ForwardedRef<AuthUserRef>
) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState(!!user);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => setOpen(true);
  const pathname = usePathname();
  useEffect(() => {
    const regex = /^(\/projects\/[^/]+\/donate|\/ministries\/[^/]+\/donate)$/;
    if (regex.test(pathname) && user === null) {
      setAuth(false);
    }
  }, [pathname, user]);
  const onClose = () => setOpen(false);
  const handleGoToAccount = useCallback(() => {
    router.push(`/${profile}`);
    setOpen(false);
  }, [router, profile]);
  const handleItemClick = useCallback(
    (itemPath: string) => {
      router.push(`/${itemPath}`);
      setOpen(false);
    },
    [router]
  );
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
  // useEffect(() => {
  if (!/^\/(admin|donor)/.test(pathname)) {
    items.push({
      label: (
        <Button
          onClick={handleGoToAccount}
          className="flex items-center gap-1 border-none text-left text-body-1 shadow-none hover:bg-slate-100"
          icon={<User set="light" />}
          block
          key="account"
        >
          Go to Account
        </Button>
      ),
      key: "account",
    });
  }
  // }, [pathname, items, handleGoToAccount]);
  const data = [
    {
      name,
      email,
      avatar,
    },
  ];

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    setAuth(false);
  }, [dispatch]);

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
              <Link href={`/${profile}`}>
                <Avatar
                  size={48}
                  className="bg-[#fff8e2] align-middle font-semibold text-body-1"
                >
                  {avatar}
                </Avatar>
              </Link>
              <Typography>
                <Title
                  level={5}
                  className="mb-0 text-[12px] font-semibold leading-[15.12px]"
                >
                  {name}
                </Title>
                <Text className="text-[12px] leading-[15.12px] text-body-1">
                  {email}
                </Text>
              </Typography>
              <ChevronDown set="light" primaryColor="#555" size={16} />
            </Space>
          </Dropdown>
        )}
      </div>
      <MenuOutlined
        onClick={showDrawer}
        style={{ fontSize: "21px" }}
        className="my-4 hover:text-yellow-400 tablet:hidden"
      />
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        width="65%"
        className="[&>div>.ant-drawer-body]:px-4 mobile-md:[&>div>div>div>.ant-drawer-body]:p-6"
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
                    className="items-center [&>.ant-list-item-meta-avatar]:mr-3 [&>div>div]:text-xs [&>div>h4]:mb-0 [&>div>h4]:text-xs [&>div>h4]:font-bold [&>div>h4]:leading-tight"
                    avatar={
                      <Avatar
                        size={40}
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
                className="mt-1 flex items-center gap-2 rounded-md border-none py-6 font-medium text-black shadow-none hover:bg-slate-100 "
                block
                icon={item.icon}
                key={item.key}
              >
                {item.label}
              </Button>
            ))}
            <Divider type="horizontal" className="my-4" />
            <Button
              block
              size="small"
              className="flex items-center gap-2 rounded-md border-none bg-slate-50 py-6 font-medium text-black shadow-none hover:bg-slate-100 "
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
