const modal = document.getElementById("modal");
    const openBtn = document.querySelector(".btn-add");
    const closeBtn = document.getElementById("closeModal");
    const closeBtn2 = document.getElementById("closeModal2");

    const submitBtn = document.querySelector(".btn-submit");
    const inputName = document.getElementById("subjectName");
    const errorText = document.getElementById("nameError");

    // mở modal
    openBtn.onclick = () => {
        modal.style.display = "flex";
    }

    // đóng modal
    closeBtn.onclick = closeBtn2.onclick = () => {
        modal.style.display = "none";
        resetForm();
    }

    // click ngoài
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetForm();
        }
    }

    // validate
    submitBtn.onclick = () => {
        let value = inputName.value.trim();

        if (value === "") {
            inputName.classList.add("input-error");
            errorText.innerText = "Tên môn học không được để trống";
        } else {
            alert("Thêm thành công!");
            modal.style.display = "none";
            resetForm();
        }
    }

    

    // reset form
    function resetForm() {
        inputName.value = "";
        inputName.classList.remove("input-error");
        errorText.innerText = "";
    }

    const modalEdit = document.getElementById("modalEdit");
    const closeEdit = document.getElementById("closeEdit");
    const closeEdit2 = document.getElementById("closeEdit2");
    const saveEdit = document.getElementById("saveEdit");

    const editName = document.getElementById("editName");
    const editError = document.getElementById("editError");

    let currentRow = null;

    // click nút edit
    document.querySelectorAll(".edit").forEach(btn => {
        btn.onclick = function () {
            currentRow = this.closest("tr");

            // lấy dữ liệu
            let name = currentRow.children[0].innerText;
            let statusText = currentRow.children[1].innerText.trim();

            // fill vào form
            editName.value = name;

            if (statusText.includes("Đang")) {
                document.querySelector('input[name="editStatus"][value="active"]').checked = true;
            } else {
                document.querySelector('input[name="editStatus"][value="stop"]').checked = true;
            }

            modalEdit.style.display = "flex";
        }
    });

    // đóng modal
    closeEdit.onclick = closeEdit2.onclick = () => {
        modalEdit.style.display = "none";
        resetEdit();
    }

    // validate + lưu
    saveEdit.onclick = () => {
        let value = editName.value.trim();

        if (value === "") {
            editName.classList.add("input-error");
            editError.innerText = "Tên môn học không được để trống";
            return;
        }

        // cập nhật lại table
        currentRow.children[0].innerText = value;

        let status = document.querySelector('input[name="editStatus"]:checked').value;
        let statusCell = currentRow.children[1];

        if (status === "active") {
            statusCell.innerHTML = `<span class="status active">Đang hoạt động</span>`;
        } else {
            statusCell.innerHTML = `<span class="status stop">Ngừng hoạt động</span>`;
        }

        modalEdit.style.display = "none";
        resetEdit();
    }

    function resetEdit() {
        editName.value = "";
        editName.classList.remove("input-error");
        editError.innerText = "";
    }


    
    const confirmModal = document.getElementById("confirmModal");
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");
    const subjectText = document.getElementById("subjectToDelete");

    let rowToDelete = null;

    function addDeleteEvent(row) {
        row.querySelector(".delete").onclick = function () {
            rowToDelete = row;

            let name = row.children[0].innerText;
            subjectText.innerText = name;

            confirmModal.style.display = "flex";
        };
    }

    cancelDelete.onclick = () => {
        confirmModal.style.display = "none";
    };

    confirmDelete.onclick = () => {
        if (rowToDelete) {
            rowToDelete.remove();
        }
        confirmModal.style.display = "none";
    };

    // áp dụng cho row cũ
    document.querySelectorAll("tbody tr").forEach(row => {
        addDeleteEvent(row);
    });