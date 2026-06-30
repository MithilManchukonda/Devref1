import { getSubjectColor } from "../data/subjects";

export default function SubjectFilter({ subjects, active, setActive, counts }) {
  const all = ["All", ...subjects];

  if (subjects.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 code-scroll">
      {all.map((subject) => {
        const isActive = active === subject;
        const col = getSubjectColor(subject);
        return (
          <button
            key={subject}
            onClick={() => setActive(subject)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
              isActive
                ? "bg-[#C8FF3D] text-[#0a0e0a] border-[#C8FF3D]"
                : "bg-[#11160f] text-[#a8b39e] border-[#232b20] hover:border-[#3a4534]"
            }`}
          >
            {subject !== "All" && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? "#0a0e0a" : col.dot }} />
            )}
            {subject}
            <span className={isActive ? "text-[#0a0e0a]/60" : "text-[#5a6354]"}>
              {counts[subject] ?? ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
