"use client";
import { useState } from "react";
import { Send, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const studentList = [
  { no: "1", studentName: "Nibir Biswas", status: "Absent" },
  { no: "2", studentName: "Shalini Mukherjee", status: "Absent" },
  { no: "3", studentName: "Deep Mukherjee", status: "Absent" },
  { no: "4", studentName: "Chayan Jana", status: "Absent" },
  { no: "5", studentName: "Ayan Makar", status: "Absent" },
  { no: "6", studentName: "Snahashis Kanrar", status: "Absent" },
  { no: "7", studentName: "Anuskha Maity", status: "Absent" },
  { no: "8", studentName: "Shuvam Roy", status: "Absent" },
  { no: "9", studentName: "Kaustav Lahiri", status: "Absent" },
  { no: "10", studentName: "Koustav Das", status: "Absent" },
  { no: "11", studentName: "Pritam Roy", status: "Absent" },
  { no: "12", studentName: "Kripakana Gonrah", status: "Absent" },
  { no: "13", studentName: "Shuvrajit Das", status: "Absent" },
  { no: "14", studentName: "Sayan Dey", status: "Absent" },
  { no: "15", studentName: "Sweety Nag", status: "Absent" },
  { no: "16", studentName: "Diksha Sao", status: "Absent" },
  { no: "17", studentName: "Pankaj Kumar Gupta", status: "Absent" },
  { no: "18", studentName: "Arijit Biswas", status: "Absent" },
  { no: "19", studentName: "Surajit Dey", status: "Absent" },
  { no: "20", studentName: "Manik Patra", status: "Absent" },
  { no: "21", studentName: "Shah Alam", status: "Absent" },
];

const Home = () => {
  const [students, setStudents] = useState(studentList);

  const toggleAttendance = (no: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.no === no
          ? {
              ...student,
              status: student.status === "Absent" ? "Present" : "Absent",
            }
          : student
      )
    );
  };

  const copyPresentList = () => {
    const presentStudents = students
      .filter((s) => s.status === "Present")
      .map((s, index) => `${index + 1}. ${s.studentName}`)
      .join("\n");

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "/");

    navigator.clipboard.writeText(
      "*Artificial Intelligence*\n" +
        `Date: ${formattedDate}\n\n` +
        presentStudents || "No students present"
    );
    toast.success("Present students copied to clipboard!");
  };

  //need a little change in subject

  const sendToWhatsapp = () => {
    const presentStudents = students
      .filter((s) => s.status === "Present")
      .map((s, index) => `${index + 1}. ${s.studentName}`)
      .join("\n");

    const today = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY

    const message =
      "*Artificial Intelligence*\n" + `Date: ${today}\n\n` + presentStudents ||
      "No students present";

    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Sr. No</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.no}
              onClick={() => toggleAttendance(student.no)}
              className={`cursor-pointer ${
                student.status === "Present"
                  ? "bg-green-100 dark:bg-green-900"
                  : ""
              }`}
            >
              <TableCell className="font-medium">{student.no}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              <TableCell className="text-right">{student.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col justify-center items-center mt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mt-4">
          Student Attendance List
        </h4>
        <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
          {students
            .filter((s) => s.status === "Present")
            .map((s) => (
              <li key={s.no}>{s.studentName}</li>
            ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button onClick={copyPresentList}>
            <Copy /> Copy List
          </Button>
          <Button size="icon" aria-label="Submit" onClick={sendToWhatsapp}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
