import Icon from '@/components/ui/icon';

interface ChipTuningAdminHeaderProps {
  uploadStatus: string;
  uploading: boolean;
  lastImportErrors: string[];
  handleCSVUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownloadErrorReport: () => void;
}

export default function ChipTuningAdminHeader({
  uploadStatus,
  uploading,
  lastImportErrors,
  handleCSVUpload,
  handleDownloadErrorReport
}: ChipTuningAdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Админ-панель чип-тюнинга</h1>
        <p className="text-gray-600 mt-1">Управление данными по моделям BMW</p>
      </div>

      <div className="flex gap-2 items-center">
        {uploadStatus && (
          <div className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
            uploadStatus.startsWith('✅') ? 'bg-green-100 text-green-800' :
            uploadStatus.startsWith('❌') ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {uploadStatus}
          </div>
        )}

        {lastImportErrors.length > 0 && (
          <button
            onClick={handleDownloadErrorReport}
            className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm flex items-center gap-2"
            title="Скачать отчёт об ошибках импорта"
          >
            <Icon name="AlertCircle" className="w-4 h-4" />
            {lastImportErrors.length} ошибок
          </button>
        )}

        <label className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-2 disabled:opacity-50">
          <Icon name={uploading ? "Loader" : "Upload"} className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} />
          {uploading ? 'Загрузка...' : 'Импорт CSV'}
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
