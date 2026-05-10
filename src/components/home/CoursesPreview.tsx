import Link from "next/link";

interface Course {
  title: string;
  classLevel: string;
  fee: string;
  subjects: string[];
}

const courses: Course[] = [
  {
    title: "Science Group (Pre-Medical)",
    classLevel: "Class 9 - 12",
    fee: "Rs. 3,500/month",
    subjects: ["Biology", "Chemistry", "Physics", "English"],
  },
  {
    title: "Science Group (Pre-Engineering)",
    classLevel: "Class 9 - 12",
    fee: "Rs. 3,500/month",
    subjects: ["Mathematics", "Chemistry", "Physics", "English"],
  },
  {
    title: "Arts / Humanities",
    classLevel: "Class 9 - 12",
    fee: "Rs. 2,500/month",
    subjects: ["Economics", "Civics", "Urdu", "Islamiyat"],
  },
];

export default function CoursesPreview() {
  return (
    <section className="bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-dark sm:text-4xl">Our Courses</h2>
          <p className="mt-3 text-text-muted">
            Comprehensive programs designed for academic excellence
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold text-text-dark">{course.title}</h3>
              <p className="mb-1 text-sm font-medium text-primary">{course.classLevel}</p>
              <p className="mb-4 text-lg font-bold text-secondary">{course.fee}</p>
              <div className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Subjects
                </p>
                <ul className="space-y-1">
                  {course.subjects.map((subject) => (
                    <li key={subject} className="flex items-center gap-2 text-sm text-text-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/admission"
                className="inline-block w-full rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
