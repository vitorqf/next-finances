import { Category } from "@/models/Category";

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <div
      className={`flex h-6 w-max items-center justify-center rounded-xl px-3 badge-${category.slug}`}
    >
      <span className="text-xs font-medium leading-4 text-white">
        {category.title}
      </span>
    </div>
  );
}
