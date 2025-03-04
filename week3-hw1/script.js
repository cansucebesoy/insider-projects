const jsonData = {
  students: [
    {
      name: "Cansu",
      lastname: "Cebesoy",
      id: "123",
      lectureCode: "MAT101",
      note: 85,
    },
    {
      name: "Berke",
      lastname: "Tinas",
      id: "125",
      lectureCode: "FIZ102",
      note: 92,
    },
    {
      name: "Sude",
      lastname: "Melek",
      id: "128",
      lectureCode: "KIM103",
      note: 78,
    },
  ],
};

$(document).ready(function () {
  updateTable();

  $("#addStudent").click(addStudent);
  $("#deleteStudent").click(deleteStudent);

  $("#addStudent").hover(
    function () {
      $(this).css("background-color", "#357ab8");
    },
    function () {
      $(this).css("background-color", "#4a90e2");
    }
  );

  $("#deleteStudent").hover(
    function () {
      $(this).css("background-color", "#c0392b");
    },
    function () {
      $(this).css("background-color", "#e74c3c");
    }
  );
});

function updateTable() {
  $("#studentTable tbody").empty();
  jsonData.students.forEach((student) => {
    addRowToTable(student);
  });
}

function addRowToTable(student) {
  const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.lastname}</td>
        <td>${student.id}</td>
        <td>${student.lectureCode}</td>
        <td>${student.note}</td>
      </tr>
    `;
  $("#studentTable tbody").append(row);
}

function addStudent() {
  const name = $("#studentName").val().trim();
  const lastname = $("#studentLastname").val().trim();
  const id = $("#studentId").val().trim();
  const lectureCode = $("#studentLectureCode").val().trim();
  const note = parseInt($("#studentNote").val().trim());

  if (!name || !lastname || !id || !lectureCode || isNaN(note)) {
    alert("Please fill correctly!");
    return;
  }

  const newStudent = { name, lastname, id, lectureCode, note };
  jsonData.students.push(newStudent);

  addRowToTable(newStudent);

  $(
    "#studentName, #studentLastname, #studentId, #studentLectureCode, #studentNote"
  ).val("");
}
function deleteStudent() {
  const id = $("#deleteStudentId").val().trim();

  if (!id) {
    alert("Please enter a valid ID!");
    return;
  }

  const index = jsonData.students.findIndex((student) => student.id === id);
  if (index === -1) {
    alert("Student not found!");
    return;
  }

  jsonData.students.splice(index, 1);
  updateTable();

  $("#deleteStudentId").val("");
}
