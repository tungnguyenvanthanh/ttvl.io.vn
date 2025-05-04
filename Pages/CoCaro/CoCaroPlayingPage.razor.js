export let CoCaro = function () {
    let draggableWithConstraints = (element, container) => {
        $(element).draggable({
            drag: function (event, ui) {
                // Cho phép kéo element sang trái, nhưng cạnh phải vẫn phải nằm trong container.
                let maxLeft = -($(element).outerWidth() - 90);
                // Cho phép kéo sang phải, nhưng cạnh trái không được ra ngoài container.
                let maxRight = $(container).width() - 90;
                // Cho phép kéo lên trên, nhưng cạnh dưới vẫn phải nằm trong container.
                let maxTop = -($(element).outerHeight() - 90);
                // Cho phép kéo xuống, nhưng cạnh trên không được ra ngoài container.
                let maxBottom = $(container).height() - 90;

                // Giới hạn vị trí kéo
                // Nếu phần tử bị kéo quá sang trái, chặn nó lại.
                if (ui.position.left < maxLeft) {
                    ui.position.left = maxLeft;
                }
                // Nếu kéo quá sang phải, chặn nó lại.
                if (ui.position.left > maxRight) {
                    ui.position.left = maxRight;
                }
                // Nếu kéo quá lên trên, chặn nó lại.
                if (ui.position.top < maxTop) {
                    ui.position.top = maxTop;
                }
                // Nếu kéo quá xuống dưới, chặn nó lại.
                if (ui.position.top > maxBottom) {
                    ui.position.top = maxBottom;
                }
            }
        });
    }

    return {
        draggable: (element, container) => {
            draggableWithConstraints(element, container);
        }
    };
}();
