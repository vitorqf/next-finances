export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-lg  border-2 border-[#343B45]">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`btn-secondary duration-250 px-4 py-2 text-sm font-semibold outline-none transition-colors ${
            activeTab === index
              ? "btn-secondary-active"
              : "hover:text-primary-500 text-gray-500"
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
