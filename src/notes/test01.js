$(document).ready(function () {
    // viewer
    let viewerTag = document.createElement('ol');
    $("#table_content_title").append(viewerTag);

    if ($(".et_pb_post_content").childNodes.length !== 0) {
        $(".et_pb_post_content").childNodes.forEach((element, index) => {
            // h2 tag = element
            if (element.nodeName.toString().indexOf('H') !== -1) {
                element.setAttribute('id', 'id' + index);
                viewerTag.append('<li><a  href="#id"'+index + '> ' + element.textContent + '</a></li>');
            }
        })
    }
});