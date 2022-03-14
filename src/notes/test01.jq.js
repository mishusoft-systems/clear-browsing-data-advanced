$(document).ready(function () {
    // make ready list viewer
    $('#table_content_title').append('<ol id="outline-list" style="list-style: none"> </ol>');

    // datta container
    $('.et_pb_post_content').children().each(function (index, element) {
        // h2 tag = element
        if (element.nodeName.indexOf('H') !== -1) {
            element.setAttribute('id', 'id-' + index);

            //append child to viewer
            $('#outline-list').append('<li><a href="#id-' + index + '">' + element.textContent + '</a></li>');
        }
    });
});