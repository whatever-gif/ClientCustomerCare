export const useConfigTable = () => {
  return {
    config: {
      localization: {
        rowsPerPage: "Hiển thị",
        sortByColumnAsc: "Sắp xếp theo thứ tự tăng dần",
        sortByColumnDesc: "Sắp xếp theo thứ tự giảm dần",
        page: "Trang",
        of: "của",
        nextPage: "Trang tiếp theo",
        previousPage: "Trang trước",
        firstPage: "Trang đầu",
        lastPage: "Trang cuối",
        clearSort: "Xóa sắp xếp",
        clearFilter: "Xóa bộ lọc",
        //   filterByColumn: "Lọc theo",
        filterByColumn: "Lọc theo cột này",
        hideColumn: "Ẩn cột này",
        showAllColumns: "Hiển thị tất cả các cột",
        showHideSearch: "Ẩn/Hiện tìm kiếm nhanh",
        search: "Tìm kiếm...",
        showHideFilters: "Ẩn/Hiện bộ lọc",
        showHideColumns: "Ẩn/Hiện cột",
        hideAll: "Ẩn tất cả",
        showAll: "Hiện tất cả",
        toggleDensity: "Thay đổi tỷ lệ",
        toggleFullScreen: "Toàn màn hình",
        clearSearch: "Xóa nội dung tìm kiếm",
      },
      enableGlobalFilter: false,
      enableFilters: false,
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      // muiTableContainerProps: {
      //   sx: {
      //     maxHeight: 400,
      //     height: 400,
      //   },
      // },
      muiPaginationProps: {
        rowsPerPageOptions: [100, 200, 500, 1000, 2000, 5000, 100000],
        showRowsPerPage: true,
      },
      displayColumnDefOptions: {
        "mrt-row-actions": {
          size: 80, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
          grow: false,
        },
      },

      enableDensityToggle: false,
      enableEditing: false,
    },
  };
};
