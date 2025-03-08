
document.addEventListener("DOMContentLoaded", function () {
    const data = [
        { campus: "本部", course: "中国古典家具赏析", teacher: "蔡晨阳", students: 95 },
        { campus: "白马校区", course: "中国古典家具赏析", teacher: "蔡晨阳", students: 325 },
        { campus: "淮安校区", course: "中国古典家具赏析", teacher: "蔡晨阳", students: 142 }
    ];

    // 生成表格
    const tableContainer = document.getElementById("tableContainer");
    const table = document.createElement("table");
    table.innerHTML = `<tr><th>校区</th><th>课程名称</th><th>教师</th><th>选课人数</th></tr>`;

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${item.campus}</td><td>${item.course}</td><td>${item.teacher}</td><td>${item.students}</td>`;
        row.onclick = () => alert(`课程：${item.course}\n教师：${item.teacher}\n选课人数：${item.students}`);
        table.appendChild(row);
    });

    tableContainer.appendChild(table);

    // 数据可视化示例
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = `<p>数据可视化功能待添加...</p>`;
});
