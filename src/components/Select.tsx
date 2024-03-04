import * as RadixSelect from "@radix-ui/react-select";
import { useField } from "formik";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export function Select({
  items,
  name,
  placeholder,
}: {
  items: string[];
  name: string;
  placeholder?: string;
}) {
  const [field] = useField(name);
  return (
    <div className="flex items-stretch gap-2 rounded-lg border-2 border-white border-opacity-20 px-3 py-2 text-slate-400 focus-within:ring-2 focus-within:ring-indigo-500">
      <RadixSelect.Root
        value={field.value}
        onValueChange={(value) => field.onChange({ target: { name, value } })}
      >
        <RadixSelect.Trigger className="flex w-full items-center justify-between outline-none">
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <BiChevronDown size={24} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className="relative z-50 rounded-lg bg-gray-800 outline-none ring-2 ring-gray-700">
            <RadixSelect.ScrollUpButton className="flex w-full items-center justify-center p-1">
              <BiChevronUp size={24} />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="h-full w-full">
              {items.map((item) => (
                <RadixSelect.Item
                  key={item}
                  value={item}
                  className="z-50 w-full p-4 outline-none hover:bg-gray-700 hover:text-gray-100"
                >
                  <RadixSelect.ItemText className="text-gray-100">
                    {item}
                  </RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex w-full items-center justify-center p-1">
              <BiChevronDown size={24} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
