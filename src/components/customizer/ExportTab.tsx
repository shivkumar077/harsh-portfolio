import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getAllStoredVideos } from '../../utils/videoStorage';
import { 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Upload,
  Film,
  Video,
  RotateCcw
} from 'lucide-react';

export const ExportTab: React.FC = () => {
  const { 
    generateConfigFileContent, 
    exportJsonConfig, 
    importJsonConfig, 
    uploadedImages,
    resetToDefaults
  } = usePortfolio();

  const [copied, setCopied] = useState(false);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [storedVideos, setStoredVideos] = useState<{ id: string; name: string; blob: Blob; size: number }[]>([]);

  useEffect(() => {
    getAllStoredVideos().then(setStoredVideos).catch(() => {});
  }, []);

  const handleDownloadVideo = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTs = () => {
    const content = generateConfigFileContent();
    const blob = new Blob([content], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = async () => {
    const content = generateConfigFileContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultStr = event.target?.result as string;
      const res = importJsonConfig(resultStr);
      if (res.success) {
        setImportStatus('Configuration imported successfully!');
      } else {
        setImportStatus(`Import failed: ${res.error}`);
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
          <Download className="w-5 h-5 text-[#E63E26]" />
          <span>Save, Export & Apply Configuration</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-1">
          Export your customized portfolio data to make it permanent for production builds and deployment.
        </p>
      </div>

      {/* Critical Deployment Guidance Banner */}
      <div className="p-5 sm:p-6 bg-[#0D0D0D] text-white border-2 border-[#E63E26] rounded-2xl shadow-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E63E26] text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#E63E26] uppercase tracking-wider block">
              CRITICAL FOR VERCEL & NETLIFY DEPLOYMENT
            </span>
            <h3 className="text-sm sm:text-base font-display font-black uppercase text-white tracking-wide">
              Why Your Live Site Needs Your Codebase Updated
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
          When you deploy to Vercel or Netlify, they build your portfolio from the <strong>files in your project folder</strong> (specifically <code>src/data/portfolioData.ts</code>), NOT from your private browser cache.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-sans">
          <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
            <span className="font-mono font-bold text-[#E63E26] block uppercase text-[11px]">
              Option A: Auto-Sync (Recommended)
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              When running locally (<code>npm run dev</code>), clicking <strong>"Save Changes"</strong> in the top bar automatically writes your changes straight into <code>src/data/portfolioData.ts</code> on your computer! Just commit & push to GitHub (or redeploy) and your live site updates instantly.
            </p>
          </div>

          <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
            <span className="font-mono font-bold text-emerald-400 block uppercase text-[11px]">
              Option B: 1-Click File Replacement
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Click <strong>"Download portfolioData.ts"</strong> below. Move that file into your project folder replacing <code>src/data/portfolioData.ts</code>. Then push to GitHub or drag-and-drop your folder onto Netlify!
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Export Config File */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#E63E26] text-white flex items-center justify-center font-mono text-xs font-bold">
            1
          </span>
          <h3 className="font-display font-black text-base text-[#0D0D0D] uppercase">
            Export Your Configuration
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans">
          Click below to download your generated <code>portfolioData.ts</code> file. Then simply replace <code>src/data/portfolioData.ts</code> in your project folder with the downloaded file.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadTs}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E63E26] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download portfolioData.ts</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code to Clipboard'}</span>
          </button>

          <button
            type="button"
            onClick={exportJsonConfig}
            className="inline-flex items-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#0D0D0D] text-xs font-mono font-bold uppercase rounded-xl transition-colors border border-neutral-300"
          >
            <FileCode className="w-4 h-4 text-neutral-600" />
            <span>Export Backup (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => jsonFileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#0D0D0D] text-xs font-mono font-bold uppercase rounded-xl transition-colors border border-neutral-300"
          >
            <Upload className="w-4 h-4 text-neutral-600" />
            <span>Import JSON</span>
          </button>
          <input
            ref={jsonFileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJsonFile}
            className="hidden"
          />
        </div>

        {importStatus && (
          <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-xl text-xs font-mono text-neutral-800">
            {importStatus}
          </div>
        )}
      </div>

      {/* Step 2: Save Uploaded Images */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#E63E26] text-white flex items-center justify-center font-mono text-xs font-bold">
            2
          </span>
          <h3 className="font-display font-black text-base text-[#0D0D0D] uppercase">
            Save Uploaded Images to <code>public/</code>
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans">
          For security, web browsers cannot directly write files into your computer's folders. If you uploaded a profile photo or thumbnails, click <strong>Download</strong> on each item below and move it into your project’s <code>public/</code> directory:
        </p>

        {uploadedImages.length === 0 ? (
          <div className="p-4 bg-neutral-50 rounded-xl text-xs font-mono text-neutral-500 border border-neutral-200">
            No local images currently uploaded. Using default template images or remote URLs.
          </div>
        ) : (
          <div className="space-y-2">
            {uploadedImages.map((img) => (
              <div
                key={img.id}
                className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-10 h-10 object-cover rounded-lg border border-neutral-300"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0D0D0D] block">
                      {img.name}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      Target: <code>public/{img.name}</code>
                    </span>
                  </div>
                </div>

                <a
                  href={img.dataUrl}
                  download={img.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        )}
        {/* Uploaded Videos from Device */}
        {storedVideos.length > 0 && (
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#0D0D0D] uppercase flex items-center gap-2">
              <Video className="w-4 h-4 text-[#E63E26]" />
              <span>Uploaded Video Files from Device ({storedVideos.length})</span>
            </h4>
            <div className="space-y-2">
              {storedVideos.map((vid) => (
                <div
                  key={vid.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-xl"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#0D0D0D] text-white flex items-center justify-center shrink-0">
                      <Film className="w-4 h-4 text-[#E63E26]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono font-bold text-[#0D0D0D] block truncate">
                        {vid.name}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500">
                        Size: {(vid.size / (1024 * 1024)).toFixed(1)} MB • Target: <code>public/{vid.name}</code>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadVideo(vid.blob, vid.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold rounded-lg transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Run & Deploy */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#E63E26] text-white flex items-center justify-center font-mono text-xs font-bold">
            3
          </span>
          <h3 className="font-display font-black text-base text-[#0D0D0D] uppercase">
            Test Locally & Deploy Free
          </h3>
        </div>

        <div className="space-y-3 text-xs sm:text-sm font-sans text-neutral-700">
          <p>
            Once you’ve replaced <code>src/data/portfolioData.ts</code>, test the production build in your terminal:
          </p>

          <div className="p-3 bg-neutral-900 rounded-xl font-mono text-xs text-neutral-100 space-y-1">
            <p className="text-neutral-400"># Verify type checking and production bundling</p>
            <p className="text-emerald-400 font-bold">npm run build</p>
            <p className="text-neutral-400 pt-1"># Preview production build locally</p>
            <p className="text-emerald-400 font-bold">npm run preview</p>
          </div>

          <p className="pt-2">
            Ready to go live? You can deploy this template in 60 seconds for free to <strong>Vercel</strong> or <strong>Netlify</strong>:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-xs font-sans">
            <li>Push your project folder to your GitHub account.</li>
            <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-[#E63E26] underline font-bold">vercel.com</a>, log in with GitHub, and click <strong>Add New Project</strong>.</li>
            <li>Select your repository and click <strong>Deploy</strong>. Vercel builds and hosts your portfolio with a free SSL certificate!</li>
          </ol>
        </div>
      </div>

      {/* Step 4: Selling Checklist & Clean Slate */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            4
          </span>
          <h3 className="font-display font-black text-base text-[#0D0D0D] uppercase">
            Selling Checklist & Reset For Client Delivery
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-sans text-neutral-600">
          When packaging this template to sell to your video editing clients or customers:
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-xs font-sans text-neutral-700">
          <li><strong>Clean slate:</strong> Click the button below to purge all browser test data, uploaded videos, and test drafts, resetting the portfolio back to clean Alex Rivera template defaults.</li>
          <li><strong>ZIP & Share:</strong> Share the clean project folder (or GitHub repository) with your customer. They just run <code>npm install</code> and <code>npm run dev</code>!</li>
          <li><strong>Client Guide included:</strong> A full step-by-step guide is included in <code>CUSTOMIZATION.md</code> and <code>QUICK-START.md</code> for your customer.</li>
        </ul>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all portfolio data to clean template defaults for selling? All local browser data and uploaded media will be cleared.')) {
                resetToDefaults();
                alert('Portfolio completely reset to clean template defaults! Ready to sell to customers.');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Data To Clean Template (For Selling)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
