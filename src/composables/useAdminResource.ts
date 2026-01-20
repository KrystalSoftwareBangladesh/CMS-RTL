import { ref, computed, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from './useToast'
import type { PaginatedResponse } from '@/services/baseService'

export interface AdminResourceService<T, TInput> {
  list(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<T>>
  create(data: TInput, file?: File): Promise<T>
  update(id: number | string, data: Partial<TInput>, file?: File): Promise<T>
  delete(id: number | string): Promise<void>
}

export interface UseAdminResourceOptions<T, TInput> {
  service: AdminResourceService<T, TInput>
  getItemId: (item: T) => number | string
  getDefaultForm: () => TInput
  itemToForm: (item: T) => TInput
  confirmDeleteKey?: string
}

export function useAdminResource<T, TInput>(options: UseAdminResourceOptions<T, TInput>) {
  const { service, getItemId, getDefaultForm, itemToForm, confirmDeleteKey = 'common.confirmDelete' } = options
  const { t } = useI18n()
  const toast = useToast()

  const items: Ref<T[]> = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const showModal = ref(false)
  const editingItem: Ref<T | null> = ref(null)
  const form: Ref<TInput> = ref(getDefaultForm()) as Ref<TInput>

  const currentPage = ref(1)
  const totalCount = ref(0)
  const hasNextPage = ref(false)
  const hasPrevPage = ref(false)

  const isEditing = computed(() => editingItem.value !== null)
  const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

  async function fetchItems(page = 1) {
    loading.value = true
    try {
      const response = await service.list({ page })
      items.value = response.results
      totalCount.value = response.count
      hasNextPage.value = !!response.next
      hasPrevPage.value = !!response.previous
      currentPage.value = page
    } catch (err) {
      console.error('Failed to fetch items:', err)
      toast.error(t('common.error'))
    } finally {
      loading.value = false
    }
  }

  function goToPage(page: number) {
    fetchItems(page)
  }

  function openCreate() {
    editingItem.value = null
    form.value = getDefaultForm()
    showModal.value = true
  }

  function openEdit(item: T) {
    editingItem.value = item
    form.value = itemToForm(item)
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
    editingItem.value = null
  }

  async function handleSave(file?: File) {
    saving.value = true
    try {
      if (editingItem.value) {
        const id = getItemId(editingItem.value)
        await service.update(id, form.value, file)
      } else {
        await service.create(form.value, file)
      }
      closeModal()
      toast.success(t('common.saved'))
      await fetchItems(currentPage.value)
      return true
    } catch (err) {
      console.error('Failed to save:', err)
      toast.error(t('common.error'))
      return false
    } finally {
      saving.value = false
    }
  }

  async function handleDelete(item: T) {
    if (!confirm(t(confirmDeleteKey))) return false
    try {
      const id = getItemId(item)
      await service.delete(id)
      toast.success(t('common.deleted'))
      const wasLastItemOnPage = items.value.length === 1
      const shouldGoBack = wasLastItemOnPage && currentPage.value > 1
      await fetchItems(shouldGoBack ? currentPage.value - 1 : currentPage.value)
      return true
    } catch (err) {
      console.error('Failed to delete:', err)
      toast.error(t('common.error'))
      return false
    }
  }

  return {
    items,
    loading,
    saving,
    showModal,
    editingItem,
    form,
    currentPage,
    totalCount,
    hasNextPage,
    hasPrevPage,
    isEditing,
    showPagination,
    fetchItems,
    goToPage,
    openCreate,
    openEdit,
    closeModal,
    handleSave,
    handleDelete
  }
}
