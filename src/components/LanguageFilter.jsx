import { LANGUAGES, LANG_COLORS } from "../data/snippets";

export default function LanguageFilter({ active, setActive, counts }) {
  const all = ["All", ...LANGUAGES];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 code-scroll">
      {all.map((lang) => {
        const isActive = active === lang;
        const col = LANG_COLORS[lang];
        return (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
              isActive
                ? "bg-[#C8FF3D] text-[#0a0e0a] border-[#C8FF3D]"
                : "bg-[#11160f] text-[#a8b39e] border-[#232b20] hover:border-[#3a4534]"
            }`}
          >
            {lang !== "All" && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? "#0a0e0a" : col?.dot }} />
            )}
            {lang}
            <span className={isActive ? "text-[#0a0e0a]/60" : "text-[#5a6354]"}>
              {counts[lang] ?? ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
