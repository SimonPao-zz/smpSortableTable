(function($){
    $.fn.smpSortableTable = function (data, max) {
        var generateData = function($table) {
            var keys = [] ;
            var data = [] ;

            $table.find('thead th').each(function(i,v){
                keys.push($(v).attr('id')) ;
            }) ;

            $table.find('tbody tr').each(function(i,v){
                var $tmp = {} ;
                $.each(keys, function(i,v2){
                    var sort = $($(v).children('td')[i]).data('smp-sort');
                    if(!sort) $tmp[v2] = $(v).children('td')[i].innerHTML;
                    else $tmp[v2] = { "text": $(v).children('td')[i].innerText, "sort": sort } ;
                }) ;
                data.push($tmp) ;
            }) ;

            return data ;
        };


        var renderTable = function (start, end, max, data) {
            var returnHTML = '';
            for (var i = start; i < Math.min(end, max); i++) {
                returnHTML += '<tr>';
                for (var key in data[i]) {
                    if(data[i].hasOwnProperty(key)) {
                        if (typeof data[i][key] !== 'object')
                            returnHTML += '<td>' + (data[i][key] ? data[i][key] : 'N/A') + '</td>';
                        else returnHTML += '<td>' + (data[i][key].text ? data[i][key].text : 'N/A') + '</td>';
                    }
                }
                returnHTML += '</tr>';
            }
            return returnHTML;
        };

        var sortFns = function (key) {
            return {
                desc: function (a, b) {
                    if (typeof a[key] !== 'object')
                        return a[key] > b[key] ? -1 :
                            (a[key] < b[key] ? 1  : 0);
                    else return a[key].sort > b[key].sort ? -1 :
                        (a[key].sort < b[key].sort ? 1  : 0);
                },
                asc: function (a, b) {
                    if (typeof a[key] !== 'object')
                        return a[key] < b[key] ? -1 :
                            (a[key] > b[key] ? 1  : 0);
                    else return a[key].sort < b[key].sort ? -1 :
                        (a[key].sort > b[key].sort ? 1  : 0);
                }
            }
        };

        /* SETUP */
        var $table = $(this);
        var tableName = $table.attr('id');
        var index = 0;
        max = max < 1 ? 10 : max ;
        data = !data ? generateData($table) : data ;
        $table.addClass('smpSortableTable--processed') ;
        $table.find('tbody').html(renderTable(0, data.length, max, data));
        $table.find('th:not(.smp-not-sortable)').addClass('smpSortableTable--sortable ' + tableName + '--sortable');
        $table.after(
            '<div class="smpSortableTable--nav" id="' + tableName + '--nav">' +
            '<a class="smpSortableTable--nav-links smpSortableTable--prev smpSortableTable--disabled" id="' + tableName + '--prev">&laquo; Previous</a>' +
            '<span class="smpSortableTable--counter" id="' + tableName + '--counter"></span>' +
            '<a class="smpSortableTable--nav-links smpSortableTable--next" id="' + tableName + '--next">Next &raquo;</a>' +
            '</div>'
        );
        $.each($table.find('th'), function (i, v) {
            var id = $(v).attr('id');
            $(v).attr('id', tableName + '_' + id);
        });

        /* Init counter */
        if (data.length) {
            $('#' + tableName + '--counter').text(
                '1 - ' + Math.min(data.length, max) + ' of ' + data.length
            );
        } else {
            $('#' + tableName + '--counter').text('Nothing to Display')
            $('#' + tableName + '--next').addClass('smpSortableTable--disabled');
            $table.find('th').removeClass('smpSortableTable--sortable');
        }
        if (data.length <= max) {
            $('#' + tableName + '--next').addClass('smpSortableTable--disabled');
        }

        /* Init next/prev */
        if (data.length > max) {
            $('#' + tableName + '--next').click(function () {
                if (!$(this).hasClass('smpSortableTable--disabled')) {
                    var start = index += max;
                    var end = start + max;
                    var size = data.length;

                    $table.find('tbody').html(
                        renderTable(start, size, end, data)
                    );

                    $('#' + tableName + '--counter').text(
                        (start + 1) + ' - ' + Math.min(size, end) + ' of ' + size
                    );

                    $('#' + tableName + '--prev').removeClass('smpSortableTable--disabled');
                    if (end >= size) {
                        $('#' + tableName + '--next').addClass('smpSortableTable--disabled');
                    }
                }
            });
            $('#' + tableName + '--prev').click(function () {
                if (!$(this).hasClass('smpSortableTable--disabled')) {
                    var start = index -= max;
                    var end = start + max;
                    var size = data.length;

                    $table.find('tbody').html(
                        renderTable(start, size, end, data)
                    );

                    $('#' + tableName + '--counter').text(
                        (start + 1) + ' - ' + Math.min(size, end) + ' of ' + size
                    );

                    $('#' + tableName + '--next').removeClass('smpSortableTable--disabled');
                    if (!start) {
                        $('#' + tableName + '--prev').addClass('smpSortableTable--disabled');
                    }
                }
            });
        }

        /* Init sorting*/
        $('.' + tableName + '--sortable').click(function () {
            var direction = $(this).hasClass('asc') ? 'desc' : 'asc';
            var colName = $(this).attr('id').replace(tableName + '_', '');
            $('.' + tableName + '--sortable').removeClass('desc asc');
            index = 0;
            data.sort(sortFns(colName)[direction]);
            $table.find('tbody').html(
                renderTable(0, data.length, max, data)
            );
            $(this).addClass(direction);
            $('#' + tableName + '--prev').addClass('smpSortableTable--disabled');
            if (data.length > max) {
                $('#' + tableName + '--next').removeClass('smpSortableTable--disabled');
            }
            $('#' + tableName + '--counter').text('1 - ' + Math.min(data.length, max) + ' of ' + data.length);
        });
    };
})(jQuery) ;

