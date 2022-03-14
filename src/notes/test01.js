$(document).ready(function () {
    // viewer
    let viewerTag = document.createElement('ol');
    viewerTag.setAttribute('style', 'list-style:none')

    // append to main container
    document.querySelector('#table_content_title').appendChild(viewerTag);

    // datta container
    const bodyContent = document.querySelector('.et_pb_post_content');

    if (bodyContent.childElementCount !== 0) {
        bodyContent.childNodes.forEach((element, index) => {
            // h2 tag = element
            if (element.nodeName.toString().indexOf('H') !== -1) {
                const navigation = 'id-' + index;
                element.setAttribute('id', navigation);

                // new anchor child
                let anchorElement = document.createElement('a');
                anchorElement.setAttribute('href', '#'+ navigation);
                anchorElement.textContent = element.textContent

                // new list item child
                let listItemElement  = document.createElement('li');
                listItemElement.appendChild(anchorElement);

                //append child to viewer
                viewerTag.appendChild(listItemElement);
            }
        })
    }


    // make ready list viewer
    document.querySelector('#table_content_title').append('<ol id="outline-list" style="list-style: none"> </ol>');

    // datta container
    document.querySelector('.et_pb_post_content').children.each(function (index, element) {
        // h2 tag = element
        if (element.nodeName.indexOf('H') !== -1) {
            element.setAttribute('id', 'id-' + index);

            //append child to viewer
            document.querySelector('#outline-list').append('<li><a href="#id-' + index + '">' + element.textContent + '</a></li>');
        }
    });
});