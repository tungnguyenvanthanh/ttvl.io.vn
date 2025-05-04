export let WheelRandom = function () {
    let init = (el, values, dotNetHelper) => {
        const container = el;
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1", "#A133FF"];
        const assignedColors = [];
        let currentRotation = 0;

        const getRandomColor = (excludeColors) => {
            let availableColors = colors.filter(c => !excludeColors.includes(c));
            return availableColors[Math.floor(Math.random() * availableColors.length)];
        };

        for (let i = 0; i < values.length; i++) {
            let exclude = [];
            if (i > 0) exclude.push(assignedColors[i - 1]);
            if (i === values.length - 1) exclude.push(assignedColors[0]);
            assignedColors.push(getRandomColor(exclude));
        }

        const render = () => {
            const { width, height } = container.getBoundingClientRect();
            const size = Math.max(width, height);
            const radius = size / 2;
            const numSlices = values.length;
            const sliceAngle = (2 * Math.PI) / numSlices;

            container.innerHTML = "";
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            svg.setAttribute("viewBox", `${-radius} ${-radius} ${size} ${size}`);

            const wheelGroup = document.createElementNS(svgNS, "g");
            wheelGroup.setAttribute("transform", `rotate(${currentRotation})`);

            values.forEach((value, i) => {
                const x1 = radius * Math.cos(i * sliceAngle);
                const y1 = radius * Math.sin(i * sliceAngle);
                const x2 = radius * Math.cos((i + 1) * sliceAngle);
                const y2 = radius * Math.sin((i + 1) * sliceAngle);

                const path = document.createElementNS(svgNS, "path");
                path.setAttribute("d", `M0,0 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`);
                path.setAttribute("fill", assignedColors[i]);
                path.setAttribute("stroke", "black");
                wheelGroup.appendChild(path);

                const text = document.createElementNS(svgNS, "text");
                const textAngle = (i + 0.5) * sliceAngle;
                const textX = (radius * 0.7) * Math.cos(textAngle);
                const textY = (radius * 0.7) * Math.sin(textAngle);

                text.setAttribute("x", textX);
                text.setAttribute("y", textY);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("dominant-baseline", "middle");
                text.setAttribute("fill", "black");
                text.setAttribute("transform", `rotate(${(textAngle * 180 / Math.PI)},${textX},${textY})`);
                text.textContent = value;
                wheelGroup.appendChild(text);
            });

            svg.appendChild(wheelGroup);

            // Create spin button
            const buttonGroup = document.createElementNS(svgNS, "g");
            const button = document.createElementNS(svgNS, "circle");
            button.setAttribute("cx", "0");
            button.setAttribute("cy", "0");
            button.setAttribute("r", radius * 0.2);
            button.setAttribute("fill", "white");
            button.setAttribute("stroke", "black");
            buttonGroup.appendChild(button);

            const buttonText = document.createElementNS(svgNS, "text");
            buttonText.setAttribute("x", "0");
            buttonText.setAttribute("y", "5");
            buttonText.setAttribute("text-anchor", "middle");
            buttonText.setAttribute("dominant-baseline", "middle");
            buttonText.setAttribute("fill", "black");
            buttonText.setAttribute("font-size", "14");
            buttonText.textContent = "Quay";
            buttonGroup.appendChild(buttonText);

            buttonGroup.addEventListener("click", spinWheel);
            svg.appendChild(buttonGroup);

            // Create indicator triangle
            const indicator = document.createElementNS(svgNS, "polygon");
            const indicatorSize = radius * 0.3; // Increase the size of the triangle
            indicator.setAttribute("points", `
                ${radius},-10 
                ${radius},10 
                ${radius - indicatorSize},0
            `); // Adjust coordinates to point left
            indicator.setAttribute("fill", "red");
            indicator.setAttribute("stroke", "black");
            svg.appendChild(indicator);

            container.appendChild(svg);
        };

        const spinWheel = () => {
            const numSlices = values.length;
            const sliceAngle = 360 / numSlices;
            const randomIndex = Math.floor(Math.random() * numSlices);
            const targetAngle = 360 - (randomIndex * sliceAngle);
            const totalRotation = 360 * 5 + targetAngle;

            let start = null;
            const duration = 5000;

            const test = Math.floor(Math.random() * sliceAngle);

            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);

                currentRotation = (easeOut * totalRotation) - test;
                render();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    const selectedValue = values[randomIndex];
                    dotNetHelper.invokeMethodAsync('OnSelectedValue', selectedValue);
                }
            };

            requestAnimationFrame(animate);
        };

        window.addEventListener("resize", render);
        render();
    }

    return {
        init: (el, values, dotNetHelper) => {
            init(el, values, dotNetHelper);
        }
    };
}();