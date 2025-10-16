import File from "./file";

const test = [
  {
    type: "audio",
    name: "example.audio",
    createDate: "21-32-2005",
    size: "21tb",
  },
  {
    type: "video",
    name: "example.video",
    createDate: "21-32-2015",
    size: "21b",
  },
  {
    type: "folder",
    name: "Exaple of biiiiig folder label for hz sol",
    createDate: "21-32-2045",
    size: "21gb",
  },
  {
    type: "file",
    name: "example text .txt",
    createDate: "21-32-2025",
    size: "211mb",
  },
  {
    type: "Excel",
    name: "example.dox",
    createDate: "21-32-2005",
    size: "212mb",
  },
  {
    type: "audio",
    name: "example.audio",
    createDate: "21-32-2005",
    size: "21tb",
  },
  {
    type: "video",
    name: "example.video",
    createDate: "21-32-2015",
    size: "21b",
  },
  {
    type: "folder",
    name: "Exaple of biiiiig folder label for hz sol",
    createDate: "21-32-2045",
    size: "21gb",
  },
  {
    type: "file",
    name: "example text .txt",
    createDate: "21-32-2025",
    size: "211mb",
  },
  {
    type: "Excel",
    name: "example.dox",
    createDate: "21-32-2005",
    size: "212mb",
  },
  {
    type: "audio",
    name: "example.audio",
    createDate: "21-32-2005",
    size: "21tb",
  },
  {
    type: "video",
    name: "example.video",
    createDate: "21-32-2015",
    size: "21b",
  },
  {
    type: "folder",
    name: "Exaple of biiiiig folder label for hz sol",
    createDate: "21-32-2045",
    size: "21gb",
  },
  {
    type: "file",
    name: "example text .txt",
    createDate: "21-32-2025",
    size: "211mb",
  },
  {
    type: "Excel",
    name: "example.dox",
    createDate: "21-32-2005",
    size: "212mb",
  },
];

export default function FilesDashboard() {
  return (
    <section className=" flex flex-col h-[90%] bg-white overflow-y-auto rounded-xl">
      {test.map((el) => {
        return (
          <File
            key={el.name}
            type={el.type}
            name={el.name}
            createDate={el.createDate}
            size={el.size}
          ></File>
        );
      })}
    </section>
  );
}
