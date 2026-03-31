<?php
include "db.php";

$sql = "SELECT Classes.ClassName, Teaches.ClimberID, Teaches.Role
        FROM Classes
        JOIN Teaches ON Classes.ClassID = Teaches.ClassID";

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<body>

<h2>Class Instructors</h2>

<table border="1">
<tr>
    <th>Class Name</th>
    <th>Climber ID</th>
    <th>Role</th>
</tr>

<?php
while($row = $result->fetch_assoc()) {
    echo "<tr>
            <td>{$row['ClassName']}</td>
            <td>{$row['ClimberID']}</td>
            <td>{$row['Role']}</td>
          </tr>";
}
?>

</table>

</body>
</html>