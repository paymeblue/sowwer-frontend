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
}

const Navitem = ({ label, route, child }: INavitem) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="relative">
          {!child && (
            <Link href={route} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {label}
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
                      className="text-sm hover:text-primary"
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
