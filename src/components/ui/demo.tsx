import { ProjectCards, Project } from "./animated-project-cards"

export function Demo() {
  const projects: Project[] = [
    {
      id: "1",
      title: "Web Development Project",
      pricePerHour: "$10/hour",
      status: "Paid",
      categories: ["Remote", "Part-time"],
      description:
        "This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.",
      location: "Germany",
      timeAgo: "2h ago",
      logoColor: "bg-orange-500",
      logoIcon: "🔄",
    },
    {
      id: "2",
      title: "Copyright Project",
      pricePerHour: "$10/hour",
      status: "Not Paid",
      categories: ["Remote"],
      description: "Legal documentation and copyright management for digital assets and intellectual property.",
      location: "United States",
      timeAgo: "5h ago",
      logoColor: "bg-gray-700",
      logoIcon: "⬇",
    },
    {
      id: "3",
      title: "Web Design Project",
      pricePerHour: "$10/hour",
      status: "Paid",
      categories: ["Remote", "Full-time"],
      description: "Complete UI/UX design overhaul for modern web application with responsive design principles.",
      location: "Canada",
      timeAgo: "1d ago",
      logoColor: "bg-blue-500",
      logoIcon: "✓",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#E8EAEC]">
      <div className="mt-10">
        <ProjectCards projects={projects} />
      </div>
    </div>
  )
}

export default Demo
