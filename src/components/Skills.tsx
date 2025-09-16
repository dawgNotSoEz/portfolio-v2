import { FaReact, FaPython, FaNodeJs, FaAws, FaSass } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiFlask,
  SiDjango,
  SiMongodb,
  SiMysql,
  SiFirebase,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const frontendSkills = [
  { name: "React", icon: <FaReact size={20} className="text-sky-500" /> },
  { name: "React Native", icon: <TbBrandReactNative size={20} className="text-sky-500" /> },
  { name: "TypeScript", icon: <SiTypescript size={20} className="text-blue-600" /> },
  { name: "Next.js", icon: <SiNextdotjs size={20} className="text-black dark:text-white" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={20} className="text-teal-500" /> },
  { name: "Sass", icon: <FaSass size={20} className="text-pink-500" /> },
];

const backendSkills = [
  { name: "Python", icon: <FaPython size={20} className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs size={20} className="text-green-500" /> },
  { name: "Flask", icon: <SiFlask size={20} className="text-black dark:text-white" /> },
  { name: "Django", icon: <SiDjango size={20} className="text-green-800" /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={20} className="text-indigo-500" /> },
  { name: "MongoDB", icon: <SiMongodb size={20} className="text-green-600" /> },
  { name: "MySQL", icon: <SiMysql size={20} className="text-blue-500" /> },
  { name: "Firebase", icon: <SiFirebase size={20} className="text-yellow-500" /> },
  { name: "AWS", icon: <FaAws size={20} className="text-orange-500" /> },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
    {children}
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <Card className="border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">Frontend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
              {frontendSkills.map((skill) => (
                <Badge key={skill.name}>
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">Backend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
              {backendSkills.map((skill) => (
                <Badge key={skill.name}>
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
