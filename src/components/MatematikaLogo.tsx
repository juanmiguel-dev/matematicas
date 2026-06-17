import React from 'react';
import { Link } from 'react-router-dom';
import { Binary } from 'lucide-react';

interface Props {
  moduleName?: string;
}

export const MatematikaLogo: React.FC<Props> = ({ moduleName }) => {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
        <Binary className="w-5 h-5 text-white" />
      </div>
      {moduleName ? (
        <div className="flex flex-col justify-center">
          <h1 className="text-base font-bold text-white leading-tight">
            MATEMATIKAS
          </h1>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
            {moduleName}
          </span>
        </div>
      ) : (
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          MATEMATIKAS
        </span>
      )}
    </Link>
  );
};
