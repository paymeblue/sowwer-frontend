"use client";

import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
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
    <NavigationMenuItem>
      {!child ? (
        <Link href={route} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {label}
          </NavigationMenuLink>
        </Link>
      ) : (
        <>
          <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col space-y-2 p-4">
              {child.map((item) => {
                return (
                  <Link key={item.label} href={item.route}>
                    {item.label}
                  </Link>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </>
      )}
    </NavigationMenuItem>
  );
};

export default Navitem;
