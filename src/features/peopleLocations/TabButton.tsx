type TabButtonProps = {
  label: string;
  active: boolean;
  onSelect: () => void;
};

export function TabButton({ label, active, onSelect }: TabButtonProps) {
  return (
    <button
      type="button"
      className={active ? "tab-btn active" : "tab-btn"}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
