"use client";

import SubjectTable from "@/components/SubjectTable";
import { Subject, Term } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import calculateGpa from "@/calculateGpa";
import Link from "next/link";

export default function Home() {
  const [terms, setTerms] = useState<Term[]>(() => {
    try {
      const dataJson = localStorage.getItem("data");
      if (dataJson) {
        return JSON.parse(dataJson);
      }
    } catch (e) {
      console.error(e);
    }

    return [{ subjects: [{ name: "", mark: "", credit: "" }] }];
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(terms));
  }, [terms]);

  const updateSubjects = (index: number, subjects: Subject[]) => {
    const newTerms = [...terms];
    newTerms[index].subjects = subjects;
    setTerms(newTerms);
  };

  const addTerm = () => {
    const term: Term = {
      subjects: [{ name: "", mark: "", credit: "" }],
    };

    setTerms([...terms, term]);
  };

  const removeTerm = (index: number) => {
    setTerms(terms.filter((t, i) => i !== index));
  };

  const gpa = useMemo(() => calculateGpa(terms), [terms]);

  return (
    <div className="h-screen flex flex-col divide-y">
      <div className="flex-1 overflow-auto">
        <div className="container m-auto max-w-4xl">
          <div className="py-5 px-3">
            <div className="flex flex-row divide-x gap-4 items-center">
              <img src="/luna.png" width={56}></img>
              <h1 className="text-xl font-bold font-heading pl-4">UoM WAM to GPA</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {terms.map((term, i) => (
            <SubjectTable
              key={i}
              title={`Term ${i + 1}`}
              subjects={term.subjects}
              onSubjectsChange={(s) => updateSubjects(i, s)}
              onDeleteClick={() => removeTerm(i)}
            />
          ))}
          <div
            onClick={addTerm}
            className="w-full bg-gray-100 border-gray-200 border-[1px] text-gray-500 cursor-pointer p-4 items-center text-center max-w-4xl m-auto my-3 rounded-lg flex flex-row items-center justify-center gap-3"
          >
            <PlusCircleIcon width={24} />
            Add term
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container max-w-5xl m-auto flex flex-row items-center p-3 gap-4">
          <div className="flex-1 text-sm text-sky-700">
            <Link href="https://wamtogpa.lpdpunimelb.com/help">
              See how GPA is calculated
            </Link>
          </div>
          {gpa !== undefined && (
            <>
              <div>
                Your GPA is <b>{gpa.toFixed(2)}</b>
              </div>
              <Link href="/pdf">
                <button className="rounded px-3 py-2 text-white bg-sky-900">
                  Save as PDF
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
