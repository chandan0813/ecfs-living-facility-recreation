import { useState } from "react";
import { services } from "../content";
import { nodePositions } from "../theme";

export function ServiceNodes({ onActive }: { onActive: (value: number | null) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? selected;
  const entry = active === null ? undefined : services[active];
  const update = (hover: number | null, pinned = selected) => {
    setHovered(hover);
    onActive(hover ?? pinned);
  };
  return (
    <div
      className="node-overlay absolute inset-0 z-20"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setSelected(null);
          update(null, null);
        }
      }}
    >
      {services.map(({ short, name, icon: Icon }, i) => {
        const [x, y] = nodePositions[i] ?? [50, 50];
        return (
          <button
            key={short}
            type="button"
            data-node-index={i}
            className="glass-node absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `var(--node-x, ${x}%)`, top: `var(--node-y, ${y}%)` }}
            aria-label={name}
            aria-pressed={active === i}
            aria-describedby={active === i ? "facility-node-tip" : undefined}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") update(i);
            }}
            onPointerLeave={() => update(null)}
            onFocus={() => update(i)}
            onBlur={() => update(null)}
            onClick={() => {
              const next = selected === i ? null : i;
              setSelected(next);
              update(null, next);
            }}
          >
            <Icon size={15} className="shrink-0 text-deep-aqua" />
            <span className="hidden lg:block whitespace-nowrap">{short}</span>
          </button>
        );
      })}
      {entry && (
        <div
          id="facility-node-tip"
          role="tooltip"
          className="absolute inset-x-3 bottom-0 z-30 rounded-md border bg-card p-3 text-xs shadow-md md:inset-x-auto md:right-5 md:max-w-65"
        >
          <strong className="block mb-1">{entry.name}</strong>
          <span className="text-muted-foreground">{entry.text}</span>
        </div>
      )}
    </div>
  );
}
