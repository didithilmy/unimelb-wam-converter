import SubjectTable from "@/components/SubjectTable";

export default function Home() {
  return (
    <div className="h-screen flex flex-col divide-y">
      <div className="flex-1 overflow-auto">
        <div className="container m-auto max-w-4xl">
          <div className="py-5 px-3">
            <h1 className="text-xl font-bold font-heading">UoM WAM to GPA</h1>
          </div>
        </div>
        <SubjectTable />
      </div>
      <div className="bg-gray-100">
        <div className="container max-w-5xl m-auto flex flex-row items-center p-3 gap-4">
          <div className="flex-1 text-sm text-sky-700">
            See how GPA is calculated
          </div>
          <div>
            Your GPA is <b>3.73</b>
          </div>
          <button className="rounded px-3 py-2 text-white bg-sky-900">
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
