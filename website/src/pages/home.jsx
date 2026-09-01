import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
            <header className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-2xl shadow-lg shadow-indigo-500/25">n</div>
                    <span className="font-bold text-xl text-white tracking-tight">
                        Nuvsha <span className="ml-2 text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full align-middle">v1</span>
                    </span>
                </div>
                <div className="text-sm text-slate-400 text-center md:text-right max-w-xl">
                    <p>
                        Created by <strong className="text-slate-200">Naveen Galennaver</strong> — Software developer, ML enthusiast, and BCA student from Hubli, India.<br className="hidden md:block" />
                        Creator of <a href="https://codinginkannada.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Coding in Kannada</a>.
                    </p>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-slate-950 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="flex flex-col items-center text-center max-w-3xl z-10">
                    <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-6xl shadow-2xl shadow-indigo-500/25 mb-8">n</div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight leading-tight">
                        The Nuvsha Programming Language
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        A modern, fast, and elegant language designed for developers who want to build the future.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link 
                            to="/docs/introduction/what-is-nuvsha" 
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                        >
                            Learn Nuvsha
                        </Link>
                        <a 
                            href="https://github.com" 
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 hover:border-slate-600"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full z-10 px-4">
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                        <h3 className="text-xl font-semibold text-white mb-3">Simple Syntax</h3>
                        <p className="text-slate-400 leading-relaxed">Clean and intuitive syntax that feels natural to read and write.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                        <h3 className="text-xl font-semibold text-white mb-3">Reactive by Default</h3>
                        <p className="text-slate-400 leading-relaxed">State changes automatically update your UI without manual tracking.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                        <h3 className="text-xl font-semibold text-white mb-3">Built for Speed</h3>
                        <p className="text-slate-400 leading-relaxed">Compiled efficiently for maximum runtime performance.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;