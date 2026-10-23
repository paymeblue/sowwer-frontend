import { boardAnchor, boardNamePattern, findBoardMember } from "@lib/board";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * Renders running text with every board member's name linked to their card
 * in the About page's board section, where the card is brought into focus.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The text with names linked.
 */
const LinkedNames = ({ text, className }: Props) => {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of Array.from(text.matchAll(boardNamePattern))) {
    const member = findBoardMember(match[0]);
    const at = match.index ?? 0;
    if (!member) continue;
    nodes.push(text.slice(last, at));
    nodes.push(
      <Link
        key={at}
        href={`/about-us#${boardAnchor(member.slug)}`}
        title={`${member.name}, ${member.position}`}
        className={
          className ??
          "font-medium text-inherit underline decoration-primary decoration-2 underline-offset-[0.2em] transition-colors hover:bg-primary/30"
        }
      >
        {match[0]}
      </Link>
    );
    last = at + match[0].length;
  }
  nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
};

export default LinkedNames;
