$(document).ready(function () {
    const imageFormats = ['jpg', 'jpeg', 'png'];
    const container = $('.right.half');
    let currentPath = [];
    let musicData = null;

    function renderEntries(entries) {
        container.addClass('tempHide')

        container.empty();
        $('<button class="back-btn">⬅ Back</button>')
            .toggle(currentPath.length > 0)
            .click(() => {
                currentPath.pop();
                renderTree();
            })
            .appendTo(container);

        entries.forEach(entry => {
            let imageFound = false;
            let imageUrl = '';

            for (let ext of imageFormats) {
                const testUrl = `imgs/${entry.id}.${ext}`;
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
                'data-description': entry.description
            });

            if (imageFound) {
                $('<img>', {
                    class: "albArt",
                    src: imageUrl,
                    alt: entry.title
                }).appendTo(div);
                $('<img>', {
                    class: "backImg",
                    src: imageUrl,
                    alt: entry.title
                }).appendTo(div);
            }

            const prodInfo = $('<div>', {
                class: "prodInfo"
            }).appendTo(div);

            $('<span>', {
                class: "prodTitle",
                text: entry.title
            }).appendTo(prodInfo);

            $('<span>', {
                class: "prodDate",
                text: entry.lastUpdate
            }).appendTo(prodInfo);

            $('<span>', {
                class: "prodDesc",
                text: entry.description
            }).appendTo(prodInfo);

            if (entry.dataOpen) {
                $('<button></button>', {
                    text: 'Play',
                    title: 'Opens music in new tab',
                    class: 'entry-btn',
                    click: () => window.open(entry.dataOpen, '_blank')
                }).appendTo(div);
            }

            container.append(div);
        });

        setTimeout(() => {
            container.removeClass('tempHide')
        }, 200);
    }

    function renderTree() {
        container.addClass('tempHide')

        setTimeout(() => {
            container.empty();

            if (currentPath.length === 0) {
                $('<div class="tree-btn">🎵 Productions</div>')
                    .click(() => {
                        currentPath.push('productions');
                        renderTree();
                    })
                    .appendTo(container);
                $('<div class="tree-btn">🎧 Sets</div>')
                    .click(() => {
                        currentPath.push('sets');
                        renderTree();
                    })
                    .appendTo(container);
            } else {
                const entries = musicData[currentPath[0]];
                renderEntries(entries);
            }

            container.removeClass('tempHide')
        }, 200);
    }

    $.getJSON('source.json', function (data) {
        musicData = data;
        renderTree();
    });
});
