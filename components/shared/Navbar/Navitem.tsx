"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";

interface BaseNaveItemProps {
  label: string;
  route: string;
}

export interface INavitem extends BaseNaveItemProps {
  child?: INavitem[];
  isActive?: boolean;
}

const Navitem = ({ label, route, child, isActive }: INavitem) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="relative">
          {!child && (
            <Link href={route} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className={`${isActive && "text-primary"}`}>{label}</span>
              </NavigationMenuLink>
            </Link>
          )}
          {child && <NavigationMenuTrigger>{label}</NavigationMenuTrigger>}
          {child && (
            <NavigationMenuContent>
              <ul className="flex w-[10rem] flex-col space-y-4 p-4">
                {child.map((item) => {
                  return (
                    <Link
                      key={item.label}
                      href={item.route}
                      className={`text-sm hover:text-primary ${
                        isActive && "text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
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
