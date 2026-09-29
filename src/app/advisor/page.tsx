import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { UserCheck, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdvisorPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8 pb-16 min-h-screen bg-slate-950 text-white">
        <div className="container-custom py-12 text-center max-w-2xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold font-heading mb-4">
            Advisor Console
          </h1>
          <p className="text-slate-400 mb-8">
            This protected section is reserved exclusively for verified TMFS Financial Advisors (`ADVISOR` & `ADMIN` roles).
          </p>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-left text-sm text-slate-300 mb-8">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-gold-400" />
              Role Verification Passed
            </h3>
            <p>
              Your session holds the required privileges to view advisor resources and lead management modules.
            </p>
          </div>
          <Link
            href="/portal"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all"
          >
            Back to Customer Portal
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
