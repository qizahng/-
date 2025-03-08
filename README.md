<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程信息交互网页</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
</head>
<body>

<div class="container mt-4">
    <h2 class="text-center">📚 课程信息交互页面</h2>

    <!-- 筛选器 -->
    <div class="row my-3">
        <div class="col-md-3">
            <label>选择校区：</label>
            <select id="filterCampus" class="form-select">
                <option value="">全部</option>
            </select>
        </div>
        <div class="col-md-3">
            <label>选择教师：</label>
            <select id="filterTeacher" class="form-select">
                <option value="">全部</option>
            </select>
        </div>
        <div class="col-md-3">
            <label>选择课程类别：</label>
            <select id="filterCategory" class="form-select">
                <option value="">全部</option>
            </select>
        </div>
        <div class="col-md-3">
            <label>搜索课程：</label>
            <input type="text" id="searchCourse" class="form-control" placeholder="输入课程名称">
        </div>
    </div>

    <!-- 课程表 -->
    <table id="courseTable" class="table table-striped">
        <thead>
            <tr>
                <th>校区</th>
                <th>教师姓名</th>
                <th>课程名称</th>
                <th>课程类别</th>
                <th>上课班级</th>
                <th>选课人数</th>
                <th>总学时</th>
                <th>上课地点</th>
                <th>上课时间</th>
            </tr>
        </thead>
        <tbody>
            <!-- 课程数据将由 JavaScript 填充 -->
        </tbody>
    </table>

    <!-- 统计图表 -->
    <div class="row my-5">
        <div class="col-md-6">
            <h4 class="text-center">📊 课程类别统计</h4>
            <canvas id="categoryChart"></canvas>
        </div>
        <div class="col-md-6">
            <h4 class="text-center">📌 各校区课程数量</h4>
            <canvas id="campusChart"></canvas>
        </div>
    </div>

</div>

<script>
// 课程数据（可以从后端 API 获取，这里用 JavaScript 本地数据）
const courseData = [
    { campus: "本部", teacher: "蔡晨阳", name: "中国古典家具赏析", category: "通识课", class: "临班167", students: 95, hours: 32, location: "50112", time: "周四 1-4[2-9]" },
    { campus: "白马校区", teacher: "顾颜婷", name: "竹家具赏析与创新", category: "通识课", class: "临班402", students: 250, hours: 32, location: "阶4", time: "周六 5-8[1-8]" },
    { campus: "本部", teacher: "杨子倩", name: "智能家具设计", category: "理论课", class: "22114021-3", students: 30, hours: 32, location: "0128", time: "周一 5-8[1-8]" },
    { campus: "淮安校区", teacher: "朱兆龙", name: "数字化设计技术", category: "理论课", class: "23514041-2", students: 58, hours: 32, location: "淮安校区A212", time: "周一 1-4[1-4]" }
];

// 填充表格数据
function loadTable() {
    const tableBody = $("#courseTable tbody");
    tableBody.empty();
    courseData.forEach(course => {
        tableBody.append(`
            <tr>
                <td>${course.campus}</td>
                <td>${course.teacher}</td>
                <td>${course.name}</td>
                <td>${course.category}</td>
                <td>${course.class}</td>
                <td>${course.students}</td>
                <td>${course.hours}</td>
                <td>${course.location}</td>
                <td>${course.time}</td>
            </tr>
        `);
    });
    $("#courseTable").DataTable();
}

// 加载筛选项
function loadFilters() {
    const uniqueCampuses = [...new Set(courseData.map(c => c.campus))];
    const uniqueTeachers = [...new Set(courseData.map(c => c.teacher))];
    const uniqueCategories = [...new Set(courseData.map(c => c.category))];

    uniqueCampuses.forEach(c => $("#filterCampus").append(new Option(c, c)));
    uniqueTeachers.forEach(t => $("#filterTeacher").append(new Option(t, t)));
    uniqueCategories.forEach(cat => $("#filterCategory").append(new Option(cat, cat)));
}

// 绘制统计图表
function drawCharts() {
    const ctx1 = document.getElementById("categoryChart").getContext("2d");
    new Chart(ctx1, {
        type: "doughnut",
        data: {
            labels: [...new Set(courseData.map(c => c.category))],
            datasets: [{ data: [2, 2], backgroundColor: ["#ff6384", "#36a2eb"] }]
        }
    });

    const ctx2 = document.getElementById("campusChart").getContext("2d");
    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: [...new Set(courseData.map(c => c.campus))],
            datasets: [{ data: [2, 1, 1], backgroundColor: ["#ffce56", "#4bc0c0", "#9966ff"] }]
        }
    });
}

// 初始化
$(document).ready(() => {
    loadTable();
    loadFilters();
    drawCharts();
});
</script>

</body>
</html>
