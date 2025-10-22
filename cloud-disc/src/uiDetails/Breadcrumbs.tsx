import { useBreadcrumbsStore } from "@/store/BreadcrumbsStore";
import Link from "next/link";

export default function Breadcrumbs() {
  const { pages } = useBreadcrumbsStore();

  return (
    <div className="flex gap-1">
      {pages.map((el) => {
        return (
          <Link href={el.url}>
            <span>/{el.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
