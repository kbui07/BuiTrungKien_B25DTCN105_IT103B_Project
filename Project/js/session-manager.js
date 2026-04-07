    // ===== CHECK LOGIN =====
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "login.html";
    }

    //select
    let tbody = document.querySelector("tbody");

    //modal
    let modalAdd = document.getElementById("modalAdd");
    let modalEdit = document.getElementById("modalEdit");
    let confirmModal = document.getElementById("confirmModal");

    //add
    let lessonName = document.getElementById("lessonName");
    let duration = document.getElementById("duration");

    //EDIT
    let editName = document.getElementById("editName");
    let editDuration = document.getElementById("editDuration");

    //lỗi
    let error = document.getElementById("error");
    let editError = document.getElementById("errorEdit");

    //xóa
    let deleteName = document.getElementById("deleteName");
    let editId = null;
    let deleteId = null;

    //sắp xếp
    let currentSort = "";

    //lọc
    let currentFilter = "all";

    //phân trang
    let currentPage = 1;
    let itemsPerPage = 5;

    //render
    function render() {
        let data = JSON.parse(localStorage.getItem("sessions")) || [];

        //Lọc
        if (currentFilter !== "all") {
            data = data.filter(s => s.status === currentFilter);
        }


         //sắp xếp
            if (currentSort === "name") {
                data.sort((a, b) => a.name.localeCompare(b.name));
            }

            if (currentSort === "time") {
                data.sort((a, b) => b.duration - a.duration);
            }

        //phân trang

         let totalPages = Math.ceil(data.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        let start = (currentPage - 1) * itemsPerPage;
        let pageData = data.slice(start, start + itemsPerPage);

        // ===== RENDER TABLE =====
        tbody.innerHTML = "";

        pageData.forEach(s => {
            tbody.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${s.name}</td>
                <td>${s.duration}</td>
                <td>
                    <span class="status ${s.status}">
                        ${s.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </span>
                </td>
                <td>
                    <span class="delete" data-id="${s.id}"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="19"
                                        viewBox="0 0 17 19" fill="none">
                                        <path
                                            d="M0.833252 4.16668H2.49992M2.49992 4.16668H15.8333M2.49992 4.16668V15.8333C2.49992 16.2754 2.67551 16.6993 2.98807 17.0119C3.30063 17.3244 3.72456 17.5 4.16659 17.5H12.4999C12.9419 17.5 13.3659 17.3244 13.6784 17.0119C13.991 16.6993 14.1666 16.2754 14.1666 15.8333V4.16668H2.49992ZM4.99992 4.16668V2.50001C4.99992 2.05798 5.17551 1.63406 5.48807 1.3215C5.80063 1.00894 6.22456 0.833344 6.66659 0.833344H9.99992C10.4419 0.833344 10.8659 1.00894 11.1784 1.3215C11.491 1.63406 11.6666 2.05798 11.6666 2.50001V4.16668M6.66659 8.33334V13.3333M9.99992 8.33334V13.3333"
                                            stroke="#FF0101" stroke-width="1.66667" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg></span>
                    <span class="edit" data-id="${s.id}"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                                        viewBox="0 0 19 19" fill="none">
                                        <path
                                            d="M13.3333 1.5237C13.5521 1.30483 13.812 1.13121 14.0979 1.01276C14.3839 0.89431 14.6904 0.833344 14.9999 0.833344C15.3094 0.833344 15.6159 0.89431 15.9019 1.01276C16.1879 1.13121 16.4477 1.30483 16.6666 1.5237C16.8855 1.74257 17.0591 2.00241 17.1775 2.28837C17.296 2.57434 17.3569 2.88084 17.3569 3.19037C17.3569 3.49989 17.296 3.80639 17.1775 4.09236C17.0591 4.37833 16.8855 4.63816 16.6666 4.85703L5.41659 16.107L0.833252 17.357L2.08325 12.7737L13.3333 1.5237Z"
                                            stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg></span>
                </td>
            </tr>
            `;
        });
         renderPagination(totalPages);
    }

    //render phân trang
    function renderPagination(totalPages) {
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    // nút <
    let prev = document.createElement("button");
    prev.innerText = "<";
    prev.disabled = currentPage === 1;
    prev.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prev);

    // số trang
    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) {
            btn.classList.add("active-page");
        }

        btn.onclick = () => changePage(i);
        pagination.appendChild(btn);
    }

    // nút >
    let next = document.createElement("button");
    next.innerText = ">";
    next.disabled = currentPage === totalPages;
    next.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(next);
}
//chuyển trang
function changePage(page) {
    currentPage = page;
    render();
}

    render();

    //sắp xếp
    document.getElementById("sortName").onclick = () => {
        currentSort = "name";
        currentPage = 1;
        render();
    };

    document.getElementById("sortTime").onclick = () => {
        currentSort = "time";
        currentPage = 1;
        render();
    };

    //LỌC
    document.getElementById("filterStatus").onchange = (e) => {
        currentFilter = e.target.value;
        currentPage = 1;
        render();
    };

 //MỞ modal thêm
    document.querySelector(".btn-add").onclick = () => {
        lessonName.value = "";
        duration.value = "";
        error.innerText = "";

        modalAdd.style.display = "flex";
    };

//Thêm
document.getElementById("saveAdd").onclick = () => {
    let name = lessonName.value.trim();
    let time = duration.value.trim();

    let statusInput = document.querySelector('#modalAdd input[name="status"]:checked');

    if (name === "") {
        error.innerText = "Tên không được để trống";
        return;
    }

    if (time === "" || time <= 0) {
        error.innerText = "Thời gian không hợp lệ";
        return;
    }

    if (!statusInput) {
        error.innerText = "Chọn trạng thái";
        return;
    }

    let status = statusInput.value;

    let data = JSON.parse(localStorage.getItem("sessions")) || [];

    let isDuplicate = data.some(s => 
        s.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
        error.innerText = "Tên bài học đã tồn tại";
        return;
    }

    data.push({
        id: Date.now(),
        name,
        duration:Number(time),
        status
    });

    localStorage.setItem("sessions", JSON.stringify(data));
    render();
    modalAdd.style.display = "none";

    Toastify({
        text: " Thêm mới thành công!",
        duration: 800,
        gravity: "top",
        position: "right",
        style: {
            background: "#4CAF50",
            borderRadius: "8px"
        },
    }).showToast();
};


tbody.onclick = function (e) {

    let deleteBtn = e.target.closest(".delete");
    let editBtn = e.target.closest(".edit");

    //xóa
    if (deleteBtn) {
        let id = deleteBtn.dataset.id;
        deleteId = id;

        let data = JSON.parse(localStorage.getItem("sessions")) || [];
        let item = data.find(s => s.id == id);

        if (!item) return;

        deleteName.innerText = item.name;
        confirmModal.style.display = "flex";
    }

    //sửa
    if (editBtn) {
        let id = editBtn.dataset.id;
        editId = id;

        let data = JSON.parse(localStorage.getItem("sessions")) || [];
        let item = data.find(s => s.id == id);

        if (!item) return;

        editName.value = item.name;
        editDuration.value = item.duration;

        document.querySelectorAll('#modalEdit input[name="status"]').forEach(r => {
            r.checked = r.value === item.status;
        });

        modalEdit.style.display = "flex";
    }
};

//lưu sửa
document.getElementById("saveEdit").onclick = () => {
    let name = editName.value.trim();
    let time = editDuration.value.trim();

    let statusInput = document.querySelector('#modalEdit input[name="status"]:checked');

    if (name === "") {
        error.innerText = "Tên không được để trống";
        return;
    }

    if (time === "" || time <= 0) {
        error.innerText = "Thời gian không hợp lệ";
        return;
    }

    if (!statusInput) {
        error.innerText = "Chọn trạng thái";
        return;
    }

    let status = statusInput.value;

    let data = JSON.parse(localStorage.getItem("sessions")) || [];

    let isDuplicate = data.some(s => 
    s.id !== editId && s.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
        editError.innerText = "Tên bài học đã tồn tại";
        return;
    }

    data = data.map(s => {
        if (s.id == editId) {
            return {
                ...s,
                name,
                duration: Number(time),
                status
            };
        }
        return s;
    });

    localStorage.setItem("sessions", JSON.stringify(data));
    render();

    modalEdit.style.display = "none";

    Toastify({
        text: " Sửa thành công!",
        duration: 800,
        gravity: "top",
        position: "right",
        style: {
            background: "#4CAF50",
            borderRadius: "8px"
        },
    }).showToast();
};

//xóa
document.getElementById("confirmDelete").onclick = () => {
    let data = JSON.parse(localStorage.getItem("sessions")) || [];

    data = data.filter(s => s.id != deleteId);

    localStorage.setItem("sessions", JSON.stringify(data));
    render();

    confirmModal.style.display = "none";

    Toastify({
        text: " Xóa thành công!",
        duration: 800,
        gravity: "top",
        position: "right",
        style: {
            background: "Red",
            borderRadius: "8px"
        },
    }).showToast();
};

document.getElementById("cancelDelete").onclick = () => {
    confirmModal.style.display = "none";
};

//đóng modal
document.querySelectorAll(".close").forEach(btn => {
    btn.onclick = () => {
        modalAdd.style.display = "none";
        modalEdit.style.display = "none";
        confirmModal.style.display = "none";
    };
});