import { useState } from 'react';
import { Upload, FileText, Zap, Target, TrendingUp, AlertCircle, Shield, CheckCircle, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { analyzeResume, extractTextFromFile, analyzeATS } from './services/aiService';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingATS, setIsAnalyzingATS] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('match');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setError('');
      
      try {
        const text = await extractTextFromFile(file);
        setResumeText(text);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide resume text and job description');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysis(result);
      setActiveTab('match');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleATSAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide resume text and job description');
      return;
    }

    setIsAnalyzingATS(true);
    setError('');
    
    try {
      const result = await analyzeATS(resumeText, jobDescription);
      setAtsAnalysis(result);
      setActiveTab('ats');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzingATS(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">
            <span className="text-red-600">BlackBox</span>
            <span className="text-white"> Recruiter</span>
          </h1>
          <p className="text-gray-400 mt-2">AI-Powered Resume Analysis & ATS Optimization</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-600/40 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="bg-gray-900/50 backdrop-blur border border-red-900/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="text-red-600" size={24} />
                <h2 className="text-2xl font-bold text-white">Upload Resume</h2>
              </div>
              
              <div 
                className="border-2 border-dashed border-red-900/40 rounded-lg p-8 text-center cursor-pointer hover:border-red-600 transition"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-300 mb-2">
                  {resumeFile ? resumeFile.name : 'Click to upload'}
                </p>
                <p className="text-gray-500 text-sm">TXT files recommended</p>
              </div>
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                accept=".txt,.pdf"
                onChange={handleFileUpload}
              />
            </div>

            {/* Manual Text Input */}
            <div className="bg-gray-900/50 backdrop-blur border border-red-900/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-red-600" size={24} />
                <h2 className="text-2xl font-bold text-white">Or Paste Resume Text</h2>
              </div>
              
              <textarea
                className="w-full bg-black/50 border border-red-900/40 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                rows="8"
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            {/* Job Description */}
            <div className="bg-gray-900/50 backdrop-blur border border-red-900/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-red-600" size={24} />
                <h2 className="text-2xl font-bold text-white">Job Description</h2>
              </div>
              
              <textarea
                className="w-full bg-black/50 border border-red-900/40 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                rows="8"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition"
              >
                <Zap size={20} />
                {isAnalyzing ? 'Analyzing...' : 'Match Analysis'}
              </button>

              <button
                onClick={handleATSAnalyze}
                disabled={isAnalyzingATS}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition"
              >
                <Shield size={20} />
                {isAnalyzingATS ? 'Scanning...' : 'ATS Optimizer'}
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Tab Switcher */}
            {(analysis || atsAnalysis) && (
              <div className="flex gap-4 bg-gray-900/50 backdrop-blur border border-red-900/20 rounded-lg p-2">
                <button
                  onClick={() => setActiveTab('match')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
                    activeTab === 'match'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Match Analysis
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
                    activeTab === 'ats'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ATS Optimizer
                </button>
              </div>
            )}

            {/* Match Analysis Results */}
            {activeTab === 'match' && analysis && (
              <>
                <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-600/40 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Match Score</h2>
                    <TrendingUp className="text-red-600" size={24} />
                  </div>
                  <div className="text-center">
                    <div className="text-7xl font-bold text-red-600 mb-2">
                      {analysis.matchScore}%
                    </div>
                    <p className="text-gray-400">Compatibility Rating</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur border border-green-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-500 mb-4">✓ Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900/50 backdrop-blur border border-yellow-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">⚠ Gaps</h3>
                  <ul className="space-y-2">
                    {analysis.gaps.map((gap, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900/50 backdrop-blur border border-blue-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-500 mb-4">💡 Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* ATS Analysis Results */}
            {activeTab === 'ats' && atsAnalysis && (
              <>
                {/* ATS Score */}
                <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-600/40 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">ATS Score</h2>
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <div className="text-center">
                    <div className="text-7xl font-bold text-green-600 mb-2">
                      {atsAnalysis.atsScore}%
                    </div>
                    <p className="text-gray-400">ATS Compatibility</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-900/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Keyword Match</span>
                      <span className="text-green-500 font-bold">{atsAnalysis.keywordMatch}%</span>
                    </div>
                  </div>
                </div>

                {/* Found Keywords */}
                <div className="bg-gray-900/50 backdrop-blur border border-green-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-green-500" size={20} />
                    <h3 className="text-xl font-bold text-green-500">Keywords Found</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {atsAnalysis.foundKeywords.map((keyword, i) => (
                      <span key={i} className="bg-green-900/20 border border-green-600/40 text-green-400 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="bg-gray-900/50 backdrop-blur border border-red-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="text-red-500" size={20} />
                    <h3 className="text-xl font-bold text-red-500">Missing Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {atsAnalysis.missingKeywords.map((keyword, i) => (
                      <span key={i} className="bg-red-900/20 border border-red-600/40 text-red-400 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formatting Issues */}
                <div className="bg-gray-900/50 backdrop-blur border border-yellow-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-yellow-500" size={20} />
                    <h3 className="text-xl font-bold text-yellow-500">Formatting Issues</h3>
                  </div>
                  <ul className="space-y-2">
                    {atsAnalysis.formattingIssues.map((issue, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">⚠</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optimization Tips */}
                <div className="bg-gray-900/50 backdrop-blur border border-blue-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-blue-500" size={20} />
                    <h3 className="text-xl font-bold text-blue-500">Optimization Tips</h3>
                  </div>
                  <ul className="space-y-3">
                    {atsAnalysis.optimizationTips.map((tip, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-1 font-bold">{i + 1}.</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rewrite Suggestions */}
                {atsAnalysis.rewriteSuggestions && atsAnalysis.rewriteSuggestions.length > 0 && (
                  <div className="bg-gray-900/50 backdrop-blur border border-purple-900/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <RefreshCw className="text-purple-500" size={20} />
                      <h3 className="text-xl font-bold text-purple-500">Rewrite Suggestions</h3>
                    </div>
                    <div className="space-y-4">
                      {atsAnalysis.rewriteSuggestions.map((suggestion, i) => (
                        <div key={i} className="border-l-2 border-purple-600/40 pl-4">
                          <div className="mb-2">
                            <span className="text-red-400 text-sm font-semibold">BEFORE:</span>
                            <p className="text-gray-400 text-sm mt-1">{suggestion.original}</p>
                          </div>
                          <div>
                            <span className="text-green-400 text-sm font-semibold">AFTER:</span>
                            <p className="text-gray-200 text-sm mt-1">{suggestion.improved}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!analysis && !atsAnalysis && (
              <div className="bg-gray-900/30 border border-red-900/20 rounded-lg p-12 text-center">
                <Shield className="mx-auto mb-4 text-gray-600" size={64} />
                <p className="text-gray-500 text-lg mb-4">
                  Provide resume and job description, then click:
                </p>
                <div className="flex flex-col gap-2 text-gray-400 text-sm">
                  <p>• <span className="text-red-400">Match Analysis</span> - See compatibility score</p>
                  <p>• <span className="text-green-400">ATS Optimizer</span> - Get shortlisted by ATS</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;