import LayoutAcademician from '../../components/LayoutAcademician';
import StudentList from '../../components/StudentList';
import { students } from '../../lib/mockData';

export default function StudentsPage() {
  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-sm text-slate-500 mt-1">Student readiness overview and assessment status</p>
        </div>
        <StudentList students={students} />
      </div>
    </LayoutAcademician>
  );
}
