<?php
include "db.php";

$date = $_POST['date'];

$sql = "SELECT ClimberID, DateJoined 
        FROM Members 
        WHERE DateJoined >= '$date'";

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<body>

<h2>Results</h2>

<table border="1">
<tr>
    <th>ClimberID</th>
    <th>Date Joined</th>
</tr>

<?php
while($row = $result->fetch_assoc()) {
    echo "<tr>
            <td>{$row['ClimberID']}</td>
            <td>{$row['DateJoined']}</td>
          </tr>";
}
?>

</table>

</body>
</html>