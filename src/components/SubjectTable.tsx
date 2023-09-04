"use client";

import { Subject } from "@/types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import getGradeFromMark from "@/grades";

interface MyProps {
  title: string;
  subjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
  onDeleteClick?: () => void;
}

export default function SubjectTable({
  subjects,
  title,
  onSubjectsChange: setSubjects,
  onDeleteClick,
}: MyProps) {
  const addSubject = () => {
    const newSubject: Subject = {
      name: "",
      credit: "",
      mark: "",
    };

    setSubjects([...subjects, newSubject]);
  };

  const deleteSubject = (index: number) => {
    const newSubjects = subjects.filter((a, i) => i !== index);
    setSubjects(newSubjects);
  };

  const updateSubjectField = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  return (
    <div className="flex-grow">
      <div className="relative w-full">
        <div className="sticky top-0 border-b-[1px] border-b-gray-150 bg-bg z-50 group">
          <div className="max-w-4xl m-auto px-3 relative">
            <XMarkIcon
              className="group-hover:inline hidden text-red-700 absolute left-[-24px] top-[14px] w-6 cursor-pointer"
              title="Delete term"
              onClick={onDeleteClick}
            />
            <div className="font-serif text-lg py-3">{title}</div>
            <div className="grid grid-cols-12 gap-3 text-sm font-heading text-gray-600">
              <div className="col-span-6 py-2">Subject</div>
              <div className="col-span-2 py-2 px-2">Credit</div>
              <div className="col-span-2 py-2 px-2">Mark</div>
              <div className="col-span-2 py-2 px-2">Grade</div>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {subjects.map((subject, i) => {
            return (
              <div key={i} className="group">
                <div className="m-auto max-w-4xl px-3">
                  <div className="grid grid-cols-12 gap-3 text-sm font-sans">
                    <div className="col-span-6 py-2 relative">
                      <XMarkIcon
                        className="group-hover:inline hidden text-red-700 absolute left-[-28px] top-[14px] w-4 cursor-pointer"
                        title="Delete subject"
                        onClick={() => deleteSubject(i)}
                      />
                      <input
                        type="text"
                        placeholder="Subject name"
                        className="w-full bg-transparent outline-none py-1"
                        value={subject.name}
                        autoFocus
                        onChange={(e) =>
                          updateSubjectField(i, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2 py-2 px-2">
                      <input
                        type="text"
                        placeholder="e.g. 12.5"
                        className="w-full bg-transparent outline-none py-1"
                        value={subject.credit}
                        onChange={(e) =>
                          updateSubjectField(i, "credit", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-2 py-2 px-2">
                      <input
                        type="text"
                        placeholder="e.g. 75"
                        className="w-full bg-transparent outline-none py-1"
                        value={subject.mark}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || /^-?\d+$/.test(value)) {
                            updateSubjectField(i, "mark", value);
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-2 py-3 px-2">
                      {subject.mark !== ""
                        ? getGradeFromMark(parseInt(subject.mark))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="hover:bg-gray-100 cursor-pointer"
            onClick={addSubject}
          >
            <div className="py-3 m-auto max-w-4xl text-sm px-3 text-gray-500 flex flex-row items-center gap-2">
              <PlusIcon width={14} /> Add subject
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
