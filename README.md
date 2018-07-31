# smpSortableTable
smpSortableTable is a simple jQuery table formatting plugin. It allows sorting by any column and limits the displayed number of rows.

## Using a Data Structure

```
<script type="text/javascript">
    const people = [{
        "fname": "Tanner",
        "lname": "Conner",
        "age": 93,
        "bdate": {
            "text": "04\/09\/1925", 
            "sort": -1411540671
        }
    }, {
        "fname": "Karin",
        "lname": "Book",
        "age": 33,
        "bdate": {
            "text": "01\/21\/1985", 
            "sort": 475176129
        }
    }, { 
        ... 
    }] ;
    
    let rows = 10 ;
    let language = "en" ;
    
    $('#people-table').smpSortableTable(people, rows, language);
</script>

...

<table id="people-table">
    <thead>
        <tr>
            <th id="fname">First Name</th>
            <th id="lname">Last Name</th>
            <th id="age" class="smp-not-sortable">Age</th>
            <th id="bdate">Birthday</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

## Using Table Data

```
<script type="text/javascript">
    let rows = 10 ;
    let language = "en" ;
    
    $('#people-table').smpSortableTable(false, rows, language);
</script>

...

<table id="people-table">
    <thead>
        <tr>
            <th id="fname">First Name</th>
            <th id="lname">Last Name</th>
            <th id="age" class="smp-not-sortable">Age</th>
            <th id="bdate">Birthday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Tatyana</td>
            <td>Thrash</td>
            <td>58</td>
            <td data-smp-sort="-1411540671">04/09/1925</td>
        </tr>
        <tr>
            <td>Keven</td>
            <td>Keniston</td>
            <td>14</td>
            <td data-smp-sort="475176129">01/21/1985</td>
        </tr>
        <tr>
            ...
        </tr>
    </tbody>
</table>
```
