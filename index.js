var colorTestData = [];
var colorTestNet = new brain.NeuralNetwork();

// INIT
onload = function() {
    // Set events
    document.getElementById('color-test-train-input')
        .onkeypress = colorTestTrainKeyPress;
    document.getElementById('color-test-train-next-button')
        .onclick = colorTestTrainNext;
    document.getElementById('color-test-train-button')
        .onclick = colorTestTrain;
    document.getElementById('color-test-run-next-button')
        .onclick = colorTestRun;
    // Init tests
    colorTestInit();
};

// COLOR TEST
function colorTestGetRandomColor() {
    return 'rgb(' + 
           Math.round(Math.random() * 255) + ',' +
           Math.round(Math.random() * 255) + ',' +
           Math.round(Math.random() * 255) + ')';
}

function colorTestGetColor(color) {
    // Very ugly parse
    color = color.replace(/rgb\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)/i, '$1:$2:$3');
    var r = color.split(':')[0];
    var g = color.split(':')[1];
    var b = color.split(':')[2];
    // Get in range between 0 and 1
    return {
        r: r / 255,
        g: g / 255,
        b: b / 255
    };
}

function colorTestInit() {
    document.getElementById('color-test-train-color')
        .style['background-color'] = colorTestGetRandomColor();
}

function colorTestTrainKeyPress(e) {
    if (e.code === 'Enter') {
        colorTestTrainNext();
    }
}

function colorTestTrainNext() {
    // Get current data
    var color = document.getElementById('color-test-train-color')
        .style['background-color'];
    var name = document.getElementById('color-test-train-input').value;
    // Save
    var output = {};
    output[name] = 1;
    
    colorTestData.push(
        {input: colorTestGetColor(color), output: output}
    );
    // Set next
    document.getElementById('color-test-train-color')
        .style['background-color'] = colorTestGetRandomColor();
    document.getElementById('color-test-train-input').value = '';
}

function colorTestTrain() {
    colorTestNet.train(colorTestData);
}

function colorTestRun() {
    if(colorTestData.length > 0) {
        var random_color = colorTestGetRandomColor();
        document.getElementById('color-test-run-color')
            .style['background-color'] = random_color;
        var input = colorTestGetColor(random_color);
        
        var output = colorTestNet.run(input);
        
        var result = '';
        var highestValue = 0;
        for (var key in output) {
            if (output[key] > highestValue) {
                highestValue = output[key];
                result = key;
            }
        }
        
        document.getElementById('color-test-run-output').
            innerHTML = result.toString();
    }
}