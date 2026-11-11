
import { Upload, FolderOpen, CloudUpload } from 'lucide-react'

function FileDropzone({ dragActive, onBrowse, onDragOver, onDragLeave, onDrop }) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onBrowse}
      className={`min-h-[310px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all ${
        dragActive
          ? 'border-indigo-400 bg-indigo-500/15 scale-[1.02]'
          : 'border-indigo-400/25 bg-indigo-500/[0.03] hover:bg-indigo-500/[0.08] hover:border-indigo-400/60'
      }`}
    >
      <div className="w-20 h-20 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300 mb-6">
        {dragActive ? <CloudUpload size={36} /> : <Upload size={34} />}
      </div>

      <h3 className="text-white text-xl font-bold">
        {dragActive ? 'Drop your file here' : 'Drag and drop your file'}
      </h3>

      <p className="text-slate-500 text-sm mt-3">
        or click here to browse your device
      </p>

      <span className="mt-7 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-colors">
        <FolderOpen size={16} className="inline mr-2" />
        Browse files
      </span>

      <p className="text-slate-600 text-[11px] mt-6">
        Maximum file size: 500 MB
      </p>
    </div>
  )
}

export default FileDropzone
