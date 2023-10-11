"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { useRouter } from "next/navigation";

interface BaseNaveItemProps {
  label: string;
  route: string;
}

export interface INavitem extends BaseNaveItemProps {
  child?: INavitem[];
  isActive?: boolean;
  handleMenuClick?: () => void;
}

const Navitem = ({
  label,
  route,
  child,
  isActive,
  handleMenuClick,
}: INavitem) => {
  const router = useRouter();

  return (
    <NavigationMenu className={`${child && "z-30"}`}>
      <NavigationMenuList>
        <NavigationMenuItem className="relative">
          {!child && (
            <div
              className="cursor-pointer"
              onClick={() => {
                if (handleMenuClick) {
                  handleMenuClick();
                }
                router.push(route);
              }}
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className={`${isActive && "text-primary"}`}>{label}</span>
              </NavigationMenuLink>
            </div>
          )}
          {child && <NavigationMenuTrigger>{label}</NavigationMenuTrigger>}
          {child && (
            <NavigationMenuContent className="z-[100]">
              <ul className="z-[90] flex w-[10rem] flex-col space-y-4 p-4">
                {child.map((item) => {
                  return (
                    <div
                      key={item.label}
                      onClick={() => {
                        if (handleMenuClick) {
                          handleMenuClick();
                        }
                        router.push(item.route);
                      }}
                      className={`cursor-pointer text-sm hover:text-primary ${
                        isActive && "text-primary"
                      }`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navitem;
