let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser) {
    window.location.href = "login.html";
}

let tbody = document.querySelector("tbody");

let modal = document.getElementById("modalAdd");
let modalEdit = document.getElementById("modalEdit");
let confirmModal = document.getElementById("confirmModal");
let inputName = document.getElementById("subjectName");
let editName = document.getElementById("editName");
let errorText = document.getElementById("nameError");
let editError = document.getElementById("editError");
let subjectToDelete = document.getElementById("subjectToDelete");

let editId = null;
let deleteId = null;

let currentSort = "";

let currentFilter = "all";
let currentSearch = "";

let currentPage = 1;
let itemsPerPage = 5;


//Hiển thị
function renderSubjects() {
    let data = JSON.parse(localStorage.getItem("subjects")) || [];

    //lọc
    if (currentFilter !== "all") {
        data = data.filter(s => s.status === currentFilter);
    }

    //tìm kiếm
    if (currentSearch) {
        data = data.filter(s => 
            s.name.toLowerCase().includes(currentSearch)
        );
    }

    //sắp xếp
    if (currentSort === "name") {
        data.sort((a, b) => a.name.localeCompare(b.name));
        }

    //phân trang
    let totalPages = Math.ceil(data.length / itemsPerPage) || 1;

    if (currentPage > totalPages) currentPage = totalPages;

    let start = (currentPage - 1) * itemsPerPage;
    let pageData = data.slice(start, start + itemsPerPage);

    //render
    tbody.innerHTML = "";
    pageData.forEach(s => {
        tbody.innerHTML += `
        <tr>
            <td>${s.name}</td>
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

//hàm phân trang
function renderPagination(totalPages) {
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    //Trước
    let prevBtn = document.createElement("button");
    prevBtn.innerText = "<";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Số trang
    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) {
            btn.classList.add("active-page");
        }

        btn.onclick = () => changePage(i);
        pagination.appendChild(btn);
    }

    //Sau
    let nextBtn = document.createElement("button");
    nextBtn.innerText = ">";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextBtn);
}

//hàm đổi trang
function changePage(page) {
    currentPage = page;
    renderSubjects();
}

renderSubjects();

//sắp xếp
document.getElementById("sortName").onclick = () => {
    currentSort = "name";
    currentPage = 1;
    renderSubjects();
    };

//lọc
document.getElementById("filterStatus").onchange = (e) => {
    currentFilter = e.target.value;
    currentPage = 1;
    renderSubjects();
};

//tìm kiếm
document.getElementById("searchInput").oninput = (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    currentPage = 1;
    renderSubjects();
};

//Thêm
document.querySelector(".btn-add").onclick = () => {
    modal.style.display = "flex";
}

document.querySelector(".btn-submit").onclick = () => {
    let name = inputName.value.trim();
    let status = document.querySelector('input[name="status"]:checked').value;
    errorText.innerText = "";

    if(name === "") {
        errorText.innerText = "Tên môn học không được để trống";
        return;
    }
    
    let data = JSON.parse(localStorage.getItem("subjects")) || [];

    let isDuplicate = data.some(s => 
        s.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
        errorText.innerText = "Tên môn học đã tồn tại";
        return;
    }

    data.push({
        id: Date.now(),
        name,
        status
    });

    localStorage.setItem("subjects", JSON.stringify(data));

    renderSubjects();

    inputName.value = "";

    modal.style.display = "none";

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
}

tbody.onclick = function(e) {
//Xóa
    let btnDelete = e.target.closest(".delete");
    if(btnDelete) {
        deleteId = btnDelete.dataset.id;

        let data = JSON.parse(localStorage.getItem("subjects")) || [];
        let item = data.find(s => s.id == deleteId);

        subjectToDelete.innerText = item.name;
        confirmModal.style.display = "flex";
    }

//Sửa
    let btnEdit = e.target.closest(".edit");
    if(btnEdit) {
        editId = btnEdit.dataset.id;

        let data = JSON.parse(localStorage.getItem("subjects")) || [];
        let item = data.find(s => s.id == editId);

        editName.value = item.name;

        document.querySelectorAll('input[name="editStatus"]').forEach(r => {
            r.checked = r.value === item.status;
        });

        modalEdit.style.display = "flex";
    }
};
//Xóa
document.getElementById("confirmDelete").onclick = () => {
    let data = JSON.parse(localStorage.getItem("subjects")) || [];

    data = data.filter(s => s.id != deleteId);

    localStorage.setItem("subjects", JSON.stringify(data));
    renderSubjects();
    
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



//Sửa
document.getElementById("saveEdit").onclick = () => {
    let name = editName.value.trim();
    let status = document.querySelector('input[name="editStatus"]:checked').value;

    editError.innerText = "";

    if(name === "") {
        editError.innerText = "Tên môn học không được để trống";
        return;
    }

    let data = JSON.parse(localStorage.getItem("subjects")) || [];

    let isDuplicate = data.some(s => 
        s.id != editId && s.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
        editError.innerText = "Tên môn học đã tồn tại";
        return;
    }

    data = data.map(s => {
        if(s.id == editId) {
            return { ...s, name, status };
        }
        return s;
    });

    localStorage.setItem("subjects", JSON.stringify(data));
    renderSubjects();

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

//Đóng modal
document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};
document.getElementById("closeModal2").onclick = () => {
    modal.style.display = "none";
};
document.getElementById("closeEdit").onclick = () => {
    modalEdit.style.display = "none";
};
document.getElementById("closeEdit2").onclick = () => {
    modalEdit.style.display = "none";
};

//Đăng xuất
document.getElementById("logout").onclick = () => {
    let confirmLogout = confirm("Bạn có chắc muốn đăng xuất không?");
    if(confirmLogout) {
        localStorage.removeItem("currentUser");
        //chặn back
        window.location.replace("login.html");
    }
};
const userMenu = document.querySelector(".user-menu");
const dropdown = document.getElementById("dropdownMenu");

//toggle khi click avatar
userMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

//click ra ngoài thì ẩn dropdown
document.addEventListener("click", function () {
    dropdown.classList.remove("show");
});