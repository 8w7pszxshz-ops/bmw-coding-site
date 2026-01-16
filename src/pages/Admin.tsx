import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useAdminLogic } from './admin/AdminLogic';
import AdminTable from './admin/AdminTable';
import AdminEditDialog from './admin/AdminEditDialog';

export default function Admin() {
  const {
    records,
    loading,
    editingRecord,
    setEditingRecord,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterSeries,
    setFilterSeries,
    uniqueSeries,
    filteredRecords,
    handleEdit,
    handleSave,
    handleDelete,
    handleAddNew,
    editingCell,
    cellValue,
    setCellValue,
    handleCellClick,
    handleCellSave,
    savedCell
  } = useAdminLogic();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Админ-панель Чип-тюнинга</h1>
          <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
            <Icon name="Plus" className="w-5 h-5 mr-2" />
            Добавить
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-6 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по модели или двигателю..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
          </div>
          <select
            value={filterSeries}
            onChange={(e) => setFilterSeries(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="all">Все серии</option>
            {uniqueSeries.map(series => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>
        </div>

        <AdminTable
          records={filteredRecords}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingCell={editingCell}
          cellValue={cellValue}
          onCellValueChange={setCellValue}
          onCellClick={handleCellClick}
          onCellSave={handleCellSave}
          savedCell={savedCell}
        />

        <div className="mt-4 text-white/60 text-sm">
          Показано записей: {filteredRecords.length} из {records.length}
        </div>
      </div>

      <AdminEditDialog
        editingRecord={editingRecord}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setEditingRecord(null)}
      />
    </div>
  );
}