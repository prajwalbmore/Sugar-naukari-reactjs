import React from "react";
import Button from "../../../components/ui/Button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "../../../components/ui/Modal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ResumeUploadCard from "./ResumeUploadCard";

const Card = ({ title, children, onClick = () => {} }) => (
  <section className="rounded-xl border border-gray-200 bg-gray-200  shadow-sm py-3">
    <header className="px-5 pt-3 flex justify-between">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <Button className="bg-dark rounded-full p-2" onClick={onClick}>
        <PencilSquareIcon className="text-white h-5 w-5" />
      </Button>
    </header>
    <div className="px-5 py-2">{children}</div>
  </section>
);

const ResumeFile = ({ name, size }) => (
  <div className="flex items-center gap-3 rounded-lg border bg-white border-gray-200 px-4 py-3">
    <div className="grid place-items-center h-10 w-10 rounded bg-red-50 text-red-600 font-bold">
      PDF
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-800">{name}</p>
      <p className="text-xs text-gray-500">{size}</p>
    </div>
  </div>
);

const EducationItem = ({ school, location, degree, major, years }) => (
  <div className="py-4  p-3">
    <p className="text-sm font-semibold text-gray-800">
      {school}, {location}
    </p>
    <p className="text-xs text-gray-500">
      {degree}, {major}
    </p>
    <p className="text-xs text-gray-400">{years}</p>
  </div>
);

export default function ProfileOverview({ setActive }) {
  const [isOpen, { open, close }] = useDisclosure(false);
  return (
    <>
      <main className="w-full space-y-6 p-4">
        {/* Personal Information */}
        <Card title="Personal Information" onClick={() => setActive(2)}>
          <div className="space-y-1 bg-white rounded-xl p-3">
            <p className="text-md font-medium text-gray-900">Jake Gyllenhaal</p>
            <p className="text-md text-gray-600">jake.gyllenhaal@98gmail.com</p>
            <p className="text-md text-gray-600">+44 1245 572 1356</p>
            <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
              Paris, France
            </span>
          </div>
        </Card>

        {/* Resume */}
        <Card title="Resume" onClick={open}>
          <ResumeFile name="Rifat_CV_UX Designer" size="287 KB" />
        </Card>

        {/* Education */}
        <Card title="Education" onClick={() => setActive(3)}>
          <div className="rounded-xl bg-white">
            <EducationItem
              school="Harvard University"
              location="Toronto"
              degree="Postgraduate degree"
              major="Applied Psychology"
              years="2010 - 2012"
            />
            <div className="h-px bg-gray-200" />
            <EducationItem
              school="Harvard University"
              location="Toronto"
              degree="Bachelor Degree"
              major="Visual Communication"
              years="2005 - 2009"
            />
          </div>
        </Card>
      </main>
      <Modal open={isOpen} onClose={close} title="Add Resume or CV" size="lg">
        <ResumeUploadCard />
      </Modal>
    </>
  );
}
