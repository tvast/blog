# Results Table Pagination

## Overview

The results table now supports pagination to efficiently handle large result sets without performance degradation.

## Features

### Pagination Options
- **Default rows per page**: 25
- **Available options**: 10, 25, 50, 100 rows per page
- **User selectable**: Bottom right of table

### Sorting
- All numeric columns sortable: name, kind, size
- Click column header to sort ascending/descending
- Sort state persists during filtering

### Filtering
- Filter input searches across all visible columns
- **Filtering + Pagination work together**:
  - Filter narrows the result set
  - Pagination applies to filtered results
  - Page resets when filter changes (user-friendly)

## How It Works

```javascript
// Pagination state
const pagination = ref({
  sortBy: 'name',        // Sort by this field
  descending: false,     // Sort direction
  page: 1,               // Current page
  rowsPerPage: 25        // Rows shown per page
})
```

The Quasar q-table handles:
- Filtering on search term
- Pagination of filtered results
- Sorting by any column
- Calculating total filtered rows

## Performance Impact

**Before Pagination**:
- 10,000 results: All rendered at once
- Slow scrolling, memory intensive
- Filtering had to search 10,000 items

**After Pagination**:
- 10,000 results: Only 25 visible at a time
- Smooth interactions, minimal memory
- Filtering applies to full set, shows page-sized subset

## User Experience

1. User starts scan → results appear page by page
2. Filter narrows results (e.g., "*.txt" → 500 matches)
3. Pagination shows first 25 filtered matches
4. User can sort by name/size/type
5. User navigates through pages as needed
6. Change rows-per-page if more/fewer desired

## Integration with Scan Control

No changes needed to `useScanControl.js`:
- Results accumulate in `matches` array as before
- Pagination handles display automatically
- Clearing matches works normally

## Accessibility

- Pagination controls keyboard accessible
- Sort indicators clear
- Page indicators show current/total
- Filter input labeled

## Future Enhancements

- [ ] Export current page/all results to CSV
- [ ] Remember user's preferred rows-per-page
- [ ] Virtual scrolling option for massive datasets (100k+)
- [ ] Column visibility toggle
- [ ] Group results by type (content vs filename)
- [ ] Batch recovery actions on current page/all

## Testing Pagination

```javascript
describe('ResultsTable', () => {
  it('paginates filtered results correctly', () => {
    // 100 matches
    // Filter to 30 results
    // Pagination shows 30 across 2 pages (25+5)
  })
  
  it('maintains sort when changing pages', () => {
    // Sort by size descending
    // Navigate through pages
    // All pages respect sort order
  })
  
  it('resets to page 1 on filter change', () => {
    // On page 3
    // Change filter
    // Back to page 1
  })
})
```

## Quasar Documentation

For advanced customization, see:
- [Quasar QTable](https://quasar.dev/vue-components/table)
- [Pagination options](https://quasar.dev/vue-components/table#pagination)
- [Filtering](https://quasar.dev/vue-components/table#filter)
