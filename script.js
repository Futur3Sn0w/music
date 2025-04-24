$(document).ready(function () {
    const imageFormats = ['jpg', 'jpeg', 'png'];
    const container = $('<div class="music-container"></div>').appendTo('.right.half');

    $.getJSON('source.json', function (data) {
        data.productions.forEach(project => {
            let imageFound = false;
            let imageUrl = '';

            for (let ext of imageFormats) {
                const testUrl = `imgs/${project.id}.${ext}`;
                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', testUrl, false);
                xhr.send();

                if (xhr.status !== 404) {
                    imageUrl = testUrl;
                    imageFound = true;
                    break;
                }
            }

            const div = $('<div></div>', {
                class: 'music-entry',
                'title': project.title,
                'data-description': project.description
            });

            if (imageFound) {
                $('<img>', {
                    class: "albArt",
                    src: imageUrl,
                    alt: project.title
                }).appendTo(div);
                $('<img>', {
                    class: "backImg",
                    src: imageUrl,
                    alt: project.title
                }).appendTo(div);
            }

            $('<span>', {
                class: "prodTitle",
                'data-date': project.lastUpdate,
                text: project.title
            }).appendTo(div);

            if (project.dataOpen) {
                $('<button></button>', {
                    text: 'Play',
                    title: 'Opens music in new tab',
                    class: 'entry-btn',
                    click: () => window.open(project.dataOpen, '_blank')
                }).appendTo(div);
            }

            container.append(div);
        });
    });
});
