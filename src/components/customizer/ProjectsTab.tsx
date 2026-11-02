import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types/portfolio';
import { ProjectEditModal } from './ProjectEditModal';
import { getGoogleDriveThumbnail } from '../../utils/videoUtils';
import { 
  Film, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Star 
} from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { data, updateProject, addProject, removeProject, reorderProjects } = usePortfolio();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<{ index: number; title: string } | null>(null);

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingIndex(-1); // special flag for new project
  };

  const handleSaveModal = (savedProject: Project) => {
    if (editingIndex === -1) {
      addProject(savedProject);
    } else if (editingIndex !== null) {
      updateProject(editingIndex, savedProject);
    }
    setEditingIndex(null);
    setIsAddingNew(false);
  };

  const confirmDelete = () => {
    if (projectToDelete !== null) {
      removeProject(projectToDelete.index);
      setProjectToDelete(null);
    }
  };

  const emptyNewProject: Project = {
    id: `new-project-${data.projects.length + 1}`,
    slug: `project-${data.projects.length + 1}`,
    number: String(data.projects.length + 1).padStart(2, '0'),
    title: '',
    category: 'SHORT-FORM',
    year: new Date().getFullYear().toString(),
    shortDescription: '',
    fullDescription: '',
    role: ['Lead Video Editor'],
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    videoSourceType: 'google-drive',
    videoUrl: '',
    googleDriveUrl: '',
    previewVideoUrl: '',
    posterImage: '',
    featured: true,
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Tab Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#E63E26]" />
            <span>Video Project Gallery ({data.projects.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-0.5">
            Manage your video portfolio deliverables. Reorder, edit details, attach Google Drive/YouTube/Vimeo links, and feature your best work.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {data.projects.length === 0 ? (
          <div className="text-center py-12 px-6 bg-white border border-[#0D0D0D]/10 rounded-2xl space-y-3">
            <Film className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="font-display font-black text-lg text-[#0D0D0D]">No projects in gallery</h3>
            <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
              Click the "Add Project" button above to add your first commercial or short-form video edit.
            </p>
          </div>
        ) : (
          data.projects.map((proj, idx) => {
            const thumb = proj.posterImage || getGoogleDriveThumbnail(proj.googleDriveUrl || proj.videoUrl);
            const isFirst = idx === 0;
            const isLast = idx === data.projects.length - 1;

  return (
              <div
                key={proj.id || idx}
                className="group p-4 bg-white border border-[#0D0D0D]/10 hover:border-[#0D0D0D]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md"
              >
                {/* Left: Thumbnail & Project Meta */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-black/10 flex items-center justify-center">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Film className="w-6 h-6 text-neutral-600" />
                    )}
                    {proj.featured && (
                      <span className="absolute top-1 left-1 p-0.5 rounded bg-[#E63E26] text-white">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </span>
                    )}
                  </div>

                  {/* Title & Category Info */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 uppercase">
                        {proj.category}
                      </span>
                      {proj.videoSourceType === 'local' && (proj.videoUrl?.startsWith('blob:') || proj.previewVideoUrl?.startsWith('blob:')) && (
                        <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                          Device Video
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-neutral-400">
                        {proj.year}
                      </span>
                    </div>
                    <h4 className="font-display font-black text-sm sm:text-base text-[#0D0D0D] truncate">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans truncate max-w-md">
                      {proj.shortDescription || 'No description provided'}
                    </p>
                  </div>
                </div>

                {/* Right: Actions (Move up/down, Edit, Delete) */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {/* Reorder Buttons */}
                  <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 mr-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => reorderProjects(idx, idx - 1)}
                      className={`p-1.5 rounded text-neutral-700 hover:text-black hover:bg-white transition-colors ${
                        isFirst ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => reorderProjects(idx, idx + 1)}
                      className={`p-1.5 rounded text-neutral-700 hover:text-black hover:bg-white transition-colors ${
                        isLast ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => setEditingIndex(idx)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-[#0D0D0D] hover:text-white text-[#0D0D0D] text-xs font-mono font-bold uppercase rounded-lg transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setProjectToDelete({ index: idx, title: proj.title })}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit / Add Modal */}
      {(editingIndex !== null || isAddingNew) && (
        <ProjectEditModal
          project={
            editingIndex === -1 || editingIndex === null
              ? emptyNewProject
              : data.projects[editingIndex]
          }
          onSave={handleSaveModal}
          onClose={() => {
            setEditingIndex(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {/* Confirmation Delete Dialog */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 space-y-4 shadow-2xl border border-neutral-200">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-display font-black text-lg text-[#0D0D0D]">
                Delete Project?
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 font-sans">
              Are you sure you want to delete <strong>"{projectToDelete.title}"</strong>? You can restore it anytime by clicking "Reset to Defaults" if you haven't saved.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-xs font-mono font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
