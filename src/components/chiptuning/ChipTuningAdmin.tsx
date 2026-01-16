import { useChipTuningAdmin } from './ChipTuningAdminLogic';
import ChipTuningAuthScreen from './ChipTuningAuthScreen';
import ChipTuningAdminHeader from './ChipTuningAdminHeader';
import ChipTuningAdminFilters from './ChipTuningAdminFilters';
import ChipTuningDataTable from './ChipTuningDataTable';

export default function ChipTuningAdmin() {
  const {
    isAuthenticated,
    password,
    setPassword,
    authError,
    records,
    loading,
    editingId,
    editForm,
    setEditForm,
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    seriesFilter,
    setSeriesFilter,
    bodyTypeFilter,
    setBodyTypeFilter,
    engineTypeFilter,
    setEngineTypeFilter,
    uploadStatus,
    uploading,
    lastImportErrors,
    handleAuth,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleCSVUpload,
    handleDownloadErrorReport
  } = useChipTuningAdmin();

  if (!isAuthenticated) {
    return (
      <ChipTuningAuthScreen
        password={password}
        setPassword={setPassword}
        authError={authError}
        handleAuth={handleAuth}
      />
    );
  }

  const uniqueSeries = Array.from(new Set(records.map(r => r.series))).sort();
  const uniqueBodyTypes = Array.from(new Set(records.map(r => r.body_type))).sort();

  const filteredRecords = records.filter(record => {
    const matchesText = filter === '' || 
      record.model_name.toLowerCase().includes(filter.toLowerCase()) ||
      record.engine_code.toLowerCase().includes(filter.toLowerCase()) ||
      record.series.toLowerCase().includes(filter.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'visible' && record.status === 1) ||
      (statusFilter === 'hidden' && record.status === 0);

    const matchesSeries = seriesFilter === 'all' || record.series === seriesFilter;
    const matchesBodyType = bodyTypeFilter === 'all' || record.body_type === bodyTypeFilter;

    const matchesEngineType = 
      engineTypeFilter === 'all' ||
      (engineTypeFilter === 'petrol' && !record.engine_code.toLowerCase().includes('d')) ||
      (engineTypeFilter === 'diesel' && record.engine_code.toLowerCase().includes('d'));

    return matchesText && matchesStatus && matchesSeries && matchesBodyType && matchesEngineType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <ChipTuningAdminHeader
          uploadStatus={uploadStatus}
          uploading={uploading}
          lastImportErrors={lastImportErrors}
          handleCSVUpload={handleCSVUpload}
          handleDownloadErrorReport={handleDownloadErrorReport}
        />

        <ChipTuningAdminFilters
          filter={filter}
          setFilter={setFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          seriesFilter={seriesFilter}
          setSeriesFilter={setSeriesFilter}
          bodyTypeFilter={bodyTypeFilter}
          setBodyTypeFilter={setBodyTypeFilter}
          engineTypeFilter={engineTypeFilter}
          setEngineTypeFilter={setEngineTypeFilter}
          uniqueSeries={uniqueSeries}
          uniqueBodyTypes={uniqueBodyTypes}
        />

        <ChipTuningDataTable
          records={filteredRecords}
          loading={loading}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />

        <div className="mt-4 text-sm text-gray-500 text-center">
          Показано: {filteredRecords.length} из {records.length} записей
        </div>
      </div>
    </div>
  );
}
